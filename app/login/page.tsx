"use client";

import { useState } from "react";
import { login } from "../actions/authActions";
// Pastikan Anda sudah menginstal icon: npm install lucide-react
import { Wheat, ScrollText } from "lucide-react";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const result = await login(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
    }

    return (
        // Container utama dengan latar belakang tekstur kertas
        <div className="min-h-screen flex items-center justify-center bg-parchment-texture p-4">

            {/* Kartu Login (Seperti Plakat/Dokumen) */}
            <div className="w-full max-w-md relative bg-preanger-bg border-4 border-preanger-primary shadow-vintage overflow-hidden">

                {/* Aksen Garis Emas di Atas */}
                <div className="absolute top-0 left-0 w-full h-2 bg-preanger-secondary"></div>

                <div className="p-8 pt-12">
                    {/* Header: Logo & Judul */}
                    <div className="flex flex-col items-center text-center mb-10">
                        <div className="p-3 border-2 border-preanger-primary rounded-full mb-4 bg-preanger-secondary/10">
                            {/* Ikon Gandum/Padi sebagai simbol agraris */}
                            <Wheat className="w-10 h-10 text-preanger-primary" strokeWidth={1.5} />
                        </div>
                        <h2 className="font-serif text-3xl font-extrabold text-preanger-primary uppercase tracking-widest">
                            Logistik Preanger
                        </h2>
                        <div className="flex items-center gap-2 mt-2 text-preanger-primary/70 font-serif italic">
                            <ScrollText className="w-4 h-4" />
                            <span>Administrasi & Inventori Est. 2026</span>
                        </div>
                    </div>

                    {/* Pesan Error */}
                    {error && (
                        <div className="mb-6 bg-red-50 border-l-4 border-red-700 p-4 text-red-800 text-sm font-serif">
                            <p className="font-bold">Peringatan:</p>
                            <p>{error}</p>
                        </div>
                    )}

                    {/* Form Input */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-1">
                            <label className="block font-serif text-sm font-bold text-preanger-primary uppercase tracking-wider">
                                Kredensial Surel
                            </label>
                            {/* Input field dengan gaya klasik: border tegas, sudut tajam */}
                            <input
                                name="email"
                                type="email"
                                required
                                className="block w-full border-2 border-preanger-primary/40 px-4 py-3 font-sans rounded-sm bg-preanger-bg focus:border-preanger-secondary focus:ring-0 outline-none transition-colors placeholder:text-preanger-primary/30"
                                placeholder="nama.anda@preanger.id"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block font-serif text-sm font-bold text-preanger-primary uppercase tracking-wider">
                                Kata Sandi
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                className="block w-full border-2 border-preanger-primary/40 px-4 py-3 font-sans rounded-sm bg-preanger-bg focus:border-preanger-secondary focus:ring-0 outline-none transition-colors placeholder:text-preanger-primary/30"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Tombol Masuk dengan efek tekan */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-8 bg-preanger-primary text-preanger-bg font-serif font-bold uppercase tracking-[0.15em] py-4 border-2 border-preanger-primary hover:bg-preanger-primary/90 hover:text-preanger-secondary transition-all active:translate-y-[2px] active:shadow-none shadow-vintage-sm disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                        >
                            <span className="relative z-10">
                                {loading ? "Memeriksa Arsip..." : "Buka Gerbang Masuk"}
                            </span>
                            {/* Efek hover kilau emas */}
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-sm transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
                        </button>
                    </form>
                </div>

                {/* Footer Keterangan */}
                <div className="bg-preanger-primary p-4 text-center">
                    <p className="text-preanger-secondary text-xs font-serif tracking-wider">
                        &copy; Sistem Terdaftar. Hanya untuk personel berwenang.
                    </p>
                </div>
            </div>
        </div>
    );
}
