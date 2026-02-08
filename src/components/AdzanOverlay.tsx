// components/AdzanOverlay.tsx
interface AdzanOverlayProps {
  imagePath: string;
  isVisible: boolean;
}

export const AdzanOverlay = ({ imagePath, isVisible }: AdzanOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      {/* Coba pakai img standar dulu bro buat mastiin path-nya bener */}
      <img
        src={imagePath}
        alt="Waktu Adzan"
        className="w-full h-full object-cover"
      />
    </div>
  );
};