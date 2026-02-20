const values = [
  {
    number: 1,
    title: 'Declarative Safety',
    description:
      'Stop imperative state management. Define what should happen when a function runs (loading, success, failure) and let Airbag handle the how.',
  },
  {
    number: 2,
    title: 'UI Agnostic',
    description:
      "Airbag doesn't care if you use Shadcn, Material UI, or raw HTML. Plug in your favorite toast or modal library once, and Airbag drives it everywhere.",
  },
  {
    number: 3,
    title: 'Smart Recovery',
    description:
      'Network blip? Server timeout? Airbag includes exponential backoff retries out of the box. It fixes temporary issues before your user even notices.',
  },
]

export default function ValueProp() {
  return (
    <section className="w-full max-w-6xl mx-auto space-y-12">
      <h2 className="font-pixel text-3xl md:text-4xl text-gray-800">
        Value Proposition
      </h2>

      <div className="space-y-12">
        {values.map((v) => (
          <div key={v.number}>
            <p className="font-pixel text-base sm:text-lg md:text-xl text-gray-400 mb-2">
              {v.number}. {v.title}
            </p>
            <p className="font-mono text-sm md:text-base text-gray-800 leading-relaxed max-w-xl">
              {v.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
