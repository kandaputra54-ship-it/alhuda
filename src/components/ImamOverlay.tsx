// components/ImamOverlay.tsx
interface ImamOverlayProps {
  isVisible: boolean;
  prayerLabel: string;
  utama: string;
  badal: string;
}

export const ImamOverlay = ({ isVisible, prayerLabel, utama, badal }: ImamOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-[#1a204d] flex flex-col items-center justify-center text-white p-6">
      
      {/* Header Judul - Ukuran disesuaikan */}
      <div className="text-center mb-8">
        <p className="text-lg text-[#FAED21] font-medium tracking-[0.3em] uppercase mb-1 opacity-80">
          Informasi Shalat Berjamaah
        </p>
        <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight leading-tight">
          Jadwal Imam <span className="text-[#FAED21]">{prayerLabel}</span>
        </h2>
      </div>

      {/* Container Kartu Vertikal - Max width dikecilkan */}
      <div className="flex flex-col gap-5 w-full max-w-3xl">
        
        {/* Card Imam Utama - Lebih compact tapi tetap menonjol */}
        <div className="relative overflow-hidden bg-gradient-to-r from-white/10 to-white/5 rounded-[2rem] p-6 md:p-8 border border-white/20 shadow-lg">
          {/* Aksen Kuning lebih tipis */}
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FAED21]" />
          
          <p className="text-lg text-white/60 mb-2 uppercase tracking-[0.2em] font-semibold pl-2">
            Imam 
          </p>
          {/* Ukuran nama disesuaikan agar tidak meledak */}
          <p className="text-5xl md:text-7xl font-bold text-white tracking-wide pl-2 truncate">
            {utama}
          </p>
        </div>

        {/* Card Imam Badal - Lebih simpel */}
        <div className="bg-white/5 rounded-[2rem] p-6 border border-white/10 flex flex-col md:flex-row items-center justify-between px-8 gap-4">
          <div className="text-center md:text-left">
            <p className="text-base text-white/50 mb-1 uppercase tracking-[0.1em]">
               Badal 
            </p>
            <p className="text-3xl md:text-4xl font-semibold text-white/90 truncate">
              {badal}
            </p>
          </div>
          
          {/* Divider visual kecil (opsional, hidden di mobile) */}
          <div className="hidden md:block h-10 w-[1px] bg-white/10" />
          
          <div className="text-center md:text-right">
            <p className="text-sm text-white/40 italic leading-relaxed">
               Mohon bersiap di shaf pertama <br/> tepat di belakang Imam
             </p>
          </div>
        </div>
      </div>

      {/* Footer Pengingat Shaf - Ukuran wajar */}
      <div className="mt-10 text-center max-w-4xl">
        <div className="h-[1px] w-24 bg-[#FAED21]/40 mx-auto mb-4" />
        <p className="text-2xl md:text-3xl font-medium text-[#FAED21] italic leading-relaxed px-4">
          "Luruskan dan rapatkan shaf, karena lurusnya shaf termasuk kesempurnaan shalat."
        </p>
      </div>

    </div>
  );
};