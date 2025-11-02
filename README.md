# Juspay Dashboard

A modern, responsive eCommerce dashboard built with Next.js 16, React 19, and Tailwind CSS. Features real-time analytics, interactive charts, and a beautiful dark mode theme.

## 🚀 Live Demo

**Live Application**: [View Live Demo](https://juspay-dashboard-ui.netlify.app/dashboard)

## ✨ Features

- **Interactive Dashboard**: Real-time metrics and analytics with multiple visualization types
- **Responsive Design**: Fully responsive layout optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Beautiful dark/light theme toggle with system preference detection
- **Interactive Charts**:
  - Line charts for revenue trends
  - Bar charts for projections
  - Donut charts for distribution analysis
  - Interactive location map visualization
- **Order Management**: Comprehensive order list with filtering and sorting capabilities
- **Product Analytics**: Detailed product performance table with sales metrics
- **Keyboard Shortcuts**: Cmd+K (Mac) / Ctrl+K (Windows) for quick search
- **Notification System**: Real-time notification panel with interactive elements
- **Smooth Animations**: Powered by Framer Motion for enhanced UX

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Maps**: React Simple Maps
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React Context API

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm** 9.x or higher (comes with Node.js)
- **Git** (for cloning the repository)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/akradadiya28/admin-dashboard-ui
cd juspay-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
```

### 5. Start Production Server

```bash
npm start
```

## 📁 Project Structure

```
juspay-dashboard/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── dashboard/       # Main dashboard page
│   │   ├── order-list/      # Order list page
│   │   └── layout.tsx       # Root layout with providers
│   ├── components/          # React components
│   │   ├── common/         # Shared components (Header, Sidebar, etc.)
│   │   ├── dashboard/      # Dashboard-specific components
│   │   └── OrderList/      # Order list components
│   ├── contexts/           # React Context providers
│   ├── data/               # Static data and configurations
│   ├── types/              # TypeScript type definitions
│   └── lib/                # Utility functions and icons
├── public/                 # Static assets
└── package.json           # Dependencies and scripts
```

## 🎨 Design Decisions

### 1. **Component Architecture**

- **Modular Components**: Each component is self-contained and reusable
- **Type Safety**: Comprehensive TypeScript types for all components and data structures
- **Separation of Concerns**: Clear separation between UI components, data, and business logic

### 2. **Styling Approach**

- **Tailwind CSS v4**: Utility-first CSS framework for rapid development and consistent design
- **Dark Mode**: Implemented using CSS classes with localStorage persistence
- **Responsive Design**: Mobile-first approach with breakpoints for sm, md, lg, and xl screens
- **Theme System**: Context-based theme management for consistent theming across the app

### 3. **Performance Optimizations**

- **Next.js App Router**: Leveraging the latest Next.js 16 features for optimal performance
- **Client Components**: Strategic use of 'use client' directive only where needed
- **Code Splitting**: Automatic code splitting through Next.js routing
- **React Compiler**: Enabled Next.js React Compiler for automatic optimization

### 4. **Data Visualization**

- **Recharts**: Chosen for its React-first approach and excellent customization options
- **Responsive Charts**: All charts are fully responsive and adapt to container sizes
- **Interactive Features**: Tooltips, legends, and hover effects for better user engagement

### 5. **User Experience**

- **Keyboard Shortcuts**: Quick search functionality (Cmd+K/Ctrl+K) for power users
- **Smooth Transitions**: Framer Motion animations for page transitions and interactions
- **Accessibility**: Semantic HTML and ARIA labels where appropriate
- **Loading States**: Proper handling of component mounting and data loading

## 🔧 Challenges Faced & Solutions

### 1. **Dark Mode Hydration Mismatch**

**Challenge**: Initial dark mode implementation caused hydration mismatches between server and client.

**Solution**: Implemented a mounting check in the ThemeProvider to prevent rendering theme-dependent classes until after hydration. This ensures the server-rendered HTML matches the client-side rendering.

### 2. **Responsive Chart Rendering**

**Challenge**: Charts needed to be responsive while maintaining aspect ratios and readability.

**Solution**: Used container queries and responsive height classes (h-[300px] sm:h-[350px] md:h-[400px]) combined with Recharts' responsive container component to ensure charts adapt smoothly across breakpoints.

### 3. **Complex Layout Grid**

**Challenge**: Creating a complex dashboard layout with multiple grid sections that work across all screen sizes.

**Solution**: Leveraged Tailwind's grid system with responsive columns (grid-cols-1 lg:grid-cols-2 lg:grid-cols-3) and gap utilities. Used strategic column spanning for optimal space utilization.

### 4. **Type Safety Across Components**

**Challenge**: Maintaining type safety across multiple component layers and data structures.

**Solution**: Created comprehensive TypeScript interfaces in a centralized types directory, ensuring type consistency across the application and catching errors at compile time.

### 5. **State Management for Theme**

**Challenge**: Managing theme state across components without prop drilling.

**Solution**: Implemented a Context API-based theme provider with custom hooks (useTheme) for clean, reusable theme access throughout the component tree.

## 🚀 Improvements Made

1. **Performance**
   - Optimized component rendering with React Compiler
   - Implemented proper code splitting
   - Reduced bundle size through tree-shaking

2. **User Experience**
   - Added keyboard shortcuts for common actions
   - Implemented smooth animations and transitions
   - Enhanced mobile responsiveness

3. **Developer Experience**
   - Comprehensive TypeScript types for better IDE support
   - Modular component structure for easy maintenance
   - Clear separation of concerns

4. **Accessibility**
   - Semantic HTML structure
   - Keyboard navigation support
   - Proper ARIA labels

5. **Code Quality**
   - ESLint configuration for code consistency
   - Prettier for code formatting
   - Organized file structure

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🌐 Deployment

#### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy

#### GitHub Pages

For Next.js static export:

```bash
npm run build
npm run export
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created By Arpit Radadiya with ❤️ using Next.js and React

---

**Note**: Remember to update the GitHub repository URL and deployment link in this README after setting up your repository and deployment.
