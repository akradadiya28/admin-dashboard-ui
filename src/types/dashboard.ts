// Product Types
export interface Product {
  name: string
  price: string
  quantity: number
  amount: string
}

// Chart Data Types
export interface ChartDataPoint {
  month: string
  value?: number
  current?: number
  previous?: number
}

export interface DonutChartData {
  name: string
  value: number
  [key: string]: string | number
}

export interface DonutChartSales {
  label: string
  value: string
  color: string
}

// Location Types
export interface Location {
  city: string
  value: string
}

export interface MapMarker {
  name: string
  coordinates: [number, number]
}

export interface BarChartProjectionData {
  month: string
  total: number
}
