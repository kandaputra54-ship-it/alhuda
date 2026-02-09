"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { El_Messiri } from 'next/font/google';
import { getPrayerTimes } from '@/lib/prayerTimes';
import { weeklySchedule } from '@/lib/weeklySchedule';
import { isSameMinute } from 'date-fns';

// Import Komponen
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { Header } from '@/components/Header';
import { PrayerCard } from '@/components/PrayerCard';
import { MarqueeFooter } from '@/components/MarqueeFooter';
import { AdzanOverlay } from '@/components/AdzanOverlay';
import { IqomahOverlay } from '@/components/IqomahOverlay';
import { ImamOverlay } from '@/components/ImamOverlay';

const elMessiri = El_Messiri({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-el-messiri',
});

export default function Home() {
  // --- STATE UTAMA ---
  const [now, setNow] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const lastTriggeredPrayer = useRef<string | null>(null);

  // 1. TAMBAHKAN REF UNTUK AUDIO ADZAN
  const adzanAudioRef = useRef<HTMLAudioElement | null>(null);

  // --- STATE OVERLAY ---
  const [adzanActive, setAdzanActive] = useState({ isVisible: false, image: '' });
  const [iqomahActive, setIqomahActive] = useState({ isVisible: false, duration: 10, label: '' });
  const [imamActive, setImamActive] = useState({ isVisible: false, label: '', utama: '', badal: '' });

  // --- KONFIGURASI DURASI TESTING ---
  const ADZAN_IMAGE_DURATION = 180 * 1000; // custom 10 Detik Foto Adzan
  const IMAM_INFO_DURATION = 15 * 1000;   // custom 15 Detik Info Imam

  // 2. INISIALISASI AUDIO SAAT MOUNT
  useEffect(() => {
    adzanAudioRef.current = new Audio('/sounds/beep.mp3');
    adzanAudioRef.current.load();
  }, []);

  // --- FUNGSI UNLOCK AUDIO ---
  const unlockAudio = () => {
    if (!audioEnabled) {
      setAudioEnabled(true);
      // Pancing audio agar browser beri izin
      if (adzanAudioRef.current) {
        adzanAudioRef.current.muted = true;
        adzanAudioRef.current.play().then(() => {
          adzanAudioRef.current!.pause();
          adzanAudioRef.current!.muted = false;
        });
      }
      console.log("Audio Unlocked");
    }
  };

  // --- FUNGSI TRANSISI 3: IQOMAH SELESAI -> INFO IMAM ---
  const handleIqomahFinished = useCallback(() => {
    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const d = new Date();
    const currentDay = dayNames[d.getDay()];
    const todaySchedule: any = weeklySchedule[currentDay];

    const prayerKey = iqomahActive.label.toLowerCase();
    const imamData = todaySchedule[prayerKey];

    setIqomahActive(prev => ({ ...prev, isVisible: false }));
    setImamActive({
      isVisible: true,
      label: iqomahActive.label,
      utama: imamData?.utama || 'Petugas',
      badal: imamData?.badal || '-'
    });

    setTimeout(() => {
      setImamActive(prev => ({ ...prev, isVisible: false }));
    }, IMAM_INFO_DURATION);
  }, [iqomahActive.label]);

  // --- FUNGSI TRANSISI 1 & 2: CEK WAKTU ADZAN -> FOTO -> IQOMAH ---
  const checkTransitions = (currentTime: Date, times: any) => {
    const schedules = [
      { label: 'Subuh', time: times.Subuh, img: '/subuh.png', iqomah: 12 },
      { label: 'Dzuhur', time: times.Dzuhur, img: '/dzuhur.png', iqomah: 12 },
      { label: 'Ashar', time: times.Ashar, img: '/ashar.png', iqomah: 10  },
      { label: 'Maghrib', time: times.Maghrib, img: '/maghrib.png', iqomah: 10 },
      { label: 'Isya', time: times.Isya, img: '/isya.png', iqomah: 10 },
    ];

    schedules.forEach((entry) => {
      if (isSameMinute(currentTime, entry.time) && lastTriggeredPrayer.current !== entry.label) {
        lastTriggeredPrayer.current = entry.label;

        // 3. BUNYIKAN SUARA SAAT MASUK WAKTU ADZAN
        if (audioEnabled && adzanAudioRef.current) {
          adzanAudioRef.current.play().catch(e => console.error("Audio Play Error:", e));
        }

        // 1. Munculkan Foto Adzan
        setAdzanActive({ isVisible: true, image: entry.img });

        // 2. Tunggu durasi foto, lalu pindah ke Iqomah
        setTimeout(() => {
          setAdzanActive({ isVisible: false, image: '' });
          setIqomahActive({
            isVisible: true,
            duration: entry.iqomah,
            label: entry.label
          });
        }, ADZAN_IMAGE_DURATION);
      }
    });
  };

  // --- TIMER UTAMA (HEARTBEAT) ---
  useEffect(() => {
    const initialTimes = getPrayerTimes(new Date());
    setPrayerTimes(initialTimes);

    const timer = setInterval(() => {
      const d = new Date();
      setNow(d);

      const currentTimes = getPrayerTimes(d);
      checkTransitions(d, currentTimes);

      if (d.getSeconds() === 0) {
        setPrayerTimes(currentTimes);
        if (d.getHours() === 0 && d.getMinutes() === 0) {
          lastTriggeredPrayer.current = null;
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [audioEnabled]); // Tambahkan dependency audioEnabled agar logic selalu sinkron

  if (!prayerTimes) return <div className="bg-[#1a204d] h-screen" />;

  const displaySchedules = [
    { label: 'Subuh', time: prayerTimes.Subuh },
    { label: 'Syuruq', time: prayerTimes.Terbit },
    { label: 'Dzuhur', time: prayerTimes.Dzuhur },
    { label: 'Ashar', time: prayerTimes.Ashar },
    { label: 'Maghrib', time: prayerTimes.Maghrib },
    { label: 'Isya', time: prayerTimes.Isya },
  ];

  return (
    <main
      onClick={unlockAudio}
      className={`${elMessiri.variable} font-[family-name:var(--font-el-messiri)] h-screen w-full flex flex-col justify-between p-10 select-none overflow-hidden text-white relative bg-[#1a204d] ${!audioEnabled ? 'cursor-pointer' : ''}`}
    >

      {/* LAYER 1: INFO IMAM */}
      <ImamOverlay isVisible={imamActive.isVisible} prayerLabel={imamActive.label} utama={imamActive.utama} badal={imamActive.badal} />

      {/* LAYER 2: IQOMAH COUNTDOWN */}
      <IqomahOverlay key={iqomahActive.label} isVisible={iqomahActive.isVisible} durationMinutes={iqomahActive.duration} onFinish={handleIqomahFinished} />

      {/* LAYER 3: FOTO ADZAN */}
      <AdzanOverlay isVisible={adzanActive.isVisible} imagePath={adzanActive.image} />

      {/* LAYER 4: SOUND INDICATOR */}
      <div className="fixed bottom-6 right-6 z-[200] flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 opacity-50 transition-opacity">
        {audioEnabled ? (
          <>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-green-400/80 uppercase">Sound On</span>
          </>
        ) : (
          <>
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-red-400/80 uppercase">Sound Off</span>
          </>
        )}
      </div>

      <BackgroundGradient />

      {/* LAYER 5: KONTEN DASHBOARD */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        <Header now={now} />
        <div className="grid grid-cols-6 gap-5 my-6">
          {displaySchedules.map((item) => (
            <PrayerCard key={item.label} label={item.label} time={item.time} isCurrent={isSameMinute(now, item.time)} />
          ))}
        </div>
        <MarqueeFooter />
      </div>
    </main>
  );
}