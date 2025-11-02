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

  const gridColor = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(28,28,28,0.1)'
  const tickColor = isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(28,28,28,0.4)'
  const tooltipBg = isDarkMode ? '#FFFFFF0D' : '#ffffff'
  const tooltipText = isDarkMode ? '#fff' : '#1c1c1c'
  const currentLineColor = isDarkMode ? '#ffffff' : '#1C1C1C'

  return (
    <div className="bg-[#F7F9FB] dark:bg-[#FFFFFF0D] rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-4 mb-4 flex-wrap text-xs">
        <p className="text-sm font-semibold text-black dark:text-white">Revenue</p>
        <span className="text-[#1C1C1C33] dark:text-[#FFFFFF33]">|</span>
        <div className="flex items-center gap-2">
          <CircleIcon className="text-[#1C1C1C] dark:text-[#C6C7F8]" />
          <span className="text-black dark:text-white">Current Week: $58,211</span>
        </div>
        <div className="flex items-center gap-2">
          <CircleIcon className="text-[#A8C5DA] dark:text-[#A8C5DA]" />
          <span className="text-black dark:text-white">Previous Week: $68,768</span>
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
                border: isDarkMode ? 'none' : '1px solid rgba(28,28,28,0.1)',
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
              stroke="#A8C5DA"
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
