export const BackgroundGradient = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div 
      className="absolute top-[-15%] left-[-10%] w-[70%] h-[70%] bg-[#2C368B] rounded-full blur-[150px] opacity-80 animate-pulse" 
      style={{ animationDuration: '8s' }} 
    />
    <div 
      className="absolute bottom-[-15%] right-[-10%] w-[70%] h-[70%] bg-[#01A54D] rounded-full blur-[150px] opacity-60 animate-pulse" 
      style={{ animationDuration: '10s' }} 
    />
    <div className="absolute top-[30%] left-[30%] w-[50%] h-[50%] bg-[#10816F] rounded-full blur-[160px] opacity-40" />
  </div>
);