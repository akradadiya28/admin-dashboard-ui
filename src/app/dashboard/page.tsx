'use client'

import StatsCard from '@/components/dashboard/StatsCard'
import ProjectionsChart from '@/components/dashboard/charts/BarChart'
import RevenueChart from '@/components/dashboard/charts/LineChart'
import ProductTable from '@/components/dashboard/ProductTable'
import DonutChart from '@/components/dashboard/charts/DonutChart'
import LocationMap from '@/components/dashboard/LocationMap'

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-5 md:p-7">
      <h2 className="text-sm font-semibold text-black dark:text-white mb-4 sm:mb-6">eCommerce</h2>

      {/* 4 Stats Cards (2x2) + Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Left Side — Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
          <StatsCard
            title="Customers"
            value="3,781"
            change="+11.01%"
            isPositive={true}
            variant="sky"
            textClassName="text-black dark:text-black"
          />
          <StatsCard
            title="Orders"
            value="1,219"
            change="-0.03%"
            isPositive={false}
            variant="gray"
            textClassName="text-black dark:text-white"
          />
          <StatsCard
            title="Revenue"
            value="$695"
            change="+15.03%"
            isPositive={true}
            variant="gray"
            textClassName="text-black dark:text-white"
          />
          <StatsCard
            title="Growth"
            value="30.1%"
            change="+6.08%"
            isPositive={true}
            variant="indigo"
            textClassName="text-black dark:text-black"
          />
        </div>

        {/* Right Side — Chart */}
        <div className="w-full h-[300px] sm:h-[350px] md:h-full flex flex-col justify-center">
          <ProjectionsChart />
        </div>
      </div>

      {/* Revenue Chart + Location Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="lg:col-span-2 h-[300px] sm:h-[350px] md:h-[400px]">
          <RevenueChart />
        </div>
        <div className="h-[300px] sm:h-[350px] md:h-[400px]">
          <LocationMap />
        </div>
      </div>

      {/* Product Table + Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 h-[400px] sm:h-[450px]">
          <ProductTable />
        </div>
        <div className="h-[300px] sm:h-[400px] md:h-[450px]">
          <DonutChart />
        </div>
      </div>
    </div>
  )
}
