import type { AirbagInstance, AirbagOptions, AirbagResolvedConfig, WrappedFunction } from './interfaces';
import { resolveConfig } from './config';
import { createWrapped } from './airbag';

/**
 * Creates a pre-configured airbag instance with shared global defaults.
 *
 * All functions wrapped through this instance inherit the global options
 * before applying their own instance-level and execution-level overrides.
 *
 * @example
 * ```ts
 * const { wrap } = createAirbagInstance({
 *   retry: { count: 3 },
 *   adapter: {
 *     onError: (err) => logger.error(err),
 *   },
 * });
 *
 * const safeFetch = wrap(fetchUser, { timeout: 5000 });
 * const user = await safeFetch('user-123');
 * ```
 */
export function createAirbagInstance(globalOptions?: AirbagOptions): AirbagInstance {
  let globals: AirbagOptions = { ...globalOptions };

  return {
    wrap<TArgs extends unknown[], TReturn>(
      fn: (...args: TArgs) => Promise<TReturn>,
      options?: AirbagOptions<TReturn>
    ): WrappedFunction<TArgs, TReturn> {
      return createWrapped(fn, [globals as AirbagOptions<TReturn>, options]);
    },

    configure(options: AirbagOptions): void {
      globals = { ...globals, ...options };
    },

    getDefaults(): AirbagResolvedConfig {
      return resolveConfig(globals);
    },
  };
}
