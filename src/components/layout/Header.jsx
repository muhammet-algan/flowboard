import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Bell, Search, Plus, X, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import useAppStore from '../../store/useAppStore'

const pageNames = {
  '/dashboard': 'Dashboard',
  '/tasks': 'Görevler',
  '/focus': 'Odaklanma',
  '/team': 'Ekip',
  '/notes': 'Notlar',
  '/settings': 'Ayarlar',
}

export default function Header() {
  const location = useLocation()
  const { notifications, markAllRead } = useAppStore()
  const [showNotifs, setShowNotifs] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const unreadCount = notifications.filter(n => !n.read).length
  const pageTitle = pageNames[location.pathname] || 'FlowBoard'

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-bg-border bg-bg-surface/80 backdrop-blur-sm sticky top-0 z-20">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-bold text-text-primary">{pageTitle}</h1>
        <p className="text-xs text-text-muted mt-0.5">
          {new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:flex items-center">
          <Search size={14} className="absolute left-3 text-text-muted" />
          <input
            id="header-search"
            type="text"
            placeholder="Ara..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input-field pl-9 w-48 focus:w-64 transition-all duration-300"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            id="notif-btn"
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative w-9 h-9 rounded-xl bg-bg-elevated border border-bg-border
                       flex items-center justify-center text-text-muted hover:text-text-primary
                       hover:border-gold/50 transition-all duration-200"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-bg-base
                               text-xs font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifs && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowNotifs(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 w-80 card shadow-card z-40 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-bg-border">
                    <span className="text-sm font-semibold text-text-primary">Bildirimler</span>
                    <button
                      onClick={markAllRead}
                      className="text-xs text-gold hover:text-gold-muted transition-colors"
                    >
                      Tümünü okundu işaretle
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`px-4 py-3 border-b border-bg-border/50 flex gap-3 items-start hover:bg-bg-elevated transition-colors ${!n.read ? 'bg-gold-dim/30' : ''}`}>
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.read ? 'bg-bg-border' : 'bg-gold'}`} />
                        <div>
                          <p className="text-xs text-text-primary">{n.text}</p>
                          <p className="text-xs text-text-muted mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Add */}
        <button id="quick-add-btn" className="btn-primary flex items-center gap-2">
          <Plus size={14} />
          <span className="hidden sm:inline">Yeni Görev</span>
        </button>
      </div>
    </header>
  )
}
