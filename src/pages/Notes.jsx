import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Pin, PinOff, Edit3, Trash2, Check, Search } from 'lucide-react'
import useAppStore from '../store/useAppStore'

const NOTE_COLORS = ['#F5C842', '#3B82F6', '#22C55E', '#EF4444', '#A855F7', '#F59E0B', '#EC4899']

function NoteCard({ note, onDelete, onPin, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const handleSave = () => {
    onUpdate(note.id, { title, content })
    setEditing(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      id={`note-${note.id}`}
      className="card p-4 flex flex-col gap-3 hover:border-white/10 transition-all duration-200 group"
      style={{ borderTopColor: note.color, borderTopWidth: 3 }}
    >
      <div className="flex items-start justify-between gap-2">
        {editing ? (
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="input-field flex-1 text-sm font-semibold py-1"
            autoFocus
          />
        ) : (
          <p className="text-sm font-semibold text-text-primary flex-1">{note.title}</p>
        )}

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {editing ? (
            <button onClick={handleSave} className="w-7 h-7 rounded-lg bg-status-success/20 flex items-center justify-center text-status-success hover:bg-status-success/30 transition-colors">
              <Check size={12} />
            </button>
          ) : (
            <button onClick={() => setEditing(true)} className="w-7 h-7 rounded-lg bg-bg-elevated flex items-center justify-center text-text-muted hover:text-text-primary transition-colors">
              <Edit3 size={12} />
            </button>
          )}
          <button onClick={() => onPin(note.id)} className={`w-7 h-7 rounded-lg bg-bg-elevated flex items-center justify-center transition-colors
                                                              ${note.pinned ? 'text-gold' : 'text-text-muted hover:text-text-primary'}`}>
            {note.pinned ? <Pin size={12} /> : <PinOff size={12} />}
          </button>
          <button onClick={() => onDelete(note.id)} className="w-7 h-7 rounded-lg bg-bg-elevated flex items-center justify-center text-text-muted hover:text-status-danger transition-colors">
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {editing ? (
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="input-field text-xs resize-none"
          rows={4}
        />
      ) : (
        <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-line line-clamp-4">{note.content}</p>
      )}

      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs text-text-muted font-mono">{note.createdAt}</span>
        {note.pinned && (
          <span className="text-xs text-gold bg-gold-dim px-2 py-0.5 rounded-full flex items-center gap-1">
            <Pin size={10} /> Sabit
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function Notes() {
  const { notes, addNote, deleteNote, updateNote, togglePinNote } = useAppStore()
  const [showAdd, setShowAdd] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newColor, setNewColor] = useState(NOTE_COLORS[0])
  const [searchQuery, setSearchQuery] = useState('')

  const handleAdd = () => {
    if (!newTitle.trim()) return
    addNote({ title: newTitle, content: newContent, color: newColor, pinned: false })
    setNewTitle('')
    setNewContent('')
    setNewColor(NOTE_COLORS[0])
    setShowAdd(false)
  }

  // Filter notes by search query
  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes
    const q = searchQuery.toLowerCase()
    return notes.filter(n =>
      n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    )
  }, [notes, searchQuery])

  const pinned = filteredNotes.filter(n => n.pinned)
  const unpinned = filteredNotes.filter(n => !n.pinned)

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <p className="text-sm text-text-muted flex-shrink-0">{notes.length} not</p>

          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              id="notes-search"
              type="text"
              placeholder="Notlarda ara..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input-field w-full pl-9 py-2"
            />
          </div>
        </div>
        <button
          id="add-note-btn"
          onClick={() => setShowAdd(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={14} />
          Yeni Not
        </button>
      </div>

      {/* Search Results Info */}
      {searchQuery.trim() && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-text-muted">
            "{searchQuery}" için <span className="text-text-primary font-semibold">{filteredNotes.length}</span> sonuç bulundu
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-gold hover:text-gold-muted transition-colors"
          >
            Aramayı temizle
          </button>
        </div>
      )}

      {/* Add Note Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg-base/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAdd(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card w-full max-w-md p-5 shadow-card"
              style={{ borderTopColor: newColor, borderTopWidth: 4 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-text-primary">Yeni Not</h3>
                <button onClick={() => setShowAdd(false)} className="text-text-muted hover:text-text-primary">
                  <X size={16} />
                </button>
              </div>
              <div className="space-y-3">
                <input
                  id="note-title-input"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Başlık..."
                  className="input-field w-full font-medium"
                  autoFocus
                />
                <textarea
                  id="note-content-input"
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  placeholder="Not içeriği..."
                  className="input-field w-full resize-none"
                  rows={5}
                />
                <div>
                  <p className="text-xs text-text-muted mb-2">Renk</p>
                  <div className="flex gap-2">
                    {NOTE_COLORS.map(c => (
                      <button
                        key={c}
                        onClick={() => setNewColor(c)}
                        className={`w-6 h-6 rounded-full transition-all duration-200 ${newColor === c ? 'scale-125 ring-2 ring-white/30' : ''}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleAdd} className="btn-primary flex-1">Kaydet</button>
                  <button onClick={() => setShowAdd(false)} className="btn-ghost">İptal</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pinned Notes */}
      {pinned.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Pin size={12} className="text-gold" />
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Sabitlenmiş</p>
            <span className="text-xs text-text-muted">({pinned.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {pinned.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={deleteNote}
                  onPin={togglePinNote}
                  onUpdate={updateNote}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* All Notes */}
      <div>
        {pinned.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Diğerleri</p>
            <span className="text-xs text-text-muted">({unpinned.length})</span>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {unpinned.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={deleteNote}
                onPin={togglePinNote}
                onUpdate={updateNote}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty search state */}
        {filteredNotes.length === 0 && searchQuery.trim() && (
          <div className="card p-12 text-center">
            <Search size={32} className="text-text-muted mx-auto mb-3 opacity-50" />
            <p className="text-sm text-text-muted">Aramanızla eşleşen not bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  )
}
