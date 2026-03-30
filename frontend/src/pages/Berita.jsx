import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/config";

const Berita = () => {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    try {
      const response = await fetch(`${API_URL}/api/berita`);
      if (!response.ok) throw new Error("Gagal mengambil data berita");
      const data = await response.json();
      setBerita(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col w-full min-h-screen pt-24 pb-16 bg-gradient-to-b from-[#D9FFE6] to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10 max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-14 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 tracking-tight mb-4 inline-block relative">
            Berita & Artikel Desa
            <span className="absolute -bottom-2 left-0 w-2/3 h-1.5 bg-emerald-500 rounded-full"></span>
          </h1>
          <p className="text-gray-600 mt-5 max-w-2xl text-lg leading-relaxed">
            Dapatkan informasi terbaru seputar kegiatan, pengumuman, dan cerita inspiratif langsung dari desa kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-emerald-600">
              <svg className="animate-spin h-10 w-10 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-lg font-medium animate-pulse">Memuat berita terbaru...</span>
            </div>
          ) : berita.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl shadow-sm border border-emerald-100">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-5">
               <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Belum Ada Berita</h3>
              <p className="text-center text-gray-500 max-w-sm">
                Saat ini belum ada artikel yang dipublikasikan. Silakan kembali lagi nanti untuk pembaruan.
              </p>
            </div>
          ) : (
            berita.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-6px_rgba(16,185,129,0.2)] transition-all duration-300 flex flex-col overflow-hidden border border-emerald-50/50 hover:border-emerald-200 transform hover:-translate-y-1.5"
              >
                <Link to={`/berita/${item._id}`} className="relative block overflow-hidden aspect-[4/3] bg-gray-100">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    src={
                      item.gambar.startsWith("http")
                        ? item.gambar
                        : `${API_URL}${item.gambar}`
                    }
                    alt={item.judul}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-3">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      {new Date(item.tanggal).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <Link to={`/berita/${item._id}`} className="block mb-3">
                    <h2 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors duration-200">
                      {item.judul}
                    </h2>
                  </Link>
                  <p className="flex-grow text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {item.isi.replace(/<[^>]+>/g, "").substring(0, 150) + "..."}
                  </p>
                  <div className="mt-6 pt-4 border-t border-gray-100/80">
                    <Link
                      to={`/berita/${item._id}`}
                      className="inline-flex items-center font-bold text-sm text-emerald-600 group-hover:text-emerald-800 transition-colors"
                    >
                      Baca Selengkapnya
                      <svg
                        className="w-4 h-4 ms-2 transform transition-transform duration-300 group-hover:translate-x-1.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default Berita;
