"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { SiInstagram, SiWhatsapp, SiTiktok, SiShopee } from "react-icons/si";

const links = [
  { label: "Katalog Produk", icon: ShoppingBag, href: "/katalog", primary: true },
  { label: "Instagram", icon: SiInstagram, href: "https://instagram.com/voetballbnd_subculture" },
  { label: "Tiktok", icon: SiTiktok, href: "https://www.tiktok.com/@voetballbondsubculture" },
  { label: "WhatsApp", icon: SiWhatsapp, href: "https://wa.me/6285701722142" },
  { label: "Shopee", icon: SiShopee, href: "/not-found" },
  { label: "Kritik & Saran", icon: MessageCircle, href: "/kritik-saran" },
];

/* 🌈 GRADIENT VARIANTS */
const gradients = [
  // 🌿 GREEN → BLACK (soft)
  "bg-[radial-gradient(ellipse_at_left,rgba(34,197,94,0.35)_0%,transparent_65%),radial-gradient(ellipse_at_right,rgba(34,197,94,0.25)_0%,transparent_70%)]",

  // 🤍 WHITE → BLACK (very soft)
  "bg-[radial-gradient(ellipse_at_left,rgba(255,255,255,0.25)_0%,transparent_65%),radial-gradient(ellipse_at_right,rgba(255,255,255,0.15)_0%,transparent_70%)]",

  // 🌿🤍 MIX GREEN + WHITE → BLACK
  "bg-[radial-gradient(ellipse_at_left,rgba(34,197,94,0.3)_0%,transparent_65%),radial-gradient(ellipse_at_right,rgba(255,255,255,0.2)_0%,transparent_70%)]",
];


export default function Home() {
  const [gradientIndex, setGradientIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientIndex((prev) => (prev + 1) % gradients.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 bg-black">

      {/* 🌈 STATE-BASED GRADIENT */}
      <div
        className={`
          absolute inset-0 animate-mesh transition-all duration-1000
          ${gradients[gradientIndex]}
        `}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* 🌫️ NOISE */}
      <div className="absolute inset-0 noise animate-noise opacity-[0.12] mix-blend-overlay pointer-events-none" />

      {/* CONTENT */}
      <section className="relative z-10 w-full max-w-sm text-center">

        {/* Profile */}
        <div className="flex flex-col items-center">
          <Image
            src="/profile_bg.jpeg"
            alt="Voetballbond"
            width={120}
            height={120}
            className="rounded-full border-2 border-green-400 shadow-lg shadow-green-400/20"
          />

          <h1 className="mt-4 text-2xl font-bold tracking-wide text-white">
            @Subculture
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Voetballbond SubCulture
          </p>
        </div>

        {/* Links */}
        <div className="mt-10 space-y-4">
          {links.map((item, i) => {
            const Icon = item.icon;
            return (
              <a
                key={i}
                href={item.href}
                className={`
                  flex items-center justify-between px-5 py-4 rounded-2xl
                  border backdrop-blur-md transition-all duration-200
                  ${
                    item.primary
                      ? "bg-green-400 text-black border-green-400 hover:bg-green-300"
                      : "bg-zinc-900/80 text-white border-zinc-800 hover:border-green-400 hover:bg-zinc-800"
                  }
                  hover:scale-[1.03] active:scale-95
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span className="font-semibold">{item.label}</span>
                </div>
                <span className="opacity-60">→</span>
              </a>
            );
          })}
        </div>

        <p className="mt-10 text-xs text-zinc-500">
          © 2026 Voetballbond — Made for football culture
        </p>
      </section>
    </main>
  );
}
