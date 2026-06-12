Focushion - Odaklanma ve Topluluk Platformu
Focushion, kullanıcıların odaklanma sürelerini artırmalarına yardımcı olan, sosyal medya özellikleriyle zenginleştirilmiş modern bir web uygulamasıdır. Pomodoro tekniği, topluluk desteği ve sosyal etkileşimleri bir araya getirir.

🚀 Özellikler
📱 Ana Sayfa (Landing Page)
Apple UI / Glassmorphism tasarım

Canlı kullanıcı sayacı

Avatar stack (sosyal kanıt)

CTA butonları ile kayıt/giriş yönlendirmesi

🎯 Odaklanma Seansları
25 dakika odaklanma / 5 dakika mola (Pomodoro tekniği)

Konu bazlı odaklanma: Matematik, Fizik, Bilgisayar Bilimleri, Tasarım, Dil Öğrenimi, İş Hayatı

Özel kategori ekleme: Kimya, Biyoloji, Mühendislik, Elektrik-Elektronik, Makine, Enerji, Çevre, Mimarlık, Müzik, Felsefe

İlerleme takibi: Her konu için çalışma istatistikleri

Notlar sistemi: Her seans için not alma ve kaydetme

Kayıt Defteri: Başarılar, notlar ve medya arşivi

🔥 Keşfet Sayfası (Explore)
TikTok tarzı sonsuz scroll feed

Video, fotoğraf ve yazı içerikleri

Beğeni, kaydetme, ödül verme ve paylaşma butonları

Kullanıcı profilleri ve etkileşim

🎥 Görüntülü Buluşma (Meet)
Kamera ve mikrofon kontrolü (Capacitor ile native entegrasyon)

Pil durumu ve bağlantı kalitesi göstergesi

Eşleşme sistemi: Sıra bekleme animasyonu

4 kişilik video konferans grid görünümü

Kişiye özel ses kontrolü (dikey slider ile)

Şikayet etme ve raporlama

📝 Notlar Sistemi (Notes)
Glassmorphism tasarımlı popup

Bold, Italic, Underline formatlama

Tam ekran modu

Klavye kısayolları (⌘ + S kaydet, ESC vazgeç)

Defter çizgili arka plan

🏆 Kayıt Defteri (POW)
Başarılar sekmesi: Rozetler ve istatistikler

Notlar sekmesi: Kategorilere göre renklendirilmiş notlar

Medya sekmesi: Fotoğraf/video galerisi

Notes ve RecordFocus entegrasyonu

📸 Kamera Kaydı (RecordFocus)
Ön kamera ile video kaydı

Kayıt sırasında kamera/mikrofon kontrolü

Kayıt süresi göstergesi

Video kaydetme ve kaydetme

👥 Topluluklar (Community)
Matematik, Fizik, Bilgisayar, Tasarım, Dil, İş Hayatı toplulukları

Gölge Mentor Ağı: Herkesin bir mentoru var

Başarısızlık Serileri: Reddedilme hikayeleri

Bilimsel içerik: Nörobilim ve odaklanma bilgileri

Topluluk detay sayfası: Hakkında, Aktivite, Etkinlikler

🧘 Sakinlik Sayfası (Calm)
Orman teması ile açılış animasyonu (4 saniye)

Nefes egzersizi (5s inhale → 5s hold → 5s exhale)

Bilimsel alıntılar (12 saniyede bir değişen)

Gölge Mentor Ağı

Başarısızlık hikayeleri

Nörobilim bilgileri

👤 Profil Sayfası (Profile)
Profil resmi, isim, kullanıcı adı

4 aksiyon butonu: Düzenle, Paylaş, Sorun Belirt, Oturumu Kapat

Ayarlar listesi (toggle, select, value, nav tipleri)

Floating bottom navigasyon

🎨 Tasarım Sistemi
Apple UI / Glassmorphism efekti

Renk paleti:

Tema: #FBF4E2 (açık krem)

Vurgu: #C8A96E (altın/amber)

Font: Inter, Manrope

Border radius: 250px (tam yuvarlak), 24px-48px arası değişen

Animasyonlar: Framer Motion ile akıcı geçişler

