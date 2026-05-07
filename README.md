<div align="center">

# ⚡ FlowBoard

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white&style=flat-square)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)
![License](https://img.shields.io/badge/Lisans-MIT-F5C842?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PR-Hoş%20Geldiniz-22C55E?style=flat-square)

**Modern ve premium bir verimlilik & ekip yönetim paneli**

![Dashboard Preview](docs/images/dashboard.png)

</div>

---

FlowBoard, modern web teknolojileriyle geliştirilmiş, hem bireysel kullanıcılar hem de ekipler için tasarlanmış yüksek performanslı bir verimlilik ve yönetim panelidir. Üst düzey estetiği güçlü işlevsellikle birleştirerek, günlük işlerinizde "akış" (flow) haline geçmenize yardımcı olur.

---

## ✨ Öne Çıkan Özellikler

### 📊 Dinamik Kontrol Paneli (Dashboard)
Verimliliğinizin kuş bakışı görünümü. Etkileşimli grafikler, gerçek zamanlı analitikler ve kritik performans göstergeleri (KPI) ile durumunuzu anlık olarak takip edin.
- Haftalık verimlilik trendleri
- Görev dağılım animasyonları
- Ekip performans skorları
- Sprint hedef takibi

### 📋 Gelişmiş Kanban Panosu
Görevlerinizi sürükle-bırak arayüzü ile kolayca yönetin. Öncelik seviyeleri, üye atamaları ve alt görev takibi ile hiçbir detayı kaçırmayın.
- **Drag & Drop:** `@dnd-kit` ile pürüzsüz kart ve sütun taşıma.
- **Detaylı Görevler:** Etiketler, bitiş tarihleri ve açıklama alanları.
- **Filtreleme:** Öncelik seviyesine göre anlık görev süzme.
- **Özet Çubuğu:** Duruma göre görev dağılımı ve mini ilerleme çubuğu.

![Kanban Preview](docs/images/kanban.png)

### ⚡ Odaklanma Modu (Focus Mode)
Derin çalışma (deep work) için özel bir alan. Dahili Pomodoro zamanlayıcısı ve dikkat dağıtıcı unsurlardan arındırılmış arayüz ile üretkenliğinizi zirveye taşıyın.
- Ayarlanabilir çalışma ve mola süreleri.
- Oturum geçmişi ve istatistik takibi.
- Motivasyon alıntıları ile odaklanma desteği.
- Çalışırken sayfa başlığında zamanlayıcı gösterimi.

![Focus Preview](docs/images/focus.png)

### 📝 Entegre Notlar
Fikirlerinizi anında kaydedin ve dokümantasyonunuzu platformdan ayrılmadan yönetin.
- Renk kodlu not kategorileri.
- Önemli notları başa tutturma (pin) özelliği.
- Hızlı arama ve filtreleme.
- Arama sonucu vurgulama.

![Notes Preview](docs/images/notes.png)

### 👥 Ekip İşbirliği
Ekip üyelerini yönetin, görev atamalarını takip edin ve kolektif performansı optimize edin.
- Üye çevrimiçi/çevrimdışı durumu.
- Bireysel performans skorları.
- Görev yükü dağılımı.
- Ekip özet kartları ve KPI göstergeleri.

### 🔍 Global Arama
`Ctrl+K` kısayolu ile anlık olarak görev ve notlarınızda arama yapın. Sonuçlar yazarken gerçek zamanlı listelenir.

### ⚙️ Zengin Ayarlar
- Profil yönetimi
- Bildirim tercihleri
- Güvenlik (şifre değiştirme)
- Görünüm (tema, vurgu rengi, yazı boyutu)
- Dil ve bölge ayarları (Türkçe/İngilizce, saat dilimi, tarih formatı)

---

## 🛠️ Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| **Frontend** | [React.js](https://reactjs.org/) (Vite altyapısı ile) |
| **Stil Yönetimi** | [Tailwind CSS](https://tailwindcss.com/) |
| **Durum Yönetimi** | [Zustand](https://github.com/pmndrs/zustand) |
| **Animasyonlar** | [Framer Motion](https://www.framer.com/motion/) |
| **Grafikler** | [Recharts](https://recharts.org/) |
| **İkon Seti** | [Lucide React](https://lucide.dev/) |
| **Sürükle-Bırak** | [@dnd-kit](https://dndkit.com/) |
| **Font** | [Inter](https://fonts.google.com/specimen/Inter) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) |

---

## 🚀 Başlangıç

### Ön Gereksinimler

- Node.js (v18 veya üzeri)
- npm veya yarn paket yöneticisi

### Kurulum Adımları

1.  **Projeyi klonlayın:**
    ```bash
    git clone https://github.com/muhammet-algan/flowboard.git
    cd flowboard
    ```

2.  **Bağımlılıkları yükleyin:**
    ```bash
    npm install
    ```

3.  **Geliştirme sunucusunu başlatın:**
    ```bash
    npm run dev
    ```

4.  **Tarayıcınızda açın:**
    Uygulamayı görmek için tarayıcınızda `http://localhost:5173` adresine gidin.

---

## 📂 Proje Yapısı

```text
src/
├── components/
│   └── layout/      # Sidebar, Header, Layout bileşenleri
├── pages/           # Dashboard, Tasks, Focus, Team, Notes, Settings
├── store/           # Zustand state yönetimi (global arama dahil)
├── data/            # Mock veri setleri, sprint ve motivasyon verileri
└── index.css        # Global stiller, bileşen sınıfları ve Tailwind
```

---

## 🤝 Katkıda Bulunma

Katkılarınız her zaman memnuniyetle karşılanır! Projeye katkıda bulunmak isterseniz:

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: yeni özellik ekle'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request açın

---

## 📄 Lisans

Bu proje MIT Lisansı ile lisanslanmıştır - detaylar için [LICENSE](LICENSE) dosyasına göz atabilirsiniz.
