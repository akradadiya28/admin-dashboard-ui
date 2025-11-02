'use client'

import { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Sidebar from '@/components/common/Sidebar'
import Header from '@/components/common/Header'
import NotificationPanel from '@/components/common/NotificationPanel'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showNotifications, setShowNotifications] = useState(true)
  const [showSidebar, setShowSidebar] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const savedSidebarState = localStorage.getItem('sidebarOpen')
    const savedNotificationState = localStorage.getItem('notificationsOpen')

    if (savedSidebarState !== null) {
      setShowSidebar(savedSidebarState === 'true')
    }

    if (savedNotificationState !== null) {
      setShowNotifications(savedNotificationState === 'true')
    }
  }, [])

  // Save sidebar state to localStorage when it changes
  const handleToggleSidebar = () => {
    const newState = !showSidebar
    setShowSidebar(newState)
    localStorage.setItem('sidebarOpen', String(newState))
  }

  // Save notification state to localStorage when it changes
  const handleToggleNotifications = () => {
    const newState = !showNotifications
    setShowNotifications(newState)
    localStorage.setItem('notificationsOpen', String(newState))
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={inter.variable}>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    )
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider>
          <div className="flex h-screen bg-white dark:bg-[var(--color-bg-dark)] relative">
            {/* Mobile Backdrop for Sidebar */}
            {showSidebar && (
              <div
                onClick={handleToggleSidebar}
                className="fixed inset-0 bg-black/50 z-[35] md:hidden"
              />
            )}

            {/* Sidebar - Toggleable */}
            <Sidebar isOpen={showSidebar} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden scrollbar-auto-hide min-w-0 w-full md:w-auto">
              <Header
                onToggleNotifications={handleToggleNotifications}
                onToggleSidebar={handleToggleSidebar}
              />

              <main className="flex-1 overflow-auto scrollbar-auto-hide">{children}</main>
            </div>

            {/* Mobile Backdrop for Notification Panel */}
            {showNotifications && (
              <div
                onClick={handleToggleNotifications}
                className="fixed inset-0 bg-black/50 z-[25] md:hidden"
              />
            )}

            {/* Notification Panel - Toggleable */}
            {showNotifications && <NotificationPanel />}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
