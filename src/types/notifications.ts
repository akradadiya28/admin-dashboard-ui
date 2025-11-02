import React from 'react'

// Notification Types
export interface Notification {
  icon: React.ReactNode
  title: string
  time: string
  bgColor: string
}

// Activity Types
export interface Activity {
  avatar: string
  title: string
  time: string
  gradient: string
}

// Contact Types
export interface Contact {
  name: string
  avatar: string
  color: string
}
