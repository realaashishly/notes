'use client'

import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null)

  useEffect(() => {
    // Check initial preference
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (saved) {
      setTheme(saved)
      document.documentElement.classList.toggle('dark', saved === 'dark')
    } else {
      setTheme(prefersDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', prefersDark)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  // Prevent hydration mismatch
  if (!theme) return null

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-3 py-2 rounded-lg bg-black/5 dark:bg-white/10 backdrop-blur border border-black/10 dark:border-white/10 transition-all hover:scale-105"
      aria-label="Toggle theme"
    >
      <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${theme === 'dark' ? 'bg-white/20' : 'bg-black/10'}`}>
        <div className={`w-3 h-3 rounded-full shadow-sm transition-transform duration-300 ${theme === 'dark' ? 'translate-x-4 bg-white' : 'translate-x-0 bg-black'}`} />
      </div>
      <span className="text-xs font-medium uppercase tracking-wider opacity-60">
        {theme}
      </span>
    </button>
  )
}
