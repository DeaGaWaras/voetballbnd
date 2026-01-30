"use client";

import { MessageSquare, ShoppingBag, Shield } from "lucide-react";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <section className="w-full max-w-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-3">
            <Shield className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-sm text-zinc-400 mt-2">
            Kelola katalog & masukan pengguna
          </p>
        </div>

        {/* Menu */}
        <div className="grid gap-4">
          <a
            href="/admin/katalog"
            className="group border border-white/20 rounded-xl p-5 flex items-center justify-between hover:border-green-400 transition"
          >
            <div className="flex items-center gap-4">
              <ShoppingBag className="text-green-400" />
              <div>
                <p className="font-semibold">Katalog Produk</p>
                <p className="text-sm text-zinc-400">
                  Tambah, edit, hapus produk
                </p>
              </div>
            </div>
            <span className="text-zinc-500 group-hover:text-green-400">→</span>
          </a>

          <a
            href="/admin/feedback"
            className="group border border-white/20 rounded-xl p-5 flex items-center justify-between hover:border-green-400 transition"
          >
            <div className="flex items-center gap-4">
              <MessageSquare className="text-green-400" />
              <div>
                <p className="font-semibold">Kritik & Saran</p>
                <p className="text-sm text-zinc-400">
                  Lihat masukan pengunjung
                </p>
              </div>
            </div>
            <span className="text-zinc-500 group-hover:text-green-400">→</span>
          </a>
        </div>

        <p className="text-center text-xs text-zinc-500 mt-10">
          © 2026 Voetballbond Admin
        </p>
      </section>
    </main>
  );
}
