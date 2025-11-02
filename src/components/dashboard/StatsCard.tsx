'use client'

import { TrendingUp, TrendingDown } from '@/lib/icons'
import { StatsCardProps } from '@/types/components'

export default function StatsCard({
  title,
  value,
  change,
  isPositive,
  variant = 'gray',
  textClassName,
}: StatsCardProps) {
  const variants = {
    sky: 'bg-[var(--color-bg-sky)]',
    gray: 'bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-white-opacity)]',
    indigo: 'bg-[var(--color-bg-indigo)]',
  }

  return (
    <div className={`${variants[variant]} rounded-2xl p-4 sm:p-5 transition-all hover:shadow-lg`}>
      <p className={`text-xs sm:text-sm font-semibold ${textClassName} mb-2 sm:mb-3`}>{title}</p>
      <div className="flex justify-between items-center gap-2">
        <h3 className={`text-xl sm:text-2xl font-bold ${textClassName}`}>{value}</h3>
        <div className="flex items-center gap-1 shrink-0">
          <span className={`text-xs ${textClassName}`}>{change}</span>
          {isPositive ? (
            <TrendingUp size={14} className={`${textClassName} shrink-0`} />
          ) : (
            <TrendingDown size={14} className={`${textClassName} shrink-0`} />
          )}
        </div>
      </div>
    </div>
  )
}
