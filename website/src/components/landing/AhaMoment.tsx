import CodeBlock from '../ui/CodeBlock'

const oldCode = `const fetchUser = async (id: string) => {
  setLoading(true);
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error('Failed');
    const user = await res.json();
    setUser(user);
    toast.success(\`Loaded \${user.name}\`);
  } catch (err) {
    toast.error(err.message);
    logger.error(err);
  } finally {
    setLoading(false);
  }
};`

const newCode = `import { airbag } from 'airbag';

const fetchUser = airbag(
  (id: string) =>
    fetch(\`/api/users/\${id}\`).then(r => r.json()),
  {
    timeout: 5000,
    retries: 3,
    onLoading: setLoading,
    onSuccess: (user) => toast.success(user.name),
    onError: (err) => toast.error(err.message),
  }
);`

export default function AhaMoment() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
          The old way vs. the{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-500">
            Airbag
          </span>{' '}
          way
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
          Replace nested try/catch/finally spaghetti with clean, declarative wrappers.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Before
              </span>
            </div>
            <CodeBlock code={oldCode} lang="typescript" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                After
              </span>
            </div>
            <CodeBlock code={newCode} lang="typescript" />
          </div>
        </div>
      </div>
    </section>
  )
}
