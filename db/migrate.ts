import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL!;

// Gunakan koneksi khusus untuk migrasi maksimal 1 pool
const sql = postgres(connectionString, { max: 1, prepare: false });
const db = drizzle(sql);

async function main() {
    console.log("Menjalankan migrasi database...");
    try {
        await migrate(db, { migrationsFolder: './drizzle' });
        console.log("Migrasi selesai! Tabel items telah dibuat.");
    } catch (error) {
        console.error("Gagal melakukan migrasi:", error);
    } finally {
        await sql.end();
    }
}

main();
