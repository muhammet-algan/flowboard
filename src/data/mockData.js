// ──────────────────────────────────────────────────────────
// FlowBoard Mock Data
// ──────────────────────────────────────────────────────────

export const currentUser = {
  id: 'u1',
  name: 'Muhammed Yıldız',
  role: 'Lead Developer',
  email: 'm.yildiz@flowboard.io',
  avatar: 'MY',
  avatarColor: '#F5C842',
  joinDate: '2024-01-15',
  plan: 'Pro',
}

export const teamMembers = [
  { id: 'u1', name: 'Muhammed Yıldız', role: 'Lead Developer', avatar: 'MY', avatarColor: '#F5C842', tasks: 12, completed: 9, score: 94, online: true },
  { id: 'u2', name: 'Elif Kaya',        role: 'UI/UX Designer',  avatar: 'EK', avatarColor: '#3B82F6', tasks: 8,  completed: 7, score: 88, online: true },
  { id: 'u3', name: 'Ahmet Demir',      role: 'Backend Dev',     avatar: 'AD', avatarColor: '#22C55E', tasks: 15, completed: 11,score: 82, online: false },
  { id: 'u4', name: 'Zeynep Arslan',    role: 'DevOps Engineer', avatar: 'ZA', avatarColor: '#A855F7', tasks: 6,  completed: 6, score: 100,online: true },
  { id: 'u5', name: 'Can Öztürk',       role: 'Frontend Dev',    avatar: 'CÖ', avatarColor: '#EF4444', tasks: 10, completed: 6, score: 72, online: false },
]

export const tasks = [
  // TO DO
  { id: 't1', title: 'Auth sistemi için JWT refresh token implemente et', status: 'todo', priority: 'high', assignee: 'u3', dueDate: '2025-05-15', tags: ['backend', 'security'], description: 'Access token süresi dolduğunda refresh token kullanarak yeni token üretme mekanizması kurulacak.', subtasks: [{id:'s1', text:'Token rotation logic', done: false},{id:'s2', text:'Redis integration', done: false}], createdAt: '2025-05-06' },
  { id: 't2', title: 'Dashboard için karanlık tema toggle ekle', status: 'todo', priority: 'low', assignee: 'u2', dueDate: '2025-05-20', tags: ['frontend', 'ui'], description: 'Kullanıcı tercihine göre tema değiştirme özelliği.', subtasks: [], createdAt: '2025-05-06' },
  { id: 't3', title: 'API rate limiting middleware yaz', status: 'todo', priority: 'medium', assignee: 'u4', dueDate: '2025-05-18', tags: ['devops', 'api'], description: 'Her IP için dakikada 100 istek sınırı koyulacak.', subtasks: [{id:'s3', text:'Redis counter', done: false}], createdAt: '2025-05-05' },
  { id: 't4', title: 'Onboarding flow tasarımını bitir', status: 'todo', priority: 'medium', assignee: 'u2', dueDate: '2025-05-22', tags: ['design'], description: 'Yeni kullanıcılar için adım adım karşılama ekranı.', subtasks: [], createdAt: '2025-05-04' },
  // IN PROGRESS
  { id: 't5', title: 'FlowBoard Kanban board bileşeni geliştir', status: 'inprogress', priority: 'high', assignee: 'u1', dueDate: '2025-05-10', tags: ['frontend', 'feature'], description: 'Drag & drop destekli görev tahtası.', subtasks: [{id:'s4', text:'dnd-kit entegrasyonu', done: true},{id:'s5', text:'Card tasarımı', done: true},{id:'s6', text:'Column sıralama', done: false}], createdAt: '2025-05-03' },
  { id: 't6', title: 'PostgreSQL veritabanı şemasını migrate et', status: 'inprogress', priority: 'high', assignee: 'u3', dueDate: '2025-05-09', tags: ['backend', 'database'], description: 'Users, tasks ve activity_logs tablolarını oluştur.', subtasks: [{id:'s7', text:'Migration dosyaları', done: true},{id:'s8', text:'Seed data', done: false}], createdAt: '2025-05-02' },
  { id: 't7', title: 'CI/CD pipeline kur (GitHub Actions)', status: 'inprogress', priority: 'medium', assignee: 'u4', dueDate: '2025-05-12', tags: ['devops'], description: 'Her PR üzerinde otomatik test ve deploy akışı.', subtasks: [{id:'s9', text:'Test workflow', done: true}], createdAt: '2025-05-01' },
  { id: 't8', title: 'Pomodoro zamanlayıcı hook yaz', status: 'inprogress', priority: 'low', assignee: 'u5', dueDate: '2025-05-14', tags: ['frontend'], description: 'usePomodoro custom hook ile sayaç ve oturum yönetimi.', subtasks: [], createdAt: '2025-05-01' },
  // DONE
  { id: 't9',  title: 'Figma tasarım sistemini oluştur', status: 'done', priority: 'high', assignee: 'u2', dueDate: '2025-05-01', tags: ['design'], description: 'Tüm bileşenler ve renk paletini Figma\'da dokümante et.', subtasks: [], createdAt: '2025-04-28' },
  { id: 't10', title: 'React Router v6 kurulumu ve routing yapısı', status: 'done', priority: 'medium', assignee: 'u1', dueDate: '2025-05-02', tags: ['frontend'], description: 'Tüm sayfa rotaları ve layout wrapper tamamlandı.', subtasks: [], createdAt: '2025-04-27' },
  { id: 't11', title: 'Tailwind CSS yapılandırması', status: 'done', priority: 'low', assignee: 'u1', dueDate: '2025-05-01', tags: ['frontend', 'ui'], description: 'Design token sistemi ve custom utilities oluşturuldu.', subtasks: [], createdAt: '2025-04-26' },
  { id: 't12', title: 'Mock veri seti hazırla', status: 'done', priority: 'low', assignee: 'u5', dueDate: '2025-05-03', tags: ['backend'], description: 'Geliştirme ortamı için gerçekçi test verisi.', subtasks: [], createdAt: '2025-04-25' },
]

