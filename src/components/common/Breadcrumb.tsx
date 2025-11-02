'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumb() {
  const pathname = usePathname()

  // Define route mappings
  const routeMap: Record<string, BreadcrumbItem[]> = {
    '/dashboard': [{ label: 'Dashboard', href: '/dashboard' }, { label: 'Default' }],
    '/order-list': [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Order List', href: '/order-list' },
    ],
  }

  // Get breadcrumb items for current route, default to Dashboard if not found
  const breadcrumbItems: BreadcrumbItem[] = routeMap[pathname] || [
    { label: 'Dashboard', href: '/dashboard' },
  ]

  return (
    <div className="flex items-center gap-2">
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.href ? (
            <Link
              href={item.href}
              className="px-2 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <span
                className={`text-sm ${
                  index === breadcrumbItems.length - 1
                    ? 'text-black dark:text-white'
                    : 'text-black/40 dark:text-white/40'
                }`}
              >
                {item.label}
              </span>
            </Link>
          ) : (
            <button className="px-2 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <span className="text-sm text-black dark:text-white">{item.label}</span>
            </button>
          )}
          {index < breadcrumbItems.length - 1 && (
            <span className="text-sm text-black/20 dark:text-white/20">/</span>
          )}
        </div>
      ))}
    </div>
  )
}
