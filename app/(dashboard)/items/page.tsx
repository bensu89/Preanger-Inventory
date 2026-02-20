"use client";

import { useState, useEffect } from "react";
import { getItems, createItem, updateItem, deleteItem } from "../../actions/itemActions";

export default function ItemsPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [itemsData, setItemsData] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    // State baru untuk menyimpan data barang yang sedang di-edit
    const [editingItem, setEditingItem] = useState<any>(null);

    useEffect(() => {
        async function fetchItems() {
            const data = await getItems(searchTerm);
            setItemsData(data);
        }
        const delayDebounceFn = setTimeout(() => {
            fetchItems();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [isFormOpen, searchTerm]);

    // Fungsi untuk membuka form Edit dan mengisi data awal
    function handleEditClick(item: any) {
        setEditingItem(item);
        setIsFormOpen(true);
    }

    // Fungsi untuk membatalkan form (kembali ke mode Tambah)
    function handleCancel() {
        setIsFormOpen(false);
        setEditingItem(null);
    }

    // Fungsi Submit (Bisa untuk Tambah atau Edit)
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (editingItem) {
            await updateItem(editingItem.id, formData);
        } else {
            await createItem(formData);
        }

        handleCancel(); // Tutup dan reset form
    }

    // Fungsi Hapus Barang
    async function handleDelete(id: number, name: string) {
        if (window.confirm(`Yakin ingin menghapus ${name}?`)) {
            const result = await deleteItem(id);
            if (!result.success) {
                alert(result.message); // Munculkan peringatan kalau ada transaksi nyangkut
            } else {
                // Refresh tabel secara manual dengan memicu ulang pengambilan data
                setSearchTerm(searchTerm + " ");
                setTimeout(() => setSearchTerm(searchTerm.trim()), 10);
            }
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Katalog Barang</h2>
                    <p className="text-gray-500">Kelola data master inventori Anda di sini.</p>
                </div>
                <button
                    onClick={() => isFormOpen ? handleCancel() : setIsFormOpen(true)}
                    className={`${isFormOpen ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-lg font-medium transition-colors`}
                >
                    {isFormOpen ? "Batal" : "+ Tambah Barang"}
                </button>
            </div>

            {isFormOpen && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {editingItem ? "Edit Data Barang" : "Input Barang Baru"}
                    </h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Nama Barang</label>
                            <input name="name" defaultValue={editingItem?.name || ""} required type="text" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">SKU / Kode</label>
                            <input name="sku" defaultValue={editingItem?.sku || ""} required type="text" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Kategori</label>
                            <select name="category" defaultValue={editingItem?.category || ""} required className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                                <option value="">Pilih Kategori...</option>
                                <option value="benih">Benih</option>
                                <option value="pupuk">Pupuk</option>
                                <option value="pestisida">Pestisida</option>
                                <option value="alat">Alat Pertanian</option>
                            </select>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex flex-col w-1/2">
                                <label className="text-sm font-medium text-gray-700 mb-1">Stok</label>
                                <input name="stock" defaultValue={editingItem?.stock ?? 0} required type="number" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label className="text-sm font-medium text-gray-700 mb-1">Batas Minimum</label>
                                <input name="minStock" defaultValue={editingItem?.minStock ?? 5} required type="number" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                        </div>

                        <div className="md:col-span-2 flex justify-end mt-4">
                            <button type="submit" className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                {editingItem ? "Update Data" : "Simpan Data"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Tabel Data */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mt-6">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <input
                        type="text"
                        placeholder="Cari nama barang atau SKU..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th className="px-6 py-4">SKU</th>
                            <th className="px-6 py-4">Nama Barang</th>
                            <th className="px-6 py-4">Kategori</th>
                            <th className="px-6 py-4 text-center">Stok</th>
                            <th className="px-6 py-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsData.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center">Belum ada data barang.</td>
                            </tr>
                        ) : (
                            itemsData.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs">{item.sku}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                    <td className="px-6 py-4 capitalize">{item.category}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`font-bold ${item.stock <= item.minStock ? 'text-red-600' : 'text-gray-900'}`}>
                                            {item.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button onClick={() => handleEditClick(item)} className="text-blue-600 hover:text-blue-800 mx-2 font-medium">Edit</button>
                                        <button onClick={() => handleDelete(item.id, item.name)} className="text-red-600 hover:text-red-800 mx-2 font-medium">Hapus</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
