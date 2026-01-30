"use client";

import { useEffect, useState } from "react";

type Feedback = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

export default function AdminFeedbackPage() {
  const [data, setData] = useState<Feedback[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/feedback");
        if (!res.ok) throw new Error("Fetch gagal");
        const json = await res.json();
        setData(json || []);
      } catch (err) {
        console.error("Feedback error:", err);
      }
    }

    load();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-green-400 mb-6">
        Kritik & Saran Masuk
      </h1>

      <div className="space-y-4 max-w-3xl">
        {data.length === 0 && (
          <p className="text-zinc-500">Belum ada feedback.</p>
        )}

        {data.map((f) => (
          <div
            key={f.id}
            className="border border-white/20 rounded-xl p-4"
          >
            <p className="text-sm text-zinc-400 mb-1">
              {f.name} •{" "}
              {new Date(f.created_at).toLocaleString("id-ID")}
            </p>
            <p>{f.message}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
