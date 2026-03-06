// components/JumatOverlay.tsx
interface JumatOverlayProps {
  isVisible: boolean;
  khatib: string;
  imam: string;
}

export const JumatOverlay = ({ isVisible, khatib, imam }: JumatOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[250] bg-[#1a204d] flex flex-col items-center justify-center text-white p-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-[0.3em] text-[#FAED21] uppercase mb-2">
          Ibadah Shalat Jumat
        </h2>
        <div className="h-1 w-48 bg-[#FAED21] mx-auto" />
      </div>

      <div className="w-full max-w-4xl space-y-6"> {/* max-w diperkecil sedikit agar lebih rapat */}
        {/* Card Utama: Imam & Khotib */}
        <div className="bg-white/10 border-2 border-[#FAED21]/40 rounded-[3rem] p-12 text-center">
          <span className="text-xl font-medium uppercase tracking-[0.4em] text-[#FAED21]/80 mb-4 block">
            Imam & Khotib
          </span>
          <h2 className="text-7xl font-black uppercase leading-tight">
            {khatib || "Khotib Terjadwal"}
          </h2>
        </div>

        {/* Card Kecil: Badal */}
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 text-center max-w-2xl mx-auto">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-white/40 mb-1 block">
            Badal
          </span>
          <h3 className="text-3xl font-bold opacity-80 uppercase">
            {imam || "-"}
          </h3>
        </div>
      </div>
    </div>
  );
};