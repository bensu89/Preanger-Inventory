import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;
// Menggunakan driver postgres.js untuk koneksi ke Supabase dengan max connection
// Bypass transaction pooler port 6543 to 5432 for session operations
const clientUrl = connectionString.replace('6543', '5432');
const client = postgres(clientUrl, { prepare: false, max: 1 });
export const db = drizzle(client, { schema });
