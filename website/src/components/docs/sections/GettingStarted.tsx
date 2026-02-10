import CodeBlock from '../../ui/CodeBlock'

export default function GettingStarted() {
  return (
    <section id="getting-started" className="scroll-mt-24">
      <h2 className="text-3xl font-pixel text-gray-900 mb-6 font-bold">Getting Started</h2>

      <h3 className="text-lg font-pixel text-gray-900 mb-3 font-semibold">Installation</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">
        Install Airbag with your preferred package manager:
      </p>

      <div className="space-y-3 mb-8">
        <CodeBlock code="npm install airbag" lang="bash" />
      </div>

      <h3 className="text-lg font-pixel text-gray-900 mb-3 font-semibold">Basic Import</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">
        Import the main <code className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 text-sm font-mono">airbag</code> function
        to start wrapping your async functions:
      </p>

      <CodeBlock
        code={`import { airbag } from 'airbag';

// Wrap any async function
const safeFetch = airbag(fetchData, {
  timeout: 5000,
  retries: 3,
});

// Call it just like the original — fully type-safe
const result = await safeFetch('param1', 'param2');`}
        lang="typescript"
      />

      <p className="text-gray-600 mt-6 leading-relaxed">
        The wrapped function preserves the original function's signature and return type.
        TypeScript will infer everything automatically — no manual type annotations needed.
      </p>
    </section>
  )
}
