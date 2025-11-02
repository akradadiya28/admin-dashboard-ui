export interface NavItem {
  iconName: string
  label: string
  href?: string
}

export interface PageItem {
  iconName: string
  label: string
  children?: string[]
  href?: string
}

export interface SidebarConfig {
  logo: {
    imagePath: string
    text: string
  }
  navItems: NavItem[]
  pagesItems: PageItem[]
  favoritesRecently: string[]
  defaultExpandedItem: string
  defaultActiveItem: string
}

export const sidebarData: SidebarConfig = {
  logo: {
    imagePath: '/images/user.png',
    text: 'ByeWind',
  },
  navItems: [
    { iconName: 'LayoutDashboard', label: 'Default', href: '/dashboard' },
    { iconName: 'ShoppingBag', label: 'eCommerce' },
    { iconName: 'FolderOpen', label: 'Projects' },
    { iconName: 'BookOpen', label: 'Online Courses' },
  ],
  pagesItems: [
    { iconName: 'FileText', label: 'Order List', href: '/order-list' },
    {
      iconName: 'User',
      label: 'User Profile',
      children: ['Overview', 'Projects', 'Campaigns', 'Documents', 'Followers'],
    },
    { iconName: 'Building2', label: 'Account' },
    { iconName: 'Corporate', label: 'Corporate' },
    { iconName: 'Newspaper', label: 'Blog' },
    { iconName: 'MessageSquare', label: 'Social' },
  ],
  favoritesRecently: ['Overview', 'Projects'],
  defaultExpandedItem: 'User Profile',
  defaultActiveItem: 'Default',
}
