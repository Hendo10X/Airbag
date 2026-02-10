import CodeBlock from '../../ui/CodeBlock'

export default function CallbacksAdapters() {
  return (
    <section id="callbacks" className="scroll-mt-24">
      <h2 className="text-3xl font-pixel text-gray-900 mb-6 font-bold">Callbacks &amp; Adapters</h2>

      <h3 className="text-lg font-pixel text-gray-900 mb-3 font-semibold">Flat Callbacks</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">
        Lifecycle callbacks can be passed directly at the top level — no nesting required:
      </p>

      <CodeBlock
        code={`airbag(fetchUser, {
  retries: 3,
  onLoading: (loading) => spinner.toggle(loading),
  onSuccess: (user) => toast.success(user.name),
  onError: (err) => toast.error(err.message),
  onRetry: (err, ctx) => console.log(\`Retry \${ctx.attempt}/\${ctx.maxAttempts}\`),
  onFinish: (ctx) => console.log(\`Done in \${ctx.duration}ms\`),
});`}
        lang="typescript"
      />

      <div className="overflow-x-auto my-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Callback</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Signature</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">When</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-mono text-sm">onLoading</td>
              <td className="py-3 px-4 font-mono text-xs">(loading: boolean) =&gt; void</td>
              <td className="py-3 px-4">Execution starts / ends</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-mono text-sm">onSuccess</td>
              <td className="py-3 px-4 font-mono text-xs">(data: T, ctx) =&gt; void</td>
              <td className="py-3 px-4">Function resolved successfully</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-mono text-sm">onError</td>
              <td className="py-3 px-4 font-mono text-xs">(err: Error, ctx) =&gt; void</td>
              <td className="py-3 px-4">All attempts exhausted</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-mono text-sm">onRetry</td>
              <td className="py-3 px-4 font-mono text-xs">(err: Error, ctx) =&gt; void</td>
              <td className="py-3 px-4">Before each retry attempt</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-mono text-sm">onFinish</td>
              <td className="py-3 px-4 font-mono text-xs">(ctx) =&gt; void</td>
              <td className="py-3 px-4">After success or final failure</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-pixel text-gray-900 mb-3 font-semibold">Adapter Object</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">
        For reusable callback sets, group them in
        an <code className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 text-sm font-mono">adapter</code> object.
        If both flat callbacks and an adapter are provided, the adapter takes precedence.
      </p>

      <CodeBlock
        code={`import type { AirbagAdapter } from 'airbag';

const logger: AirbagAdapter = {
  onError: (err, ctx) => log.error(ctx.functionName, err),
  onFinish: (ctx) => log.info(\`Done in \${ctx.duration}ms\`),
};

airbag(fetchUser, { retries: 3, adapter: logger });`}
        lang="typescript"
      />

      <h3 className="text-lg font-pixel text-gray-900 mt-10 mb-3 font-semibold">ExecutionContext</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">
        Every callback receives an <code className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 text-sm font-mono">ExecutionContext</code> with
        metadata about the current execution:
      </p>

      <CodeBlock
        code={`interface ExecutionContext {
  functionName: string; // The 'name' from options
  duration: number;     // Elapsed time in ms
  timestamp: number;    // When execution started
  attempt: number;      // Current attempt (1-based)
  maxAttempts: number;  // Total attempts allowed
}`}
        lang="typescript"
      />
    </section>
  )
}
