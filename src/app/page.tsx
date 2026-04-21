"use client";
// --- IMPORTS --- MASJID AL-HUDA MUHAMMADIYAH RAMBUTAN
import { useState, useEffect, useRef, useMemo, memo } from 'react';
import { El_Messiri } from 'next/font/google';
import { getPrayerTimes } from '@/lib/prayerTimes';
import { weeklySchedule } from '@/lib/weeklySchedule';
import { isAfter } from 'date-fns';

// Komponen
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { Header } from '@/components/Header';
import { PrayerCard } from '@/components/PrayerCard';
import { MarqueeFooter } from '@/components/MarqueeFooter';
import { AdzanOverlay } from '@/components/AdzanOverlay';
import { IqomahOverlay } from '@/components/IqomahOverlay';
import { ImamOverlay } from '@/components/ImamOverlay';
import { JumatOverlay } from '@/components/JumatOverlay';
import { KajianView } from '@/components/KajianView';
import { QurbanView } from '@/components/QurbanView';

const elMessiri = El_Messiri({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-el-messiri',
});

// --- TYPE DEFINITION ---
type ActiveState =
  | { type: 'ADZAN'; data: { image: string; label: string } }
  | { type: 'IQOMAH'; data: { label: string; duration: number } }
  | { type: 'IMAM'; data: { label: string; utama: string; badal: string } }
  | { type: 'JUMAT'; data: { khatib: string; imam: string } }
  | { type: 'PRAYER_MAIN' }
  | { type: 'KAJIAN_MAIN' }
  | { type: 'QURBAN_MAIN' };

