# Airbag

Execution Orchestration Layer for JavaScript/TypeScript.

Replace imperative `try/catch/finally` blocks with declarative async function wrappers. Airbag handles **loading states**, **error catching**, **retries with exponential backoff**, **timeouts**, and **circuit breaking** — fully type-safe with zero runtime dependencies.

## Install

```bash
npm install airbag
```

## Quick Start

```ts
import { airbag } from 'airbag';

interface User {
  id: string;
  name: string;
}

const fetchUser = async (id: string): Promise<User> => {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json() as Promise<User>;
};

const safeFetchUser = airbag(fetchUser, {
  timeout: 5000,
  retries: 3,
  onLoading: (loading) => spinner.toggle(loading),
  onSuccess: (user) => toast.success(`Loaded ${user.name}`),
  onError: (err) => toast.error(err.message),
});

// Fully type-safe — same signature as fetchUser
const user = await safeFetchUser('user-123');
```

## Configuration Hierarchy

Three levels of configuration merged in order of specificity:

### Global → Instance → Execution

```ts
import { createAirbagInstance } from 'airbag';

// Level 1: Global defaults
const { wrap } = createAirbagInstance({
  retries: 3,
  timeout: 10000,
  onError: (err) => logger.error(err),
});

// Level 2: Instance options (merged over global)
const safeFetch = wrap(fetchUser, {
  name: 'fetchUser',
  timeout: 5000,
});

// Level 3: Execution overrides (merged over instance)
const user = await safeFetch.with({ timeout: 15000 })('user-123');
```

## API

### `airbag(fn, options?)`

Wraps an async function with execution orchestration.

```ts
const wrapped = airbag(myAsyncFn, { timeout: 5000, retries: 3 });
const result = await wrapped(...originalArgs);
```

### `createAirbagInstance(options?)`

Creates a factory with shared global defaults.

```ts
const { wrap, configure, getDefaults } = createAirbagInstance({ retries: 2 });
```

### `wrapped.with(overrides)`

Creates a new wrapped function with execution-level overrides while sharing the same circuit breaker state.

```ts
const urgent = wrapped.with({ timeout: 2000 });
const result = await urgent(...args);
```

### `wrapped.reset()`

Resets the circuit breaker state back to `closed`.

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | `'anonymous'` | Identifier for logging and error messages |
| `timeout` | `number` | `30000` | Timeout in ms (`0` disables) |
| `retries` | `number` | `0` | Shorthand for `retry.count` |
| `retry.count` | `number` | `0` | Number of retries after initial failure |
| `retry.backoff` | `'exponential' \| 'linear' \| 'fixed'` | `'exponential'` | Backoff strategy between retries |
| `retry.baseDelay` | `number` | `1000` | Base delay in ms |
| `retry.maxDelay` | `number` | `30000` | Maximum delay cap in ms |
| `retry.jitter` | `boolean` | `true` | Randomize delays to avoid thundering herd |
| `circuitBreaker.enabled` | `boolean` | `false` | Enable the circuit breaker |
| `circuitBreaker.threshold` | `number` | `5` | Consecutive failures before opening |
| `circuitBreaker.resetTimeout` | `number` | `60000` | Ms before probing with a half-open attempt |
| `signal` | `AbortSignal` | — | Cancel execution via `AbortController` |

## Callbacks

Lifecycle callbacks can be passed **flat** at the top level — no nesting required:

```ts
airbag(fetchUser, {
  retries: 3,
  onSuccess: (user) => toast.success(user.name),
  onError: (err) => toast.error(err.message),
});
```

For reusable callback sets, group them in an `adapter` object instead:

```ts
const logger: AirbagAdapter = {
  onError: (err, ctx) => log.error(ctx.functionName, err),
  onFinish: (ctx) => log.info(`Done in ${ctx.duration}ms`),
};

airbag(fetchUser, { retries: 3, adapter: logger });
```

If both flat callbacks and an `adapter` are provided, the `adapter` takes precedence.

Every callback receives an `ExecutionContext`:

```ts
interface ExecutionContext {
  functionName: string;
  duration: number;
  timestamp: number;
  attempt: number;
  maxAttempts: number;
}
```

## Error Types

All errors extend `AirbagError` with a `code` and `context` property:

| Error | Code | When |
| --- | --- | --- |
| `TimeoutError` | `TIMEOUT` | Promise exceeded the configured timeout |
| `RetryExhaustedError` | `RETRY_EXHAUSTED` | All retry attempts failed |
| `CircuitOpenError` | `CIRCUIT_OPEN` | Circuit breaker blocked execution |
| `AbortError` | `ABORTED` | Execution cancelled via `AbortSignal` |

```ts
import { TimeoutError, RetryExhaustedError } from 'airbag';

const result = await safeFetch('id').catch((err) => {
  if (err instanceof TimeoutError) {
    // err.timeout — the configured timeout in ms
    // err.context — execution metadata
  }
  if (err instanceof RetryExhaustedError) {
    // err.cause — the last error that caused the final failure
  }
});
```

## License

MIT
