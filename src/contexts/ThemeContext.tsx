'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type ThemeContextType = {
  isDarkMode: boolean
  toggleTheme: () => void
} | null

const ThemeContext = createContext<ThemeContextType>(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    // Return default values instead of throwing
    return {
      isDarkMode: false,
      toggleTheme: () => {},
    }
  }
  return context
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = saved === 'dark' || (!saved && prefersDark)

    setIsDarkMode(shouldBeDark)

    // Ensure class is properly set on html element
    const root = document.documentElement
    if (shouldBeDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newValue = !prev
      localStorage.setItem('theme', newValue ? 'dark' : 'light')

      // Explicitly add or remove class instead of toggle
      const root = document.documentElement
      if (newValue) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }

      return newValue
    })
  }

  // Always provide context, even before mount (with default values to prevent hydration mismatch)
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
  )
}
