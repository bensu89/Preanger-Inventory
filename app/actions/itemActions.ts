'use server'

import { db } from '@/db';
import { items } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { ilike, or, eq } from 'drizzle-orm'; // Tambahkan ini

// Fungsi Read: Mengambil barang, sekarang mendukung pencarian
export async function getItems(searchQuery: string = "") {
    // Jika tidak ada kata kunci pencarian, tampilkan semua
    if (!searchQuery) {
        return await db.select().from(items).orderBy(items.createdAt);
    }

    // Jika ada kata kunci, cari di kolom 'name' ATAU 'sku'
    return await db.select()
        .from(items)
        .where(
            or(
                ilike(items.name, `%${searchQuery}%`),
                ilike(items.sku, `%${searchQuery}%`)
            )
        )
        .orderBy(items.createdAt);
}

// ... (Fungsi createItem tetap sama seperti sebelumnya, tidak perlu diubah)
export async function createItem(formData: FormData) {
    const name = formData.get('name') as string;
    const sku = formData.get('sku') as string;
    const category = formData.get('category') as string;
    const stock = parseInt(formData.get('stock') as string);
    const minStock = parseInt(formData.get('minStock') as string);

    await db.insert(items).values({
        name,
        sku,
        category,
        stock,
        minStock
    });

    revalidatePath('/items');
    revalidatePath('/'); // Refresh dashboard juga
}

// Fungsi Update: Mengubah data barang
export async function updateItem(id: number, formData: FormData) {
    const name = formData.get('name') as string;
    const sku = formData.get('sku') as string;
    const category = formData.get('category') as string;
    const stock = parseInt(formData.get('stock') as string);
    const minStock = parseInt(formData.get('minStock') as string);

    await db.update(items)
        .set({ name, sku, category, stock, minStock })
        .where(eq(items.id, id));

    revalidatePath('/items');
    revalidatePath('/');
}

// Fungsi Delete: Menghapus barang
export async function deleteItem(id: number) {
    try {
        await db.delete(items).where(eq(items.id, id));
        revalidatePath('/items');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        // Error biasanya terjadi jika barang sudah memiliki riwayat transaksi
        return {
            success: false,
            message: "Gagal menghapus! Barang ini sudah memiliki riwayat transaksi. Hapus riwayat transaksinya terlebih dahulu."
        };
    }
}
