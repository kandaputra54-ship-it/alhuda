import React, { useState, useEffect } from 'react';

export const QurbanView = () => {
  const [step, setStep] = useState(0);

  // Rotasi slide setiap 20 detik (Total 1 menit untuk 3 slide)
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-between py-10 animate-in fade-in duration-1000">
      
      {/* HEADER UTAMA - Selalu tampil di semua slide */}
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-5xl font-bold tracking-tight text-yellow-500 uppercase">
          MENERIMA & MENYALURKAN HEWAN QURBAN 1447H / 2026
        </h2>
        <p className="text-2xl opacity-80 uppercase tracking-[0.4em] font-light">
          Panitia Qurban Masjid Al-Huda
        </p>
        <div className="h-1 w-48 bg-emerald-500 mx-auto mt-4" />
      </div>

      {/* AREA KONTEN DINAMIS */}
      <div className="flex-1 w-full flex items-center justify-center">
        
        {/* Slide 1: Nilai Qurban & Batas Pembayaran */}
        {step === 0 && (
          <div className="text-center space-y-10 animate-in zoom-in duration-700">
            <div className="space-y-2">
              <p className="text-3xl uppercase tracking-widest text-emerald-400">Nilai Qurban Rombongan Sapi / Orang</p>
              <h1 className="text-[12rem] font-black leading-none tracking-tighter">
                <span className="text-5xl align-top mr-4 opacity-50">Rp</span>3.700.000
              </h1>
            </div>
            <div className="bg-red-600 px-12 py-5 rounded-xl inline-block shadow-2xl">
              <p className="text-4xl font-bold uppercase tracking-wider">
                Batas Pembayaran: 25 Mei 2026
              </p>
            </div>
          </div>
        )}

        {/* Slide 2: Jadwal Pelaksanaan */}
        {step === 1 && (
          <div className="text-center space-y-8 animate-in slide-in-from-bottom-10 duration-700">
            <p className="text-3xl uppercase tracking-[0.3em] text-emerald-400">Pelaksanaan Idul Adha 1447 H</p>
            <div className="bg-white/5 backdrop-blur-md p-16 rounded-[3rem] border border-white/10 shadow-2xl min-w-[600px]">
              <h1 className="text-9xl font-black text-white italic">RABU</h1>
              <div className="h-px bg-white/20 my-6" />
              <h2 className="text-7xl font-bold text-yellow-500 uppercase">27 Mei 2026</h2>
            </div>
          </div>
        )}

        {/* Slide 3: Hak Pengqurban & Kontak DKM */}
        {step === 2 && (
          <div className="w-full max-w-6xl grid grid-cols-2 gap-10 animate-in fade-in zoom-in duration-700">
            {/* Rincian Hak */}
            <div className="bg-black/30 p-12 rounded-[2.5rem] border-l-8 border-emerald-500 text-left">
              <h3 className="text-3xl font-bold mb-8 text-emerald-400 uppercase tracking-wide">Hak Pengqurban :</h3>
              <ul className="space-y-8 text-3xl font-medium uppercase">
                <li>
                  <span className="text-yellow-500 font-bold block text-lg mb-1 italic">Hewan Sapi</span>
                  Daging 3 KG + 5 Kantong
                </li>
                <li>
                   <span className="text-yellow-500 font-bold block text-lg mb-1 italic">Hewan Kambing</span>
                  Paha Belakang Kanan + 1 Kantong
                </li>
              </ul>
            </div>

            {/* Instruksi Kontak */}
            <div className="flex flex-col justify-center items-center bg-emerald-900/20 p-12 rounded-[2.5rem] border border-emerald-500/20">
              <p className="text-2xl uppercase tracking-[0.2em] opacity-60 mb-2">Informasi Pendaftaran</p>
              <h2 className="text-7xl font-black text-white leading-tight">HUBUNGI</h2>
              <h2 className="text-6xl font-black text-yellow-500">DKM AL-HUDA</h2>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER - Tetap tampil */}
      <div className="mt-8 text-sm tracking-[0.6em] opacity-20 uppercase">
        Masjid Al-Huda Utankayu — Pengelolaan Qurban Mandiri
      </div>

    </div>
  );
};