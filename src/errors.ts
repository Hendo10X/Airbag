import type { AirbagErrorCode, ExecutionContext } from './interfaces';

export class AirbagError extends Error {
  readonly code: AirbagErrorCode;
  readonly context: ExecutionContext;

  constructor(
    message: string,
    code: AirbagErrorCode,
    context: ExecutionContext,
    options?: { cause?: Error }
  ) {
    super(message, options);
    this.name = 'AirbagError';
    this.code = code;
    this.context = context;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class TimeoutError extends AirbagError {
  readonly timeout: number;

  constructor(context: ExecutionContext, timeout: number) {
    super(
      `"${context.functionName}" timed out after ${timeout}ms`,
      'TIMEOUT',
      context
    );
    this.name = 'TimeoutError';
    this.timeout = timeout;
  }
}

export class RetryExhaustedError extends AirbagError {
  constructor(context: ExecutionContext, cause: Error) {
    super(
      `"${context.functionName}" failed after ${context.maxAttempts} attempt(s): ${cause.message}`,
      'RETRY_EXHAUSTED',
      context,
      { cause }
    );
    this.name = 'RetryExhaustedError';
  }
}

export class CircuitOpenError extends AirbagError {
  constructor(context: ExecutionContext) {
    super(
      `Circuit breaker is open for "${context.functionName}"`,
      'CIRCUIT_OPEN',
      context
    );
    this.name = 'CircuitOpenError';
  }
}

export class AbortError extends AirbagError {
  constructor(context: ExecutionContext) {
    super(
      `Execution of "${context.functionName}" was aborted`,
      'ABORTED',
      context
    );
    this.name = 'AbortError';
  }
}
