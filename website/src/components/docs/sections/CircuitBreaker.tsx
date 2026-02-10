import CodeBlock from '../../ui/CodeBlock'

export default function CircuitBreaker() {
  return (
    <section id="circuit-breaker" className="scroll-mt-24">
      <h2 className="text-3xl font-pixel text-gray-900 mb-6 font-bold">Circuit Breaker</h2>

      <p className="text-gray-600 mb-6 leading-relaxed">
        The circuit breaker pattern prevents your application from repeatedly calling a
        failing service. After a configured number of consecutive failures, the circuit
        "opens" and immediately rejects subsequent calls — giving the downstream service
        time to recover.
      </p>

      <h3 className="text-lg font-pixel text-gray-900 mb-3 font-semibold">Enabling the Circuit Breaker</h3>

      <CodeBlock
        code={`const safeFetch = airbag(fetchUser, {
  circuitBreaker: {
    enabled: true,
    threshold: 5,        // Open after 5 consecutive failures
    resetTimeout: 60000, // Try again after 60 seconds
  },
});`}
        lang="typescript"
      />

      <h3 className="text-lg font-pixel text-gray-900 mt-10 mb-4 font-semibold">State Machine</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">
        The circuit breaker transitions through three states:
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="p-5 rounded-xl border-2 border-green-200 bg-green-50">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <h4 className="font-semibold text-green-800">Closed</h4>
          </div>
          <p className="text-sm text-green-700">
            Normal operation. All calls pass through. Failures are counted.
          </p>
        </div>
        <div className="p-5 rounded-xl border-2 border-red-200 bg-red-50">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <h4 className="font-semibold text-red-800">Open</h4>
          </div>
          <p className="text-sm text-red-700">
            Circuit tripped. All calls immediately
            throw <code className="text-xs bg-red-100 px-1 rounded">CircuitOpenError</code>.
          </p>
        </div>
        <div className="p-5 rounded-xl border-2 border-yellow-200 bg-yellow-50">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <h4 className="font-semibold text-yellow-800">Half-Open</h4>
          </div>
          <p className="text-sm text-yellow-700">
            Probing. One call is allowed through. Success closes the circuit; failure reopens it.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 font-mono text-sm text-gray-700 mb-8">
        <div className="flex flex-wrap items-center gap-2 justify-center">
          <span className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 font-semibold">CLOSED</span>
          <span className="text-gray-400">— {'{threshold} failures'} →</span>
          <span className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 font-semibold">OPEN</span>
          <span className="text-gray-400">— {'{resetTimeout} ms'} →</span>
          <span className="px-3 py-1.5 rounded-lg bg-yellow-100 text-yellow-700 font-semibold">HALF-OPEN</span>
          <span className="text-gray-400">— success →</span>
          <span className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 font-semibold">CLOSED</span>
        </div>
      </div>

      <h3 className="text-lg font-pixel text-gray-900 mb-3 font-semibold">Shared State</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">
        The circuit breaker state is shared across <code className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 text-sm font-mono">.with()</code> calls.
        This means if you create execution overrides, they all share the same circuit
        breaker counter:
      </p>

      <CodeBlock
        code={`const safeFetch = airbag(fetchUser, {
  circuitBreaker: { enabled: true, threshold: 3 },
});

// Both share the same circuit breaker state
const urgent = safeFetch.with({ timeout: 2000 });
const relaxed = safeFetch.with({ timeout: 30000 });

// To manually reset the circuit breaker:
safeFetch.reset();`}
        lang="typescript"
      />
    </section>
  )
}
