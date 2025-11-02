'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { donutChartData, DONUT_CHART_COLORS, donutChartSales } from '@/data/charts'
import { CircleIcon } from '@/lib/icons'

export default function DonutChart() {
  const data = donutChartData
  const COLORS = DONUT_CHART_COLORS
  const sales = donutChartSales

  return (
    <div className="bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-white-opacity)] rounded-2xl p-4 sm:p-6 h-full flex flex-col">
      <p className="text-xs sm:text-sm font-semibold text-black dark:text-white mb-3 sm:mb-4">
        Total Sales
      </p>

      {/* Chart - Takes flex space */}
      <div className="relative flex-1 min-h-[150px] sm:min-h-[200px] mb-3 sm:mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-black dark:text-white">38.6%</span>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
        {sales.map((sale, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CircleIcon className={`${sale.color}`} />
              <span className="text-black dark:text-white text-xs">{sale.label}</span>
            </div>
            <span className="text-black dark:text-white text-xs">{sale.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
