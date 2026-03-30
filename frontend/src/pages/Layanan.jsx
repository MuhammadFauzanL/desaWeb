import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/config";

const Layanan = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [aspirasiForm, setAspirasiForm] = useState({ nama: "", aspirasi: "" });
  const [peminjamanForm, setPeminjamanForm] = useState({
    nama: "",
    barang: "",
    keperluan: "",
    tanggalPinjam: "",
    tanggalKembali: "",
  });

  useEffect(() => {
    const getUserInfo = () => {
      const token = localStorage.getItem("token");
      if (!token) return null;
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          return null;
        }
        return payload;
      } catch (e) {
        localStorage.removeItem("token");
        return null;
      }
    };
    setUserInfo(getUserInfo());
  }, []);

  const handleAspirasiSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/aspirasi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aspirasiForm),
      });
      if (!response.ok)
        throw new Error(
          (await response.json()).msg || "Gagal mengirim aspirasi"
        );
      alert("Terima kasih! Aspirasi Anda telah berhasil dikirim.");
      setAspirasiForm({ nama: "", aspirasi: "" });
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePeminjamanSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/api/peminjaman`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(peminjamanForm),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Gagal mengajukan peminjaman");
      alert("Pengajuan peminjaman Anda telah berhasil dikirim.");
      setPeminjamanForm({
        nama: "",
        barang: "",
        keperluan: "",
        tanggalPinjam: "",
        tanggalKembali: "",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <main className="flex flex-col w-full min-h-screen pt-24 pb-12 bg-gradient-to-br from-gray-50 to-emerald-50/40 relative overflow-hidden">
      {/* Dekorasi Latar Belakang Lanjutan */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50 rounded-full filter blur-[100px] opacity-70 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50 rounded-full filter blur-[80px] opacity-60"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-teal-800 font-extrabold tracking-tight relative inline-block group">
            Layanan Masyarakat Desa
            <span className="absolute -bottom-2 left-0 w-1/2 h-1.5 bg-emerald-500 rounded-full transition-all duration-500 group-hover:w-full"></span>
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Sampaikan aspirasi Anda atau ajukan peminjaman sarana dengan mudah.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Aspirasi Form */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(20,184,166,0.1)] transition-all duration-500 p-8 space-y-6 border border-white transform hover:-translate-y-1">
            <div className="flex items-center gap-4 text-gray-800 font-bold text-2xl pb-4 border-b border-emerald-50">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white shadow-emerald-200 shadow-lg transform transition-transform group-hover:rotate-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A4.992 4.992 0 017 17h10a4.992 4.992 0 011.879.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-800 to-emerald-700">Aspirasi Masyarakat</span>
            </div>
            
            <form onSubmit={handleAspirasiSubmit} className="space-y-5">
              <div className="group relative">
                <input
                  type="text"
                  value={aspirasiForm.nama}
                  onChange={(e) =>
                    setAspirasiForm({ ...aspirasiForm, nama: e.target.value })
                  }
                  placeholder="Nama Lengkap Anda"
                  required
                  className="w-full p-4 rounded-xl bg-gray-50/50 border border-emerald-100 text-sm text-gray-800 placeholder-teal-800/40 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-300 outline-none"
                />
              </div>
              <div className="group relative">
                <textarea
                  rows="5"
                  value={aspirasiForm.aspirasi}
                  onChange={(e) =>
                    setAspirasiForm({ ...aspirasiForm, aspirasi: e.target.value })
                  }
                  placeholder="Sampaikan aspirasi, saran, dan keluhan Anda di sini..."
                  required
                  className="w-full p-4 rounded-xl bg-gray-50/50 border border-emerald-100 text-sm text-gray-800 placeholder-teal-800/40 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-300 outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-3.5 rounded-xl hover:from-teal-700 hover:to-emerald-600 font-bold transition-all duration-300 shadow-md hover:shadow-emerald-500/30 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Kirim Aspirasi</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </button>
            </form>
          </div>

          {/* Peminjaman Form */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(20,184,166,0.1)] transition-all duration-500 p-8 space-y-6 border border-white transform hover:-translate-y-1">
            <div className="flex items-center gap-4 text-gray-800 font-bold text-2xl pb-4 border-b border-emerald-50">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-emerald-200 shadow-lg form-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v4a1 1 0 001 1h3m10 0h3a1 1 0 001-1V7M6 21h12a2 2 0 002-2v-7H4v7a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-800">Peminjaman Sarana/Prasarana</span>
            </div>

            {userInfo ? (
              <form onSubmit={handlePeminjamanSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={peminjamanForm.nama}
                    onChange={(e) =>
                      setPeminjamanForm({
                        ...peminjamanForm,
                        nama: e.target.value,
                      })
                    }
                    placeholder="Nama Pemohon"
                    required
                    className="w-full p-3.5 rounded-xl bg-gray-50/50 border border-emerald-100 text-sm text-gray-800 placeholder-teal-800/40 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 outline-none"
                  />
                  <input
                    type="text"
                    value={peminjamanForm.barang}
                    onChange={(e) =>
                      setPeminjamanForm({
                        ...peminjamanForm,
                        barang: e.target.value,
                      })
                    }
                    placeholder="Barang yang Dipinjam"
                    required
                    className="w-full p-3.5 rounded-xl bg-gray-50/50 border border-emerald-100 text-sm text-gray-800 placeholder-teal-800/40 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 outline-none"
                  />
                </div>
                <input
                  type="text"
                  value={peminjamanForm.keperluan}
                  onChange={(e) =>
                    setPeminjamanForm({
                      ...peminjamanForm,
                      keperluan: e.target.value,
                    })
                  }
                  placeholder="Deskripsi Keperluan"
                  required
                  className="w-full p-3.5 rounded-xl bg-gray-50/50 border border-emerald-100 text-sm text-gray-800 placeholder-teal-800/40 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 outline-none"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label
                      htmlFor="tanggal-pinjam"
                      className="absolute -top-2.5 left-3 bg-white px-2 text-xs font-bold text-emerald-600 rounded-md ring-1 ring-emerald-50 shadow-sm"
                    >
                      Tgl. Pinjam
                    </label>
                    <input
                      type="date"
                      id="tanggal-pinjam"
                      value={peminjamanForm.tanggalPinjam}
                      onChange={(e) =>
                        setPeminjamanForm({
                          ...peminjamanForm,
                          tanggalPinjam: e.target.value,
                        })
                      }
                      required
                      min={today}
                      className="w-full p-3.5 mt-2 rounded-xl bg-gray-50/50 border border-emerald-100 text-sm text-gray-800 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 outline-none"
                    />
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="tanggal-kembali"
                      className="absolute -top-2.5 left-3 bg-white px-2 text-xs font-bold text-emerald-600 rounded-md ring-1 ring-emerald-50 shadow-sm"
                    >
                      Tgl. Kembali
                    </label>
                    <input
                      type="date"
                      id="tanggal-kembali"
                      value={peminjamanForm.tanggalKembali}
                      onChange={(e) =>
                        setPeminjamanForm({
                          ...peminjamanForm,
                          tanggalKembali: e.target.value,
                        })
                      }
                      required
                      min={today}
                      className="w-full p-3.5 mt-2 rounded-xl bg-gray-50/50 border border-emerald-100 text-sm text-gray-800 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3.5 rounded-xl hover:from-emerald-600 hover:to-teal-700 font-bold transition-all duration-300 shadow-md hover:shadow-teal-500/30 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span>Ajukan Peminjaman</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-gray-600 bg-emerald-50/30 border border-emerald-100 border-dashed p-8 rounded-2xl h-[calc(100%-80px)]">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Akses Terbatas</h4>
                <p className="text-sm">
                  Anda harus{" "}
                  <Link
                    to="/login"
                    className="text-emerald-600 font-bold hover:text-emerald-700 underline underline-offset-4 decoration-emerald-200 hover:decoration-emerald-500 transition-all"
                  >
                    login
                  </Link>{" "}
                  terlebih dahulu untuk mengajukan peminjaman sarana.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layanan;
