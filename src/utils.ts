import type { RetryConfig, ExecutionContext, Result } from './interfaces';

export class InternalTimeoutError extends Error {
  readonly ms: number;

  constructor(ms: number) {
    super(`Timed out after ${ms}ms`);
    this.name = 'InternalTimeoutError';
    this.ms = ms;
    Object.setPrototypeOf(this, InternalTimeoutError.prototype);
  }
}

export class InternalAbortError extends Error {
  constructor() {
    super('Operation aborted');
    this.name = 'InternalAbortError';
    Object.setPrototypeOf(this, InternalAbortError.prototype);
  }
}

export function toError(value: unknown): Error {
  if (value instanceof Error) return value;
  if (typeof value === 'string') return new Error(value);
  return new Error(String(value));
}

export function buildContext(
  functionName: string,
  startTime: number,
  attempt: number,
  maxAttempts: number
): ExecutionContext {
  return {
    functionName,
    duration: Date.now() - startTime,
    timestamp: Date.now(),
    attempt,
    maxAttempts,
  };
}

export function calculateDelay(attemptIndex: number, config: RetryConfig): number {
  let delay: number;

  switch (config.backoff) {
    case 'exponential':
      delay = config.baseDelay * Math.pow(2, attemptIndex);
      break;
    case 'linear':
      delay = config.baseDelay * (attemptIndex + 1);
      break;
    case 'fixed':
      delay = config.baseDelay;
      break;
  }

  if (config.jitter) {
    delay = delay * (0.5 + Math.random() * 0.5);
  }

  return Math.min(delay, config.maxDelay);
}

export function wait(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new InternalAbortError());
      return;
    }

    const timer = setTimeout(resolve, ms);

    const onAbort = () => {
      clearTimeout(timer);
      reject(new InternalAbortError());
    };

    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

export function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  signal?: AbortSignal
): Promise<T> {
  if (ms <= 0 || !Number.isFinite(ms)) return promise;

  return new Promise<T>((resolve, reject) => {
    let settled = false;

    if (signal?.aborted) {
      reject(new InternalAbortError());
      return;
    }

    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        reject(new InternalTimeoutError(ms));
      }
    }, ms);

    const onAbort = () => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        reject(new InternalAbortError());
      }
    };

    signal?.addEventListener('abort', onAbort, { once: true });

    promise.then(
      (value) => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          signal?.removeEventListener('abort', onAbort);
          resolve(value);
        }
      },
      (error) => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          signal?.removeEventListener('abort', onAbort);
          reject(error);
        }
      }
    );
  });
}

/**
 * Safely invokes an async function, converting synchronous throws
 * into promise rejections so they can be handled uniformly.
 */
export function safeInvoke<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  args: TArgs
): Promise<TReturn> {
  return new Promise<TReturn>((resolve, reject) => {
    Promise.resolve()
      .then(() => fn(...args))
      .then(resolve, reject);
  });
}

/**
 * Wraps a promise into a discriminated Result union,
 * guaranteeing the promise never rejects.
 */
export function settle<T>(promise: Promise<T>): Promise<Result<T>> {
  return promise
    .then((value): Result<T> => ({ ok: true, value }))
    .catch((error): Result<T> => ({ ok: false, error: toError(error) }));
}
