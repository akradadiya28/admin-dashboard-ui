'use client'

import { useState, useMemo, useEffect } from 'react'
import {
  Plus,
  Filter,
  ArrowUpDown,
  Search,
  Calendar,
  MoreVertical,
  FileText,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  X,
} from 'lucide-react'
import Image from 'next/image'
import { Order, OrderStatus } from '@/types/orders'
import { ordersData } from '@/data/orders'

const ITEMS_PER_PAGE = 10

type SortField = 'id' | 'userName' | 'project' | 'address' | 'date' | 'status'
type SortDirection = 'asc' | 'desc' | null

const statusColors: Record<OrderStatus, string> = {
  'In Progress': 'bg-purple-500',
  Complete: 'bg-green-500',
  Pending: 'bg-blue-400',
  Approved: 'bg-yellow-500',
  Rejected: 'bg-gray-500',
}

const statusTextColors: Record<OrderStatus, string> = {
  'In Progress': 'text-purple-500',
  Complete: 'text-green-500',
  Pending: 'text-blue-400',
  Approved: 'text-yellow-500',
  Rejected: 'text-gray-500',
}

const allStatuses: OrderStatus[] = ['In Progress', 'Complete', 'Pending', 'Approved', 'Rejected']

const parseDate = (dateStr: string): number => {
  const now = Date.now()
  const lowerDate = dateStr.toLowerCase()

  if (lowerDate.includes('just now')) return now
  if (lowerDate.includes('minute ago')) {
    const minutes = parseInt(lowerDate.match(/\d+/)?.[0] || '1')
    return now - minutes * 60 * 1000
  }
  if (lowerDate.includes('hour ago')) {
    const hours = parseInt(lowerDate.match(/\d+/)?.[0] || '1')
    return now - hours * 60 * 60 * 1000
  }
  if (lowerDate.includes('yesterday')) return now - 24 * 60 * 60 * 1000
  if (lowerDate.includes('today')) return now

  const dateMatch = dateStr.match(/(\w+)\s+(\d+),\s+(\d+)/)
  if (dateMatch) {
    const [, monthStr, day, year] = dateMatch
    const months: Record<string, number> = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
    }
    const month = months[monthStr.toLowerCase().substring(0, 3)]
    if (month !== undefined) {
      return new Date(parseInt(year), month, parseInt(day)).getTime()
    }
  }

  return 0
}

