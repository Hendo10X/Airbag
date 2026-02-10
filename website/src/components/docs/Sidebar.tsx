import { useState, useEffect } from 'react'

const sections = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'api-reference', label: 'API Reference' },
  { id: 'configuration', label: 'Configuration' },
  { id: 'callbacks', label: 'Callbacks & Adapters' },
  { id: 'error-types', label: 'Error Types' },
  { id: 'circuit-breaker', label: 'Circuit Breaker' },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [active, setActive] = useState('getting-started')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px' },
    )

    for (const section of sections) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  const handleClick = () => {
    onClose()
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-100 p-6 overflow-y-auto
          transform transition-transform duration-200 ease-in-out
          lg:sticky lg:top-20 lg:z-auto lg:h-auto lg:max-h-[calc(100vh-6rem)] lg:transform-none lg:border-r-0 lg:p-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <nav className="space-y-1">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={handleClick}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                active === s.id
                  ? 'bg-[#d9f99d] text-green-900 font-medium'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  )
}
