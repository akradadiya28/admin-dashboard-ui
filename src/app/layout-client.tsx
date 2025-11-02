'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/common/Sidebar'
import Header from '@/components/common/Header'
import NotificationPanel from '@/components/common/NotificationPanel'

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [showNotifications, setShowNotifications] = useState(true)
  const [showSidebar, setShowSidebar] = useState(true)
  const [mounted, setMounted] = useState(false)

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

  const handleToggleSidebar = () => {
    const newState = !showSidebar
    setShowSidebar(newState)
    localStorage.setItem('sidebarOpen', String(newState))
  }

  const handleToggleNotifications = () => {
    const newState = !showNotifications
    setShowNotifications(newState)
    localStorage.setItem('notificationsOpen', String(newState))
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-white dark:bg-(--color-bg-dark) relative">
      {showSidebar && (
        <div
          onClick={handleToggleSidebar}
          className="fixed inset-0 bg-black/50 z-35 md:hidden"
        />
      )}

      <Sidebar isOpen={showSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden scrollbar-auto-hide min-w-0 w-full md:w-auto">
        <Header
          onToggleNotifications={handleToggleNotifications}
          onToggleSidebar={handleToggleSidebar}
        />

        <main className="flex-1 overflow-auto scrollbar-auto-hide">{children}</main>
      </div>

      {showNotifications && (
        <div
          onClick={handleToggleNotifications}
          className="fixed inset-0 bg-black/50 z-25 md:hidden"
        />
      )}

      {showNotifications && <NotificationPanel />}
    </div>
  )
}
