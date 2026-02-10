import { useQuery } from '@tanstack/react-query'
import { getHighlighter } from '../../lib/shiki'

interface CodeBlockProps {
  code: string
  lang?: string
  filename?: string
}

export default function CodeBlock({ code, lang = 'typescript', filename, className }: CodeBlockProps & { className?: string }) {
  const { data: html } = useQuery({
    queryKey: ['shiki-highlight', code, lang],
    queryFn: async () => {
      const highlighter = await getHighlighter()
      return highlighter.codeToHtml(code.trim(), { lang, theme: 'github-dark' })
    },
    staleTime: Infinity,
  })

  // Common container classes
  const containerClasses = `rounded-xl overflow-hidden bg-[#1a1a1a] ${className || ''}`;

  if (!html) {
    return (
      <div className={containerClasses}>
        {filename && (
          <div className="bg-[#252525] text-gray-400 text-xs px-4 py-2 font-mono">
            {filename}
          </div>
        )}
        <pre className="bg-[#1a1a1a] text-gray-300 p-4 overflow-x-auto text-sm leading-relaxed font-mono h-full">
          <code>{code.trim()}</code>
        </pre>
      </div>
    )
  }

  return (
    <div className={containerClasses}>
      {filename && (
        <div className="bg-[#252525] text-gray-400 text-xs px-4 py-2 font-mono">
          {filename}
        </div>
      )}
      <div
        className="h-full [&_pre]:bg-[#1a1a1a]! [&_pre]:h-full [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:text-sm [&_pre]:leading-relaxed [&_code]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
