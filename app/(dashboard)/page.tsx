import { getDashboardStats } from "../actions/dashboardActions";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function PreangerDashboard() {
  const { totalSKU, totalStock, lowStockCount, recentTransactions } = await getDashboardStats();

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header dengan Font Serif */}
      <header className="border-b-2 border-preanger-primary pb-4 flex justify-between items-end">
        <div>
          <h1 className="font-serif text-4xl text-preanger-primary uppercase tracking-wider">
            Logistik Preanger
          </h1>
          <p className="italic text-preanger-secondary font-serif">
            Administrasi Inventori - Est. 2026
          </p>
        </div>
      </header>

      {/* Grid Statistik dengan Border Tegas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-preanger-primary p-6 bg-white shadow-[4px_4px_0px_0px_rgba(74,55,40,1)] flex flex-col justify-between">
          <h3 className="font-serif text-lg font-bold uppercase text-preanger-text">Total Komoditas (SKU)</h3>
          <p className="text-4xl font-serif mt-4 text-preanger-primary">{totalSKU} <span className="text-lg">Items</span></p>
        </div>

        <div className="border border-preanger-secondary p-6 bg-white shadow-[4px_4px_0px_0px_rgba(212,175,55,1)] flex flex-col justify-between">
          <h3 className="font-serif text-lg font-bold uppercase text-preanger-secondary">
            Kapasitas Gudang
          </h3>
          <p className="text-4xl font-serif mt-4 text-preanger-primary">{totalStock} <span className="text-lg">Pcs</span></p>
        </div>

        <div className={`border p-6 shadow-[4px_4px_0px_0px_rgba(74,55,40,1)] flex flex-col justify-between ${lowStockCount > 0 ? 'bg-red-50 border-red-800' : 'bg-white border-preanger-primary'}`}>
          <h3 className={`font-serif text-lg font-bold uppercase ${lowStockCount > 0 ? 'text-red-800' : 'text-preanger-text'}`}>
            Status Perhatian
          </h3>
          <p className={`text-4xl font-serif mt-4 ${lowStockCount > 0 ? 'text-red-800' : 'text-preanger-primary'}`}>
            {lowStockCount > 0 ? `${lowStockCount}` : 'Aman'}
            {lowStockCount > 0 && <span className="text-lg ml-2">Menipis</span>}
          </p>
        </div>
      </div>

      {/* Tabel dengan Gaya Arsip */}
      <div className="border border-preanger-primary overflow-hidden bg-white shadow-[4px_4px_0px_0px_rgba(74,55,40,1)] mt-8">
        <div className="px-6 py-4 border-b border-preanger-primary bg-preanger-bg flex justify-between items-center">
          <h3 className="font-serif text-lg font-bold text-preanger-primary uppercase tracking-widest">Catatan 5 Aktivitas Terakhir</h3>
          <Link href="/transactions" className="text-sm text-preanger-secondary hover:text-preanger-primary font-bold italic underline">
            Lihat Buku Induk →
          </Link>
        </div>
        <table className="w-full text-left font-sans border-collapse">
          <thead className="bg-preanger-primary text-preanger-bg font-serif uppercase text-sm tracking-widest">
            <tr>
              <th className="p-4 border-b border-preanger-primary">Tanggal Tercatat</th>
              <th className="p-4 border-b border-preanger-primary">Nama Komoditas</th>
              <th className="p-4 border-b border-preanger-primary text-center">Mutasi</th>
              <th className="p-4 border-b border-preanger-primary text-center">Kuantitas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-preanger-primary/20">
            {recentTransactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center italic text-preanger-primary/60 font-serif">
                  Belum ada catatan mutasi barang.
                </td>
              </tr>
            ) : (
              recentTransactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-preanger-secondary/10 transition-colors">
                  <td className="p-4 italic text-sm text-preanger-text/80">
                    {new Date(trx.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </td>
                  <td className="p-4 font-bold text-preanger-text">{trx.itemName}</td>
                  <td className="p-4 text-center">
                    <span className={`border px-2 py-1 text-xs font-bold tracking-wider ${trx.type === 'in' ? 'border-preanger-primary text-preanger-primary' : 'border-red-800 text-red-800'}`}>
                      {trx.type === 'in' ? 'MASUK' : 'KELUAR'}
                    </span>
                  </td>
                  <td className="p-4 text-center font-bold font-serif text-lg text-preanger-text">
                    {trx.type === 'in' ? '+' : '-'}{trx.quantity}
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
