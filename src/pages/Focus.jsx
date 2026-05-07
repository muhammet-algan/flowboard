import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Coffee, Zap, Volume2, VolumeX, Quote } from 'lucide-react'
import { pomodoroHistory, motivationalQuotes } from '../data/mockData'

const MODES = [
  { id: 'focus',   label: 'Odaklanma',    minutes: 25, color: '#F5C842' },
  { id: 'short',   label: 'Kısa Mola',    minutes: 5,  color: '#22C55E' },
  { id: 'long',    label: 'Uzun Mola',    minutes: 15, color: '#3B82F6' },
]

function pad(n) { return String(n).padStart(2, '0') }

export default function Focus() {
  const [mode, setMode] = useState(MODES[0])
  const [seconds, setSeconds] = useState(MODES[0].minutes * 60)
  const [running, setRunning] = useState(false)
  const [sessionsDone, setSessionsDone] = useState(6)
  const [muted, setMuted] = useState(false)
  const [completedAnim, setCompletedAnim] = useState(false)
  const intervalRef = useRef(null)

  // Random motivational quote
  const quote = useMemo(() => {
    const idx = Math.floor(Math.random() * motivationalQuotes.length)
    return motivationalQuotes[idx]
  }, [sessionsDone])

  const totalSeconds = mode.minutes * 60
  const progress = ((totalSeconds - seconds) / totalSeconds) * 100

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            clearInterval(intervalRef.current)
            setRunning(false)
            if (mode.id === 'focus') {
              setSessionsDone(prev => prev + 1)
              setCompletedAnim(true)
              setTimeout(() => setCompletedAnim(false), 2000)
            }
            return 0
          }
          return s - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running, mode])

  // Update document title with timer
  useEffect(() => {
    if (running) {
      document.title = `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)} — ${mode.label} | FlowBoard`
    } else {
      document.title = 'FlowBoard — Premium Verimlilik Paneli'
    }
    return () => { document.title = 'FlowBoard — Premium Verimlilik Paneli' }
  }, [seconds, running, mode])

  const handleMode = (m) => {
    setMode(m)
    setSeconds(m.minutes * 60)
    setRunning(false)
  }

  const handleReset = () => {
    setSeconds(mode.minutes * 60)
    setRunning(false)
  }

  const circumference = 2 * Math.PI * 110
  const dashOffset = circumference - (progress / 100) * circumference

  const todayFocusMinutes = sessionsDone * 25

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-glass p-4 flex items-start gap-3"
      >
        <Quote size={16} className="text-gold flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-text-secondary italic">"{quote.text}"</p>
          <p className="text-xs text-text-muted mt-1">— {quote.author}</p>
        </div>
      </motion.div>

      {/* Mode Tabs */}
      <div className="flex gap-2 p-1 bg-bg-surface rounded-2xl border border-bg-border">
        {MODES.map(m => (
          <button
            key={m.id}
            id={`mode-${m.id}`}
            onClick={() => handleMode(m)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                        ${mode.id === m.id ? 'text-bg-base shadow-gold-sm' : 'text-text-muted hover:text-text-primary'}`}
            style={mode.id === m.id ? { background: m.color } : {}}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Timer Circle */}
      <div className="card p-8 flex flex-col items-center gap-6 relative overflow-hidden">
        {/* Subtle background glow when running */}
        {running && (
          <div
            className="absolute inset-0 opacity-10 blur-3xl"
            style={{ background: `radial-gradient(circle at 50% 50%, ${mode.color}, transparent 70%)` }}
          />
        )}

        <div className="relative w-64 h-64 z-10">
          {/* Background track */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 240 240">
            <circle cx="120" cy="120" r="110" fill="none" stroke="#1E1E2E" strokeWidth="10" />
            <motion.circle
              cx="120" cy="120" r="110"
              fill="none"
              stroke={mode.color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ filter: `drop-shadow(0 0 8px ${mode.color}60)` }}
              transition={{ duration: 0.5 }}
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {completedAnim ? (
                <motion.div
                  key="done"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="text-center"
                >
                  <Zap size={40} style={{ color: mode.color }} className="mx-auto" />
                  <p className="text-sm font-semibold mt-1" style={{ color: mode.color }}>Tamamlandı!</p>
                </motion.div>
              ) : (
                <motion.div key="timer" className="text-center">
                  <p className="text-5xl font-bold text-text-primary tracking-tight font-mono">
                    {pad(Math.floor(seconds / 60))}:{pad(seconds % 60)}
                  </p>
                  <p className="text-sm text-text-muted mt-1">{mode.label}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 z-10">
          <button
            onClick={handleReset}
            id="reset-btn"
            className="w-11 h-11 rounded-xl bg-bg-elevated border border-bg-border flex items-center justify-center
                       text-text-muted hover:text-text-primary hover:border-text-muted/50 transition-all duration-200"
          >
            <RotateCcw size={16} />
          </button>

          <motion.button
            id="play-btn"
            whileTap={{ scale: 0.95 }}
            onClick={() => setRunning(r => !r)}
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-bg-base font-semibold shadow-gold
                       transition-all duration-200 hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${mode.color}, ${mode.color}aa)` }}
          >
            {running ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </motion.button>

          <button
            onClick={() => setMuted(m => !m)}
            id="mute-btn"
            className="w-11 h-11 rounded-xl bg-bg-elevated border border-bg-border flex items-center justify-center
                       text-text-muted hover:text-text-primary hover:border-text-muted/50 transition-all duration-200"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>

        {/* Session indicator */}
        <div className="flex items-center gap-2 z-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i < sessionsDone ? '' : 'bg-bg-border'}`}
              style={i < sessionsDone ? { backgroundColor: mode.color } : {}}
            />
          ))}
          <span className="text-xs text-text-muted ml-1">{sessionsDone} oturum</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Bugün', value: `${sessionsDone} oturum`, sub: `${todayFocusMinutes} dk odak`, emoji: '🔥' },
          { label: 'Bu Hafta', value: '33 oturum', sub: '825 dk odak', emoji: '📊' },
          { label: 'Toplam', value: '247 oturum', sub: '~103 saat', emoji: '🏆' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="stat-card text-center"
          >
            <span className="text-lg">{s.emoji}</span>
            <p className="text-xl font-bold text-text-primary">{s.value}</p>
            <p className="text-xs text-text-muted">{s.label}</p>
            <p className="text-xs text-text-muted/60 mt-0.5">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* History */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-text-primary">Son 5 Gün</h2>
          <span className="text-xs text-text-muted">Toplam: {pomodoroHistory.reduce((a, h) => a + h.sessions, 0)} oturum</span>
        </div>
        <div className="space-y-3">
          {pomodoroHistory.map((h, i) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-4 py-2 border-b border-bg-border/50 last:border-0"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-text-primary font-mono">{h.date}</span>
                  <span className="text-xs text-gold font-semibold">{h.sessions} oturum</span>
                </div>
                <div className="h-1.5 bg-bg-border rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(h.sessions / 10) * 100}%` }}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.6 }}
                    className="h-full rounded-full bg-gold-gradient"
                  />
                </div>
              </div>
              <span className="text-xs text-text-muted font-mono">{h.focusMinutes} dk</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
