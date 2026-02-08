import { useState, useEffect, useRef } from 'react';

interface IqomahOverlayProps {
  durationMinutes: number;
  isVisible: boolean;
  onFinish: () => void;
}

export const IqomahOverlay = ({ durationMinutes, isVisible, onFinish }: IqomahOverlayProps) => {
  const [secondsLeft, setSecondsLeft] = useState(Math.round(durationMinutes * 60));
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedRef = useRef(false); // Supaya gak bunyi berkali-kali di detik yang sama

  useEffect(() => {
    // Pastikan path ini benar: public/sounds/beep.mp3
    audioRef.current = new Audio('/sounds/beep.mp3');
    audioRef.current.load();
  }, []);

  useEffect(() => {
    if (isVisible) {
      setSecondsLeft(Math.round(durationMinutes * 60));
      hasPlayedRef.current = false; // Reset kunci saat iqomah mulai
    }
  }, [isVisible, durationMinutes]);

  useEffect(() => {
    if (!isVisible) return;

    if (secondsLeft <= 0) {
      onFinish();
      return;
    }

    // CEK LOGIKA DISINI
    if (secondsLeft === 8 && !hasPlayedRef.current) {
      console.log("Mencoba membunyikan BEEP di detik ke-8...");
      
      if (audioRef.current) {
        hasPlayedRef.current = true;
        audioRef.current.play()
          .then(() => console.log("BEEP Berhasil bunyi!"))
          .catch(err => {
            console.error("Gagal bunyi karena Autoplay Policy. KLIK LAYAR DULU BRO!", err);
          });
      }
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, secondsLeft, onFinish]);

  if (!isVisible) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="fixed inset-0 z-[110] bg-[#1a204d] flex flex-col items-center justify-center text-white p-6 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-[0.2em] text-[#FAED21] uppercase">
        Menuju Iqomah
      </h2>
      <div className="text-[18rem] md:text-[22rem] font-mono font-bold leading-none tabular-nums">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
    
    </div>
  );
};