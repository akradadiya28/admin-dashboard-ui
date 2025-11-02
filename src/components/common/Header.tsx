'use client'

import { useState, useEffect } from 'react'
import {
  Menu,
  Star,
  Sun,
  Moon,
  Clock,
  Bell,
  PanelRight,
  Search as SearchIcon,
  X,
  Zap,
  FileText,
  Settings,
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { HeaderProps, SearchResult } from '@/types/components'
import { searchItemsData } from '@/data/search'
import { CommandKIcon, OpenIcon, StarIcon, SunIcon, TimeIcon, BellIcon } from '@/lib/icons'
import Breadcrumb from './Breadcrumb'

export default function Header({ onToggleNotifications, onToggleSidebar }: HeaderProps) {
  const { isDarkMode, toggleTheme } = useTheme()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])

  const allSearchItems = searchItemsData

  // Cmd+K Keyboard Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
        setQuery('')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen])

  // Filter results
  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
      return
    }

    const filtered = allSearchItems.filter(
      item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()),
    )
    setResults(filtered)
  }, [query])

  return (
    <>
      <header className="h-[68px] border-b border-black/10 dark:border-white/10 bg-white dark:bg-[var(--color-bg-dark-alt)] flex items-center justify-between px-3 sm:px-4 md:px-7 sticky top-0 z-50 gap-2 sm:gap-3">
        {/* Left Section */}
        <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Sidebar Toggle Button */}
            <button
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
              aria-expanded={true}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
            >
              <OpenIcon className="text-black dark:text-white" />
            </button>

            <button
              aria-label="Favorite"
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0 hidden sm:flex focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
            >
              <StarIcon className="text-black dark:text-white" />
            </button>
          </div>

          {/* Breadcrumb */}
          <div className="min-w-0 hidden sm:block">
            <Breadcrumb />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-5 shrink-0">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open search (Cmd+K or Ctrl+K)"
            className="hidden sm:flex items-center justify-between gap-2 px-2 py-1 bg-[var(--color-black-rgba-05)] hover:bg-[var(--color-black-rgba-10)] dark:bg-[var(--color-white-rgba-10)] dark:hover:bg-[var(--color-white-rgba-15)] rounded-lg transition-colors min-w-40 h-7 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
          >
            <div className="flex items-center gap-1">
              <SearchIcon
                size={16}
                className="text-[var(--color-black-rgba-20)] dark:text-[var(--color-white-rgba-60)]"
              />
              <span className="font-inter text-[14px] leading-5 text-[var(--color-black-rgba-20)] dark:text-[var(--color-white-rgba-60)]">
                Search
              </span>
            </div>
            <CommandKIcon className="text-[var(--color-black-rgba-80)] dark:text-[var(--color-white-rgba-80)]" />
          </button>

          {/* Mobile Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open search"
            className="sm:hidden w-7 h-7 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
          >
            <SearchIcon size={18} className="text-black dark:text-white" />
          </button>

          {/* Icon Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
            >
              {isDarkMode ? (
                <Moon size={20} className="text-white" />
              ) : (
                <SunIcon className="text-black" />
              )}
            </button>

            {/* Clock - Hidden on mobile */}
            <button
              aria-label="Clock"
              className="hidden md:flex w-7 h-7 items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
            >
              <TimeIcon className="text-black dark:text-white" />
            </button>

            {/* Bell - Hidden on mobile */}
            <button
              aria-label="Notifications"
              className="hidden md:flex w-7 h-7 items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
            >
              <BellIcon className="text-black dark:text-white" />
            </button>

            {/* Notification Panel Toggle */}
            <button
              onClick={onToggleNotifications}
              aria-label="Toggle notifications panel"
              aria-expanded={true}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
            >
              <OpenIcon className="text-black dark:text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal Backdrop */}
      {isSearchOpen && (
        <div
          onClick={() => {
            setIsSearchOpen(false)
            setQuery('')
          }}
          className="fixed inset-0 bg-black/50 z-100"
        />
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-dialog-title"
          className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[500px] md:w-[600px] max-w-[600px] z-101 mx-4"
        >
          <div className="bg-white dark:bg-(--color-bg-dark-alt) rounded-2xl shadow-2xl overflow-hidden">
            {/* Search Input */}
            <div className="border-b border-black/10 dark:border-white/10 p-4">
              <div className="flex items-center gap-3 px-2">
                <SearchIcon size={20} className="text-black/40 dark:text-white/40" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search pages, dashboards, settings..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  aria-label="Search input"
                  aria-describedby="search-help"
                  className="flex-1 bg-transparent text-base text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:ring-0"
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false)
                    setQuery('')
                  }}
                  aria-label="Close search"
                  className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 rounded"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-[50vh] sm:max-h-[400px] overflow-y-auto scrollbar-auto-hide">
              {results.length === 0 && query.trim() !== '' ? (
                <div className="p-8 text-center">
                  <p className="text-black/60 dark:text-white/60">No results found for "{query}"</p>
                </div>
              ) : results.length > 0 ? (
                <div className="py-2">
                  {results.map(result => (
                    <button
                      key={result.id}
                      onClick={() => {
                        setIsSearchOpen(false)
                        setQuery('')
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-left"
                    >
                      <div className="text-black/40 dark:text-white/40">{result.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-black dark:text-white">
                          {result.title}
                        </p>
                        <p className="text-xs text-black/40 dark:text-white/40">
                          {result.category}
                        </p>
                      </div>
                      <span className="text-xs bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60 px-2 py-1 rounded">
                        Enter
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-black dark:text-white mb-4">
                      Quick Links
                    </p>
                    {allSearchItems.slice(0, 6).map(item => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setIsSearchOpen(false)
                          setQuery('')
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors text-left"
                      >
                        <div className="text-black/40 dark:text-white/40">{item.icon}</div>
                        <div className="flex-1">
                          <p className="text-sm text-black dark:text-white">{item.title}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-black/10 dark:border-white/10 px-4 py-3 bg-black/5 dark:bg-white/5">
              <div className="flex items-center justify-between text-xs text-black/40 dark:text-white/40">
                <div className="flex gap-2 items-center">
                  <kbd className="px-2 py-1 bg-white dark:bg-[var(--color-bg-dark-alt)] border border-black/20 dark:border-white/20 rounded text-black dark:text-white text-xs">
                    Esc
                  </kbd>
                  <span>Close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
