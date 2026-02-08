import { format } from 'date-fns';
import {  Sunrise, Sun, Sunset, Moon , CloudSun , SunDim } from 'lucide-react';

interface PrayerCardProps {
  label: string;
  time: Date;
  isCurrent: boolean;
}

export const PrayerCard = ({ label, time, isCurrent }: PrayerCardProps) => {
  const getIcon = () => {
    const props = { size: 32, className: "text-[#FAED21]" };
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
        h-64 rounded-[40px] border transition-all duration-500
        backdrop-blur-2xl shadow-lg
        ${isCurrent 
          ? 'bg-white/20 border-[#FAED21]/50 scale-[1.03] shadow-[#FAED21]/20 ring-1 ring-[#FAED21]/30' 
          : 'bg-white/10 border-white/10'
        }
      `}
    >
      <div className="mb-4 opacity-80">{getIcon()}</div>
      <span className={`text-xl font-bold uppercase tracking-[0.2em] mb-4 ${isCurrent ? 'text-[#FAED21]' : 'text-white/70'}`}>
        {label}
      </span>
      <span className={`text-7xl font-mono font-bold tracking-tighter ${isCurrent ? 'text-white' : 'text-white/90'}`}>
        {format(time, 'HH:mm')}
      </span>

      {isCurrent && (
        <div className="absolute -bottom-3 px-4 py-1 bg-[#FAED21] text-[#2C368B] text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg">
          Sekarang
        </div>
      )}
    </div>
  );
};