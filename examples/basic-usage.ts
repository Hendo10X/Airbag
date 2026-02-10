import { airbag, createAirbagInstance } from '../src';

// ─── Example Types ───────────────────────────────────────────────────────────

interface User {
  id: string;
  name: string;
  email: string;
}

// ─── Simulated API call ──────────────────────────────────────────────────────

async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`https://api.example.com/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<User>;
}

// ─── 1. Standalone usage ─────────────────────────────────────────────────────

const safeFetchUser = airbag(fetchUser, {
  name: 'fetchUser',
  timeout: 5_000,
  retry: { count: 3, backoff: 'exponential' },
  adapter: {
    onLoading: (loading) => {
      if (loading) console.log('[loading] Fetching user...');
      else console.log('[loading] Done.');
    },
    onSuccess: (user) => console.log('[success]', user.name),
    onError: (err) => console.error('[error]', err.message),
    onRetry: (attempt, err) => console.warn(`[retry] Attempt ${attempt}: ${err.message}`),
    onFinish: (ctx) => console.log(`[finish] Took ${ctx.duration}ms`),
  },
});

async function standaloneExample() {
  const user = await safeFetchUser('user-123');
  console.log('Got user:', user);
}

// ─── 2. Execution-level overrides via .with() ───────────────────────────────

async function overrideExample() {
  const user = await safeFetchUser.with({ timeout: 15_000 })('user-456');
  console.log('Got user with extended timeout:', user);
}

// ─── 3. Instance-based usage ─────────────────────────────────────────────────

const { wrap } = createAirbagInstance({
  retry: { count: 2, backoff: 'exponential', baseDelay: 500 },
  timeout: 10_000,
  adapter: {
    onError: (err, ctx) => console.error(`[${ctx.functionName}] ${err.message}`),
  },
});

const fetchWithDefaults = wrap(fetchUser, {
  name: 'fetchUser',
  timeout: 5_000,
});

async function instanceExample() {
  const user = await fetchWithDefaults('user-789');
  console.log('Got user via instance:', user);
}

// ─── 4. AbortSignal cancellation ─────────────────────────────────────────────

async function abortExample() {
  const controller = new AbortController();

  const cancellableFetch = safeFetchUser.with({ signal: controller.signal });

  setTimeout(() => controller.abort(), 2_000);

  const user = await cancellableFetch('user-999');
  console.log('Got user:', user);
}

// ─── Run ─────────────────────────────────────────────────────────────────────

standaloneExample()
  .then(() => overrideExample())
  .then(() => instanceExample())
  .then(() => abortExample())
  .catch(console.error);
