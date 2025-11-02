import React from 'react'

// Header Component Types
export interface HeaderProps {
  onToggleNotifications?: () => void
  onToggleSidebar?: () => void
}

export interface SearchResult {
  id: string
  title: string
  category: string
  icon: React.ReactNode
}

// Sidebar Component Types
export interface SidebarProps {
  isOpen?: boolean
}

// StatsCard Component Types
export interface StatsCardProps {
  title: string
  value: string | number
  change: string
  isPositive: boolean
  variant?: 'sky' | 'gray' | 'indigo'
  textClassName?: string
}

// Icon Component Types
export interface IconProps {
  className?: string
  size?: number
}
