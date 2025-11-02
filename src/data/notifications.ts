import React from 'react'
import { Notification, Activity, Contact } from '@/types/notifications'
import { BugIcon, UserOneIcon, RadioIcon } from '@/lib/icons'

export const notificationsData: Notification[] = [
  {
    icon: React.createElement(BugIcon, {
      size: 16,
      className: 'text-black',
    }),
    title: 'You have a bug that needs...',
    time: 'Just now',
    bgColor: 'bg-[var(--color-bg-sky)] dark:bg-[var(--color-bg-sky)]',
  },
  {
    icon: React.createElement(UserOneIcon, {
      size: 16,
      className: 'text-black',
    }),
    title: 'New user registered',
    time: '59 minutes ago',
    bgColor: 'bg-[var(--color-bg-indigo)] dark:bg-[var(--color-bg-indigo)]',
  },
  {
    icon: React.createElement(BugIcon, {
      size: 16,
      className: 'text-black',
    }),
    title: 'You have a bug that needs...',
    time: '12 hours ago',
    bgColor: 'bg-[var(--color-bg-sky)] dark:bg-[var(--color-bg-sky)]',
  },
  {
    icon: React.createElement(RadioIcon, {
      size: 16,
      className: 'text-black',
    }),
    title: 'Andi Lane subscribed to you',
    time: 'Today, 11:59 AM',
    bgColor: 'bg-[var(--color-bg-indigo)] dark:bg-[var(--color-bg-indigo)]',
  },
]

export const activitiesData: Activity[] = [
  {
    avatar: '/images/usernot1.png',
    title: 'You have a bug that needs...',
    time: 'Just now',
    gradient: 'from-blue-400 to-purple-400',
  },
  {
    avatar: '/images/usernot2.png',
    title: 'Released a new version',
    time: '59 minutes ago',
    gradient: 'from-green-400 to-blue-400',
  },
  {
    avatar: '/images/usernot3.png',
    title: 'Submitted a bug',
    time: '12 hours ago',
    gradient: 'from-cyan-400 to-blue-400',
  },
  {
    avatar: '/images/usernot4.png',
    title: 'Modified A data in Page X',
    time: 'Today, 11:59 AM',
    gradient: 'from-pink-400 to-purple-400',
  },
  {
    avatar: '/images/usernot5.png',
    title: 'Deleted a page in Project X',
    time: 'Feb 2, 2023',
    gradient: 'from-orange-400 to-red-400',
  },
]

export const contactsData: Contact[] = [
  {
    name: 'Natali Craig',
    avatar: '/images/con1.png',
    color: 'bg-amber-500',
  },
  { name: 'Drew Cano', avatar: '/images/con2.png', color: 'bg-red-600' },
  {
    name: 'Orlando Diggs',
    avatar: '/images/con3.png',
    color: 'bg-amber-700',
  },
  {
    name: 'Andi Lane',
    avatar: '/images/con4.png',
    color: 'bg-blue-300 dark:bg-blue-600',
  },
  {
    name: 'Kate Morrison',
    avatar: '/images/con5.png',
    color: 'bg-pink-200 dark:bg-pink-600',
  },
  {
    name: 'Koray Okumus',
    avatar: '/images/con6.png',
    color: 'bg-cyan-200 dark:bg-cyan-600',
  },
]
