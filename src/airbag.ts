import type {
  AirbagOptions,
  AirbagResolvedConfig,
  CircuitBreakerInstance,
  ExecutionContext,
  WrappedFunction,
} from './interfaces';
import { AirbagError, TimeoutError, RetryExhaustedError, CircuitOpenError, AbortError } from './errors';
import { resolveConfig } from './config';
import { createCircuitBreaker } from './circuit-breaker';
import {
  InternalTimeoutError,
  InternalAbortError,
  buildContext,
  calculateDelay,
  wait,
  withTimeout,
  safeInvoke,
  settle,
} from './utils';

function emitSuccess<TReturn>(
  config: AirbagResolvedConfig<TReturn>,
  ctx: ExecutionContext,
  value: TReturn
): TReturn {
  config.adapter.onSuccess?.(value, ctx);
  config.adapter.onLoading?.(false, ctx);
  config.adapter.onFinish?.(ctx);
  return value;
}

function emitFailure<TReturn>(
  config: AirbagResolvedConfig<TReturn>,
  ctx: ExecutionContext,
  error: AirbagError
): never {
  config.adapter.onError?.(error, ctx);
  config.adapter.onLoading?.(false, ctx);
  config.adapter.onFinish?.(ctx);
  throw error;
}

async function execute<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  args: TArgs,
  config: AirbagResolvedConfig<TReturn>,
  breaker: CircuitBreakerInstance
): Promise<TReturn> {
  const startTime = Date.now();
  const maxAttempts = Math.max(1, config.retry.count + 1);
  const getContext = (attempt: number): ExecutionContext =>
    buildContext(config.name, startTime, attempt, maxAttempts);

  if (!breaker.canExecute()) {
    const ctx = getContext(0);
    throw new CircuitOpenError(ctx);
  }

  config.adapter.onLoading?.(true, getContext(0));

  let lastError: Error = new Error('No attempts executed');
  let lastAttempt = 0;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    lastAttempt = attempt;

    if (attempt > 0) {
      config.adapter.onRetry?.(attempt, lastError, getContext(attempt));

      const delayed = await settle(
        wait(calculateDelay(attempt - 1, config.retry), config.signal)
      );

      if (!delayed.ok) {
        const ctx = getContext(attempt);
        return emitFailure(config, ctx, new AbortError(ctx));
      }
    }

    const result = await settle(
      withTimeout(safeInvoke(fn, args), config.timeout, config.signal)
    );

    if (result.ok) {
      breaker.recordSuccess();
      return emitSuccess(config, getContext(attempt), result.value);
    }

    if (result.error instanceof InternalAbortError) {
      const ctx = getContext(attempt);
      return emitFailure(config, ctx, new AbortError(ctx));
    }

    lastError = result.error;
  }

  breaker.recordFailure();
  const ctx = getContext(lastAttempt);

  const finalError = lastError instanceof InternalTimeoutError
    ? new TimeoutError(ctx, config.timeout)
    : new RetryExhaustedError(ctx, lastError);

  return emitFailure(config, ctx, finalError);
}

export function createWrapped<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  optionLayers: Array<AirbagOptions<TReturn> | undefined>,
  sharedBreaker?: CircuitBreakerInstance
): WrappedFunction<TArgs, TReturn> {
  const config = resolveConfig<TReturn>(...optionLayers);
  const breaker = sharedBreaker ?? createCircuitBreaker(config.circuitBreaker);

  const wrapped = ((...args: TArgs): Promise<TReturn> =>
    execute(fn, args, config, breaker)
  ) as WrappedFunction<TArgs, TReturn>;

  wrapped.with = (overrides: AirbagOptions<TReturn>): WrappedFunction<TArgs, TReturn> =>
    createWrapped(fn, [...optionLayers, overrides], breaker);

  wrapped.reset = (): void => breaker.reset();

  return wrapped;
}

/**
 * Wraps an async function with execution orchestration.
 *
 * The returned function has the same signature as the original but adds:
 * - Automatic loading state management
 * - Configurable retries with exponential backoff
 * - Timeout enforcement
 * - Circuit breaker protection
 * - Structured error reporting via adapters
 *
 * @typeParam TArgs - Tuple of the original function's parameter types
 * @typeParam TReturn - The resolved type of the original function's promise
 *
 * @example
 * ```ts
 * const safeFetch = airbag(fetchUser, {
 *   name: 'fetchUser',
 *   timeout: 5000,
 *   retry: { count: 3 },
 *   adapter: {
 *     onError: (err) => toast.error(err.message),
 *   },
 * });
 *
 * const user = await safeFetch('user-123');
 * ```
 */
export function airbag<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  options?: AirbagOptions<TReturn>
): WrappedFunction<TArgs, TReturn> {
  return createWrapped(fn, [options]);
}
