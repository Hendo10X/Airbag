import type { AirbagAdapter, AirbagOptions, AirbagResolvedConfig } from './interfaces';

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

    const flatAdapter: Partial<AirbagAdapter<TReturn>> = {};
    if (layer.onLoading) flatAdapter.onLoading = layer.onLoading;
    if (layer.onSuccess) flatAdapter.onSuccess = layer.onSuccess;
    if (layer.onError) flatAdapter.onError = layer.onError;
    if (layer.onRetry) flatAdapter.onRetry = layer.onRetry;
    if (layer.onFinish) flatAdapter.onFinish = layer.onFinish;

    resolved.adapter = { ...resolved.adapter, ...flatAdapter, ...(layer.adapter ?? {}) };

    if (layer.retries !== undefined) {
      resolved.retry = { ...resolved.retry, count: layer.retries };
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
