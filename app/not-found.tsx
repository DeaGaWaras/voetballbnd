"use client";

import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-green-400">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-white">
          Halaman Tidak Ditemukan
        </h2>

        <p className="mt-2 text-zinc-400 text-sm">
          Seperti umpan salah arah, halaman ini nggak ada.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <a
            href="/"
            className="flex items-center gap-2 px-5 py-3 rounded-xl 
              bg-green-400 text-black font-semibold 
              hover:bg-green-300 transition"
          >
            <Home size={18} />
            Home
          </a>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-5 py-3 rounded-xl 
              border border-zinc-700 text-white 
              hover:border-green-400 hover:text-green-400 transition"
          >
            <ArrowLeft size={18} />
            Kembali
          </button>
        </div>
      </div>
    </main>
  );
}
