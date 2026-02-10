import CodeBlock from '../../ui/CodeBlock'

export default function ErrorTypes() {
  return (
    <section id="error-types" className="scroll-mt-24">
      <h2 className="text-3xl font-pixel text-gray-900 mb-6 font-bold">Error Types</h2>

      <p className="text-gray-600 mb-6 leading-relaxed">
        All errors thrown by Airbag
        extend <code className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 text-sm font-mono">AirbagError</code> with
        a <code className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 text-sm font-mono">code</code> and <code className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 text-sm font-mono">context</code> property
        for structured error handling.
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Error</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Code</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">When</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-mono text-sm">TimeoutError</td>
              <td className="py-3 px-4"><code className="px-2 py-0.5 rounded bg-red-50 text-red-700 text-xs font-mono">TIMEOUT</code></td>
              <td className="py-3 px-4">Promise exceeded the configured timeout</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-mono text-sm">RetryExhaustedError</td>
              <td className="py-3 px-4"><code className="px-2 py-0.5 rounded bg-orange-50 text-orange-700 text-xs font-mono">RETRY_EXHAUSTED</code></td>
              <td className="py-3 px-4">All retry attempts failed</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-mono text-sm">CircuitOpenError</td>
              <td className="py-3 px-4"><code className="px-2 py-0.5 rounded bg-yellow-50 text-yellow-700 text-xs font-mono">CIRCUIT_OPEN</code></td>
              <td className="py-3 px-4">Circuit breaker blocked execution</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-mono text-sm">AbortError</td>
              <td className="py-3 px-4"><code className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-mono">ABORTED</code></td>
              <td className="py-3 px-4">Execution cancelled via AbortSignal</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-pixel text-gray-900 mb-3 font-semibold">Using instanceof</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">
        Use <code className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 text-sm font-mono">instanceof</code> to
        handle specific error types. Each error class carries extra properties relevant to
        the failure:
      </p>

      <CodeBlock
        code={`import {
  TimeoutError,
  RetryExhaustedError,
  CircuitOpenError,
  AbortError,
} from 'airbag';

const result = await safeFetch('id').catch((err) => {
  if (err instanceof TimeoutError) {
    // err.timeout — the configured timeout in ms
    // err.context — execution metadata
    console.log(\`Timed out after \${err.timeout}ms\`);
  }

  if (err instanceof RetryExhaustedError) {
    // err.cause — the last error that caused the final failure
    console.log(\`All retries failed: \${err.cause.message}\`);
  }

  if (err instanceof CircuitOpenError) {
    // Circuit is open — execution was blocked
    console.log('Service unavailable, circuit is open');
  }

  if (err instanceof AbortError) {
    // Execution was cancelled via AbortController
    console.log('Request was cancelled');
  }
});`}
        lang="typescript"
      />

      <h3 className="text-lg font-pixel text-gray-900 mt-10 mb-3 font-semibold">Error Hierarchy</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">
        All error types extend from <code className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 text-sm font-mono">AirbagError</code>,
        which itself extends the native <code className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 text-sm font-mono">Error</code>:
      </p>

      <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 font-mono text-sm text-gray-700">
        <div>Error</div>
        <div className="ml-4">
          └─ AirbagError <span className="text-gray-400">(code, context)</span>
          <div className="ml-6">├─ TimeoutError <span className="text-gray-400">(timeout)</span></div>
          <div className="ml-6">├─ RetryExhaustedError <span className="text-gray-400">(cause)</span></div>
          <div className="ml-6">├─ CircuitOpenError</div>
          <div className="ml-6">└─ AbortError</div>
        </div>
      </div>
    </section>
  )
}
