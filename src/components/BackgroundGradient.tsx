export const BackgroundGradient = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-[#1a204d]">
    {/* Lingkaran Biru */}
    <div 
      className="absolute top-[-15%] left-[-10%] w-[70%] h-[70%] bg-[#2C368B] rounded-full blur-[120px] opacity-80 animate-pulse" 
      style={{ 
        animationDuration: '8s',
        willChange: 'transform, opacity',
        transform: 'translateZ(0)' // Memaksa GPU
      }} 
    />
    
    {/* Lingkaran Hijau */}
    <div 
      className="absolute bottom-[-15%] right-[-10%] w-[70%] h-[70%] bg-[#01A54D] rounded-full blur-[120px] opacity-60 animate-pulse" 
      style={{ 
        animationDuration: '10s',
        willChange: 'transform, opacity',
        transform: 'translateZ(0)'
      }} 
    />

    {/* Lingkaran Tengah */}
    <div 
      className="absolute top-[30%] left-[30%] w-[50%] h-[50%] bg-[#10816F] rounded-full blur-[140px] opacity-40" 
      style={{ transform: 'translateZ(0)' }}
    />

    {/* OVERLAY NOISE: Ini kuncinya supaya buble hilang di TV */}
    <div 
      className="absolute inset-0 opacity-[0.03] pointer-events-none" 
      style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3 External Link %3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
      }}
    />
  </div>
);