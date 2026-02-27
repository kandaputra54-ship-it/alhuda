"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { El_Messiri } from 'next/font/google';
import { getPrayerTimes } from '@/lib/prayerTimes';
import { weeklySchedule } from '@/lib/weeklySchedule';
import { isAfter, isSameMinute } from 'date-fns';

// Import Komponen
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { Header } from '@/components/Header';
import { PrayerCard } from '@/components/PrayerCard';
import { MarqueeFooter } from '@/components/MarqueeFooter';
import { AdzanOverlay } from '@/components/AdzanOverlay';
import { IqomahOverlay } from '@/components/IqomahOverlay';
import { ImamOverlay } from '@/components/ImamOverlay';
import { RamadhanOverlay } from '@/components/RamadhanOverlay';
import { JumatOverlay } from '@/components/JumatOverlay';

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

  const adzanAudioRef = useRef<HTMLAudioElement | null>(null);


  // --- STATE OVERLAY ---
  const [adzanActive, setAdzanActive] = useState({ isVisible: false, image: '' });
  const [iqomahActive, setIqomahActive] = useState({ isVisible: false, duration: 10, label: '' });
  const [imamActive, setImamActive] = useState({ isVisible: false, label: '', utama: '', badal: '' });
  const [ramadhanActive, setRamadhanActive] = useState({ isVisible: false, imam: '', penceramah: '' });
  const [jumatActive, setJumatActive] = useState({ isVisible: false, khatib: '', imam: '' });


  // --- KONFIGURASI DURASI ---
  const ADZAN_IMAGE_DURATION = 225 * 1000;
  const IMAM_INFO_DURATION = 15 * 1000;

  useEffect(() => {
    adzanAudioRef.current = new Audio('/sounds/beep.mp3');
    adzanAudioRef.current.load();
  }, []);

  const unlockAudio = () => {
    if (!audioEnabled) {
      setAudioEnabled(true);
      if (adzanAudioRef.current) {
        adzanAudioRef.current.muted = true;
        adzanAudioRef.current.play().then(() => {
          adzanAudioRef.current!.pause();
          adzanAudioRef.current!.muted = false;
        });
      }
    }
  };

  const handleIqomahFinished = useCallback(() => {
    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const d = new Date();
    const currentDay = dayNames[d.getDay()];
    const todaySchedule: any = weeklySchedule[currentDay];

    const prayerKey = iqomahActive.label.toLowerCase();

    // Logic penentuan Imam/Khatib
    let imamUtama = 'Petugas';
    let imamBadal = '-';
    let displayLabel = iqomahActive.label;

    if (currentDay === 'Jumat' && prayerKey === 'dzuhur') {
      imamUtama = todaySchedule.jumat?.khatib || 'Khotib';
      imamBadal = todaySchedule.jumat?.imam || 'Imam';
      displayLabel = 'Jumat';
    } else {
      const imamData = todaySchedule[prayerKey];
      imamUtama = imamData?.utama || 'Petugas';
      imamBadal = imamData?.badal || '-';
    }

    // Matikan Iqomah
    setIqomahActive(prev => ({ ...prev, isVisible: false }));

    // Tampilkan Jadwal Imam/Khatib
    setImamActive({
      isVisible: true,
      label: displayLabel,
      utama: imamUtama,
      badal: imamBadal
    });

    // Tunggu durasi info imam baru cek Ramadhan
    setTimeout(() => {
      setImamActive(prev => ({ ...prev, isVisible: false }));

      if (iqomahActive.label === 'Isya' && todaySchedule.ramadhan) {
        setRamadhanActive({
          isVisible: true,
          imam: todaySchedule.ramadhan.imam,
          penceramah: todaySchedule.ramadhan.penceramah
        });

        setTimeout(() => {
          setRamadhanActive(prev => ({ ...prev, isVisible: false }));
        }, 2700000);
      }
    }, IMAM_INFO_DURATION);

  }, [iqomahActive.label, IMAM_INFO_DURATION]);

  const checkTransitions = (currentTime: Date, times: any) => {
    const schedules = [
      { label: 'Subuh', time: times.Subuh, img: '/subuh.png', iqomah: 14 },
      { label: 'Dzuhur', time: times.Dzuhur, img: '/dzuhur.png', iqomah: 13 },
      { label: 'Ashar', time: times.Ashar, img: '/ashar.png', iqomah: 10 },
      { label: 'Maghrib', time: times.Maghrib, img: '/maghrib.png', iqomah: 13 },
      { label: 'Isya', time: times.Isya, img: '/isya.png', iqomah: 10 },
    ];

    schedules.forEach((entry) => {
      if (isSameMinute(currentTime, entry.time) && lastTriggeredPrayer.current !== entry.label) {
        lastTriggeredPrayer.current = entry.label;

        if (audioEnabled && adzanAudioRef.current) {
          adzanAudioRef.current.play().catch(e => console.error(e));
        }

        setAdzanActive({ isVisible: true, image: entry.img });

        setTimeout(() => {
          setAdzanActive({ isVisible: false, image: '' });

          if (currentDay === 'Jumat' && entry.label === 'Dzuhur') {
            // Tampilkan Overlay Jumat
            setJumatActive({
              isVisible: true,
              khatib: todaySchedule.jumat?.khatib || 'Petugas',
              imam: todaySchedule.jumat?.imam || 'Petugas'
            });

            // Otomatis tutup setelah 30 menit (30 * 60 * 1000 ms)
            setTimeout(() => {
              setJumatActive(prev => ({ ...prev, isVisible: false }));
            }, 30 * 60 * 1000);

          } else {
            // Shalat lainnya tetap pakai Iqomah normal
            setIqomahActive({
              isVisible: true,
              duration: entry.iqomah,
              label: entry.label
            });
          }
        }, ADZAN_IMAGE_DURATION);
      }
    });
  };

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
  }, [audioEnabled]);

  if (!prayerTimes) return <div className="bg-[#1a204d] h-screen" />;

  // --- FIX: Definisi todaySchedule agar tidak error ---
  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const currentDay = dayNames[now.getDay()];
  const todaySchedule: any = weeklySchedule[currentDay];


  const displaySchedules = [
    { label: 'Subuh', time: prayerTimes.Subuh, ...todaySchedule?.subuh },
    { label: 'Syuruq', time: prayerTimes.Terbit },
    {
      label: 'Dzuhur',
      time: prayerTimes.Dzuhur,

      ...(currentDay === 'Jumat' ? todaySchedule?.jumat : todaySchedule?.dzuhur)
    },
    { label: 'Ashar', time: prayerTimes.Ashar, ...todaySchedule?.ashar },
    { label: 'Maghrib', time: prayerTimes.Maghrib, ...todaySchedule?.maghrib },
    { label: 'Isya', time: prayerTimes.Isya, ...todaySchedule?.isya },
  ];

  const nextPrayer = displaySchedules.find((p: any) => isAfter(p.time, now));

  return (
    <main
      onClick={unlockAudio}
      className={`${elMessiri.variable} font-[family-name:var(--font-el-messiri)] h-screen w-full flex flex-col justify-between p-10 select-none overflow-hidden text-white relative bg-[#1a204d] ${!audioEnabled ? 'cursor-pointer' : ''}`}
    >
      <ImamOverlay isVisible={imamActive.isVisible} prayerLabel={imamActive.label} utama={imamActive.utama} badal={imamActive.badal} />

      <IqomahOverlay
        key={iqomahActive.label}
        isVisible={iqomahActive.isVisible}
        durationMinutes={iqomahActive.duration}
        onFinish={handleIqomahFinished}
        // Jika Jumat Dzuhur, ganti label jadi Shalat Jumat
        prayerLabel={currentDay === 'Jumat' && iqomahActive.label === 'Dzuhur' ? 'Jumat' : iqomahActive.label}
        // Ambil data khatib jika jumat dzuhur
        utama={
          currentDay === 'Jumat' && iqomahActive.label === 'Dzuhur'
            ? todaySchedule?.jumat?.khatib
            : (todaySchedule as any)?.[iqomahActive.label.toLowerCase()]?.utama || 'Petugas'
        }
        badal={
          currentDay === 'Jumat' && iqomahActive.label === 'Dzuhur'
            ? todaySchedule?.jumat?.imam
            : (todaySchedule as any)?.[iqomahActive.label.toLowerCase()]?.badal || '-'
        }
      />

      <AdzanOverlay isVisible={adzanActive.isVisible} imagePath={adzanActive.image} />

      <RamadhanOverlay
        isVisible={ramadhanActive.isVisible}
        imam={ramadhanActive.imam}
        penceramah={ramadhanActive.penceramah}
      />
      <JumatOverlay
        isVisible={jumatActive.isVisible}
        khatib={jumatActive.khatib}
        imam={jumatActive.imam}
      />
      
      <div className="fixed bottom-6 right-6 z-[200] flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 opacity-50">
        {audioEnabled ? (
          <><div className="w-1.5 h-1.5 bg-green-500 rounded-full" /><span className="text-[10px] font-bold text-green-400/80 uppercase">Sound On</span></>
        ) : (
          <><div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /><span className="text-[10px] font-bold text-red-400/80 uppercase">Sound Off</span></>
        )}
      </div>

      <BackgroundGradient />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <Header now={now} />
        <div className="grid grid-cols-6 gap-5 my-6">
          {displaySchedules.map((item: any) => (
            <PrayerCard
              key={item.label}
              label={item.label}
              time={item.time}
              currentTime={now} // Kirim waktu sekarang
              isUpcoming={nextPrayer?.label === item.label}
              utama={(item as any).utama}
              badal={(item as any).badal}
              muadzin={(item as any).muadzin}
            />
          ))}
        </div>
        <MarqueeFooter />
      </div>
    </main>
  );
}