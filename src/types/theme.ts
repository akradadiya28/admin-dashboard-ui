export type Theme = 'light' | 'dark'

export interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}
