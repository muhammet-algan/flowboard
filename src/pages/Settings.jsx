import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Shield, Palette, Globe, Check, Info } from 'lucide-react'
import { currentUser } from '../data/mockData'

const SECTIONS = [
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'notifications', label: 'Bildirimler', icon: Bell },
  { id: 'security', label: 'Güvenlik', icon: Shield },
  { id: 'appearance', label: 'Görünüm', icon: Palette },
  { id: 'language', label: 'Dil & Bölge', icon: Globe },
]

export default function Settings() {
  const [active, setActive] = useState('profile')
  const [name, setName] = useState(currentUser.name)
  const [role, setRole] = useState(currentUser.role)
  const [email, setEmail] = useState(currentUser.email)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Nav */}
        <div className="md:col-span-1">
          <nav className="card p-2 space-y-1">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                id={`settings-${s.id}`}
                onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium
                            transition-all duration-200
                            ${active === s.id ? 'bg-gold-dim text-gold' : 'text-text-muted hover:text-text-primary hover:bg-bg-elevated'}`}
              >
                <s.icon size={15} />
                {s.label}
              </button>
            ))}
          </nav>

          {/* Plan Info */}
          <div className="card p-4 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-pro text-[10px]">PRO</span>
              <span className="text-xs text-text-primary font-semibold">FlowBoard Pro</span>
            </div>
            <p className="text-xs text-text-muted">Tüm premium özellikler aktif</p>
            <div className="mt-3 h-1 bg-bg-border rounded-full overflow-hidden">
              <div className="h-full w-[67%] rounded-full bg-purple-gradient" />
            </div>
            <p className="text-xs text-text-muted mt-1">Depolama: 6.7 / 10 GB</p>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {active === 'profile' && (
              <div className="card p-5 space-y-5">
                <h2 className="text-sm font-semibold text-text-primary">Profil Bilgileri</h2>

                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-bg-base shadow-gold-sm"
                    style={{ backgroundColor: currentUser.avatarColor }}
                  >
                    {currentUser.avatar}
                  </div>
                  <div>
                    <button className="btn-primary text-xs">Fotoğraf Değiştir</button>
                    <p className="text-xs text-text-muted mt-1.5">JPG, PNG, GIF · Maks 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">Ad Soyad</label>
                    <input id="setting-name" value={name} onChange={e => setName(e.target.value)} className="input-field w-full" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">Rol</label>
                    <input id="setting-role" value={role} onChange={e => setRole(e.target.value)} className="input-field w-full" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">E-posta</label>
                    <input id="setting-email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field w-full" />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-bg-border">
                  <button
                    id="save-profile-btn"
                    onClick={handleSave}
                    className={`btn-primary flex items-center gap-2 transition-all duration-300
                                ${saved ? 'bg-status-success text-white' : ''}`}
                  >
                    {saved ? <><Check size={14} /> Kaydedildi</> : 'Değişiklikleri Kaydet'}
                  </button>
                  <button className="btn-ghost">İptal</button>
                </div>
              </div>
            )}

            {active === 'notifications' && (
              <div className="card p-5 space-y-4">
                <h2 className="text-sm font-semibold text-text-primary">Bildirim Tercihleri</h2>
                {[
                  { label: 'Görev atamaları', desc: 'Size bir görev atandığında bildirim al', on: true },
                  { label: 'Görev tamamlama', desc: 'Ekip üyesi görevi tamamladığında bildirim al', on: true },
                  { label: 'Yorum bildirimleri', desc: 'Görevlerinize yorum yapıldığında bildirim al', on: false },
                  { label: 'Sprint hatırlatıcıları', desc: 'Sprint bitiş tarihlerinden önce hatırlat', on: true },
                  { label: 'Haftalık özet', desc: 'Her Pazartesi haftalık performans özeti gönder', on: false },
                  { label: 'Masaüstü bildirimleri', desc: 'Tarayıcı push bildirimleri al', on: true },
                ].map((item, i) => (
                  <NotifRow key={i} {...item} />
                ))}
              </div>
            )}

            {active === 'security' && (
              <div className="card p-5 space-y-5">
                <h2 className="text-sm font-semibold text-text-primary">Güvenlik</h2>
                <div>
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">Mevcut Şifre</label>
                  <input id="current-pass" type="password" placeholder="••••••••" className="input-field w-full" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">Yeni Şifre</label>
                  <input id="new-pass" type="password" placeholder="••••••••" className="input-field w-full" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">Şifre Tekrar</label>
                  <input id="confirm-pass" type="password" placeholder="••••••••" className="input-field w-full" />
                </div>
                <div className="flex items-start gap-2 p-3 rounded-xl bg-bg-elevated border border-bg-border">
                  <Info size={14} className="text-status-info flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-text-muted">Şifreniz en az 8 karakter, bir büyük harf, bir rakam ve bir özel karakter içermelidir.</p>
                </div>
                <button className="btn-primary">Şifreyi Güncelle</button>
              </div>
            )}

            {active === 'appearance' && (
              <div className="card p-5 space-y-5">
                <h2 className="text-sm font-semibold text-text-primary">Görünüm</h2>
                <div>
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Tema</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Karanlık (Varsayılan)', active: true, preview: '#0A0A0F' },
                      { label: 'Derin Lacivert', active: false, preview: '#0D1117' },
                    ].map((t, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-xl border cursor-pointer transition-all duration-200
                                    ${t.active ? 'border-gold bg-gold-dim' : 'border-bg-border hover:border-bg-elevated'}`}
                      >
                        <div className="w-full h-16 rounded-lg mb-3" style={{ backgroundColor: t.preview }}>
                          <div className="p-2 flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-bg-border" />
                            <div className="flex-1 h-2 rounded bg-bg-border" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-text-primary font-medium">{t.label}</span>
                          {t.active && <div className="w-4 h-4 rounded-full bg-gold flex items-center justify-center"><Check size={10} className="text-bg-base" /></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Vurgu Rengi</p>
                  <div className="flex gap-2">
                    {['#F5C842', '#3B82F6', '#22C55E', '#A855F7', '#EF4444'].map((c, i) => (
                      <button key={i} className={`w-8 h-8 rounded-full transition-transform duration-200 ${i === 0 ? 'scale-125 ring-2 ring-white/30' : 'hover:scale-110'}`} style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Yazı Boyutu</p>
                  <div className="flex gap-2">
                    {['Küçük', 'Orta', 'Büyük'].map((size, i) => (
                      <button
                        key={size}
                        className={`text-xs px-4 py-2 rounded-xl border transition-all duration-200
                                    ${i === 1 ? 'border-gold bg-gold-dim text-gold' : 'border-bg-border text-text-muted hover:text-text-primary hover:border-bg-elevated'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {active === 'language' && (
              <div className="card p-5 space-y-5">
                <h2 className="text-sm font-semibold text-text-primary">Dil & Bölge Ayarları</h2>
                <div>
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">Uygulama Dili</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { code: 'tr', label: 'Türkçe', flag: '🇹🇷', active: true },
                      { code: 'en', label: 'English', flag: '🇬🇧', active: false },
                    ].map(lang => (
                      <div
                        key={lang.code}
                        className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 flex items-center gap-3
                                    ${lang.active ? 'border-gold bg-gold-dim' : 'border-bg-border hover:border-bg-elevated'}`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <div>
                          <p className="text-sm text-text-primary font-medium">{lang.label}</p>
                        </div>
                        {lang.active && (
                          <div className="ml-auto w-4 h-4 rounded-full bg-gold flex items-center justify-center">
                            <Check size={10} className="text-bg-base" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">Saat Dilimi</label>
                  <select className="input-field w-full" defaultValue="europe-istanbul">
                    <option value="europe-istanbul">Europe/Istanbul (UTC+3)</option>
                    <option value="europe-london">Europe/London (UTC+0)</option>
                    <option value="america-newyork">America/New_York (UTC-5)</option>
                    <option value="asia-tokyo">Asia/Tokyo (UTC+9)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">Tarih Formatı</label>
                  <div className="flex gap-2">
                    {['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'].map((fmt, i) => (
                      <button
                        key={fmt}
                        className={`text-xs px-3 py-2 rounded-xl border font-mono transition-all duration-200
                                    ${i === 0 ? 'border-gold bg-gold-dim text-gold' : 'border-bg-border text-text-muted hover:text-text-primary hover:border-bg-elevated'}`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-2">Haftanın İlk Günü</label>
                  <div className="flex gap-2">
                    {['Pazartesi', 'Pazar'].map((day, i) => (
                      <button
                        key={day}
                        className={`text-xs px-4 py-2 rounded-xl border transition-all duration-200
                                    ${i === 0 ? 'border-gold bg-gold-dim text-gold' : 'border-bg-border text-text-muted hover:text-text-primary hover:border-bg-elevated'}`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function NotifRow({ label, desc, on: initialOn }) {
  const [on, setOn] = useState(initialOn)
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-bg-border/50 last:border-0">
      <div>
        <p className="text-sm text-text-primary font-medium">{label}</p>
        <p className="text-xs text-text-muted mt-0.5">{desc}</p>
      </div>
      <button
        onClick={() => setOn(o => !o)}
        className={`relative w-10 h-5 rounded-full transition-colors duration-300 flex-shrink-0 mt-0.5
                    ${on ? 'bg-gold' : 'bg-bg-border'}`}
      >
        <motion.div
          animate={{ x: on ? 22 : 2 }}
          transition={{ duration: 0.2 }}
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
        />
      </button>
    </div>
  )
}
