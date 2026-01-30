"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Password admin salah");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <section className="w-full max-w-sm border border-white/20 rounded-xl p-6">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full border border-green-400 flex items-center justify-center">
            <Shield className="text-green-400 w-7 h-7" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-1">
          Admin Login
        </h1>
        <p className="text-sm text-zinc-400 text-center mb-6">
          Akses khusus administrator
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <input
              type="password"
              placeholder="Password Admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black border border-white/30 rounded px-9 py-3 outline-none focus:border-green-400 transition"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-black py-3 rounded font-bold transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Memeriksa..." : "Masuk Admin"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-zinc-500 text-center mt-6">
          Voetballbond • Admin Panel
        </p>
      </section>
    </main>
  );
}
