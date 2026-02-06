"use client";

import { useState } from "react";

export default function KritikSaranPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        message: form.get("message"),
        website: form.get("website"),
      }),
    });

    setLoading(false);
    setSent(true);
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <section className="w-full max-w-md border border-white/20 p-6 rounded-xl">
        <h1 className="text-2xl font-bold text-green-400 mb-2">
          Kritik & Saran
        </h1>
        <p className="text-sm text-zinc-400 mb-6">
          Pendapatmu penting. Kami baca satu per satu.
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* honeypot */}
            <input
              type="text"
              name="website"
              className="hidden"
              tabIndex={-1}
            />

            <input
              name="name"
              placeholder="email (opsional)"
              className="w-full bg-black border border-white/30 px-4 py-3 rounded"
            />
  
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tulis kritik atau saran kamu..."
              className="w-full bg-black border border-white/30 px-4 py-3 rounded resize-none"
            />

            <button
              disabled={loading}
              className="w-full bg-green-500 text-black py-3 rounded font-bold hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Mengirim..." : "Kirim"}
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <p className="text-green-400 font-bold text-lg">Terima kasih 🤍</p>
            <p className="text-zinc-400 text-sm mt-2">
              Masukanmu sudah tersimpan.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
