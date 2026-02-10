import CodeBlock from '../../ui/CodeBlock'

export default function ApiReference() {
  return (
    <section id="api-reference" className="scroll-mt-24">
      <h2 className="text-3xl font-pixel text-gray-900 mb-6 font-bold">API Reference</h2>

      {/* airbag() */}
      <div className="mb-12">
        <h3 className="text-xl font-pixel text-gray-900 mb-3 font-mono font-bold">
          airbag(fn, options?)
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Wraps an async function with execution orchestration. Returns a new function
          with the same signature that includes retry logic, timeouts, circuit breaking,
          and lifecycle callbacks.
        </p>
        <CodeBlock
          code={`import { airbag } from 'airbag';

const wrapped = airbag(myAsyncFn, {
  timeout: 5000,
  retries: 3,
});

const result = await wrapped(...originalArgs);`}
          lang="typescript"
        />
      </div>

      {/* createAirbagInstance() */}
      <div className="mb-12">
        <h3 className="text-xl font-pixel text-gray-900 mb-3 font-mono font-bold">
          createAirbagInstance(options?)
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Creates a factory with shared global defaults. All functions wrapped through
          this instance inherit the global configuration, which can be overridden
          per-function or per-execution.
        </p>
        <CodeBlock
          code={`import { createAirbagInstance } from 'airbag';

const { wrap, configure, getDefaults } = createAirbagInstance({
  retries: 2,
  timeout: 10000,
  onError: (err) => logger.error(err),
});

// All wrapped functions inherit the global config
const safeFetch = wrap(fetchUser, { name: 'fetchUser' });
const safePost = wrap(postData, { name: 'postData' });`}
          lang="typescript"
        />
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-mono text-sm">wrap(fn, opts?)</td>
                <td className="py-3 px-4">Wrap a function with instance defaults merged in</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-mono text-sm">configure(opts)</td>
                <td className="py-3 px-4">Update the instance's global defaults at runtime</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-mono text-sm">getDefaults()</td>
                <td className="py-3 px-4">Return the current global defaults</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* .with() */}
      <div className="mb-12">
        <h3 className="text-xl font-pixel text-gray-900 mb-3 font-mono font-bold">
          wrapped.with(overrides)
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Creates a new wrapped function with execution-level overrides while sharing
          the same circuit breaker state. Useful for one-off adjustments without
          creating a new wrapper.
        </p>
        <CodeBlock
          code={`const safeFetch = airbag(fetchUser, {
  timeout: 5000,
  retries: 3,
});

// One-off override for an urgent call
const urgent = safeFetch.with({ timeout: 2000 });
const user = await urgent('user-123');

// Or inline
const user = await safeFetch.with({ timeout: 2000 })('user-123');`}
          lang="typescript"
        />
      </div>

      {/* .reset() */}
      <div>
        <h3 className="text-xl font-pixel text-gray-900 mb-3 font-mono font-bold">
          wrapped.reset()
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Resets the circuit breaker state back
          to <code className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 text-sm font-mono">closed</code>,
          allowing executions to proceed normally again. Call this after a known
          recovery event.
        </p>
        <CodeBlock
          code={`const safeFetch = airbag(fetchUser, {
  circuitBreaker: { enabled: true, threshold: 5 },
});

// After the service recovers
safeFetch.reset();`}
          lang="typescript"
        />
      </div>
    </section>
  )
}