export default function OrderListTable() {
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedStatuses, setSelectedStatuses] = useState<Set<OrderStatus>>(new Set(allStatuses))
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const selectedStatusesKey = useMemo(() => {
    const sorted = Array.from(selectedStatuses).sort()
    return `${selectedStatuses.size}-${sorted.join(',')}`
  }, [selectedStatuses])

  const filteredAndSortedOrders = useMemo(() => {
    let result = [...ordersData]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        order =>
          order.id.toLowerCase().includes(query) ||
          order.userName.toLowerCase().includes(query) ||
          order.project.toLowerCase().includes(query) ||
          order.address.toLowerCase().includes(query) ||
          order.status.toLowerCase().includes(query),
      )
    }

    if (selectedStatuses.size > 0 && selectedStatuses.size < allStatuses.length) {
      result = result.filter(order => selectedStatuses.has(order.status))
    }

    if (sortField && sortDirection) {
      result.sort((a, b) => {
        let comparison = 0

        switch (sortField) {
          case 'id':
            comparison = a.id.localeCompare(b.id)
            break
          case 'userName':
            comparison = a.userName.localeCompare(b.userName)
            break
          case 'project':
            comparison = a.project.localeCompare(b.project)
            break
          case 'address':
            comparison = a.address.localeCompare(b.address)
            break
          case 'date':
            comparison = parseDate(a.date) - parseDate(b.date)
            break
          case 'status':
            comparison = a.status.localeCompare(b.status)
            break
        }

        return sortDirection === 'asc' ? comparison : -comparison
      })
    }

    return result
  }, [searchQuery, selectedStatusesKey, sortField, sortDirection])

  const totalPages = Math.ceil(filteredAndSortedOrders.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentOrders = filteredAndSortedOrders.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedStatusesKey, sortField, sortDirection])

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrders(new Set(currentOrders.map(order => order.id)))
    } else {
      setSelectedOrders(new Set())
    }
  }

  const handleSelectOrder = (orderId: string) => {
    const newSelected = new Set(selectedOrders)
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId)
    } else {
      newSelected.add(orderId)
    }
    setSelectedOrders(newSelected)
  }

  const handleStatusFilter = (status: OrderStatus) => {
    const newSelected = new Set(selectedStatuses)
    if (newSelected.has(status)) {
      newSelected.delete(status)
    } else {
      newSelected.add(status)
    }
    setSelectedStatuses(newSelected)
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortField(null)
        setSortDirection(null)
      } else {
        setSortDirection('asc')
      }
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const clearFilters = () => {
    setSelectedStatuses(new Set(allStatuses))
    setSearchQuery('')
    setSortField(null)
    setSortDirection(null)
  }

  const hasActiveFilters = useMemo(() => {
    return (
      searchQuery.trim() !== '' ||
      (selectedStatuses.size > 0 && selectedStatuses.size < allStatuses.length) ||
      sortField !== null
    )
  }, [searchQuery, selectedStatusesKey, sortField])

  const isAllSelected =
    currentOrders.length > 0 && currentOrders.every(order => selectedOrders.has(order.id))

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown size={14} className="text-black/20 dark:text-white/20" />
    }
    if (sortDirection === 'asc') {
      return <ChevronUp size={14} className="text-black dark:text-white" />
    }
    if (sortDirection === 'desc') {
      return <ChevronDown size={14} className="text-black dark:text-white" />
    }
    return <ArrowUpDown size={14} className="text-black/20 dark:text-white/20" />
  }

  return (
    <div className="p-4 sm:p-5 md:p-7">
      <h2 className="text-sm font-semibold text-black dark:text-white mb-4 sm:mb-6">Order List</h2>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-2 mb-4 sm:mb-6 bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-white-opacity)] rounded-lg p-2 sm:p-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            aria-label="Add new order"
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
          >
            <Plus size={20} className="text-black dark:text-white" />
          </button>
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              aria-label="Filter orders by status"
              aria-expanded={isFilterOpen}
              aria-haspopup="true"
              className={`w-7 h-7 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 ${
                hasActiveFilters && selectedStatuses.size < allStatuses.length
                  ? 'bg-black/5 dark:bg-white/10'
                  : ''
              }`}
            >
              <Filter size={20} className="text-black dark:text-white" />
            </button>
            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)} />
                <div className="absolute top-10 left-0 z-20 bg-white dark:bg-[var(--color-bg-dark-alt)] rounded-lg border border-black/10 dark:border-white/10 shadow-lg min-w-[200px] p-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-black dark:text-white">
                      Filter by Status
                    </span>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="text-xs text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {allStatuses.map(status => (
                      <label key={status} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedStatuses.has(status)}
                          onChange={() => handleStatusFilter(status)}
                          className="w-4 h-4 rounded border border-black/20 dark:border-white/20 cursor-pointer accent-blue-500"
                        />
                        <span className="text-sm text-black dark:text-white">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-2 py-1 text-xs text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <X size={14} />
              Clear filters
            </button>
          )}
        </div>

        <div className="relative w-full sm:w-auto">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40"
          />
          <input
            type="text"
            placeholder="Search orders"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            aria-label="Search orders"
            className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[var(--color-bg-dark-alt)] text-sm text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-transparent rounded-lg overflow-hidden">
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table
            className="w-full text-xs sm:text-sm min-w-[800px]"
            role="table"
            aria-label="Order list table"
          >
            <thead>
              <tr className="border-b border-black/10 dark:border-white/10">
                <th className="px-4 py-3 text-left w-12">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    aria-label="Select all orders"
                    className="w-4 h-4 rounded border border-black/20 dark:border-white/20 cursor-pointer"
                  />
                </th>
                <th
                  className="px-4 py-3 text-left text-black/60 dark:text-white/60 font-medium text-xs cursor-pointer hover:text-black dark:hover:text-white transition-colors select-none"
                  onClick={() => handleSort('id')}
                  aria-sort={
                    sortField === 'id'
                      ? sortDirection === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  }
                  scope="col"
                  role="columnheader"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSort('id')
                    }
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    Order ID
                    {getSortIcon('id')}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-black/60 dark:text-white/60 font-medium text-xs cursor-pointer hover:text-black dark:hover:text-white transition-colors select-none"
                  onClick={() => handleSort('userName')}
                  aria-sort={
                    sortField === 'userName'
                      ? sortDirection === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  }
                  scope="col"
                  role="columnheader"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSort('userName')
                    }
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    User
                    {getSortIcon('userName')}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-black/60 dark:text-white/60 font-medium text-xs cursor-pointer hover:text-black dark:hover:text-white transition-colors select-none"
                  onClick={() => handleSort('project')}
                  aria-sort={
                    sortField === 'project'
                      ? sortDirection === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  }
                  scope="col"
                  role="columnheader"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSort('project')
                    }
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    Project
                    {getSortIcon('project')}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-black/60 dark:text-white/60 font-medium text-xs cursor-pointer hover:text-black dark:hover:text-white transition-colors select-none"
                  onClick={() => handleSort('address')}
                  aria-sort={
                    sortField === 'address'
                      ? sortDirection === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  }
                  scope="col"
                  role="columnheader"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSort('address')
                    }
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    Address
                    {getSortIcon('address')}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-black/60 dark:text-white/60 font-medium text-xs cursor-pointer hover:text-black dark:hover:text-white transition-colors select-none"
                  onClick={() => handleSort('date')}
                  aria-sort={
                    sortField === 'date'
                      ? sortDirection === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  }
                  scope="col"
                  role="columnheader"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSort('date')
                    }
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    Date
                    {getSortIcon('date')}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-black/60 dark:text-white/60 font-medium text-xs cursor-pointer hover:text-black dark:hover:text-white transition-colors select-none"
                  onClick={() => handleSort('status')}
                  aria-sort={
                    sortField === 'status'
                      ? sortDirection === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  }
                  scope="col"
                  role="columnheader"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSort('status')
                    }
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    Status
                    {getSortIcon('status')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map(order => (
                <tr
                  key={order.id}
                  onMouseEnter={() => setHoveredRow(order.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`border-b border-black/5 dark:border-white/5 last:border-0 transition-all duration-200 ${
                    hoveredRow === order.id || selectedOrders.has(order.id)
                      ? 'bg-[var(--color-bg-light)] dark:bg-white/5 rounded-xl shadow-sm'
                      : 'hover:bg-black/2 dark:hover:bg-white/2 hover:rounded-xl'
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedOrders.has(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      className="w-4 h-4 rounded border border-black/20 dark:border-white/20 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3 text-black dark:text-white text-sm font-medium">
                    {order.id}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={order.userAvatar}
                          alt={order.userName}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>
                      <span className="text-black dark:text-white text-sm">{order.userName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-black dark:text-white text-sm">{order.project}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-black dark:text-white text-sm">{order.address}</span>
                      {order.id === '#CM9803' && (
                        <FileText size={14} className="text-black/40 dark:text-white/40" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-black/40 dark:text-white/40" />
                      <span className="text-black dark:text-white text-sm">{order.date}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${statusColors[order.status]}`} />
                      <span className={`${statusTextColors[order.status]} text-sm font-medium`}>
                        {order.status}
                      </span>
                      <button className="ml-auto text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-4 border-t border-black/10 dark:border-white/10">
          <div className="text-xs sm:text-sm text-black/60 dark:text-white/60 text-center sm:text-left">
            Showing {filteredAndSortedOrders.length > 0 ? startIndex + 1 : 0}-
            {Math.min(endIndex, filteredAndSortedOrders.length)} of {filteredAndSortedOrders.length}{' '}
            results
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="px-2 py-1 text-sm text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
            >
              <ChevronLeft size={20} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 5) pageNum = i + 1
              else if (currentPage <= 3) pageNum = i + 1
              else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i
              else pageNum = currentPage - 2 + i

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  aria-label={`Go to page ${pageNum}`}
                  aria-current={currentPage === pageNum ? 'page' : undefined}
                  className={`px-3 py-1 text-sm rounded transition-colors focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 ${
                    currentPage === pageNum
                      ? 'bg-[var(--color-text-primary-opacity-05)] dark:bg-white/10 text-black dark:text-white font-semibold'
                      : 'text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="px-2 py-1 text-sm text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
