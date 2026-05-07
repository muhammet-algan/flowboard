import { motion } from 'framer-motion'
import { CheckCircle2, Clock, TrendingUp, Trophy, Users, ArrowUpRight } from 'lucide-react'
import useAppStore from '../store/useAppStore'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

export default function Team() {
  const { teamMembers, tasks } = useAppStore()

  const totalCompleted = tasks.filter(t => t.status === 'done').length
  const totalInProgress = tasks.filter(t => t.status === 'inprogress').length
  const avgScore = Math.round(teamMembers.reduce((a, m) => a + m.score, 0) / teamMembers.length)
  const onlineCount = teamMembers.filter(m => m.online).length

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">

      {/* Team Summary Cards */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Ekip Üyesi', value: teamMembers.length, icon: Users, color: 'text-gold', bg: 'bg-gold-dim' },
          { label: 'Çevrimiçi', value: onlineCount, icon: ArrowUpRight, color: 'text-status-success', bg: 'bg-status-success/10' },
          { label: 'Ortalama Skor', value: `${avgScore}%`, icon: Trophy, color: 'text-status-warning', bg: 'bg-status-warning/10' },
          { label: 'Tamamlanan', value: totalCompleted, icon: CheckCircle2, color: 'text-status-info', bg: 'bg-status-info/10' },
        ].map((stat, i) => (
          <motion.div key={i} variants={fadeUp} className="stat-card">
            <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
              <stat.icon size={18} className={stat.color} />
            </div>
            <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
            <p className="text-xs text-text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center justify-between">
        <div>
          <p className="text-sm text-text-muted">{teamMembers.length} kişi · {onlineCount} çevrimiçi</p>
        </div>
        <div className="flex items-center gap-2">
          {teamMembers.filter(m => m.online).map(m => (
            <div
              key={m.id}
              title={`${m.name} (çevrimiçi)`}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-bg-base ring-2 ring-status-success"
              style={{ backgroundColor: m.avatarColor }}
            >
              {m.avatar}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {teamMembers.map((member, i) => {
          const memberTasks = tasks.filter(t => t.assignee === member.id)
          const doneTasks = memberTasks.filter(t => t.status === 'done')
          const inProgressTasks = memberTasks.filter(t => t.status === 'inprogress')
          const completion = memberTasks.length > 0 ? Math.round((doneTasks.length / memberTasks.length) * 100) : 0

          return (
            <motion.div
              key={member.id}
              variants={fadeUp}
              id={`member-${member.id}`}
              className="card p-5 hover:border-gold/30 hover:shadow-gold-sm transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold text-bg-base"
                      style={{ backgroundColor: member.avatarColor }}
                    >
                      {member.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-bg-surface
                                    ${member.online ? 'bg-status-success' : 'bg-bg-border'}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-text-primary">{member.name}</p>
                      {member.score >= 95 && <span className="text-xs">🏅</span>}
                    </div>
                    <p className="text-xs text-text-muted">{member.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gradient-gold">{member.score}%</p>
                  <p className="text-xs text-text-muted">Skor</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Toplam', value: memberTasks.length, color: 'text-text-primary' },
                  { label: 'Devam', value: inProgressTasks.length, color: 'text-status-info' },
                  { label: 'Bitti', value: doneTasks.length, color: 'text-status-success' },
                ].map(s => (
                  <div key={s.label} className="bg-bg-elevated rounded-xl p-2.5 text-center border border-bg-border">
                    <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-text-muted">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-text-muted">Tamamlama oranı</span>
                  <span className="text-gold font-semibold">{completion}%</span>
                </div>
                <div className="h-2 bg-bg-border rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completion}%` }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gold-gradient"
                  />
                </div>
              </div>

              {/* Active Tasks */}
              {inProgressTasks.length > 0 && (
                <div className="mt-4 pt-4 border-t border-bg-border">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Aktif Görevler</p>
                  <div className="space-y-1.5">
                    {inProgressTasks.slice(0, 2).map(t => (
                      <div key={t.id} className="flex items-start gap-2">
                        <Clock size={12} className="text-status-info flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-text-secondary truncate">{t.title}</p>
                      </div>
                    ))}
                    {inProgressTasks.length > 2 && (
                      <p className="text-xs text-text-muted">+{inProgressTasks.length - 2} daha</p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
