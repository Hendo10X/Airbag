import type { AirbagOptions, AirbagResolvedConfig } from './interfaces';

const DEFAULTS: AirbagResolvedConfig = {
  name: 'anonymous',
  adapter: {},
  retry: {
    count: 0,
    backoff: 'exponential',
    baseDelay: 1000,
    maxDelay: 30_000,
    jitter: true,
  },
  timeout: 30_000,
  circuitBreaker: {
    enabled: false,
    threshold: 5,
    resetTimeout: 60_000,
  },
};

export function resolveConfig<TReturn>(
  ...layers: Array<AirbagOptions<TReturn> | undefined>
): AirbagResolvedConfig<TReturn> {
  const resolved: AirbagResolvedConfig<TReturn> = {
    name: DEFAULTS.name,
    adapter: { ...DEFAULTS.adapter } as AirbagResolvedConfig<TReturn>['adapter'],
    retry: { ...DEFAULTS.retry },
    timeout: DEFAULTS.timeout,
    circuitBreaker: { ...DEFAULTS.circuitBreaker },
  };

  for (const layer of layers) {
    if (!layer) continue;

    if (layer.name !== undefined) resolved.name = layer.name;
    if (layer.timeout !== undefined) resolved.timeout = layer.timeout;
    if (layer.signal !== undefined) resolved.signal = layer.signal;

    if (layer.adapter) {
      resolved.adapter = { ...resolved.adapter, ...layer.adapter };
    }

    if (layer.retry) {
      resolved.retry = { ...resolved.retry, ...layer.retry };
    }

    if (layer.circuitBreaker) {
      resolved.circuitBreaker = { ...resolved.circuitBreaker, ...layer.circuitBreaker };
    }
  }

  return resolved;
}
