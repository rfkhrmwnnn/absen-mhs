# 🚀 Panduan Deploy ke Vercel

## Persiapan

Pastikan project sudah berjalan dengan baik di local:

```bash
npm install
npm run dev
```

## Metode 1: Deploy via Vercel CLI (Paling Mudah) ⭐

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login ke Vercel

```bash
vercel login
```

Pilih metode login (GitHub, GitLab, Bitbucket, atau Email).

### Step 3: Deploy ke Vercel

Dari folder project:

```bash
cd c:\xampp\htdocs\absen-mhs
vercel
```

Jawab pertanyaan:

- **Set up and deploy?** → Yes
- **Which scope?** → Pilih account Anda
- **Link to existing project?** → No
- **What's your project's name?** → absen-mhs (atau nama lain)
- **In which directory is your code located?** → ./
- **Want to override the settings?** → No

### Step 4: Deploy Production

Setelah preview berhasil, deploy ke production:

```bash
vercel --prod
```

✅ **Selesai!** URL production Anda akan muncul.

---

## Metode 2: Deploy via GitHub + Vercel

### Step 1: Push ke GitHub

```bash
# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Absensi Mahasiswa"

# Rename branch to main
git branch -M main

# Add remote (ganti dengan URL repo Anda)
git remote add origin https://github.com/username/absen-mhs.git

# Push
git push -u origin main
```

### Step 2: Import di Vercel

1. Buka [vercel.com/new](https://vercel.com/new)
2. Login dengan GitHub
3. Klik **"Import Project"**
4. Pilih repository **absen-mhs**
5. Vercel akan auto-detect:
   - **Framework Preset**: Vite
   - **Build Command**: `vite build`
   - **Output Directory**: `dist`
6. Klik **"Deploy"**

✅ **Selesai!** Vercel akan build dan deploy otomatis.

---

## Metode 3: Deploy Manual (Drag & Drop)

### Step 1: Build Project

```bash
npm run build
```

Folder `dist/` akan dibuat.

### Step 2: Upload ke Vercel

1. Buka [vercel.com](https://vercel.com)
2. Login
3. Drag & drop folder **`dist/`** ke dashboard
4. Tunggu upload selesai

✅ **Selesai!** Website langsung online.

---

## Konfigurasi Vercel (Sudah Otomatis)

File `vercel.json` sudah dibuat dengan konfigurasi:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

Ini memastikan:

- ✅ Vue Router bekerja dengan baik (SPA routing)
- ✅ Assets dimuat dengan benar
- ✅ Refresh page tidak error 404

---

## Setelah Deploy

### URL yang Didapat

- **Production**: `https://absen-mhs.vercel.app`
- **Preview**: `https://absen-mhs-xxx.vercel.app` (untuk setiap deployment)

### Custom Domain (Opsional)

1. Buka project di Vercel Dashboard
2. **Settings** → **Domains**
3. Tambahkan custom domain Anda
4. Update DNS sesuai instruksi

---

## Update Deployment

### Via CLI

```bash
# Deploy ulang
vercel --prod
```

### Via GitHub

Setiap push ke branch `main` akan otomatis trigger deployment baru.

```bash
git add .
git commit -m "Update features"
git push
```

---

## Troubleshooting

### Build Failed

**Error**: `Command "vite build" exited with 1`

**Solusi**:

1. Test build di local dulu:
   ```bash
   npm run build
   ```
2. Fix error yang muncul
3. Deploy ulang

### 404 Error saat Refresh

**Solusi**: Pastikan `vercel.json` sudah ada dan benar.

### QR Scanner Tidak Jalan

**Penyebab**: Browser memerlukan HTTPS untuk akses kamera.

**Solusi**: Vercel otomatis provide HTTPS, jadi ini tidak akan jadi masalah.

### Data Hilang setelah Refresh

**Penyebab**: localStorage di-clear atau user pakai incognito mode.

**Solusi**: Ini normal behavior karena menggunakan localStorage. Untuk production, pertimbangkan menggunakan backend database.

---

## Tips

1. **Preview Deployment**: Setiap branch akan dapat preview URL sendiri
2. **Rollback**: Bisa rollback ke deployment sebelumnya dari dashboard
3. **Analytics**: Aktifkan Vercel Analytics untuk tracking
4. **Environment Variables**: Set di dashboard jika diperlukan

---

## Catatan Penting

⚠️ **Data Storage**

- Aplikasi ini menggunakan **localStorage**
- Data tersimpan di browser user, bukan di server
- Setiap user akan punya data sendiri
- Data akan hilang jika user clear browser data

⚠️ **HTTPS Required**

- QR Scanner memerlukan HTTPS
- Vercel otomatis provide HTTPS ✅

⚠️ **API External**

- Prayer Times menggunakan Aladhan API
- Memerlukan internet connection

---

## Selesai! 🎉

Website Anda sekarang sudah online dan bisa diakses dari mana saja!

**Login Admin**:

- Username: `admin`
- Password: `parta2025`

Share URL Anda ke teman-teman! 🚀
