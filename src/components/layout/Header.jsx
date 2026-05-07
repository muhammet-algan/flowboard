import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Bell, Search, Plus, X, Command } from 'lucide-react'
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

const pageDescriptions = {
  '/dashboard': 'Genel bakış ve performans metrikleri',
  '/tasks': 'Kanban panosu ve görev yönetimi',
  '/focus': 'Pomodoro zamanlayıcı ve derin çalışma',
  '/team': 'Ekip üyeleri ve performans takibi',
  '/notes': 'Hızlı notlar ve dokümantasyon',
  '/settings': 'Profil ve uygulama tercihleri',
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 6) return 'İyi geceler'
  if (hour < 12) return 'Günaydın'
  if (hour < 18) return 'İyi günler'
  return 'İyi akşamlar'
}

export default function Header() {
  const location = useLocation()
  const { notifications, markAllRead, dismissNotification, globalSearchQuery, setGlobalSearchQuery, getSearchResults } = useAppStore()
  const [showNotifs, setShowNotifs] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length
  const pageTitle = pageNames[location.pathname] || 'FlowBoard'
  const pageDesc = pageDescriptions[location.pathname] || ''

  const searchResults = useMemo(() => getSearchResults(), [globalSearchQuery])
  const hasResults = searchResults.tasks.length > 0 || searchResults.notes.length > 0

  // Ctrl+K shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        document.getElementById('header-search')?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-bg-border bg-bg-surface/80 backdrop-blur-sm sticky top-0 z-20">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-bold text-text-primary">{pageTitle}</h1>
        <p className="text-xs text-text-muted mt-0.5">{pageDesc}</p>
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
            value={globalSearchQuery}
            onChange={e => setGlobalSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            className="input-field pl-9 pr-16 w-48 focus:w-72 transition-all duration-300"
          />
          <div className="absolute right-2 flex items-center gap-0.5 pointer-events-none">
            <span className="kbd">⌘</span>
            <span className="kbd">K</span>
          </div>

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {searchFocused && globalSearchQuery.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 top-12 w-80 card shadow-card z-40 overflow-hidden"
              >
                {hasResults ? (
                  <div className="max-h-64 overflow-y-auto">
                    {searchResults.tasks.length > 0 && (
                      <div className="px-3 py-2 border-b border-bg-border">
                        <p className="text-xs text-text-muted font-semibold uppercase tracking-wider mb-1">Görevler</p>
                        {searchResults.tasks.slice(0, 3).map(t => (
                          <div key={t.id} className="py-1.5 text-xs text-text-primary truncate">{t.title}</div>
                        ))}
                      </div>
                    )}
                    {searchResults.notes.length > 0 && (
                      <div className="px-3 py-2">
                        <p className="text-xs text-text-muted font-semibold uppercase tracking-wider mb-1">Notlar</p>
                        {searchResults.notes.slice(0, 3).map(n => (
                          <div key={n.id} className="py-1.5 text-xs text-text-primary truncate">{n.title}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center">
                    <p className="text-xs text-text-muted">Sonuç bulunamadı</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Greeting */}
        <span className="hidden lg:inline text-xs text-text-muted">{getGreeting()} 👋</span>

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
                               text-xs font-bold flex items-center justify-center animate-pulse">
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
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-text-primary">Bildirimler</span>
                      {unreadCount > 0 && (
                        <span className="text-xs bg-gold/20 text-gold px-1.5 py-0.5 rounded-full font-medium">{unreadCount}</span>
                      )}
                    </div>
                    <button
                      onClick={markAllRead}
                      className="text-xs text-gold hover:text-gold-muted transition-colors"
                    >
                      Tümünü okundu işaretle
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`px-4 py-3 border-b border-bg-border/50 flex gap-3 items-start hover:bg-bg-elevated transition-colors group ${!n.read ? 'bg-gold-dim/30' : ''}`}>
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.read ? 'bg-bg-border' : 'bg-gold'}`} />
                        <div className="flex-1">
                          <p className="text-xs text-text-primary">{n.text}</p>
                          <p className="text-xs text-text-muted mt-0.5">{n.time}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); dismissNotification(n.id) }}
                          className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-text-primary transition-all"
                        >
                          <X size={12} />
                        </button>
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
