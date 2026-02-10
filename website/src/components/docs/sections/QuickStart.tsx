import CodeBlock from '../../ui/CodeBlock'

export default function QuickStart() {
  return (
    <section id="quick-start" className="scroll-mt-24">
      <h2 className="text-3xl font-pixel text-gray-900 mb-6 font-bold">Quick Start</h2>

      <p className="text-gray-600 mb-6 leading-relaxed">
        Here's a minimal working example that wraps an API call with retries,
        a timeout, and lifecycle callbacks:
      </p>

      <CodeBlock
        code={`import { airbag } from 'airbag';

interface User {
  id: string;
  name: string;
}

const fetchUser = async (id: string): Promise<User> => {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json() as Promise<User>;
};

const safeFetchUser = airbag(fetchUser, {
  timeout: 5000,
  retries: 3,
  onLoading: (loading) => spinner.toggle(loading),
  onSuccess: (user) => toast.success(\`Loaded \${user.name}\`),
  onError: (err) => toast.error(err.message),
});

// Fully type-safe — same signature as fetchUser
const user = await safeFetchUser('user-123');
console.log(user.name); // TypeScript knows this is a User`}
        lang="typescript"
      />

      <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200">
        <p className="text-sm text-green-800 leading-relaxed">
          <strong>Tip:</strong> The wrapped function is a drop-in replacement for the original.
          You can use it anywhere the original function was used — the types are identical.
        </p>
      </div>
    </section>
  )
}
