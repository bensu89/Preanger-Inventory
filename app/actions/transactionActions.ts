'use server'

import { db } from '@/db';
import { items, transactions } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Mengambil riwayat transaksi (digabung dengan nama barang)
export async function getTransactions() {
    return await db
        .select({
            id: transactions.id,
            itemName: items.name,
            type: transactions.type,
            quantity: transactions.quantity,
            notes: transactions.notes,
            date: transactions.date,
        })
        .from(transactions)
        .innerJoin(items, eq(transactions.itemId, items.id))
        .orderBy(desc(transactions.date)); // Urutkan dari yang terbaru
}

// Menyimpan transaksi baru & Update stok
export async function createTransaction(formData: FormData) {
    const itemId = parseInt(formData.get('itemId') as string);
    const type = formData.get('type') as 'in' | 'out';
    const quantity = parseInt(formData.get('quantity') as string);
    const notes = formData.get('notes') as string;

    // 1. Cek stok barang saat ini
    const [currentItem] = await db.select().from(items).where(eq(items.id, itemId));
    if (!currentItem) throw new Error("Barang tidak ditemukan");

    // 2. Hitung kalkulasi stok baru
    const newStock = type === 'in'
        ? currentItem.stock + quantity
        : currentItem.stock - quantity;

    // Cegah jika stok mau dikurangi tapi sisa stoknya tidak cukup
    if (newStock < 0) {
        throw new Error("Gagal: Stok tidak mencukupi untuk dikeluarkan!");
    }

    // 3. Masukkan riwayat ke tabel transactions
    await db.insert(transactions).values({
        itemId,
        type,
        quantity,
        notes,
    });

    // 4. Update jumlah stok di tabel items
    await db.update(items)
        .set({ stock: newStock })
        .where(eq(items.id, itemId));

    // Refresh halaman agar data terbaru langsung muncul
    revalidatePath('/transactions');
    revalidatePath('/items');
}
