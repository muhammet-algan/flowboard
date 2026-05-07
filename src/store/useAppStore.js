import { create } from 'zustand'
import { tasks as initialTasks, notes as initialNotes, teamMembers } from '../data/mockData'

const useAppStore = create((set, get) => ({
  // ── Tasks ──────────────────────────────────────────────
  tasks: initialTasks,
  
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: `t${Date.now()}`, createdAt: new Date().toISOString().split('T')[0] }]
  })),
  
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
  })),
  
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(t => t.id !== id)
  })),

  moveTask: (id, newStatus) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, status: newStatus } : t)
  })),

  toggleSubtask: (taskId, subtaskId) => set((state) => ({
    tasks: state.tasks.map(t => 
      t.id === taskId
        ? { ...t, subtasks: t.subtasks.map(s => s.id === subtaskId ? { ...s, done: !s.done } : s) }
        : t
    )
  })),

  // ── Notes ─────────────────────────────────────────────
  notes: initialNotes,
  
  addNote: (note) => set((state) => ({
    notes: [{ ...note, id: `n${Date.now()}`, createdAt: new Date().toISOString().split('T')[0] }, ...state.notes]
  })),
  
  updateNote: (id, updates) => set((state) => ({
    notes: state.notes.map(n => n.id === id ? { ...n, ...updates } : n)
  })),
  
  deleteNote: (id) => set((state) => ({
    notes: state.notes.filter(n => n.id !== id)
  })),

  togglePinNote: (id) => set((state) => ({
    notes: state.notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n)
  })),

  // ── Team ──────────────────────────────────────────────
  teamMembers,

  // ── UI State ──────────────────────────────────────────
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  activeTaskModal: null,
  openTaskModal: (task) => set({ activeTaskModal: task }),
  closeTaskModal: () => set({ activeTaskModal: null }),

  // ── Global Search ─────────────────────────────────────
  globalSearchQuery: '',
  setGlobalSearchQuery: (query) => set({ globalSearchQuery: query }),
  
  getSearchResults: () => {
    const { tasks, notes, globalSearchQuery } = get()
    if (!globalSearchQuery.trim()) return { tasks: [], notes: [] }
    const q = globalSearchQuery.toLowerCase()
    return {
      tasks: tasks.filter(t => t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q)),
      notes: notes.filter(n => n.title.toLowerCase().includes(q) || n.content?.toLowerCase().includes(q)),
    }
  },

  // ── Notifications ──────────────────────────────────────
  notifications: [
    { id: 'notif1', text: 'Elif Kaya bir göreve yorum yaptı', time: '5 dk önce', read: false },
    { id: 'notif2', text: 'Sprint 3 review bugün 16:00\'da', time: '1 sa önce', read: false },
    { id: 'notif3', text: 'JWT token görevi size atandı', time: '2 sa önce', read: true },
    { id: 'notif4', text: 'CI/CD pipeline başarıyla tamamlandı', time: '3 sa önce', read: true },
    { id: 'notif5', text: 'Yeni ekip üyesi katıldı: Can Öztürk', time: '1 gün önce', read: true },
  ],
  markAllRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  })),
  
  dismissNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
}))

export default useAppStore
