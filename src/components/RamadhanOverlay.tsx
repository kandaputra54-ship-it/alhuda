// components/RamadhanOverlay.tsx
interface RamadhanOverlayProps {
  isVisible: boolean;
  imam: string;
  penceramah: string;
}

export const RamadhanOverlay = ({ isVisible, imam, penceramah }: RamadhanOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[250] bg-[#1a204d] flex flex-col items-center justify-between text-white p-16">
      
      {/* Ornamen Header - Selamat Ramadhan */}
      <div className="text-center w-full">
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-[#FAED21]" />
          <p className="text-2xl text-[#FAED21] font-bold tracking-[0.5em] uppercase">
            Ramadhan Kariim
          </p>
          <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-[#FAED21]" />
        </div>
        <h1 className="text-4xl font-light opacity-90">Selamat Menunaikan Ibadah Puasa 1447 H</h1>
      </div>

      {/* Konten Utama - Informatif & Besar */}
      <div className="w-full max-w-6xl grid grid-cols-1 gap-10">
        
        {/* Sesi Kuliah Ramadhan */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FAED21] to-amber-600 rounded-[3rem] blur opacity-25" />
          <div className="relative bg-[#1a204d] border-2 border-[#FAED21]/30 rounded-[3rem] p-12 shadow-2xl">
            <div className="flex flex-col items-center">
              <span className="bg-[#FAED21] text-[#1a204d] px-8 py-2 rounded-full text-xl font-bold uppercase tracking-widest mb-6">
                Penceramah Kuliah Ramadhan
              </span>
              <h2 className="text-8xl font-black text-white text-center leading-tight">
                {penceramah}
              </h2>
            </div>
          </div>
        </div>

        {/* Sesi Imam Tarawih */}
        <div className="relative group">
          <div className="relative bg-white/5 border-2 border-white/10 rounded-[3rem] p-10 flex flex-col items-center">
            <span className="text-[#FAED21]/70 text-xl font-medium uppercase tracking-[0.4em] mb-4">
              Imam Shalat Tarawih & Witir
            </span>
            <h3 className="text-7xl font-bold text-white/95">
              {imam}
            </h3>
          </div>
        </div>

      </div>

  

    </div>
  );
};