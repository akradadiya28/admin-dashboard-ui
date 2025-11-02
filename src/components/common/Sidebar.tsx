'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sidebarData } from '@/data/sidebar'
import {
  CircleIcon,
  DefaultIcon,
  ShoppingBagIcon,
  ProjectIcon,
  BookOpenIcon,
  UserProfileIcon,
  AccountsIcon,
  BlogIcon,
  SocialIcon,
  CorporateIcon,
  ChevronRightIcon,
} from '@/lib/icons'

interface SidebarProps {
  isOpen?: boolean
}

const iconMap: Record<string, React.ComponentType<any>> = {
  LayoutDashboard: DefaultIcon,
  ShoppingBag: ShoppingBagIcon,
  FolderOpen: ProjectIcon,
  BookOpen: BookOpenIcon,
  User: UserProfileIcon,
  Building2: AccountsIcon,
  Corporate: CorporateIcon,
  Newspaper: BlogIcon,
  MessageSquare: SocialIcon,
  FileText: ShoppingBagIcon,
}

export default function Sidebar({ isOpen = true }: SidebarProps) {
  const [expandedItem, setExpandedItem] = useState(sidebarData.defaultExpandedItem)
  const pathname = usePathname()

  const navItems = sidebarData.navItems
  const pagesItems = sidebarData.pagesItems

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0, x: -20 }}
          animate={{ width: 212, opacity: 1, x: 0 }}
          exit={{ width: 0, opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="border-r border-black/10 dark:border-white/10 bg-white dark:bg-[var(--color-bg-dark-alt)] flex flex-col p-3 sm:p-4 gap-3 sm:gap-4 overflow-y-auto scrollbar-auto-hide h-screen fixed md:sticky top-0 left-0 z-40 md:relative md:z-auto"
        >
          {/* Logo */}
          <div className="flex items-center gap-1 sm:gap-2 p-1">
            <div className="rounded-full overflow-hidden flex items-center justify-center shrink-0">
              <Image
                src={sidebarData.logo.imagePath}
                alt="Logo"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs sm:text-sm text-black dark:text-white whitespace-nowrap truncate">
              {sidebarData.logo.text}
            </span>
          </div>

          {/* Favorites/Recently */}
          <div className="flex flex-col gap-1 pb-3">
            <div className="flex gap-2 py-1">
              <button className="text-sm text-black/40 dark:text-white/40 px-2 py-1 rounded-lg transition-colors whitespace-nowrap hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer">
                Favorites
              </button>
              <button className="text-sm text-black/20 dark:text-white/20 px-2 py-1 whitespace-nowrap rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer">
                Recently
              </button>
            </div>

            {sidebarData.favoritesRecently.map(item => (
              <button
                key={item}
                className="flex items-center gap-1 px-2 py-1 text-sm text-black dark:text-white cursor-pointer"
              >
                <CircleIcon
                  className="text-[var(--color-text-primary-opacity-33)] dark:text-white/20"
                  size={12}
                />
                <span className="whitespace-nowrap ml-1">{item}</span>
              </button>
            ))}
          </div>

          {/* Dashboards */}
          <div className="flex flex-col gap-1 pb-3">
            <div className="text-sm text-black/40 dark:text-white/40 px-2 py-1 font-medium whitespace-nowrap">
              Dashboards
            </div>

            {navItems.map(item => {
              const Icon = iconMap[item.iconName]
              const isActive = item.href ? pathname === item.href : false

              const content = (
                <>
                  <div className="w-6 flex justify-center">
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded-r bg-black dark:bg-white" />
                    )}
                  </div>
                  {Icon && <Icon className="text-black dark:text-white" size={20} />}
                  <span className="text-black dark:text-white flex-1 text-left whitespace-nowrap">
                    {item.label}
                  </span>
                </>
              )

              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-1 pr-2 py-1.5 text-sm rounded-lg transition-all relative cursor-pointer ${
                      isActive
                        ? 'bg-black/5 dark:bg-white/10'
                        : 'hover:bg-black/5 dark:hover:bg-white/10'
                    }`}
                  >
                    {content}
                  </Link>
                )
              }

              return (
                <button
                  key={item.label}
                  className="flex items-center gap-1 pr-2 py-1.5 text-sm rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all relative cursor-pointer"
                >
                  {content}
                </button>
              )
            })}
          </div>

          {/* Pages */}
          <div className="flex flex-col gap-1 flex-1">
            <div className="text-xs text-black/40 dark:text-white/40 px-3 py-1 font-medium whitespace-nowrap">
              Pages
            </div>

            {pagesItems.map(item => {
              const Icon = iconMap[item.iconName]
              const isExpanded = expandedItem === item.label
              const isActive = item.href ? pathname === item.href : false

              const headerContent = (
                <>
                  <div className="w-6 flex justify-center">
                    {item.children ? (
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRightIcon className="text-black/20 dark:text-white/20" size={16} />
                      </motion.div>
                    ) : (
                      <div className="w-1" />
                    )}
                    {isActive && !item.children && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded-r bg-black dark:bg-white" />
                    )}
                  </div>
                  {Icon && <Icon className="text-black dark:text-white" size={20} />}
                  <span className="text-black dark:text-white flex-1 text-left whitespace-nowrap">
                    {item.label}
                  </span>
                </>
              )

              return (
                <div key={item.label}>
                  {item.href && !item.children ? (
                    <Link
                      href={item.href}
                      className={`w-full flex items-center gap-1 pr-2 py-1.5 text-sm rounded-lg transition-colors cursor-pointer relative ${
                        isActive
                          ? 'bg-black/5 dark:bg-white/10'
                          : 'hover:bg-black/5 dark:hover:bg-white/10'
                      }`}
                    >
                      {headerContent}
                    </Link>
                  ) : (
                    <button
                      onClick={() => item.children && setExpandedItem(isExpanded ? '' : item.label)}
                      className="w-full flex items-center gap-1 pr-2 py-1.5 text-sm rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer relative"
                    >
                      {headerContent}
                    </button>
                  )}

                  <AnimatePresence>
                    {item.children && isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-0.5 ml-6 mt-1">
                          {item.children.map(child => (
                            <button
                              key={child}
                              className="text-sm text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-lg py-1.5 pl-6 pr-2 text-left transition-all whitespace-nowrap cursor-pointer"
                            >
                              {child}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
