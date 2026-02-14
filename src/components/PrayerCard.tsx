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

  // State untuk mengatur info mana yang tampil (0: Imam/Khatib, 1: Badal, 2: Muadzin)
  const [infoIndex, setInfoIndex] = useState(0);

  useEffect(() => {
    // Timer 8 detik untuk mengganti tampilan
    const timer = setInterval(() => {
      setInfoIndex((prev) => (prev + 1) % 3);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  // Fungsi helper untuk menentukan label dan nama yang tampil
  const getDisplayInfo = () => {
    if (infoIndex === 0) {
      return { 
        role: label === 'Jumat' ? 'Khatib' : 'Imam ', 
        name: utama || '-', 
        color: 'text-[#FAED21]/90' 
      };
    } else if (infoIndex === 1) {
      return { 
        role: 'Badal ', 
        name: badal || '-', 
        color: 'text-white/90' 
      };
    } else {
      return { 
        role: 'Muadzin', 
        name: muadzin || '-', 
        color: 'text-[#FAED21]/90' 
      };
    }
  };

  const currentInfo = getDisplayInfo();

  return (
    <div
      className={`
        relative flex flex-col items-center justify-center
        h-auto min-h-[18rem] py-6 rounded-[35px] transition-all duration-700
        backdrop-blur-3xl
        ${isRunning
          ? 'bg-gradient-to-br from-[#FAED21]/40 via-[#FAED21]/20 to-transparent border-4 border-[#FAED21] scale-[1.08] z-20 shadow-[0_0_60px_rgba(250,237,33,0.6)] animate-pulse'
          : isUpcoming
            ? 'bg-gradient-to-br from-white/30 to-white/10 border-2 border-white/70 scale-[1.04] z-10 shadow-[0_0_30px_rgba(255,255,255,0.3)]'
            : 'bg-white/15 border border-white/30 shadow-2xl'
        }
      `}
    >
      {/* Background effect tetap sama */}
      {isRunning && (
        <div className="absolute inset-0 rounded-[35px] bg-gradient-to-br from-[#FAED21]/20 via-transparent to-transparent animate-pulse pointer-events-none" />
      )}

      <span className={`text-2xl font-black uppercase tracking-[0.2em] mb-1 relative z-10
        ${isRunning ? 'text-[#FAED21] drop-shadow-[0_0_10px_rgba(250,237,33,0.8)]' : isUpcoming ? 'text-white drop-shadow-lg' : 'text-white'}`}>
        {label}
      </span>

      <span className={`text-6xl font-mono font-black tracking-tighter leading-none mb-4 relative z-10
        ${isRunning ? 'text-white drop-shadow-[0_0_20px_rgba(250,237,33,0.5)]' : 'text-white'}`}>
        {format(time, 'HH:mm')}
      </span>

      {/* Info Petugas - Sekarang menggunakan animasi transisi */}
      {utama && (
        <div className={`flex flex-col items-center mt-2 border-t pt-4 w-full px-4 text-center relative z-10 transition-opacity duration-500
          ${isRunning ? 'border-[#FAED21]/50' : 'border-white/20'}`}>
          
          <div key={infoIndex} className="animate-in fade-in slide-in-from-bottom-2 duration-700 flex flex-col">
            <span className={`text-sm font-bold uppercase tracking-widest opacity-80 ${currentInfo.color}`}>
              {currentInfo.role}
            </span>
            <span className="text-xl font-black text-white leading-tight drop-shadow-md mt-1">
              {currentInfo.name}
            </span>
          </div>

          {/* Indikator titik kecil di bawah agar orang tahu ada slide */}
          <div className="flex gap-1.5 mt-4">
            {[0, 1, 2].map((i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-500 ${infoIndex === i ? 'w-4 bg-[#FAED21]' : 'w-1 bg-white/30'}`} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Badge Status tetap sama */}
      {isRunning && (
        <div className="absolute -top-3 px-4 py-1 bg-[#FAED21] text-black text-[10px] font-black rounded-full uppercase shadow-[0_0_20px_rgba(250,237,33,0.8)] animate-pulse">
          Waktu Shalat
        </div>
      )}
      {isUpcoming && !isRunning && (
        <div className="absolute -top-3 px-4 py-1 bg-white text-black text-[10px] font-black rounded-full uppercase shadow-lg">
          Mendatang
        </div>
      )}
    </div>
  );
};