import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Calendar, User, Tag, ChevronDown, Grip, BarChart3 } from 'lucide-react'
import useAppStore from '../store/useAppStore'
import { teamMembers } from '../data/mockData'

const COLUMNS = [
  { id: 'todo',       label: 'Yapılacak',    color: 'text-text-muted',     dot: 'bg-text-muted' },
  { id: 'inprogress', label: 'Devam Ediyor', color: 'text-status-info',    dot: 'bg-status-info' },
  { id: 'done',       label: 'Tamamlandı',   color: 'text-status-success', dot: 'bg-status-success' },
]

const priorityClass = { high: 'badge-high', medium: 'badge-medium', low: 'badge-low' }
const priorityLabel = { high: 'Yüksek', medium: 'Orta', low: 'Düşük' }

function TaskCard({ task, onOpen, onMove }) {
  const assignee = teamMembers.find(m => m.id === task.assignee)
  const completedSubs = task.subtasks?.filter(s => s.done).length || 0
  const totalSubs = task.subtasks?.length || 0

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={() => onOpen(task)}
      className="card p-4 cursor-pointer hover:border-gold/40 hover:shadow-gold-sm
                 transition-all duration-200 group active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <p className="text-sm font-medium text-text-primary leading-snug">{task.title}</p>
        <Grip size={14} className="text-text-muted opacity-0 group-hover:opacity-100 flex-shrink-0 mt-0.5 transition-opacity" />
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={priorityClass[task.priority]}>{priorityLabel[task.priority]}</span>
        {task.tags.slice(0, 2).map(tag => (
          <span key={tag} className="bg-bg-elevated text-text-muted text-xs px-2 py-0.5 rounded-full border border-bg-border">{tag}</span>
        ))}
      </div>

      {totalSubs > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-text-muted mb-1">
            <span>Alt görevler</span>
            <span>{completedSubs}/{totalSubs}</span>
          </div>
          <div className="h-1 bg-bg-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gold-gradient transition-all duration-500"
              style={{ width: totalSubs > 0 ? `${(completedSubs / totalSubs) * 100}%` : '0%' }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {assignee && (
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-bg-base"
              style={{ backgroundColor: assignee.avatarColor }}
              title={assignee.name}
            >
              {assignee.avatar}
            </div>
          )}
          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-text-muted">
              <Calendar size={10} />
              {task.dueDate}
            </div>
          )}
        </div>

        {/* Move dropdown */}
        <div className="flex gap-1" onClick={e => e.stopPropagation()}>
          {COLUMNS.filter(c => c.id !== task.status).map(col => (
            <button
              key={col.id}
              onClick={() => onMove(task.id, col.id)}
              className={`text-xs px-2 py-0.5 rounded-full border border-bg-border
                         hover:border-gold/50 transition-all duration-150 text-text-muted hover:text-text-primary`}
              title={`Taşı: ${col.label}`}
            >
              →
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function TaskModal({ task, onClose }) {
  const { updateTask, toggleSubtask, deleteTask } = useAppStore()
  const assignee = teamMembers.find(m => m.id === task.assignee)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-bg-base/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.2 }}
          className="card w-full max-w-lg shadow-card max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-start justify-between p-5 border-b border-bg-border">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={priorityClass[task.priority]}>{priorityLabel[task.priority]}</span>
                {task.tags.map(tag => (
                  <span key={tag} className="bg-bg-elevated text-text-muted text-xs px-2 py-0.5 rounded-full border border-bg-border">{tag}</span>
                ))}
              </div>
              <h2 className="text-base font-semibold text-text-primary">{task.title}</h2>
            </div>
            <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="p-5 space-y-5">
            {task.description && (
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Açıklama</p>
                <p className="text-sm text-text-secondary leading-relaxed">{task.description}</p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Atanan</p>
                {assignee && (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-bg-base"
                      style={{ backgroundColor: assignee.avatarColor }}
                    >
                      {assignee.avatar}
                    </div>
                    <span className="text-sm text-text-primary">{assignee.name}</span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Son Tarih</p>
                <div className="flex items-center gap-2 text-sm text-text-primary">
                  <Calendar size={14} className="text-text-muted" />
                  {task.dueDate || '—'}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Oluşturulma</p>
                <div className="flex items-center gap-2 text-sm text-text-primary">
                  <Calendar size={14} className="text-text-muted" />
                  {task.createdAt || '—'}
                </div>
              </div>
            </div>

            {task.subtasks?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                  Alt Görevler ({task.subtasks.filter(s=>s.done).length}/{task.subtasks.length})
                </p>
                <div className="space-y-2">
                  {task.subtasks.map(sub => (
                    <div
                      key={sub.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-bg-elevated transition-colors cursor-pointer"
                      onClick={() => toggleSubtask(task.id, sub.id)}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all
                                      ${sub.done ? 'bg-gold border-gold' : 'border-bg-border'}`}>
                        {sub.done && <X size={10} className="text-bg-base" />}
                      </div>
                      <span className={`text-sm ${sub.done ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                        {sub.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2 border-t border-bg-border">
              <button
                onClick={() => { deleteTask(task.id); onClose() }}
                className="btn-danger flex-1"
              >
                Görevi Sil
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Tasks() {
  const { tasks, moveTask, addTask } = useAppStore()
  const [selectedTask, setSelectedTask] = useState(null)
  const [addingTo, setAddingTo] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [filter, setFilter] = useState('all')

  const handleAddTask = (colId) => {
    if (!newTitle.trim()) return
    addTask({
      title: newTitle,
      status: colId,
      priority: 'medium',
      assignee: 'u1',
      dueDate: '',
      tags: [],
      description: '',
      subtasks: [],
    })
    setNewTitle('')
    setAddingTo(null)
  }

  const filteredTasks = (status) =>
    tasks.filter(t => {
      if (t.status !== status) return false
      if (filter === 'all') return true
      return t.priority === filter
    })

  const todoCount = tasks.filter(t => t.status === 'todo').length
  const progressCount = tasks.filter(t => t.status === 'inprogress').length
  const doneCount = tasks.filter(t => t.status === 'done').length

  return (
    <div className="space-y-4">
      {/* Summary Bar */}
      <div className="card p-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-gold" />
            <span className="text-sm font-semibold text-text-primary">Görev Özeti</span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-text-muted" />
              <span className="text-xs text-text-muted">Bekleyen: <span className="text-text-primary font-semibold">{todoCount}</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-status-info" />
              <span className="text-xs text-text-muted">Devam: <span className="text-text-primary font-semibold">{progressCount}</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-status-success" />
              <span className="text-xs text-text-muted">Bitti: <span className="text-text-primary font-semibold">{doneCount}</span></span>
            </div>
          </div>
          {/* Mini progress */}
          <div className="hidden md:block w-32">
            <div className="h-2 bg-bg-border rounded-full overflow-hidden flex">
              <div className="h-full bg-status-success" style={{ width: `${tasks.length > 0 ? (doneCount / tasks.length) * 100 : 0}%` }} />
              <div className="h-full bg-status-info" style={{ width: `${tasks.length > 0 ? (progressCount / tasks.length) * 100 : 0}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2">
        {['all', 'high', 'medium', 'low'].map(f => (
          <button
            key={f}
            id={`filter-${f}`}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200
                        ${filter === f ? 'bg-gold text-bg-base' : 'bg-bg-elevated text-text-muted hover:text-text-primary border border-bg-border'}`}
          >
            {{ all: 'Tümü', high: 'Yüksek', medium: 'Orta', low: 'Düşük' }[f]}
          </button>
        ))}
        <div className="ml-auto text-xs text-text-muted">
          {tasks.length} görev toplam
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {COLUMNS.map(col => {
          const colTasks = filteredTasks(col.id)
          return (
            <div key={col.id} id={`column-${col.id}`} className="flex flex-col gap-3">
              {/* Column Header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${col.dot}`} />
                  <span className={`text-sm font-semibold ${col.color}`}>{col.label}</span>
                  <span className="text-xs text-text-muted bg-bg-elevated border border-bg-border
                                   w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {colTasks.length}
                  </span>
                </div>
                <button
                  id={`add-${col.id}`}
                  onClick={() => setAddingTo(col.id)}
                  className="w-6 h-6 rounded-lg bg-bg-elevated border border-bg-border flex items-center justify-center
                             text-text-muted hover:text-gold hover:border-gold/50 transition-all duration-200"
                >
                  <Plus size={12} />
                </button>
              </div>

              {/* Cards */}
              <div className="space-y-2 min-h-[120px]">
                <AnimatePresence mode="popLayout">
                  {colTasks.map(task => (
                    <TaskCard key={task.id} task={task} onOpen={setSelectedTask} onMove={moveTask} />
                  ))}
                </AnimatePresence>

                {/* Add Card Input */}
                <AnimatePresence>
                  {addingTo === col.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="card p-3"
                    >
                      <textarea
                        autoFocus
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAddTask(col.id) } if (e.key === 'Escape') { setAddingTo(null); setNewTitle('') } }}
                        placeholder="Görev başlığı..."
                        className="input-field w-full resize-none text-sm"
                        rows={2}
                      />
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => handleAddTask(col.id)} className="btn-primary py-1 flex-1 text-xs">Ekle</button>
                        <button onClick={() => { setAddingTo(null); setNewTitle('') }} className="btn-ghost py-1 text-xs">İptal</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Empty State */}
                {colTasks.length === 0 && addingTo !== col.id && (
                  <div className="border-2 border-dashed border-bg-border rounded-2xl p-6 text-center">
                    <p className="text-xs text-text-muted">Görev yok</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  )
}
