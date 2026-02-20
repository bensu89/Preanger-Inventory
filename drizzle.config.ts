import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Memuat variabel lingkungan dari .env.local
dotenv.config({ path: '.env.local' });

export default defineConfig({
    schema: './db/schema.ts', // Lokasi file skema yang kita buat tadi
    out: './drizzle',         // Folder untuk menyimpan riwayat migrasi
    dialect: 'postgresql',    // Jenis database yang kita pakai
    dbCredentials: {
        url: process.env.DATABASE_URL!, // Mengambil URL Supabase dari .env
    },
    verbose: true,
    strict: true,
});
