import Button from '../ui/Button'

export default function Hero() {
  return (
    <section className="pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Execution Orchestration Layer
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
          Stop writing{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-500">
            try-catch
          </span>{' '}
          blocks.
        </h1>

        <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Replace imperative error handling with declarative async function wrappers.
          Airbag handles retries, timeouts, circuit breaking, and lifecycle
          callbacks — fully type-safe with zero dependencies.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 17l6-6-6-6" /><path d="M12 19h8" />
            </svg>
            npm install airbag
          </Button>
          <Button variant="outline" to="/docs">
            View the Docs
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  )
}
