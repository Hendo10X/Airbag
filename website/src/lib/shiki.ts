import { createHighlighter, type Highlighter } from 'shiki'

let highlighterInstance: Highlighter | null = null

export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterInstance) {
    highlighterInstance = await createHighlighter({
      themes: ['github-dark'],
      langs: ['typescript', 'bash', 'json', 'tsx'],
    })
  }
  return highlighterInstance
}
