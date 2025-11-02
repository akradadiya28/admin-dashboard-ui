import React from 'react'
import { SearchResult } from '@/types/components'
import { Zap, FileText, Settings } from '@/lib/icons'

export const searchItemsData: SearchResult[] = [
  { id: '1', title: 'Dashboard', category: 'Pages', icon: React.createElement(Zap, { size: 18 }) },
  {
    id: '2',
    title: 'eCommerce',
    category: 'Dashboard',
    icon: React.createElement(Zap, { size: 18 }),
  },
  {
    id: '3',
    title: 'Projects',
    category: 'Pages',
    icon: React.createElement(FileText, { size: 18 }),
  },
  { id: '4', title: 'Analytics', category: 'Pages', icon: React.createElement(Zap, { size: 18 }) },
  {
    id: '5',
    title: 'Settings',
    category: 'Admin',
    icon: React.createElement(Settings, { size: 18 }),
  },
  {
    id: '6',
    title: 'Profile',
    category: 'User',
    icon: React.createElement(FileText, { size: 18 }),
  },
]
