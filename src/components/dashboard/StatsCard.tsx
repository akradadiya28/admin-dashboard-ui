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
    sky: 'bg-[#E3F5FF]',
    gray: 'bg-[#F7F9FB] dark:bg-[#FFFFFF0D]',
    indigo: 'bg-[#E5ECF6]',
  }

  return (
    <div className={`${variants[variant]} rounded-2xl p-5 transition-all hover:shadow-lg`}>
      <p className={`text-sm font-semibold ${textClassName} mb-3`}>{title}</p>
      <div className="flex justify-between items-center">
        <h3 className={`text-2xl font-bold ${textClassName}`}>{value}</h3>
        <div className="flex items-center gap-1">
          <span className={`text-xs ${textClassName}`}>{change}</span>
          {isPositive ? (
            <TrendingUp size={14} className={`${textClassName}`} />
          ) : (
            <TrendingDown size={14} className={`${textClassName}`} />
          )}
        </div>
      </div>
    </div>
  )
}
