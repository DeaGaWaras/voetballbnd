'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Product = {
  id: number
  name: string
  description: string
  price: number
  discount: number | null
  images: string[]
}

export default function AdminKatalogPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [editId, setEditId] = useState<number | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  /* ================= FETCH ================= */

  async function fetchProducts() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false })

    setProducts(data || [])
  }

  /* ================= HELPERS ================= */

  function formatRupiah(value: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value)
  }

  function getPathFromUrl(url: string) {
    return url.split('/storage/v1/object/public/')[1]
  }

  async function deleteOldImages(urls: string[]) {
    const paths = urls.map(getPathFromUrl)
    await supabase.storage.from('katalog').remove(paths)
  }

  /* ================= UPLOAD (FIX TOTAL) ================= */

  async function uploadImages() {
    if (images.length === 0) return []

    const uploadedUrls: string[] = []

    for (const file of images) {
      const ext = file.name.split('.').pop()
      const fileName = `${crypto.randomUUID()}.${ext}`
      const path = `produk/${fileName}`

      const { error } = await supabase.storage
        .from('katalog')
        .upload(path, file, {
          upsert: true,
          contentType: file.type
        })

      if (error) {
        console.error('Upload error:', error.message)
        continue
      }

      const { data } = supabase.storage
        .from('katalog')
        .getPublicUrl(path)

      uploadedUrls.push(data.publicUrl)
    }

    return uploadedUrls
  }

  /* ================= SUBMIT ================= */

  async function handleSubmit() {
    let imageUrls: string[] = []

    if (images.length > 0) {
      imageUrls = await uploadImages()
    }

    if (editId) {
      const { data: old } = await supabase
        .from('products')
        .select('images')
        .eq('id', editId)
        .single()

      await supabase
        .from('products')
        .update({
          name,
          description,
          price: Number(price),
          discount: discount ? Number(discount) : null,
          images: imageUrls.length > 0 ? imageUrls : old?.images
        })
        .eq('id', editId)

      if (imageUrls.length > 0 && old?.images) {
        await deleteOldImages(old.images)
      }
    } else {
      await supabase.from('products').insert({
        name,
        description,
        price: Number(price),
        discount: discount ? Number(discount) : null,
        images: imageUrls
      })
    }

    resetForm()
    fetchProducts()
  }

  async function handleDelete(product: Product) {
    if (product.images?.length) {
      await deleteOldImages(product.images)
    }

    await supabase.from('products').delete().eq('id', product.id)
    fetchProducts()
  }

  function resetForm() {
    setName('')
    setDescription('')
    setPrice('')
    setDiscount('')
    setImages([])
    setEditId(null)
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-green-400 mb-6">
        Admin Katalog
      </h1>

      {/* FORM */}
      <div className="bg-white text-black p-6 rounded-xl mb-10">
        <h2 className="font-bold mb-4">
          {editId ? 'Edit Produk' : 'Tambah Produk'}
        </h2>

        <input
          placeholder="Nama Produk"
          className="input"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <textarea
          placeholder="Deskripsi"
          className="input"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <input
          placeholder="Harga (contoh: 130000)"
          className="input"
          value={price}
          onChange={e => setPrice(e.target.value.replace(/\D/g, ''))}
        />

        <input
          placeholder="Diskon (%)"
          className="input"
          value={discount}
          onChange={e => setDiscount(e.target.value.replace(/\D/g, ''))}
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={e => setImages(Array.from(e.target.files || []))}
        />

        {/* PREVIEW */}
        <div className="flex gap-2 mt-3">
          {images.map((img, i) => {
            const url = URL.createObjectURL(img)
            return (
              <img
                key={i}
                src={url}
                onLoad={() => URL.revokeObjectURL(url)}
                className="w-20 h-20 object-cover rounded"
              />
            )
          })}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-green-500 text-black px-6 py-2 rounded font-bold"
        >
          Simpan
        </button>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {products.map(p => {
          const finalPrice = p.discount
            ? p.price - (p.price * p.discount) / 100
            : p.price

          return (
            <div
              key={p.id}
              className="bg-white text-black rounded-xl overflow-hidden"
            >
              <img
                src={p.images?.[0]}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-sm mb-2">{p.description}</p>

                {p.discount ? (
                  <>
                    <p className="line-through text-gray-500">
                      {formatRupiah(p.price)}
                    </p>
                    <p className="text-green-600 font-bold">
                      {formatRupiah(finalPrice)}
                    </p>
                  </>
                ) : (
                  <p className="font-bold">
                    {formatRupiah(p.price)}
                  </p>
                )}

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      setEditId(p.id)
                      setName(p.name)
                      setDescription(p.description)
                      setPrice(String(p.price))
                      setDiscount(p.discount?.toString() || '')
                      setImages([])
                    }}
                    className="bg-black text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #ccc;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 6px;
        }
      `}</style>
    </div>
  )
}
