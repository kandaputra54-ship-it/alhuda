import Image from 'next/image';

export const BackgroundGradient = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-[#1a204d]">
    {/* Background Gradients */}
    <div 
      className="absolute inset-0 opacity-80"
      style={{
        background: `
          radial-gradient(circle at -5% -5%, #2C368B 0%, transparent 70%),
          radial-gradient(circle at 105% 105%, #01A54D 0%, transparent 70%),
          radial-gradient(circle at 50% 50%, #10816F 0%, transparent 60%)
        `,
        imageRendering: 'auto',
      }}
    />

    {/* LOGO SEBAGAI WATERMARK/SHADOW */}
 

    {/* Dithering Pattern */}
    <div 
      className="absolute inset-0 opacity-[0.15] pointer-events-none" 
      style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        mixBlendMode: 'overlay'
      }}
    />
  </div>
);