const ClockDrivenContent = memo(({ onAudioUnlock }: { onAudioUnlock: () => void }) => {
  const [now, setNow] = useState(new Date());
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastPlayedAudio = useRef<string | null>(null);

  const DURASI_ADZAN = 225 * 1000;
  const DURASI_INFO_IMAM = 15 * 1000;

  const prayerTimes = useMemo(() => getPrayerTimes(now), [now.toDateString()]);
  const dayName = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"][now.getDay()];
  const todayData: any = weeklySchedule[dayName];

  useEffect(() => {
    audioRef.current = new Audio('/sounds/beep.mp3');
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getActiveView = (): ActiveState => {
    const currentTime = now.getTime();
    const schedules = [
      { label: 'Subuh', time: prayerTimes.Subuh, img: '/subuh.png', iqomah: 14 },
      {
        label: 'Dzuhur',
        time: prayerTimes.Dzuhur,
        img: dayName === 'Jumat' ? '/jumat.png' : '/dzuhur.png',
        iqomah: dayName === 'Jumat' ? 25 : 13
      },
      { label: 'Ashar', time: prayerTimes.Ashar, img: '/ashar.png', iqomah: 10 },
      { label: 'Maghrib', time: prayerTimes.Maghrib, img: '/maghrib.png', iqomah: 10 },
      { label: 'Isya', time: prayerTimes.Isya, img: '/isya.png', iqomah: 10 },
    ];

    for (const s of schedules) {
      const pTime = s.time.getTime();
      const endAdzan = pTime + DURASI_ADZAN;
      const endIqomah = endAdzan + (s.iqomah * 60 * 1000);
      const endImam = endIqomah + DURASI_INFO_IMAM;

      if (currentTime >= pTime && currentTime < endAdzan) {
        if (audioEnabled && lastPlayedAudio.current !== s.label) {
          audioRef.current?.play().catch(() => { });
          lastPlayedAudio.current = s.label;
        }
        return { type: 'ADZAN', data: { image: s.img, label: s.label } };
      }

      if (currentTime >= endAdzan && currentTime < endIqomah) {
        if (dayName === 'Jumat' && s.label === 'Dzuhur') {
          return { type: 'JUMAT', data: { khatib: todayData.jumat?.khatib ?? '', imam: todayData.jumat?.imam ?? '' } };
        }
        const sisaMenit = (endIqomah - currentTime) / 60000;
        return { type: 'IQOMAH', data: { label: s.label, duration: sisaMenit } };
      }

      if (currentTime >= endIqomah && currentTime < endImam) {
        const info = (s.label === 'Dzuhur' && dayName === 'Jumat') ? todayData.jumat : todayData[s.label.toLowerCase()];
        return {
          type: 'IMAM',
          data: {
            label: s.label,
            utama: info?.utama ?? info?.khatib ?? 'Imam Terjadwal',
            badal: info?.badal ?? info?.imam ?? '-'
          }
        };
      }
    }

    // ROTASI 1 MENIT (Prayer -> Kajian -> Qurban)
    const totalSeconds = Math.floor(now.getTime() / 1000);
    const rotationIndex = Math.floor(totalSeconds / 60) % 3;

    if (rotationIndex === 0) return { type: 'PRAYER_MAIN' };
    if (rotationIndex === 1) return { type: 'KAJIAN_MAIN' };
    return { type: 'QURBAN_MAIN' };
  };

  const activeState = getActiveView();

  const unlockAudio = () => {
    if (!audioEnabled) {
      setAudioEnabled(true);
      audioRef.current?.play().then(() => {
        audioRef.current?.pause();
      });
    }
  };

  const renderOverlay = () => {
    switch (activeState.type) {
      case 'ADZAN': return <AdzanOverlay isVisible imagePath={activeState.data.image} />;
      case 'IQOMAH':
        const iqData = todayData[activeState.data.label.toLowerCase()];
        return (
          <IqomahOverlay
            isVisible
            durationMinutes={activeState.data.duration}
            prayerLabel={activeState.data.label}
            utama={iqData?.utama ?? 'Imam'}
            badal={iqData?.badal ?? '-'}
            onFinish={() => { }}
          />
        );
      case 'IMAM':
        return <ImamOverlay isVisible prayerLabel={activeState.data.label} utama={activeState.data.utama} badal={activeState.data.badal} />;
      case 'JUMAT':
        return <JumatOverlay isVisible khatib={activeState.data.khatib} imam={activeState.data.imam} />;
      default: return null;
    }
  };

  const displaySchedules = [
    { label: 'Subuh', time: prayerTimes.Subuh, ...todayData?.subuh },
    { label: 'Syuruq', time: prayerTimes.Terbit },
    { label: 'Dzuhur', time: prayerTimes.Dzuhur, ...(dayName === 'Jumat' ? todayData?.jumat : todayData?.dzuhur) },
    { label: 'Ashar', time: prayerTimes.Ashar, ...todayData?.ashar },
    { label: 'Maghrib', time: prayerTimes.Maghrib, ...todayData?.maghrib },
    { label: 'Isya', time: prayerTimes.Isya, ...todayData?.isya },
  ];

  const nextPrayer = displaySchedules.find((p: any) => isAfter(p.time, now));

  return (
    <div onClick={unlockAudio} className="contents">
      {renderOverlay()}

      <div className="relative z-10 flex flex-col h-full justify-between">
        <Header now={now} />

        {/* LOGIKA RENDERING UTAMA */}
        {activeState.type === 'KAJIAN_MAIN' ? (
          <KajianView />
        ) : activeState.type === 'QURBAN_MAIN' ? (
          <QurbanView />
        ) : (
          <div className="grid grid-cols-6 gap-5 my-6 animate-in fade-in duration-700">
            {displaySchedules.map((item: any) => (
              <PrayerCard
                key={item.label}
                label={item.label}
                time={item.time}
                currentTime={now}
                isUpcoming={nextPrayer?.label === item.label}
                utama={item.utama}
                badal={item.badal}
                muadzin={item.muadzin}
              />
            ))}
          </div>
        )}

        <div className="h-20" />
      </div>

      <div className="fixed bottom-6 right-6 z-[200] flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 opacity-30">
        <div className={`w-1.5 h-1.5 rounded-full ${audioEnabled ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">
          {audioEnabled ? 'Sound On' : 'Click Screen to Unlock Sound'}
        </span>
      </div>
    </div>
  );
});

ClockDrivenContent.displayName = 'ClockDrivenContent';

export default function Home() {
  return (
    <main className={`${elMessiri.variable} font-[family-name:var(--font-el-messiri)] h-screen w-full flex flex-col justify-between p-10 select-none overflow-hidden text-white relative bg-[#1a204d]`}>
      <BackgroundGradient />
      <ClockDrivenContent onAudioUnlock={() => { }} />
      <div className="fixed bottom-0 left-0 right-0 z-10 px-10 pb-10 pointer-events-none">
        <MarqueeFooter />
      </div>
    </main>
  );
}