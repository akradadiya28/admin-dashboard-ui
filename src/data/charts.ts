import {
  ChartDataPoint,
  DonutChartData,
  DonutChartSales,
  BarChartProjectionData,
} from '@/types/dashboard'

// Bar Chart Data
export const barChartData: ChartDataPoint[] = [
  { month: 'Jan', value: 15 },
  { month: 'Feb', value: 18 },
  { month: 'Mar', value: 16 },
  { month: 'Apr', value: 20 },
  { month: 'May', value: 14 },
  { month: 'Jun', value: 19 },
]

// Line Chart Data
export const lineChartData: ChartDataPoint[] = [
  { month: 'Jan', current: 15000, previous: 22000 },
  { month: 'Feb', current: 25000, previous: 28000 },
  { month: 'Mar', current: 18000, previous: 25000 },
  { month: 'Apr', current: 32000, previous: 18000 },
  { month: 'May', current: 22000, previous: 30000 },
  { month: 'Jun', current: 28000, previous: 26000 },
]

// Donut Chart Data
export const donutChartData: DonutChartData[] = [
  { name: 'Direct', value: 300.56 },
  { name: 'Affiliate', value: 135.18 },
  { name: 'Sponsored', value: 154.02 },
  { name: 'E-mail', value: 48.96 },
]

// Donut Chart Colors
export const DONUT_CHART_COLORS = ['#1C1C1C', '#60A5FA', '#34D399', '#A78BFA']

// Donut Chart Sales Legend
export const donutChartSales: DonutChartSales[] = [
  { label: 'Direct', value: '$300.56', color: 'text-[#1C1C1C] dark:text-[#C6C7F8]' },
  { label: 'Affiliate', value: '$135.18', color: 'text-[#BAEDBD]' },
  { label: 'Sponsored', value: '$154.02', color: 'text-[#95A4FC]' },
  { label: 'E-mail', value: '$48.96', color: 'text-[#B1E3FF]' },
]

// Bar Chart Projections Data
export const barChartProjectionsData: BarChartProjectionData[] = [
  { month: 'Jan', total: 20 },
  { month: 'Feb', total: 20 },
  { month: 'Mar', total: 20 },
  { month: 'Apr', total: 25 },
  { month: 'May', total: 18 },
  { month: 'Jun', total: 20 },
]
