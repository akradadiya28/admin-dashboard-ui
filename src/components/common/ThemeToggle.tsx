'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { Sun, Moon } from '@/lib/icons'

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[rgba(28,28,28,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)] transition-colors"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun size={20} className="text-[rgba(28,28,28,0.6)] dark:text-[rgba(255,255,255,0.6)]" />
      ) : (
        <Moon size={20} className="text-[rgba(28,28,28,0.6)] dark:text-[rgba(255,255,255,0.6)]" />
      )}
    </button>
  )
}
