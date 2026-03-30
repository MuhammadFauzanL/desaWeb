import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const Home = () => {
  const cibiruPosition = [-6.9346385, 107.7176171];

  return (
    <main className="flex w-full min-h-screen items-center justify-center pt-14 md:px-[8vw] px-[3vw] bg-gray-50">
      <div className="flex flex-col md:flex-row w-full max-w-6xl items-center justify-center gap-10">
        
        {/* Kolom Informasi */}
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 max-w-3xl font-sans w-full md:w-2/3">
          <div className="flex items-start gap-5">
            <img
              src="https://img.icons8.com/pastel-glyph/96/0f766e/village--v1.png"
              alt="Icon Desa"
              className="w-24 h-24 rounded-lg object-contain bg-emerald-50 p-2"
            />
            <div className="pt-2">
              <h2 className="text-3xl font-bold text-teal-700">
                Desa Cibiru
              </h2>
              <p className="text-md text-gray-600 mt-1">
                Kecamatan Cileunyi, Kabupaten Bandung
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-6">
            {/* Visi dan Statistik Sejajar */}
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              
              {/* Visi Section */}
              <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100 transition-colors duration-300 hover:bg-emerald-100/50 flex flex-col justify-center">
                <h3 className="font-semibold text-teal-800 text-lg flex items-center gap-2 mb-2">
                  Visi
                </h3>
                <p className="text-sm italic text-gray-700 leading-relaxed">
                  "Terwujudnya Desa Cibiru yang Maju, Mandiri, dan Sejahtera melalui Pembangunan yang Berkelanjutan dan Berkeadilan"
                </p>
              </div>

              {/* Statistik Section */}
              <div className="flex flex-col justify-center">
                <h3 className="font-semibold text-teal-800 text-lg flex items-center gap-2 mb-3">
                  Statistik
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { 
                      value: "2,45 Km²", 
                      label: "Luas wilayah", 
                      icon: (
                        <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A2 2 0 013 15.494V5.506a2 2 0 011.553-1.943L9 2l6 3 5.447-2.724A2 2 0 0121 4.223v9.988a2 2 0 01-1.553 1.943L15 19l-6 1z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20V8L15 11v11" />
                        </svg>
                      )
                    },
                    { 
                      value: "14", 
                      label: "Rukun Warga", 
                      icon: (
                        <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      )
                    },
                    { 
                      value: "60", 
                      label: "Rukun Tetangga", 
                      icon: (
                        <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      )
                    },
                    { 
                      value: "8,200", 
                      label: "Penduduk", 
                      icon: (
                        <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )
                    }
                  ].map((stat, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-100 p-3 rounded-xl hover:-translate-y-0.5 transition-transform duration-300 flex flex-col justify-center">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-lg font-bold text-teal-700">{stat.value}</span>
                        {stat.icon}
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Misi Section Memanjang di Bawah */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="font-semibold text-teal-800 text-lg flex items-center gap-2 mb-3">
                Misi
              </h3>
              <ul className="text-sm text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 list-disc list-inside">
                <li>Meningkatkan kualitas pelayanan publik yang cepat, tepat & transparan.</li>
                <li>Mengembangkan potensi ekonomi lokal berbasis pertanian dan UMKM.</li>
                <li>Meningkatkan kualitas sumber daya manusia melalui pendidikan & kesehatan.</li>
                <li>Mewujudkan pembangunan infrastruktur yang merata dan berkelanjutan.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Kolom Peta */}
        <div className="w-full md:w-1/3 h-[500px] rounded-2xl overflow-hidden shadow-md border border-gray-200">
          <MapContainer
            center={cibiruPosition}
            zoom={15}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={cibiruPosition}>
              <Popup>
                <b>Desa Cibiru</b> <br /> Kecamatan Cileunyi, Kabupaten Bandung
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
};

export default Home;
