export default function InstagramGallery({ onBack }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <button
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 bg-[#1E40AF] hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-full transition-all"
      >
        ← Kembali ke Portofolio
      </button>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Instagram Photo Gallery</h1>
        <p className="text-slate-400">
          Galeri foto interaktif portofolio visual Anda.
        </p>
      </div>
    </div>
  );
}