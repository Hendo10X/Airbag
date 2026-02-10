const features = [
  {
    number: '01',
    title: 'Smart Fail',
    description:
      'Circuit breaker pattern that opens after repeated failures, preventing cascade crashes across your system.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Timed to Perfection',
    description:
      'Configurable timeouts ensure your app never hangs on a stalled request. Every wrapped call respects the clock.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Silent Ops',
    description:
      'Lifecycle callbacks — onLoading, onSuccess, onError, onFinish — keep your UI in sync without try/catch noise.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Error Ready',
    description:
      'Typed error classes — TimeoutError, RetryExhaustedError, CircuitOpenError — give you precise, structured error handling.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
]

export default function Features() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
          Under the Hood
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
          Everything you need to build resilient applications, built into every wrapped function.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.number}
              className="relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <span className="absolute top-6 left-6 w-10 h-10 rounded-lg bg-green-100 text-green-700 font-bold text-sm flex items-center justify-center">
                {f.number}
              </span>
              <div className="pt-12">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-green-600">{f.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {f.title}
                  </h3>
                </div>
                <p className="text-gray-500 leading-relaxed">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