export const weeklyData = [
  { day: 'Pzt', completed: 8, created: 12 },
  { day: 'Sal', completed: 12, created: 9 },
  { day: 'Çrş', completed: 6, created: 14 },
  { day: 'Prş', completed: 15, created: 11 },
  { day: 'Cum', completed: 10, created: 7 },
  { day: 'Cmt', completed: 4, created: 3 },
  { day: 'Paz', completed: 7, created: 5 },
]

export const activityFeed = [
  { id: 'a1', user: 'u1', action: 'tamamladı', target: 'Tailwind CSS yapılandırması', time: '2 dk önce', type: 'complete' },
  { id: 'a2', user: 'u2', action: 'ekledi', target: 'Onboarding flow tasarımını bitir', time: '15 dk önce', type: 'create' },
  { id: 'a3', user: 'u3', action: 'güncelledi', target: 'PostgreSQL veritabanı şemasını migrate et', time: '32 dk önce', type: 'update' },
  { id: 'a4', user: 'u4', action: 'tamamladı', target: 'Test workflow', time: '1 sa önce', type: 'complete' },
  { id: 'a5', user: 'u5', action: 'başladı', target: 'Pomodoro zamanlayıcı hook yaz', time: '2 sa önce', type: 'start' },
  { id: 'a6', user: 'u1', action: 'yorum yaptı', target: 'FlowBoard Kanban board bileşeni geliştir', time: '3 sa önce', type: 'comment' },
  { id: 'a7', user: 'u2', action: 'tamamladı', target: 'Figma tasarım sistemini oluştur', time: '1 gün önce', type: 'complete' },
]

export const notes = [
  { id: 'n1', title: 'API Sözleşmesi Notları', content: 'Tüm endpoint\'ler /api/v1/ prefix\'iyle başlamalı. Response formatı: { data, error, meta } şeklinde standardize edilecek.', color: '#F5C842', pinned: true, createdAt: '2025-05-06' },
  { id: 'n2', title: 'Sprint 3 Hedefleri', content: '1. Kanban board tamamla\n2. Auth sistemi\n3. Dashboard grafikler\n4. Mobil responsive', color: '#3B82F6', pinned: true, createdAt: '2025-05-05' },
  { id: 'n3', title: 'Teknik Borç Listesi', content: 'useEffect temizleme hook\'ları eksik. Error boundary eklenecek. Bundle boyutu optimize edilecek.', color: '#EF4444', pinned: false, createdAt: '2025-05-04' },
  { id: 'n4', title: 'Tasarım Referansları', content: 'Linear.app, Vercel Dashboard, Raycast UI kitaplığından ilham alındı. Minimal ve işlevsel.', color: '#22C55E', pinned: false, createdAt: '2025-05-03' },
  { id: 'n5', title: 'Performans İpuçları', content: 'React.memo kullan, virtualize et. Recharts lazy load edilecek. Image optimization için next/image.', color: '#A855F7', pinned: false, createdAt: '2025-05-02' },
  { id: 'n6', title: 'Toplantı Notları', content: 'Haftalık sync her Pazartesi 10:00. Demo her Cuma 16:00. Retrospective Cuma 17:30\'da.', color: '#F59E0B', pinned: false, createdAt: '2025-05-01' },
]

export const pomodoroHistory = [
  { id: 'p1', date: '2025-05-06', sessions: 6, focusMinutes: 150, breaks: 5 },
  { id: 'p2', date: '2025-05-05', sessions: 8, focusMinutes: 200, breaks: 7 },
  { id: 'p3', date: '2025-05-04', sessions: 4, focusMinutes: 100, breaks: 3 },
  { id: 'p4', date: '2025-05-03', sessions: 10, focusMinutes: 250, breaks: 9 },
  { id: 'p5', date: '2025-05-02', sessions: 5, focusMinutes: 125, breaks: 4 },
]

export const kpiData = {
  totalTasks: 12,
  completedToday: 4,
  inProgress: 4,
  teamScore: 87,
  pomodorosToday: 6,
  upcomingDeadlines: 3,
}

// ── Sprint Milestone Data ──────────────────────────────────
export const sprintData = {
  name: 'Sprint 3',
  startDate: '2025-05-01',
  endDate: '2025-05-14',
  totalTasks: 12,
  completedTasks: 4,
  goals: [
    { id: 'g1', text: 'Kanban board MVP tamamla', done: true },
    { id: 'g2', text: 'Auth sistemi entegrasyonu', done: false },
    { id: 'g3', text: 'Dashboard grafik bileşenleri', done: true },
    { id: 'g4', text: 'CI/CD pipeline kurulumu', done: false },
  ]
}

// ── Motivational Quotes ────────────────────────────────────
export const motivationalQuotes = [
  { text: 'Odaklanmak, hayır demeyi bilmektir.', author: 'Steve Jobs' },
  { text: 'Başarı, küçük çabaların tekrarıdır.', author: 'Robert Collier' },
  { text: 'Bugün yapabileceklerini yarına bırakma.', author: 'Benjamin Franklin' },
  { text: 'Basitlik, en üst düzey inceliktir.', author: 'Leonardo da Vinci' },
  { text: 'İlerlemek, mükemmel olmaktan daha önemlidir.', author: 'Mark Zuckerberg' },
  { text: 'Kod yazmak, düşünmenin somut halidir.', author: 'Linus Torvalds' },
  { text: 'Her uzman bir zamanlar amatördü.', author: 'Helen Hayes' },
]
