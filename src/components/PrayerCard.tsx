import { format } from 'date-fns';
import { Sunrise, Sun, Sunset, Moon, CloudSun, SunDim } from 'lucide-react';

interface PrayerCardProps {
  label: string;
  time: Date;
  isCurrent: boolean;
}

export const PrayerCard = ({ label, time, isCurrent }: PrayerCardProps) => {
  const getIcon = () => {
    const props = { size: 36, className: "text-[#FAED21]" }; // Ukuran icon diperkecil sedikit
    switch (label) {
      case 'Subuh': return <Sunrise {...props} />;
      case 'Syuruq': return <CloudSun {...props} />;
      case 'Dzuhur': return <Sun {...props} />;
      case 'Ashar': return <SunDim  {...props} />;
      case 'Maghrib': return <Sunset {...props} />;
      case 'Isya': return <Moon {...props} />;
      default: return <Sun {...props} />;
    }
  };

  return (
    <div
      className={`
        relative flex flex-col items-center justify-center
        h-auto min-h-[14rem] py-6 rounded-[30px] border transition-all duration-500
        backdrop-blur-2xl shadow-lg
        ${isCurrent
          ? 'bg-white/20 border-[#FAED21]/50 scale-[1.02] shadow-[#FAED21]/20 ring-1 ring-[#FAED21]/30'
          : 'bg-white/10 border-white/10'
        }
      `}
    >
      <div className="mb-3 opacity-80">{getIcon()}</div>

      {/* Contoh menggunakan text-3xl dan font-black untuk keterbacaan maksimal */}
      <span className={`text-2xl md:text-3xl font-black uppercase tracking-[0.1em] mb-2 ${isCurrent ? 'text-[#FAED21]' : 'text-white/70'}`}>
        {label}
      </span>

      {/* Font diperkecil dari 7xl ke 5xl/6xl agar muat di grid TV */}
      <span className={`text-5xl md:text-6xl font-mono font-bold tracking-tighter leading-none ${isCurrent ? 'text-white' : 'text-white/90'}`}>
        {format(time, 'HH:mm')}
      </span>

      {isCurrent && (
        <div className="absolute -bottom-3 px-3 py-1 bg-[#FAED21] text-[#2C368B] text-[9px] font-extrabold rounded-full uppercase tracking-tighter shadow-lg">
          Sekarang
        </div>
      )}
    </div>
  );
};