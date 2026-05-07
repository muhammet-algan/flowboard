import { motion } from 'framer-motion'
import { CheckCircle2, Clock, TrendingUp, Users, Zap, AlertTriangle, Target, ArrowUpRight } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts'
import { weeklyData, activityFeed, kpiData, teamMembers, sprintData } from '../data/mockData'
import useAppStore from '../store/useAppStore'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } }
}
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

const kpiCards = [
  { label: 'Toplam Görev', value: kpiData.totalTasks, icon: CheckCircle2, color: 'text-gold', bg: 'bg-gold-dim', trend: '+2 bu hafta', trendUp: true },
  { label: 'Bugün Tamamlanan', value: kpiData.completedToday, icon: TrendingUp, color: 'text-status-success', bg: 'bg-status-success/10', trend: '+1 dünden fazla', trendUp: true },
  { label: 'Devam Eden', value: kpiData.inProgress, icon: Clock, color: 'text-status-info', bg: 'bg-status-info/10', trend: '4 aktif sprint', trendUp: null },
  { label: 'Ekip Skoru', value: `${kpiData.teamScore}%`, icon: Users, color: 'text-status-warning', bg: 'bg-status-warning/10', trend: '+3% bu ay', trendUp: true },
  { label: 'Pomodoro Bugün', value: kpiData.pomodorosToday, icon: Zap, color: 'text-gold', bg: 'bg-gold-dim', trend: '2.5 sa odak', trendUp: true },
  { label: 'Yaklaşan Tarih', value: kpiData.upcomingDeadlines, icon: AlertTriangle, color: 'text-status-danger', bg: 'bg-status-danger/10', trend: 'Bu hafta içinde', trendUp: false },
]

const DONUT_DATA = [
  { name: 'Tamamlanan', value: 4, color: '#22C55E' },
  { name: 'Devam Eden', value: 4, color: '#3B82F6' },
  { name: 'Bekleyen', value: 4, color: '#6B6B8A' },
]

const activityIconColor = { complete: '#22C55E', create: '#F5C842', update: '#3B82F6', start: '#A855F7', comment: '#F59E0B' }

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="card p-3 text-xs shadow-card">
        <p className="text-text-muted mb-1">{label}</p>
        {payload.map(p => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: <span className="font-semibold">{p.value}</span></p>
        ))}
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const { tasks, teamMembers: members } = useAppStore()

  const sprintProgress = Math.round((sprintData.completedTasks / sprintData.totalTasks) * 100)
  const sprintGoalsDone = sprintData.goals.filter(g => g.done).length

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">

      {/* Welcome Banner */}
      <motion.div
        variants={fadeUp}
        className="relative overflow-hidden card p-6 bg-mesh"
      >
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-text-primary">
              Hoş geldin! 🚀
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Bugün <span className="text-gold font-semibold">{kpiData.completedToday}</span> görev tamamladın.
              {' '}Devam et, harika gidiyorsun!
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-text-muted">{sprintData.name}</p>
              <p className="text-sm font-semibold text-gold">{sprintProgress}% tamamlandı</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gold-dim flex items-center justify-center">
              <Target size={24} className="text-gold" />
            </div>
          </div>
        </div>

        {/* Sprint Goals */}
        <div className="relative z-10 flex gap-3 mt-4">
          {sprintData.goals.map(goal => (
            <div
              key={goal.id}
              className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-all
                ${goal.done
                  ? 'bg-status-success/10 border-status-success/30 text-status-success'
                  : 'bg-bg-elevated border-bg-border text-text-muted'
                }`}
            >
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${goal.done ? 'bg-status-success' : 'bg-bg-border'}`} />
              <span className={goal.done ? 'line-through' : ''}>{goal.text}</span>
            </div>
          ))}
        </div>

        {/* Decorative gradient orb */}
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-gold/5 blur-3xl" />
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiCards.map((kpi, i) => (
          <motion.div key={i} variants={fadeUp} className="stat-card group" id={`kpi-${i}`}>
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                <kpi.icon size={18} className={kpi.color} />
              </div>
              {kpi.trendUp !== null && (
                <ArrowUpRight
                  size={14}
                  className={`${kpi.trendUp ? 'text-status-success' : 'text-status-danger rotate-90'} opacity-0 group-hover:opacity-100 transition-opacity`}
                />
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{kpi.value}</p>
              <p className="text-xs text-text-muted">{kpi.label}</p>
            </div>
            <p className="text-xs text-text-muted/70 mt-auto">{kpi.trend}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Bar Chart */}
        <motion.div variants={fadeUp} className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-text-primary">Haftalık Verimlilik</h2>
              <p className="text-xs text-text-muted mt-0.5">Görev tamamlama trendi</p>
            </div>
            <span className="text-xs text-gold bg-gold-dim px-2.5 py-1 rounded-full font-medium">Bu Hafta</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData} barSize={10} barGap={4}>
              <XAxis dataKey="day" tick={{ fill: '#6B6B8A', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6B6B8A', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(245,200,66,0.05)' }} />
              <Bar dataKey="completed" name="Tamamlanan" fill="#F5C842" radius={[4,4,0,0]} />
              <Bar dataKey="created" name="Oluşturulan" fill="#3B82F6" radius={[4,4,0,0]} opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Donut Chart */}
        <motion.div variants={fadeUp} className="card p-5">
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-text-primary">Görev Durumu</h2>
            <p className="text-xs text-text-muted mt-0.5">Sprint dağılımı</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={DONUT_DATA}
                cx="50%" cy="50%"
                innerRadius={55} outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {DONUT_DATA.map((entry, index) => (
                  <Cell key={index} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {DONUT_DATA.map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-text-muted">{d.name}</span>
                </div>
                <span className="text-text-primary font-medium">{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <motion.div variants={fadeUp} className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-text-primary">Son Aktiviteler</h2>
            <span className="text-xs text-text-muted">{activityFeed.length} kayıt</span>
          </div>
          <div className="space-y-3">
            {activityFeed.map((item, i) => {
              const member = teamMembers.find(m => m.id === item.user)
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 py-2 border-b border-bg-border/50 last:border-0"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 text-bg-base"
                    style={{ backgroundColor: member?.avatarColor }}
                  >
                    {member?.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-primary">
                      <span className="font-medium">{member?.name}</span>{' '}
                      <span className="text-text-muted">{item.action}</span>{' '}
                      <span className="font-medium">{item.target}</span>
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">{item.time}</p>
                  </div>
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                    style={{ backgroundColor: activityIconColor[item.type] }}
                  />
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Team Performance */}
        <motion.div variants={fadeUp} className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-text-primary">Ekip Performansı</h2>
            <span className="text-xs text-gold bg-gold-dim px-2 py-0.5 rounded-full font-medium">
              Top {members.length}
            </span>
          </div>
          <div className="space-y-4">
            {members.slice(0, 4).map((m, i) => (
              <div key={m.id} className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 text-bg-base"
                    style={{ backgroundColor: m.avatarColor }}
                  >
                    {m.avatar}
                  </div>
                  {i === 0 && (
                    <div className="absolute -top-1 -right-1 text-gold">
                      <span className="text-xs">👑</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-text-primary truncate">{m.name}</span>
                    <span className="text-xs text-gold font-semibold ml-2">{m.score}%</span>
                  </div>
                  <div className="h-1.5 bg-bg-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${m.score}%` }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, #F5C842, #B8962E)` }}
                    />
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${m.online ? 'bg-status-success' : 'bg-bg-border'}`} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
