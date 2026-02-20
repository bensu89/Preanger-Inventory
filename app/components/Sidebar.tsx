import Link from 'next/link';

export default function Sidebar() {
    return (
        <aside className="w-64 bg-preanger-primary text-preanger-bg min-h-screen p-6 flex flex-col gap-6 font-sans border-r-4 border-preanger-secondary">
            <div className="text-2xl font-serif font-bold border-b-2 border-preanger-secondary pb-4 mb-2 tracking-widest uppercase">
                Preanger
            </div>
            <nav className="flex flex-col gap-3">
                <Link href="/" className="hover:bg-preanger-secondary/20 p-3 rounded border border-transparent hover:border-preanger-secondary transition-all">
                    Beranda
                </Link>
                <Link href="/items" className="hover:bg-preanger-secondary/20 p-3 rounded border border-transparent hover:border-preanger-secondary transition-all">
                    Katalog Komoditas
                </Link>
                <Link href="/transactions" className="hover:bg-preanger-secondary/20 p-3 rounded border border-transparent hover:border-preanger-secondary transition-all">
                    Buku Induk Mutasi
                </Link>
            </nav>
        </aside>
    );
}
