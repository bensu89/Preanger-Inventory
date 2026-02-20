"use client";

import { useState, useEffect } from "react";
import { getItems } from "../../actions/itemActions";
import { getTransactions, createTransaction } from "../../actions/transactionActions";
import * as XLSX from "xlsx"; // Import library Excel

export default function TransactionsPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [itemsData, setItemsData] = useState<any[]>([]);
    const [transactionsData, setTransactionsData] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            const fetchedItems = await getItems();
            setItemsData(fetchedItems);

            const fetchedTransactions = await getTransactions();
            setTransactionsData(fetchedTransactions);
        }
        fetchData();
    }, [isFormOpen]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        try {
            await createTransaction(formData);
            setIsFormOpen(false);
            event.currentTarget.reset();
        } catch (error: any) {
            alert(error.message);
        }
    }

    // --- FUNGSI BARU: Export ke Excel ---
    function handleExportExcel() {
        if (transactionsData.length === 0) {
            alert("Tidak ada data untuk diekspor.");
            return;
        }

        // 1. Format ulang data supaya nama kolomnya rapi di Excel
        const dataToExport = transactionsData.map((trx) => ({
            "Tanggal": new Date(trx.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
            "Nama Barang": trx.itemName,
            "Jenis Transaksi": trx.type === 'in' ? 'Masuk' : 'Keluar',
            "Jumlah": trx.quantity,
            "Catatan": trx.notes || '-'
        }));

        // 2. Buat Worksheet (lembar kerja) dari data JSON
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);

        // 3. Atur lebar kolom otomatis supaya rapi saat dibuka
        worksheet["!cols"] = [
            { wch: 20 }, // Tanggal
            { wch: 30 }, // Nama Barang
            { wch: 15 }, // Jenis
            { wch: 10 }, // Jumlah
            { wch: 35 }, // Catatan
        ];

        // 4. Buat Workbook (file Excel) dan masukkan lembar kerjanya
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Riwayat Transaksi");

        // 5. Trigger download file Excel
        XLSX.writeFile(workbook, `Laporan_Inventori_${new Date().toISOString().split('T')[0]}.xlsx`);
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Riwayat Transaksi</h2>
                    <p className="text-gray-500">Catat pergerakan barang masuk dan keluar.</p>
                </div>
                <div className="flex gap-3">
                    {/* Tombol Export Excel Baru */}
                    <button
                        onClick={handleExportExcel}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                        📥 Export Excel
                    </button>
                    <button
                        onClick={() => setIsFormOpen(!isFormOpen)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        {isFormOpen ? "Batal" : "+ Input Transaksi"}
                    </button>
                </div>
            </div>

            {isFormOpen && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-4">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Pilih Barang</label>
                            <select name="itemId" required className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="">-- Pilih Barang --</option>
                                {itemsData.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name} (Sisa: {item.stock})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Jenis Transaksi</label>
                            <select name="type" required className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="in">Barang Masuk (IN) +</option>
                                <option value="out">Barang Keluar (OUT) -</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Jumlah</label>
                            <input name="quantity" required type="number" min="1" placeholder="Cth: 10" className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Catatan / Keterangan</label>
                            <input name="notes" type="text" placeholder="Cth: Restock supplier / Rusak" className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div className="md:col-span-2 flex justify-end mt-4">
                            <button type="submit" className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                Simpan Transaksi
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Tabel Riwayat Transaksi */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mt-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th className="px-6 py-4">Tanggal</th>
                                <th className="px-6 py-4">Nama Barang</th>
                                <th className="px-6 py-4">Tipe</th>
                                <th className="px-6 py-4 text-center">Jumlah</th>
                                <th className="px-6 py-4">Catatan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionsData.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center">Belum ada riwayat transaksi.</td>
                                </tr>
                            ) : (
                                transactionsData.map((trx) => (
                                    <tr key={trx.id} className="border-b hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            {new Date(trx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{trx.itemName}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${trx.type === 'in' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {trx.type === 'in' ? 'Masuk' : 'Keluar'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center font-bold text-gray-900">
                                            {trx.type === 'in' ? '+' : '-'}{trx.quantity}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{trx.notes || '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
