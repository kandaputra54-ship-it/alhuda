import React, { memo } from "react";
import Marquee from "react-fast-marquee";

export const MarqueeFooter = memo(() => {
  return (
    <div className="h-20 bg-black/40 backdrop-blur-xl rounded-[30px] flex items-center overflow-hidden border border-white/10 relative transform-gpu">
      <Marquee 
        speed={30}
        gradient={false} 
        pauseOnHover={true}
        className="overflow-hidden"
      >
        {/* Ayat 1: Pencegah Keji & Mungkar */}
        <span className="mx-6 text-emerald-300 font-medium text-4xl font-serif">
          إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنْكَرِ
        </span>
        <span className="mx-6 text-white/80 text-4xl font-light">
          "Sesungguhnya shalat itu mencegah dari (perbuatan) keji dan mungkar." (QS. Al-Ankabut: 45)
        </span>
        <span className="text-white/30 text-4xl mx-12">✦</span>

        {/* Hadits 1: Shalat Berjamaah */}
        <span className="mx-6 text-emerald-300 font-medium text-4xl font-serif">
          صَلَاةُ الْجَمَاعَةِ أَفْضَلُ مِنْ صَلَاةِ الْفَذِّ بِسَبْعٍ وَعِشْرِينَ دَرَجَةً
        </span>
        <span className="mx-6 text-white/80 text-4xl font-light">
          "Shalat berjamaah lebih utama daripada shalat sendirian seratus dua puluh tujuh derajat." (HR. Muslim No. 650)
        </span>
        <span className="text-white/30 text-4xl mx-12">✦</span>

        {/* Ayat 2: Penolong Sabar & Shalat */}
        <span className="mx-6 text-emerald-300 font-medium text-4xl font-serif">
          وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ
        </span>
        <span className="mx-6 text-white/80 text-4xl font-light">
          "Jadikanlah sabar dan shalat sebagai penolongmu. Dan sesungguhnya yang demikian itu sungguh berat, kecuali bagi orang-orang yang khusyuk." (QS. Al-Baqarah: 45)
        </span>
        <span className="text-white/30 text-4xl mx-12">✦</span>

        {/* Hadits 2: Shalat adalah Cahaya */}
        <span className="mx-6 text-emerald-300 font-medium text-4xl font-serif">
          وَالصَّلَاةُ نُورٌ
        </span>
        <span className="mx-6 text-white/80 text-4xl font-light">
          "Dan shalat itu adalah cahaya." (HR. Muslim No. 223)
        </span>
        <span className="text-white/30 text-4xl mx-12">✦</span>

        {/* Hadits 3: Batas Kekafiran adalah Meninggalkan Shalat */}
        <span className="mx-6 text-emerald-300 font-medium text-4xl font-serif">
          إِنَّ بَيْنَ الرَّجُلِ وَبَيْنَ الشِّرْكِ وَالْكُفْرِ تَرْكُ الصَّلَاةِ
        </span>
        <span className="mx-6 text-white/80 text-4xl font-light">
          "Sesungguhnya batas antara seseorang dengan kesyirikan dan kekafiran adalah meninggalkan shalat." (HR. Muslim No. 82)
        </span>
        <span className="text-white/30 text-4xl mx-12">✦</span>
      </Marquee>
    </div>
  );
});

MarqueeFooter.displayName = "MarqueeFooter";