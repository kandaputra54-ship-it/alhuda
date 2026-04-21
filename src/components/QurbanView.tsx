import React from 'react';
import { AlarmClock } from 'lucide-react';

export const QurbanView = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-between py-10 animate-in fade-in duration-1000">

      {/* HEADER UTAMA */}
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-5xl font-bold tracking-tight text-yellow-500 uppercase">
          MENERIMA & MENYALURKAN HEWAN QURBAN 1447H / 2026
        </h2>
        <p className="text-2xl opacity-80 uppercase tracking-[0.4em] font-light">
          Panitia Qurban Masjid Al-Huda
        </p>
        <div className="h-1 w-48 bg-emerald-500 mx-auto mt-4" />
      </div>

      {/* HARGA */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <p className="uppercase tracking-[0.4em] text-emerald-400 text-2xl font-light">
          Nilai Qurban Rombongan Sapi / Orang
        </p>

        <div className="flex items-baseline gap-3">
          <span className="text-white/40 text-4xl font-light">Rp</span>
          <span className="text-[8rem] font-black leading-none text-white">
            3.700.000
          </span>
        </div>

        {/* Batas pembayaran */}
        <div className="flex items-center gap-3 bg-red-600/20 border border-red-500/30 px-8 py-3 rounded-xl">
          <AlarmClock className="text-red-400 shrink-0" size={24} strokeWidth={1.5} />
          <p className="text-xl font-semibold uppercase tracking-widest text-red-300">
            Batas Pembayaran &nbsp;·&nbsp; 25 Mei 2026
          </p>
        </div>
      </div>

      {/* Footer kecil */}
      <div className="text-sm tracking-[0.6em] opacity-20 uppercase">
        Masjid Al-Huda Utankayu — Pengelolaan Qurban Mandiri
      </div>

    </div>
  );
};