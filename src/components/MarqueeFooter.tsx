import React, { memo } from "react";
import Marquee from "react-fast-marquee";

// Menggunakan React.memo agar komponen tidak render ulang setiap detik 
// meskipun Parent (page.tsx) update state 'now' terus-menerus.
export const MarqueeFooter = memo(() => {
  return (
    <div className="h-20 bg-black/40 backdrop-blur-xl rounded-[30px] flex items-center overflow-hidden border border-white/10 relative transform-gpu">
      <Marquee 
        speed={45}           // Kecepatan ideal untuk display TV
        gradient={false} 
        pauseOnHover={false} // Dimatikan karena di TV jarang pakai mouse/hover
        className="overflow-hidden"
      >
        <span className="mx-20 text-[#FAED21] font-bold italic text-5xl">
          "Sesungguhnya Aku ini adalah Allah, tidak ada Tuhan (yang hak) selain Aku, maka sembahlah Aku dan dirikanlah shalat untuk mengingat Aku." (QS. Thaha: 14)
        </span>
        <span className="text-white/30 text-4xl">✦</span>
        <span className="mx-20 text-white text-5xl">
          "Dan laksanakanlah shalat, tunaikanlah zakat, dan rukuklah beserta orang-orang yang rukuk." (QS. Al-Baqarah: 43)
        </span>
        <span className="text-white/30 text-4xl">✦</span>
        <span className="mx-20 text-orange-200 font-semibold italic text-5xl">
          "Sesungguhnya yang memakmurkan masjid-masjid Allah hanyalah orang-orang yang beriman kepada Allah..." (QS. At-Taubah: 18)
        </span>
        <span className="text-white/30 text-4xl">✦</span>
      </Marquee>
    </div>
  );
});

// Memberikan nama display agar mudah di-debug di React DevTools
MarqueeFooter.displayName = "MarqueeFooter";