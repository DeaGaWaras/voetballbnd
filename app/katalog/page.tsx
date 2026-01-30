"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number | null;
  images: string[];
};

export default function KatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  }

  function formatRupiah(value: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  }

  return (
    <main className="min-h-screen bg-black text-white px-5 py-8">
      <h1 className="text-3xl font-bold text-green-400 mb-8 text-center">
        Katalog Produk
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            active={active === product.id}
            onToggle={() =>
              setActive(active === product.id ? null : product.id)
            }
            formatRupiah={formatRupiah}
          />
        ))}
      </div>
    </main>
  );
}

/* ================= CARD ================= */

function ProductCard({
  product,
  active,
  onToggle,
  formatRupiah,
}: {
  product: Product;
  active: boolean;
  onToggle: () => void;
  formatRupiah: (n: number) => string;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!sliderRef.current) return;
    if (product.images.length <= 1) return;
    if (active) return;

    const interval = setInterval(() => {
      indexRef.current =
        (indexRef.current + 1) % product.images.length;

      sliderRef.current!.scrollTo({
        left: sliderRef.current!.clientWidth * indexRef.current,
        behavior: "smooth",
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [product.images.length, active]);

  const finalPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <div
      onClick={onToggle}
      className={`relative bg-white text-black rounded-2xl overflow-hidden cursor-pointer
      transition-all duration-300 hover:scale-[1.02]
      ${active ? "ring-2 ring-green-400 z-10" : ""}`}
    >
      {/* IMAGE */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto snap-x snap-mandatory h-56 scroll-smooth no-scrollbar"
      >
        {product.images.map((img, i) => (
          <div
            key={i}
            className="w-full h-56 snap-center flex-shrink-0"
          >
            <img
              src={img}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* INFO */}
      <div className="p-4">
        <h2 className="font-semibold text-lg">{product.name}</h2>

        {product.discount ? (
          <>
            <p className="text-xs line-through text-zinc-400">
              {formatRupiah(product.price)}
            </p>
            <p className="text-green-600 font-bold">
              {formatRupiah(finalPrice)}
            </p>
          </>
        ) : (
          <p className="font-bold">{formatRupiah(product.price)}</p>
        )}
      </div>

      {/* DETAIL */}
      <div
        className={`absolute inset-0 backdrop-blur-md bg-black/85 text-white p-6
        transition-transform duration-300
        ${active ? "translate-y-0" : "translate-y-full"}`}
      >
        <h3 className="font-bold text-green-400 mb-3 text-lg">
          {product.name}
        </h3>

        {/* DESCRIPTION SCROLL ONLY */}
        <div className="max-h-32 overflow-y-auto no-scrollbar mb-4">
          <p className="text-sm text-zinc-200 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* CTA ALWAYS VISIBLE */}
        <a
          href={`https://wa.me/6283806189025?text=Saya tertarik dengan ${product.name}`}
          target="_blank"
          className="block text-center bg-green-500 text-black font-bold py-3 rounded-xl"
        >
          Beli Sekarang
        </a>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="mt-4 text-xs text-zinc-400 underline block mx-auto"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
