import type { CircuitBreakerConfig, CircuitBreakerState, CircuitBreakerInstance } from './interfaces';

export function createCircuitBreaker(config: CircuitBreakerConfig): CircuitBreakerInstance {
  let state: CircuitBreakerState = 'closed';
  let failureCount = 0;
  let lastFailureTime = 0;

  return {
    canExecute(): boolean {
      if (!config.enabled) return true;
      if (state === 'closed') return true;

      if (state === 'open') {
        const elapsed = Date.now() - lastFailureTime;
        if (elapsed >= config.resetTimeout) {
          state = 'half-open';
          return true;
        }
        return false;
      }

      return true;
    },

    recordSuccess(): void {
      if (!config.enabled) return;
      if (state === 'half-open') {
        state = 'closed';
        failureCount = 0;
      }
    },

    recordFailure(): void {
      if (!config.enabled) return;
      failureCount++;
      lastFailureTime = Date.now();
      if (state === 'half-open' || failureCount >= config.threshold) {
        state = 'open';
      }
    },

    getState(): CircuitBreakerState {
      return state;
    },

    reset(): void {
      state = 'closed';
      failureCount = 0;
      lastFailureTime = 0;
    },
  };
}
