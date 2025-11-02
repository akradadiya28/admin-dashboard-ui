'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { useTheme } from '@/contexts/ThemeContext'
import { lineChartData } from '@/data/charts'
import { CircleIcon } from '@/lib/icons'

export default function RevenueChart() {
  const { isDarkMode } = useTheme()

  const data = lineChartData

  const gridColor = isDarkMode ? 'var(--color-white-rgba-10)' : 'var(--color-black-rgba-10)'
  const tickColor = isDarkMode ? 'var(--color-white-rgba-40)' : 'var(--color-black-rgba-40)'
  const tooltipBg = isDarkMode ? 'var(--color-bg-white-opacity)' : 'var(--color-bg-white)'
  const tooltipText = isDarkMode ? 'var(--color-text-white)' : 'var(--color-text-primary)'
  const currentLineColor = isDarkMode ? 'var(--color-text-white)' : 'var(--color-text-primary)'

  return (
    <div className="bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-white-opacity)] rounded-2xl p-4 sm:p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4 flex-wrap text-xs">
        <p className="text-xs sm:text-sm font-semibold text-black dark:text-white">Revenue</p>
        <span className="text-[var(--color-text-primary-opacity-33)] dark:text-[var(--color-text-white-opacity-33)] hidden sm:inline">
          |
        </span>
        <div className="flex items-center gap-1 sm:gap-2">
          <CircleIcon className="text-[var(--color-text-primary)] dark:text-[var(--color-chart-dark-purple)]" />
          <span className="text-black dark:text-white text-xs">Current Week: $58,211</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <CircleIcon className="text-[var(--color-chart-primary)] dark:text-[var(--color-chart-primary)]" />
          <span className="text-black dark:text-white text-xs">Previous Week: $68,768</span>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: tickColor, fontSize: 12 }}
              tickFormatter={value => `${value / 1000}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: isDarkMode ? 'none' : `1px solid var(--color-black-rgba-10)`,
                borderRadius: '8px',
                color: tooltipText,
              }}
            />
            <Line
              type="monotone"
              dataKey="current"
              stroke={currentLineColor}
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke="var(--color-chart-primary)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
