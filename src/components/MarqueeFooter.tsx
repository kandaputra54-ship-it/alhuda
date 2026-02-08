import Marquee from "react-fast-marquee";

export const MarqueeFooter = () => (
  // Tambahkan 'overflow-hidden' dan 'relative' di sini bro
  <div className="h-20 bg-black/40 backdrop-blur-3xl rounded-[30px] flex items-center overflow-hidden border border-white/10 relative">
    <Marquee 
      speed={40}           // <--- ATUR KECEPATAN DI SINI (Default biasanya 50)
      gradient={false} 
      pauseOnHover={true}
      className="overflow-hidden" // Tambahan buat jaga-jaga
    >
      {/* Isi konten Marquee kamu */}
      <span className="mx-16 text-[#FAED21] font-bold italic text-3xl">
        "Sesungguhnya Aku ini adalah Allah, tidak ada Tuhan (yang hak) selain Aku, maka sembahlah Aku dan dirikanlah shalat untuk mengingat Aku." (QS. Thaha: 14)
      </span>
      <span className="text-white/30 text-4xl">✦</span>
      <span className="mx-16 text-white text-3xl">
        "Dan laksanakanlah shalat, tunaikanlah zakat, dan rukuklah beserta orang-orang yang rukuk." (QS. Al-Baqarah: 43)
      </span>
      <span className="text-white/30 text-4xl">✦</span>
      <span className="mx-16 text-orange-200 font-semibold italic text-3xl">
        Sesungguhnya yang memakmurkan masjid-masjid Allah hanyalah orang-orang yang beriman kepada Allah dan hari akhir, serta tetap mendirikan shalat, menunaikan zakat dan tidak takut (kepada siapapun) selain kepada Allah.." (QS. At-Taubah: 18)
      </span>
    </Marquee>
  </div>
);