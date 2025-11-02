'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { useTheme } from '@/contexts/ThemeContext'
import { barChartProjectionsData } from '@/data/charts'

// Custom Bar with 2 colors
const TwoColorBar = (props: any) => {
  const { fill, x, y, width, height } = props

  const actualHeight = height * 0.4
  const projectionHeight = height * 0.6

  return (
    <g>
      <rect
        x={x}
        y={y + actualHeight}
        width={width}
        height={projectionHeight}
        fill={fill}
        opacity={1}
        rx={0}
      />
      <rect x={x} y={y} width={width} height={actualHeight} fill={fill} opacity={0.5} rx={0} />
    </g>
  )
}

export default function ProjectionsChart() {
  const { isDarkMode } = useTheme()
  const chartData = barChartProjectionsData

  return (
    <div
      className={`w-full rounded-2xl p-4 sm:p-6 h-full flex flex-col ${
        isDarkMode ? 'bg-(--color-white-rgba-05)' : 'bg-(--color-bg-light)'
      }`}
    >
      <p
        className={`text-xs sm:text-sm font-semibold mb-3 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}
        style={{
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-0.1px',
        }}
      >
        Projections vs Actuals
      </p>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 16, right: 0, left: 26, bottom: 28 }}
            barGap={0}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDarkMode ? 'var(--color-white-rgba-10)' : 'var(--color-black-rgba-05)'}
              vertical={false}
              strokeWidth={1}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: isDarkMode ? 'var(--color-white-rgba-40)' : 'var(--color-black-rgba-40)',
                fontSize: 12,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                letterSpacing: '-0.1px',
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: isDarkMode ? 'var(--color-white-rgba-40)' : 'var(--color-black-rgba-40)',
                fontSize: 12,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                letterSpacing: '-0.1px',
              }}
              tickFormatter={value => `${value}M`}
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
            />
            <Bar
              dataKey="total"
              fill="var(--color-chart-primary)"
              shape={<TwoColorBar />}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
