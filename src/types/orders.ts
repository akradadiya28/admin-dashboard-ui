export type OrderStatus = 'In Progress' | 'Complete' | 'Pending' | 'Approved' | 'Rejected'

export interface Order {
  id: string
  userId: string
  userName: string
  userAvatar: string
  project: string
  address: string
  date: string
  status: OrderStatus
}
