import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../utils/config";

const BacaBerita = () => {
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    loadBerita();
  }, [id]);

  const loadBerita = async () => {
    if (!id) {
      setBerita({ judul: "Berita tidak ditemukan.", isi: "" });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/berita/${id}`);
      if (!response.ok) throw new Error("Gagal mengambil detail berita");
      const data = await response.json();

      data.tanggalFormatted = `Dipublikasikan pada ${new Date(
        data.tanggal
      ).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`;

      if (data.gambar && !data.gambar.startsWith("http")) {
        data.gambar = `${API_URL}${data.gambar}`;
      }

      setBerita(data);
      document.title = data.judul;
    } catch (error) {
      setBerita({ judul: "Gagal memuat berita.", isi: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-[#D9FFE6] to-white flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-emerald-600">
          <svg className="animate-spin h-10 w-10 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg font-medium animate-pulse">Memuat artikel...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen pt-24 pb-16 bg-gradient-to-b from-[#D9FFE6] to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
        {berita && (
          <article className="bg-white/90 backdrop-blur-sm p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl border border-emerald-50 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>

            <div className="mb-8 relative z-10">
              <Link
                to="/berita"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-semibold transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mr-3 group-hover:bg-emerald-100 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transform transition-transform group-hover:-translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                Kembali ke Berita
              </Link>
            </div>

            <header className="mb-10 relative z-10 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight max-w-4xl tracking-tight">
                {berita.judul}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-emerald-700 font-medium">
                <span className="flex items-center bg-emerald-50 px-4 py-1.5 rounded-full">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/></svg>
                  {berita.tanggalFormatted}
                </span>
                <span className="flex items-center bg-emerald-50 px-4 py-1.5 rounded-full">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg>
                  Redaksi Desa
                </span>
              </div>
            </header>

            {berita.gambar && (
              <figure className="mb-12 relative z-10 group overflow-hidden rounded-2xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
                <img
                  src={berita.gambar}
                  alt={berita.judul}
                  className="w-full h-auto max-h-[500px] object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              </figure>
            )}

            <div
              className="prose prose-lg prose-emerald max-w-none text-gray-700 leading-relaxed font-normal ql-editor relative z-10"
              dangerouslySetInnerHTML={{ __html: berita.isi }}
            />
          </article>
        )}
      </div>
    </main>
  );
};

export default BacaBerita;
