export type BackoffStrategy = 'exponential' | 'linear' | 'fixed';

export type CircuitBreakerState = 'closed' | 'open' | 'half-open';

export type AirbagErrorCode =
  | 'TIMEOUT'
  | 'RETRY_EXHAUSTED'
  | 'CIRCUIT_OPEN'
  | 'ABORTED'
  | 'EXECUTION_FAILED';

export type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: Error };

export interface RetryConfig {
  count: number;
  backoff: BackoffStrategy;
  baseDelay: number;
  maxDelay: number;
  jitter: boolean;
}

export interface CircuitBreakerConfig {
  enabled: boolean;
  threshold: number;
  resetTimeout: number;
}

export interface ExecutionContext {
  functionName: string;
  duration: number;
  timestamp: number;
  attempt: number;
  maxAttempts: number;
}

export interface AirbagAdapter<TReturn = unknown> {
  onLoading?: (isLoading: boolean, context: ExecutionContext) => void;
  onSuccess?: (data: TReturn, context: ExecutionContext) => void;
  onError?: (error: Error, context: ExecutionContext) => void;
  onRetry?: (attempt: number, error: Error, context: ExecutionContext) => void;
  onFinish?: (context: ExecutionContext) => void;
}

export interface AirbagOptions<TReturn = unknown> {
  name?: string;
  timeout?: number;
  retries?: number;
  retry?: Partial<RetryConfig>;
  circuitBreaker?: Partial<CircuitBreakerConfig>;
  signal?: AbortSignal;
  adapter?: AirbagAdapter<TReturn>;
  onLoading?: AirbagAdapter<TReturn>['onLoading'];
  onSuccess?: AirbagAdapter<TReturn>['onSuccess'];
  onError?: AirbagAdapter<TReturn>['onError'];
  onRetry?: AirbagAdapter<TReturn>['onRetry'];
  onFinish?: AirbagAdapter<TReturn>['onFinish'];
}

export interface AirbagResolvedConfig<TReturn = unknown> {
  name: string;
  adapter: AirbagAdapter<TReturn>;
  retry: RetryConfig;
  timeout: number;
  circuitBreaker: CircuitBreakerConfig;
  signal?: AbortSignal;
}

/**
 * Wrapped async function that preserves the original function's
 * argument types and return type while adding execution orchestration.
 *
 * @typeParam TArgs - Tuple of the original function's parameter types
 * @typeParam TReturn - The resolved type of the original function's promise
 */
export interface WrappedFunction<TArgs extends unknown[], TReturn> {
  (...args: TArgs): Promise<TReturn>;
  /** Creates a new wrapped function with execution-level option overrides. */
  with(overrides: AirbagOptions<TReturn>): WrappedFunction<TArgs, TReturn>;
  /** Resets the circuit breaker state for this wrapped function. */
  reset(): void;
}

export interface CircuitBreakerInstance {
  canExecute(): boolean;
  recordSuccess(): void;
  recordFailure(): void;
  getState(): CircuitBreakerState;
  reset(): void;
}

export interface AirbagInstance {
  /** Wraps an async function with airbag orchestration using instance-level defaults. */
  wrap<TArgs extends unknown[], TReturn>(
    fn: (...args: TArgs) => Promise<TReturn>,
    options?: AirbagOptions<TReturn>
  ): WrappedFunction<TArgs, TReturn>;
  /** Merges new options into the instance-level defaults. */
  configure(options: AirbagOptions): void;
  /** Returns the fully resolved configuration with current defaults. */
  getDefaults(): AirbagResolvedConfig;
}
