import { format, isAfter, isBefore, addMinutes } from 'date-fns';
import { useState, useEffect } from 'react';

interface PrayerCardProps {
  label: string;
  time: Date;
  currentTime: Date;
  isUpcoming: boolean;
  utama?: string;
  badal?: string;
  muadzin?: string;
}

export const PrayerCard = ({ label, time, currentTime, isUpcoming, utama, badal, muadzin }: PrayerCardProps) => {
  const activeUntil = addMinutes(time, 60);
  const isRunning = isAfter(currentTime, time) && isBefore(currentTime, activeUntil);
  const [infoIndex, setInfoIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setInfoIndex((prev) => (prev + 1) % 3);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const getDisplayInfo = () => {
    if (infoIndex === 0) {
      return {
        role: label === 'Dzuhur' && utama === 'KHOTIB' ? 'Khatib' : 'Imam',
        name: utama || '-',
        color: 'text-[#FAED21]'
      };
    } else if (infoIndex === 1) {
      return { role: 'Badal', name: badal || '-', color: 'text-[#FAED21]' };
    } else {
      return { role: 'Muadzin', name: muadzin || '-', color: 'text-[#FAED21]' };
    }
  };

  const currentInfo = getDisplayInfo();

  return (
    <div
      className={`
        relative flex flex-col items-center justify-center
        h-[14rem] rounded-[24px] transition-all duration-700
        backdrop-blur-3xl overflow-hidden px-2
        ${isRunning
          ? 'bg-gradient-to-br from-[#FAED21]/30 to-transparent border-4 border-[#FAED21] scale-105 z-20'
          : isUpcoming
            ? 'bg-white/20 border-2 border-white/60 scale-[1.02] z-10'
            : 'bg-white/10 border border-white/20'
        }
      `}
    >
      {/* Bagian Atas: Label & Waktu */}
      <span className="text-3xl font-black uppercase tracking-widest text-white/90">{label}</span>
      <span className="text-5xl font-mono font-black tracking-tighter leading-none my-2 text-white">
        {format(time, 'HH:mm')}
      </span>

      {/* Bagian Bawah: Info Carousel */}
      {utama && (
        <div className="w-full mt-2 border-t border-white/10 pt-2 flex flex-col items-center">
          <div key={infoIndex} className="animate-in fade-in slide-in-from-bottom-1 duration-500 flex flex-col items-center">
            <span className={`text-[20px] font-bold uppercase tracking-widest ${currentInfo.color}`}>
              {currentInfo.role}
            </span>
            <span className="text-[22px] font-black text-white leading-tight truncate max-w-[120px]">
              {currentInfo.name}
            </span>
          </div>

          {/* Dot Indicator */}
          <div className="flex gap-1 mt-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`h-1 rounded-full transition-all ${infoIndex === i ? 'w-3 bg-[#FAED21]' : 'w-1 bg-white/20'}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};