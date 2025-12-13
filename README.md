# Website Absensi Mahasiswa

Website absensi mahasiswa modern dengan fitur QR Code, built dengan **Vue 3 + Vite + Tailwind CSS**.

## 🚀 Fitur Utama

### Untuk Admin:

- ✅ Dashboard admin dengan data mahasiswa
- ✅ Buat QR Code untuk absensi
- ✅ Rekap absensi & export ke Excel
- ✅ Kelola pengajuan izin mahasiswa
- ✅ Hapus data mahasiswa

### Untuk Mahasiswa:

- ✅ Scan QR Code untuk absensi
- ✅ Ubah profile & password
- ✅ Jadwal sholat real-time (Cirebon)
- ✅ Pengajuan izin

### Fitur Umum:

- ✅ Registrasi dengan validasi NIM 8 digit
- ✅ Login dengan NIM/Email
- ✅ Dark/Light mode theme
- ✅ UI/UX modern dengan glassmorphism
- ✅ Responsive design

## 📋 Prerequisites

- Node.js (v16 atau lebih baru)
- npm atau yarn

## 🛠️ Instalasi

### Opsi 1: Menggunakan npm

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev
```

### Opsi 2: Menggunakan yarn (Jika npm bermasalah)

```bash
# Install yarn global (jika belum ada)
npm install -g yarn

# Install dependencies
yarn install

# Jalankan development server
yarn dev
```

### Opsi 3: Jika ada masalah SSL

```bash
# Nonaktifkan SSL check
npm config set strict-ssl false

# Clear cache
npm cache clean --force

# Install ulang
npm install

# Jalankan development server
npm run dev
```

## 🔑 Login Credentials

### Admin:

- **Username**: `admin`
- **Password**: `parta2025`

### Mahasiswa:

Daftar terlebih dahulu melalui halaman registrasi dengan:

- Nama lengkap
- NIM (8 digit)
- Email
- Password (minimal 6 karakter)

## 📱 Akses Aplikasi

Setelah menjalankan `npm run dev` atau `yarn dev`, aplikasi akan tersedia di:

```
http://localhost:3000
```

## 🏗️ Struktur Project

```
absen-mhs/
├── src/
│   ├── views/
│   │   ├── Home.vue              # Landing page
│   │   ├── Register.vue          # Halaman registrasi
│   │   ├── Login.vue             # Halaman login
│   │   ├── admin/
│   │   │   ├── Dashboard.vue     # Layout admin
│   │   │   ├── Students.vue      # Data mahasiswa
│   │   │   ├── CreateQR.vue      # Buat QR Code
│   │   │   ├── Attendance.vue    # Rekap absensi
│   │   │   └── LeaveRequests.vue # Kelola izin
│   │   └── student/
│   │       ├── Dashboard.vue     # Layout mahasiswa
│   │       ├── Scan.vue          # Scan QR Code
│   │       ├── Profile.vue       # Profile mahasiswa
│   │       ├── PrayerTimes.vue   # Jadwal sholat
│   │       └── LeaveRequest.vue  # Pengajuan izin
│   ├── stores/
│   │   ├── auth.js               # State management auth
│   │   ├── attendance.js         # State management absensi
│   │   ├── leave.js              # State management izin
│   │   └── theme.js              # State management tema
│   ├── router/
│   │   └── index.js              # Vue Router config
│   ├── App.vue                   # Root component
│   ├── main.js                   # Entry point
│   └── style.css                 # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 💾 Data Storage

Aplikasi ini menggunakan **localStorage** untuk menyimpan data:

- User accounts
- Attendance records
- QR codes
- Leave requests

Data akan tetap tersimpan di browser hingga dihapus secara manual.

## 🎨 Teknologi yang Digunakan

- **Vue 3** - Progressive JavaScript Framework
- **Vite** - Next Generation Frontend Tooling
- **Tailwind CSS** - Utility-first CSS Framework
- **Pinia** - State Management
- **Vue Router** - Official Router for Vue.js
- **QRCode.js** - QR Code Generator
- **html5-qrcode** - QR Code Scanner
- **XLSX** - Excel Export Library
- **Aladhan API** - Prayer Times API

## 🌐 API External

### Jadwal Sholat

Menggunakan **Aladhan API** untuk mendapatkan jadwal sholat wilayah Cirebon:

```
https://api.aladhan.com/v1/timings
```

## 🔧 Build untuk Production

```bash
# Build aplikasi
npm run build

# Preview build
npm run preview
```

File hasil build akan tersimpan di folder `dist/`.

## 🚀 Deploy ke Vercel

### Metode 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Login ke Vercel**

```bash
vercel login
```

3. **Deploy**

```bash
# Dari root project
cd c:\xampp\htdocs\absen-mhs
vercel
```

4. **Deploy Production**

```bash
vercel --prod
```

### Metode 2: Deploy via GitHub + Vercel Dashboard

1. **Push ke GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/absen-mhs.git
git push -u origin main
```

2. **Import di Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Klik "New Project"
   - Import repository dari GitHub
   - Vercel akan otomatis detect Vite project
   - Klik "Deploy"

### Metode 3: Deploy Manual via Vercel Dashboard

1. **Build Project**

```bash
npm run build
```

2. **Upload ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Drag & drop folder `dist/` ke dashboard
   - Tunggu deployment selesai

### ⚙️ Environment Variables (Opsional)

Jika Anda ingin menambahkan environment variables di Vercel:

1. Buka project di Vercel Dashboard
2. Settings → Environment Variables
3. Tambahkan variabel yang diperlukan

### 🔗 Setelah Deploy

Setelah deployment berhasil, Anda akan mendapatkan:

- **Production URL**: `https://your-project.vercel.app`
- **Preview URL**: Untuk setiap push ke branch

### ⚠️ Catatan Deploy

1. **localStorage** akan reset setiap kali user clear browser data
2. **QR Scanner** memerlukan HTTPS (Vercel otomatis provide HTTPS)
3. **Prayer Times API** memerlukan internet connection
4. Data bersifat client-side, tidak ada database backend

## 📝 Catatan Penting

1. **NIM harus 8 digit** - Validasi otomatis saat registrasi
2. **QR Code** - Harus aktif untuk bisa digunakan absensi
3. **Kamera** - Diperlukan untuk fitur scan QR Code
4. **Internet** - Diperlukan untuk jadwal sholat real-time

## 🐛 Troubleshooting

### npm install gagal

```bash
# Clear cache
npm cache clean --force

# Hapus node_modules dan package-lock.json
rm -rf node_modules package-lock.json

# Install ulang
npm install
```

### Port 3000 sudah digunakan

Edit `vite.config.js` dan ubah port:

```javascript
server: {
  port: 3001, // Ganti dengan port yang tersedia
  open: true
}
```

### Dark mode tidak berfungsi

Clear localStorage browser dan refresh halaman.

## 👨‍💻 Developer

Dibuat dengan ❤️ menggunakan Vue 3 + Vite + Tailwind CSS

## 📄 License

MIT License - Bebas digunakan untuk keperluan apapun.
