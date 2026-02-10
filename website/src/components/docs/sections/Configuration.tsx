import CodeBlock from '../../ui/CodeBlock'

export default function Configuration() {
  return (
    <section id="configuration" className="scroll-mt-24">
      <h2 className="text-3xl font-pixel text-gray-900 mb-6 font-bold">Configuration</h2>

      <h3 className="text-lg font-pixel text-gray-900 mb-4 font-semibold">Options Reference</h3>

      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Option</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Default</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {[
              ['name', 'string', "'anonymous'", 'Identifier for logging and error messages'],
              ['timeout', 'number', '30000', 'Timeout in ms (0 disables)'],
              ['retries', 'number', '0', 'Shorthand for retry.count'],
              ['retry.count', 'number', '0', 'Number of retries after initial failure'],
              ['retry.backoff', "'exponential' | 'linear' | 'fixed'", "'exponential'", 'Backoff strategy between retries'],
              ['retry.baseDelay', 'number', '1000', 'Base delay in ms'],
              ['retry.maxDelay', 'number', '30000', 'Maximum delay cap in ms'],
              ['retry.jitter', 'boolean', 'true', 'Randomize delays to avoid thundering herd'],
              ['circuitBreaker.enabled', 'boolean', 'false', 'Enable the circuit breaker'],
              ['circuitBreaker.threshold', 'number', '5', 'Consecutive failures before opening'],
              ['circuitBreaker.resetTimeout', 'number', '60000', 'Ms before probing with a half-open attempt'],
              ['signal', 'AbortSignal', '—', 'Cancel execution via AbortController'],
            ].map(([option, type, def, desc]) => (
              <tr key={option} className="border-b border-gray-100">
                <td className="py-3 px-4 font-mono text-sm whitespace-nowrap">{option}</td>
                <td className="py-3 px-4 font-mono text-xs text-gray-500 whitespace-nowrap">{type}</td>
                <td className="py-3 px-4 font-mono text-xs">{def}</td>
                <td className="py-3 px-4">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-pixel text-gray-900 mb-4 font-semibold">3-Level Configuration Hierarchy</h3>

      <p className="text-gray-600 mb-4 leading-relaxed">
        Airbag uses a three-level configuration system. Each level merges over the previous
        one, from most general to most specific:
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-gray-200 text-gray-600 font-bold text-sm flex items-center justify-center mb-3">1</div>
          <h4 className="font-semibold text-gray-900 mb-1">Global</h4>
          <p className="text-sm text-gray-500">Defaults set via <code className="text-xs bg-gray-100 px-1 rounded">createAirbagInstance()</code></p>
        </div>
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-gray-300 text-gray-700 font-bold text-sm flex items-center justify-center mb-3">2</div>
          <h4 className="font-semibold text-gray-900 mb-1">Instance</h4>
          <p className="text-sm text-gray-500">Per-function options passed to <code className="text-xs bg-gray-100 px-1 rounded">wrap()</code> or <code className="text-xs bg-gray-100 px-1 rounded">airbag()</code></p>
        </div>
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-green-200 text-green-700 font-bold text-sm flex items-center justify-center mb-3">3</div>
          <h4 className="font-semibold text-gray-900 mb-1">Execution</h4>
          <p className="text-sm text-gray-500">Per-call overrides via <code className="text-xs bg-gray-100 px-1 rounded">.with()</code></p>
        </div>
      </div>

      <CodeBlock
        code={`import { createAirbagInstance } from 'airbag';

// Level 1: Global defaults
const { wrap } = createAirbagInstance({
  retries: 3,
  timeout: 10000,
  onError: (err) => logger.error(err),
});

// Level 2: Instance options (merged over global)
const safeFetch = wrap(fetchUser, {
  name: 'fetchUser',
  timeout: 5000, // overrides global 10000
});

// Level 3: Execution overrides (merged over instance)
const user = await safeFetch.with({ timeout: 15000 })('user-123');`}
        lang="typescript"
      />
    </section>
  )
}
