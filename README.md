# 🌾 Logistik Preanger (Web Inventori)

Sistem Manajemen Inventori berbasis web modern dengan antarmuka elegan bertema *Vintage Professional* (Preanger). Dibangun untuk pencatatan keluar-masuk komoditas, manajemen stok barang, pelaporan Excel, dan sistem terpadu yang aman.

## ✨ Fitur Utama

- **🛡️ Autentikasi Terpusat**: Sistem login dan proteksi halaman menggunakan Supabase Auth dan Next.js Middleware.
- **📊 Dasbor Cerdas**: Ringkasan total SKU, total kapasitas gudang, status stok menipis, dan 5 aktivitas transaksi terakhir.
- **📦 Katalog Komoditas (Master Barang)**: 
  - Pencatatan barang baru dengan detail (Nama, SKU, Kategori, Stok Dasar, dan Batas Minimum).
  - Fitur Edit dan Hapus (dengan validasi relasi transaksi).
  - Pencarian *real-time* berdasarkan Nama atau SKU.
- **📝 Buku Induk Mutasi (Riwayat In/Out)**:
  - Pencatatan transaksi Barang Masuk (IN) dan Barang Keluar (OUT).
  - Kalkulasi stok otomatis saat transaksi disimpan.
  - Validasi pencegahan stok minus.
- **📥 Ekspor Excel**: Unduh laporan mutasi barang ke dalam format `.xlsx` dengan sekali klik.
- **🎨 Tema "Preanger"**: Desain visual elegan yang memadukan tekstur perkamen (kertas tua), bayangan klasik, tipografi *Playfair Display*, dan palet warna kopi.

## 🛠️ Persyaratan Sistem (Tech Stack)

Aplikasi ini menggunakan teknologi terkini (Modern Web Stack):

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [PostgreSQL (Supabase)](https://supabase.com/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Ikon & Feedback**: [Lucide React](https://lucide.dev/) & [Sonner (Toast)](https://sonner.emilkowal.ski/)

## 🚀 Cara Instalasi & Menjalankan Lokal

Ikuti langkah-langkah di bawah ini untuk menjalankan Logistik Preanger di komputer Anda:

### 1. Kloning Repositori
\`\`\`bash
git clone https://github.com/bensu89/Preanger-Inventory.git
cd Preanger-Inventory
\`\`\`

### 2. Instalasi Dependensi
\`\`\`bash
npm install
\`\`\`

### 3. Konfigurasi Environment Variables
Buat file baru bernama \`.env.local\` di root direktori proyek, lalu masukkan kredensial Supabase Anda:
\`\`\`env
# Koneksi Database (Gunakan port 5432 - Direct/Session Connection)
DATABASE_URL="postgresql://postgres.[PROYEK-ID]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

# Konfigurasi Supabase Auth
NEXT_PUBLIC_SUPABASE_URL="https://[PROYEK-ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[KUNCI-ANON-API]"
\`\`\`

> **Catatan Database**: Pastikan Anda mem-bypass *Transaction Pooler* (port 6543) ke *Session Mode* (port 5432) jika menggunakan lingkungan *development* Next.js, agar tidak terkena *error Max Clients*.

### 4. Push Skema Database
Dorong kerangka tabel (Skema) ke Supabase pomocí Drizzle:
\`\`\`bash
npx drizzle-kit push
\`\`\`

### 5. Jalankan Server Development
\`\`\`bash
npm run dev
\`\`\`
Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

---

### *Dibuat dengan presisi untuk mempermudah operasional logistik masa kini.*
