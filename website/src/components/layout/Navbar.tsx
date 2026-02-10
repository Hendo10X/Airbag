import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">A</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-900">
            AIRBAG
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/docs"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Docs
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/airbag"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-mono rounded-full hover:bg-gray-800 transition-colors"
          >
            npm i airbag
          </a>
        </div>
      </nav>
    </header>
  )
}
