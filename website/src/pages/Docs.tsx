import { useState } from 'react'
import Sidebar from '../components/docs/Sidebar'
import GettingStarted from '../components/docs/sections/GettingStarted'
import QuickStart from '../components/docs/sections/QuickStart'
import ApiReference from '../components/docs/sections/ApiReference'
import Configuration from '../components/docs/sections/Configuration'
import CallbacksAdapters from '../components/docs/sections/CallbacksAdapters'
import ErrorTypes from '../components/docs/sections/ErrorTypes'
import CircuitBreaker from '../components/docs/sections/CircuitBreaker'

export default function Docs() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        Navigation
      </button>

      <div className="flex gap-6 lg:gap-16">
        {/* Sidebar */}
        <div className="hidden lg:block w-44 shrink-0">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Mobile sidebar (rendered separately for overlay behavior) */}
        <div className="lg:hidden">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Content - centered with max-width */}
        <div className="flex-1 min-w-0 max-w-2xl mx-auto space-y-16">
          <GettingStarted />
          <QuickStart />
          <ApiReference />
          <Configuration />
          <CallbacksAdapters />
          <ErrorTypes />
          <CircuitBreaker />
        </div>
      </div>
    </div>
  )
}
