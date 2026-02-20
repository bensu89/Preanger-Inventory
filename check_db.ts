import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Supabase Connection URL might need port 5432 for session mode
let url = process.env.DATABASE_URL!;
if (url.includes('6543')) {
    url = url.replace('6543', '5432');
}

const sql = postgres(url);

async function check() {
    try {
        const tables = await sql`SELECT table_name, table_schema FROM information_schema.tables WHERE table_schema = 'public'`;
        console.log("Tables returning:", tables.map(t => t.table_name));

        const testQ = await sql`select "transactions"."id", "items"."name", "transactions"."type", "transactions"."quantity", "transactions"."notes", "transactions"."date" from "transactions" inner join "items" on "transactions"."item_id" = "items"."id" limit 1`;
        console.log("Join test result:", testQ);

    } catch (err) {
        console.error("Query Error:", err);
    } finally {
        await sql.end();
    }
}
check();
