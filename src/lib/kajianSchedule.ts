// src/lib/kajianSchedule.ts

// Helper untuk menentukan pekan keberapa dalam sebulan
export const getWeekOfMonth = (date: Date) => {
  const day = date.getDate();
  return Math.ceil(day / 7);
};

export const kajianRutin = [
  { hari: 'Senin', judul: 'Kitab Tafsir Ibnu Katsir Jilid 2', waktu: "Ba'da Maghrib" },
  { hari: 'Selasa', judul: 'Kitab Riyadhus Shalihin', waktu: "Ba'da Maghrib" },
  { hari: 'Rabu', judul: 'Al-Qur\'an dan Terjemahan', waktu: "Ba'da Maghrib" },
  { hari: 'Kamis', judul: 'Al-Qur\'an dan Terjemahan', waktu: "Ba'da Maghrib" },
  { hari: 'Jumat', judul: 'Al-Qur\'an dan Terjemahan', waktu: "Ba'da Maghrib" },
  { hari: 'Sabtu', judul: 'Kitab Riyadhus Shalihin', waktu: "Ba'da Maghrib" },
];

export const tpaSchedule = {
  hari: 'Jumat - Ahad',
  waktu: "Ba'da Ashar",
  judul: 'TPA Anak-Anak',
  kegiatan: "Belajar Iqra', Al-Qur'an & Hafalan Doa"
};