import { logout } from "../actions/authActions";

export default function Navbar() {
    return (
        <nav className="h-16 bg-preanger-bg flex items-center px-8 justify-between w-full border-b-2 border-preanger-primary">
            <div className="font-serif font-bold text-xl text-preanger-primary italic tracking-wide">
                Administrasi Logistik
            </div>
            <div className="flex items-center gap-4">
                <span className="text-preanger-text font-serif italic text-sm font-bold">Adminstrator</span>
                <div className="w-8 h-8 rounded-full bg-preanger-secondary border-2 border-preanger-primary shadow-sm"></div>

                <form action={logout}>
                    <button type="submit" className="text-sm text-preanger-bg font-bold tracking-wider ml-4 px-4 py-1.5 border-2 border-preanger-primary bg-preanger-primary hover:bg-preanger-text transition-colors uppercase">
                        Tutup Sesi
                    </button>
                </form>
            </div>
        </nav>
    );
}
