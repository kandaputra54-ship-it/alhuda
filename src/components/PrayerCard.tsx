import { format, isAfter, isBefore, addMinutes } from 'date-fns';

interface PrayerCardProps {
  label: string;
  time: Date;
  currentTime: Date;
  isUpcoming: boolean;
  utama?: string;
  badal?: string;
  muadzin?: string;
}

export interface PrayerDetails {
  utama?: string;
  badal?: string;
  khatib?: string;
  imam?: string;
  muadzin?: string;
}

export const PrayerCard = ({ label, time, currentTime, isUpcoming, utama, badal, muadzin }: PrayerCardProps) => {
  const activeUntil = addMinutes(time, 60);
  const isRunning = isAfter(currentTime, time) && isBefore(currentTime, activeUntil);

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
      {/* Spotlight Effect untuk Running */}
      {isRunning && (
        <div className="absolute inset-0 rounded-[35px] bg-gradient-to-br from-[#FAED21]/20 via-transparent to-transparent animate-pulse pointer-events-none" />
      )}

      {/* Spotlight Effect untuk Upcoming */}
      {isUpcoming && !isRunning && (
        <div className="absolute inset-0 rounded-[35px] bg-gradient-to-tl from-white/10 via-transparent to-transparent pointer-events-none" />
      )}

      {/* Label Shalat */}
      <span className={`text-2xl font-black uppercase tracking-[0.2em] mb-1 relative z-10
        ${isRunning ? 'text-[#FAED21] drop-shadow-[0_0_10px_rgba(250,237,33,0.8)]' : isUpcoming ? 'text-white drop-shadow-lg' : 'text-white'}`}>
        {label}
      </span>

      {/* Waktu Shalat */}
      <span className={`text-6xl font-mono font-black tracking-tighter leading-none mb-4 relative z-10
        ${isRunning ? 'text-white drop-shadow-[0_0_20px_rgba(250,237,33,0.5)]' : 'text-white'}`}>
        {format(time, 'HH:mm')}
      </span>

      {/* Info Petugas */}
      {utama && (
        <div className={`flex flex-col items-center gap-3 mt-2 border-t pt-4 w-full px-4 text-center relative z-10
          ${isRunning ? 'border-[#FAED21]/50' : 'border-white/20'}`}>

          <div className="flex flex-col">
            <span className="text-xl font-bold uppercase text-[#FAED21] font-black tracking-widest opacity-80">
              {label === 'Dzuhur' && utama === 'KHOTIB' ? 'Khatib' : 'Imam'}
            </span>
            <span className="text-xl font-black text-white leading-tight drop-shadow-md">{utama}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full mt-1 border-t border-white/10 pt-3">
            <div className="flex flex-col border-r border-white/10">
              <span className="text-[px] uppercase text-white/90 font-bold">Badal</span>
              <span className="text-[18px] font-bold text-white/90 truncate">{badal || '-'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[px] uppercase text-[#FAED21]/90 font-bold">Muadzin</span>
              <span className="text-[18px] font-bold text-white/90 truncate">{muadzin || '-'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Badge Status di atas card */}
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