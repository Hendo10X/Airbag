const values = [
  {
    number: '01',
    title: 'Declarative Safety',
    description:
      'Stop writing defensive code. Declare your error handling strategy once, and Airbag enforces it on every call — timeouts, retries, circuit breaking, all type-safe.',
  },
  {
    number: '02',
    title: 'UI Agnostic',
    description:
      "Works with React, Vue, Svelte, or plain Node.js. Airbag doesn't care about your framework — it wraps async functions, not components.",
  },
  {
    number: '03',
    title: 'Smart Recovery',
    description:
      'Exponential backoff with jitter, circuit breakers that heal, and graceful degradation. Your app recovers from failures without you writing a single retry loop.',
  },
]

export default function ValueProp() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Value Proposition
        </h2>
        <p className="text-gray-500 mb-12 text-lg">The Why</p>

        <div className="space-y-10">
          {values.map((v) => (
            <div key={v.number} className="flex gap-6 items-start">
              <span className="shrink-0 w-12 h-12 rounded-xl bg-green-100 text-green-700 font-bold text-lg flex items-center justify-center">
                {v.number}
              </span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {v.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
