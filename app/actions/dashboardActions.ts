'use server'

import { db } from '@/db';
import { items, transactions } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function getDashboardStats() {
    // 1. Ambil semua data barang
    const allItems = await db.select().from(items);

    // 2. Hitung statistik
    const totalSKU = allItems.length;
    const totalStock = allItems.reduce((sum, item) => sum + item.stock, 0);
    const lowStockCount = allItems.filter(item => item.stock <= item.minStock).length;

    // 3. Ambil 5 transaksi terakhir saja untuk tabel aktivitas
    const recentTransactions = await db
        .select({
            id: transactions.id,
            itemName: items.name,
            type: transactions.type,
            quantity: transactions.quantity,
            date: transactions.date,
        })
        .from(transactions)
        .innerJoin(items, eq(transactions.itemId, items.id))
        .orderBy(desc(transactions.date))
        .limit(5);

    return { totalSKU, totalStock, lowStockCount, recentTransactions };
}
