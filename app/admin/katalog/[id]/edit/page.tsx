export default function EditKatalog({ params }: any) {
  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1>Edit Katalog: {params.id}</h1>

      <form className="mt-4 space-y-3">
        <input
          className="w-full bg-black border p-2"
          placeholder="Judul Produk"
        />
        <textarea
          className="w-full bg-black border p-2"
          placeholder="Deskripsi"
        />

        <button className="border px-4 py-2">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
