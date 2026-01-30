"use client";

import { useEffect } from "react";
import { RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-green-400">500</h1>

        <h2 className="mt-4 text-2xl font-semibold text-white">
          Terjadi Kesalahan
        </h2>

        <p className="mt-2 text-zinc-400 text-sm">
          Sistem lagi kena tekel keras. Coba lagi atau balik ke home.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-2 px-5 py-3 rounded-xl 
              bg-green-400 text-black font-semibold 
              hover:bg-green-300 transition"
          >
            <RefreshCcw size={18} />
            Coba Lagi
          </button>

          <a
            href="/"
            className="flex items-center gap-2 px-5 py-3 rounded-xl 
              border border-zinc-700 text-white 
              hover:border-green-400 hover:text-green-400 transition"
          >
            <Home size={18} />
            Home
          </a>
        </div>
      </div>
    </main>
  );
}