🛠️ Teknolojiler
Kategori	Teknolojiler
Framework	Next.js 16 (App Router, Turbopack)
UI Kütüphanesi	React 19, Ionic React
Animasyon	Framer Motion
Icon Kütüphanesi	Lucide React
Stil	CSS-in-JS (inline styles)
Mobil Özellikler	Capacitor (kamera, mikrofon, pil, network)
Tip Güvenliği	TypeScript
Formatter/ Linter	ESLint
📂 Proje Yapısı
text
focushion/
├── app/
│   ├── page.tsx                 # Landing sayfası
│   ├── layout.tsx               # Root layout (fontlar, metadata)
│   ├── globals.css              # Global stiller
│   ├── session/
│   │   ├── subject/page.tsx     # Kategori ve konu seçimi
│   │   └── focus/page.tsx       # Pomodoro timer
│   ├── explore/page.tsx         # Sosyal feed
│   ├── meet/
│   │   ├── search/page.tsx      # Kamera kontrol, eşleşme başlat
│   │   ├── match/page.tsx       # Eşleşme bekleme animasyonu
│   │   └── found/page.tsx       # Video konferans (4 kişi)
│   ├── community/page.tsx       # Topluluklar listesi
│   ├── calm/page.tsx            # Sakinlik ve nefes egzersizi
│   └── profile/page.tsx         # Kullanıcı profili
├── components/
│   ├── Notes.tsx                # Notlar popup'ı
│   ├── POW.tsx                  # Kayıt Defteri (Başarılar/Notlar/Medya)
│   ├── RecordFocus.tsx          # Kamera kayıt popup'ı
│   ├── Community.tsx            # Topluluk detay popup'ı
│   ├── NewCommunity.tsx         # Yeni kategori ekleme popup'ı
│   ├── Loading.tsx              # Loading animasyonu
│   ├── Wait.tsx                 # Credit kontrol popup'ı
│   └── Ad.tsx                   # Reklam izleme popup'ı
├── public/
│   ├── bg.jpg                   # Arka plan resmi
│   ├── icon.png                 # Uygulama ikonu
│   └── ...                      # Diğer statik dosyalar
└── package.json
🚀 Kurulum ve Çalıştırma
Gereksinimler
Node.js 18+

npm veya yarn

Kurulum Adımları
bash
# 1. Repoyu klonlayın
git clone https://github.com/yourusername/focushion.git
cd focushion

# 2. Bağımlılıkları yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm run dev

# 4. Tarayıcıda açın
# http://localhost:3000
Production Build
bash
# Build al
npm run build

# Production sunucusunu başlat
npm start
📱 Mobil Özellikler (Capacitor)
Focushion, Capacitor ile mobil cihaz özelliklerini kullanır:

bash
# Capacitor ekleme (gerekirse)
npm install @capacitor/core @capacitor/cli
npm install @capacitor/device @capacitor/network
npm install @capacitor-community/camera-preview

# iOS platform ekleme
npx cap add ios

# Android platform ekleme
npx cap add android

# Web build alıp native projeyi senkronize etme
npm run build
npx cap sync
🎨 Tema Renkleri
tsx
const THEME = '#FBF4E2';  // Açık krem - ana metin rengi
const ACCENT = '#C8A96E'; // Altın/amber - vurgu rengi
Kategori Renkleri
Kategori	Renk	Hex
Matematik	Mavi	#60A5FA
Fizik	Yeşil	#34D399
Bilgisayar	Pembe	#F472B6
Tasarım	Mor	#A78BFA
Dil	Kırmızı	#F87171
İş Hayatı	Sarı	#FBBF24
⌨️ Klavye Kısayolları
Kısayol	İşlev
⌘ + S / Ctrl + S	Notları kaydetme
ESC	Popup'ları kapatma
🔧 Environment Variables
.env.local dosyası oluşturun:

env
# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API (opsiyonel)
NEXT_PUBLIC_API_URL=https://your-api.com
📦 Bağımlılıklar
Core
json
{
  "next": "16.2.7",
  "react": "19.0.0",
  "react-dom": "19.0.0",
  "typescript": "5.0.0"
}
UI
json
{
  "@ionic/react": "^8.0.0",
  "framer-motion": "^11.0.0",
  "lucide-react": "^0.400.0"
}
Mobile (Capacitor)
json
{
  "@capacitor/core": "^6.0.0",
  "@capacitor/device": "^6.0.0",
  "@capacitor/network": "^6.0.0",
  "@capacitor-community/camera-preview": "^6.0.0"
}
🐛 Bilinen Sorunlar ve Çözümleri
ESLint "setState in effect" hatası
Bu uyarılar performans optimizasyonu içindir ve bazı durumlarda (örneğin initialNotes state güncellemesi) kabul edilebilir. Çözüm için eslint-disable-next-line kullanılabilir.

TypeScript "any" tipi uyarıları
Projede tip güvenliğini artırmak için any yerine uygun tipler kullanılmıştır.

Kamera izinleri
Mobil cihazlarda kamera kullanımı için android/app/src/main/AndroidManifest.xml ve ios/App/App/Info.plist dosyalarında gerekli izinler tanımlanmalıdır.

📄 Lisans
Bu proje MIT Lisansı ile lisanslanmıştır.

👥 Katkıda Bulunma
Bu repository'i fork'layın

Yeni bir branch oluşturun (git checkout -b feature/amazing-feature)

Değişikliklerinizi commit'leyin (git commit -m 'Add some amazing feature')

Branch'inizi push'layın (git push origin feature/amazing-feature)

Pull Request oluşturun