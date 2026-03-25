import { useState, useEffect } from 'react';
import { FaBookOpen, FaUsersGear, FaChalkboardUser, FaCalendarDays } from 'react-icons/fa6';
import { kajianRutin, tpaSchedule, getWeekOfMonth } from '@/lib/kajianSchedule';

export const KajianView = () => {
  const [currentSlide, setCurrentSlide] = useState(0); 
  const now = new Date();
  const weekNum = getWeekOfMonth(now);

  // --- ROTASI 8 DETIK ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Data Ahad (Logic Pekanan)
  let ahadContent = {
    judul: 'Tanya Jawab Agama Tarjih Muhammadiyah',
    pemateri: null as string | null
  };

  if (weekNum === 2 || weekNum === 4) {
    ahadContent = {
      judul: 'Himpunan Putusan Tarjih Muhammadiyah',
      pemateri: 'Ust. Drs. M. Shodiq, M.Pdi'
    };
  }

  // --- ITEM RAMPING (AGAR TIDAK TERPOTONG) ---
  const KajianItem = ({ hari, judul }: { hari: string; judul: string }) => (
    <div className="flex items-center gap-[2.5vh] px-[2.5vh] py-[1.2vh] rounded-[1vh] bg-white/5 border border-white/5 animate-in fade-in slide-in-from-right duration-500">
      <span className="text-[2.5vh] w-[12vh] uppercase font-black text-[#FAED21] tracking-wider">{hari}</span>
      <div className="h-[2vh] w-[0.15vh] bg-white/20" />
      <span className="flex-1 text-[2.9vh] font-bold text-white leading-none truncate">{judul}</span>
    </div>
  );

  return (
    <div className="flex-1 flex gap-[3.5vh] my-[1.5vh] animate-in fade-in zoom-in duration-700 overflow-hidden relative">
      
      {/* SEKSI KIRI: JADWAL KAJIAN */}
      <div className="flex-[1.6] flex flex-col h-full bg-white/5 backdrop-blur-xl rounded-[2vh] border border-white/10 px-[3vh] py-[2.5vh] relative shadow-2xl">
        
        {/* Header Compact */}
        <div className="flex items-center justify-between mb-[2vh] border-b border-white/10 pb-2">
          <div>
            <h2 className="text-[3.2vh] font-black text-[#FAED21] uppercase tracking-tight">Jadwal Kajian Pekanan</h2>
            <p className="text-[2.5vh] text-white/90 uppercase tracking-[0.3rem]">Masjid Al-Huda Ba'da Maghrib</p>
          </div>
          <div className="flex gap-1.5 bg-black/20 px-2.5 py-1.5 rounded-full">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${currentSlide === i ? 'bg-[#FAED21] scale-125' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>

        {/* List Area */}
        <div className="flex-1 flex flex-col justify-start gap-[1vh]">
          {currentSlide === 0 && (
            <>
              <KajianItem hari="Senin" judul={kajianRutin[0].judul} />
              <KajianItem hari="Selasa" judul={kajianRutin[1].judul} />
              <KajianItem hari="Rabu" judul={kajianRutin[2].judul} />
            </>
          )}

          {currentSlide === 1 && (
            <>
              <KajianItem hari="Kamis" judul={kajianRutin[3].judul} />
              <KajianItem hari="Jumat" judul={kajianRutin[4].judul} />
              <KajianItem hari="Sabtu" judul={kajianRutin[5].judul} />
            </>
          )}

          {currentSlide === 2 && (
            <div className="flex-1 flex flex-col justify-center bg-[#FAED21]/5 p-[2.5vh] rounded-[1.5vh] border border-[#FAED21]/15 animate-in fade-in slide-in-from-bottom duration-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#FAED21] font-black text-[2vh] uppercase tracking-widest">Ahad</span>
                <span className="text-white/30 text-[1.3vh] flex items-center gap-1.5 font-bold">
                  <FaCalendarDays /> Pekan {weekNum}
                </span>
              </div>
              <h3 className="text-[3.5vh] font-bold text-white leading-tight mb-4">{ahadContent.judul}</h3>
              {ahadContent.pemateri && (
                <div className="flex items-center gap-3 text-[1.9vh] text-white/60 font-medium italic border-t border-white/5 pt-4">
                  <FaChalkboardUser className="text-[#FAED21]/50" /> {ahadContent.pemateri}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SEKSI KANAN: TPA (STATIC) */}
      <div className="flex-1 flex flex-col h-full bg-blue-950/30 backdrop-blur-xl rounded-[2vh] border border-white/5 p-[3vh] text-center justify-center relative overflow-hidden shadow-2xl">
        <FaUsersGear className="absolute -bottom-8 -right-8 text-[25vh] text-white/5 rotate-[-15deg]" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-[8vh] h-[8vh] bg-blue-500/10 rounded-full flex items-center justify-center mb-[2vh] border border-blue-400/20">
            <FaBookOpen className="text-[4vh] text-white/80" />
          </div>

          <h3 className="text-[4.5vh] font-bold text-white mb-3 tracking-tight">{tpaSchedule.judul}</h3>
          
          <div className="inline-block bg-[#FAED21] text-[#1a204d] px-5 py-1.5 rounded-full font-black text-[2.2vh] mb-4 shadow-lg">
            {tpaSchedule.hari} | {tpaSchedule.waktu}
          </div>
          
          <div className="h-[0.6vh] w-1/2 bg-white/10 mb-[2vh]" />
          
          <p className="text-[2.9vh] text-white/90 italic leading-relaxed px-4 font-medium">
            "{tpaSchedule.kegiatan}"
          </p>
        </div>
      </div>

    </div>
  );
};