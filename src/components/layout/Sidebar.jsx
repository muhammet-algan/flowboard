import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, CheckSquare, Timer, Users, StickyNote,
  Settings, ChevronLeft, ChevronRight, Zap, Crown, HardDrive
} from 'lucide-react'
import useAppStore from '../../store/useAppStore'
import { currentUser } from '../../data/mockData'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/tasks',     icon: CheckSquare,     label: 'Görevler' },
  { to: '/focus',     icon: Timer,           label: 'Odaklanma' },
  { to: '/team',      icon: Users,           label: 'Ekip' },
  { to: '/notes',     icon: StickyNote,      label: 'Notlar' },
]

const bottomItems = [
  { to: '/settings', icon: Settings, label: 'Ayarlar' },
]

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, tasks } = useAppStore()

  // Simulated storage usage
  const storageUsed = 67
  const tasksDone = tasks.filter(t => t.status === 'done').length
  const tasksTotal = tasks.length

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative flex flex-col h-full bg-bg-surface border-r border-bg-border overflow-hidden flex-shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-bg-border">
        <div className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center flex-shrink-0 shadow-gold-sm">
          <Zap size={18} className="text-bg-base" />
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <span className="font-bold text-lg text-gradient-gold tracking-tight">FlowBoard</span>
              <span className="badge-pro text-[10px]">PRO</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Stats (only when expanded) */}
      <AnimatePresence>
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 py-3 border-b border-bg-border"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-text-muted">Sprint ilerleme</span>
              <span className="text-xs text-gold font-semibold">{tasksDone}/{tasksTotal}</span>
            </div>
            <div className="progress-bar">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${tasksTotal > 0 ? (tasksDone / tasksTotal) * 100 : 0}%` }}
                transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                className="progress-bar-fill"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to}>
            {({ isActive }) => (
              <div className={isActive ? 'nav-item-active' : 'nav-item'}>
                <Icon size={18} className="flex-shrink-0" />
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"
                  />
                )}
              </div>
            )}
          </NavLink>
        ))}

        <div className="pt-4 border-t border-bg-border mt-4">
          {bottomItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to}>
              {({ isActive }) => (
                <div className={isActive ? 'nav-item-active' : 'nav-item'}>
                  <Icon size={18} className="flex-shrink-0" />
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Storage Usage (only when expanded) */}
      <AnimatePresence>
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 py-3 border-t border-bg-border"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <HardDrive size={12} className="text-text-muted" />
              <span className="text-xs text-text-muted">Depolama</span>
              <span className="text-xs text-text-muted ml-auto">{storageUsed}%</span>
            </div>
            <div className="h-1 bg-bg-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${storageUsed}%`,
                  background: storageUsed > 80 ? '#EF4444' : storageUsed > 60 ? '#F59E0B' : '#22C55E'
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Profile */}
      <div className="p-3 border-t border-bg-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 text-bg-base"
              style={{ backgroundColor: currentUser.avatarColor }}
            >
              {currentUser.avatar}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-status-success border-2 border-bg-surface" />
          </div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-semibold text-text-primary truncate">{currentUser.name}</p>
                  <Crown size={10} className="text-gold flex-shrink-0" />
                </div>
                <p className="text-xs text-text-muted truncate">{currentUser.role}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-bg-elevated border border-bg-border
                   flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-200
                   text-text-muted z-10"
      >
        {sidebarCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </motion.aside>
  )
}
