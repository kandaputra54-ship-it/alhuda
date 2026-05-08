import React, { memo } from "react";
import Marquee from "react-fast-marquee";
import { IconCalendar,  IconPhone } from "@tabler/icons-react";
import { Icon } from "@iconify/react";

// Menggunakan React.memo agar komponen tidak render ulang setiap detik 
// meskipun Parent (page.tsx) update state 'now' terus-menerus.
export const MarqueeFooter = memo(() => {
  return (
    <div className="h-20 bg-black/40 backdrop-blur-xl rounded-[30px] flex items-center overflow-hidden border border-white/10 relative transform-gpu">
      <Marquee 
        speed={45}
        gradient={false} 
        pauseOnHover={false}
        className="overflow-hidden"
      >
        {/* Ayat-ayat Al-Qur'an */}
        

        {/* Separator */}
        <span className="mx-12 text-emerald-400/50 text-4xl">❖</span>

        {/* Info Qurban: Jadwal */}
        <span className="mx-6 text-white/60 text-4xl uppercase tracking-widest font-light flex items-center gap-3">
          <IconCalendar className="w-8 h-8 text-emerald-400" strokeWidth={1.5} />
          Pelaksanaan Idul Adha 1447H:
        </span>
        <span className="mx-6 text-yellow-400 font-bold text-5xl uppercase">
          Rabu, 27 Mei 2026
        </span>
        <span className="text-white/30 text-4xl mx-6">✦</span>

        {/* Info Qurban: Hak Sapi */}
        <span className="mx-6 text-white/60 text-4xl uppercase tracking-widest font-light flex items-center gap-3">
          <Icon icon="noto:cow" className="w-8 h-8" />
          Hak Pengqurban Sapi:
        </span>
        <span className="mx-6 text-emerald-300 font-semibold text-5xl">
          Daging 3 KG + 5 Kantong
        </span>
        <span className="text-white/30 text-4xl mx-6">✦</span>

        {/* Info Qurban: Hak Kambing */}
        <span className="mx-6 text-white/60 text-4xl uppercase tracking-widest font-light flex items-center gap-3">
          <Icon icon="noto:goat" className="w-8 h-8" />
          Hak Pengqurban Kambing:
        </span>
        <span className="mx-6 text-emerald-300 font-semibold text-5xl">
          Paha Belakang Kanan + 1 Kantong
        </span>
        <span className="text-white/30 text-4xl mx-6">✦</span>

        {/* Info Qurban: Kontak */}
        <span className="mx-6 text-white/60 text-4xl uppercase tracking-widest font-light flex items-center gap-3">
          <IconPhone className="w-8 h-8 text-emerald-400" strokeWidth={1.5} />
          Informasi & Pendaftaran:
        </span>
        <span className="mx-6 text-yellow-400 font-bold text-5xl uppercase">
          Hubungi DKM Masjid  Al-Huda
        </span>

        {/* Separator sebelum kembali ke ayat */}
        <span className="mx-12 text-emerald-400/50 text-4xl">❖</span>
      </Marquee>
    </div>
  );
});

MarqueeFooter.displayName = "MarqueeFooter";