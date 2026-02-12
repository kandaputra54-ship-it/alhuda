// src/lib/weeklySchedule.ts

export interface ImamSchedule {
  utama: string;
  badal: string;
}

export interface FridaySchedule {
  khatib: string;
  imam: string;
  muadzin: string;
}

export interface DaySchedule {
  subuh: ImamSchedule;
  dzuhur?: ImamSchedule; // Optional karena hari Jumat pakai jadwal khusus
  jumat?: FridaySchedule; // Khusus untuk jadwal shalat Jumat
  ashar: ImamSchedule;
  maghrib: ImamSchedule;
  isya: ImamSchedule;
}

export const weeklySchedule: Record<string, DaySchedule> = {
  Senin: {
    subuh: { utama: "Nashrullah", badal: "Syamsudin" },
    dzuhur: { utama: "Tedi Koswara", badal: "Azan Saleh" },
    ashar: { utama: "Tedi Koswara", badal: "Azan Saleh" },
    maghrib: { utama: "Galuh Yogaswara", badal: "Tedi Koswara" },
    isya: { utama: "Tedi Koswara", badal: "Azan Saleh" }
  },
  Selasa: {
    subuh: { utama: "Syakir Abdullah", badal: "Kanda Putra" },
    dzuhur: { utama: "Kanda Putra", badal: "Tedi Koswara" },
    ashar: { utama: "Kanda Putra", badal: "Tedi Koswara" },
    maghrib: { utama: "Kanda Putra", badal: "Tedi Koswara" },
    isya: { utama: "Kanda Putra", badal: "Tedi Koswara" }
  },
  Rabu: {
    subuh: { utama: "Nashrullah", badal: "Syamsudin" },
    dzuhur: { utama: "Tedi Koswara", badal: "Kanda Putra" },
    ashar: { utama: "Tedi Koswara", badal: "Kanda Putra" },
    maghrib: { utama: "Kanda Putra", badal: "Azan Saleh" },
    isya: { utama: "Tedi Koswara", badal: "Azan Saleh" }
  },
  Kamis: {
    subuh: { utama: "Syakir Abdullah", badal: "Azan Saleh" },
    dzuhur: { utama: "Azan Saleh", badal: "Kanda Putra" },
    ashar: { utama: "Azan Saleh", badal: "Kanda Putra" },
    maghrib: { utama: "Azan Saleh", badal: "Kanda Putra" },
    isya: { utama: "Azan Saleh", badal: "Kanda Putra" }
  },
  Jumat: {
    subuh: { utama: "Syakir Abdullah", badal: "Tedi Koswara" },
    jumat: { khatib: "KHOTIB", imam: "IMAM", muadzin: "Muadzin" },
    ashar: { utama: "M. Syam", badal: "Azan Saleh" },
    maghrib: { utama: "Tedi Koswara", badal: "Azan Saleh" },
    isya: { utama: "Tedi Koswara", badal: "Azan Saleh" }
  },
  Sabtu: {
    subuh: { utama: "M. Syamsudin", badal: "Kanda Putra" },
    dzuhur: { utama: "Kanda Putra", badal: "Azan Saleh" },
    ashar: { utama: "Kanda Putra", badal: "Azan Saleh" },
    maghrib: { utama: "Syakir Abdullah", badal: "Azan Saleh" },
    isya: { utama: "Galuh Yogaswara", badal: "Tedi Koswara" }
  },
  Minggu: {
    subuh: { utama: "Syakir Abdullah", badal: "Syamsudin" },
    dzuhur: { utama: "Azan Saleh", badal: "Syamsudin" },
    ashar: { utama: "Azan Saleh", badal: "Syamsudin" },
    maghrib: { utama: "Syakir Abdullah", badal: "Syamsudin" },
    isya: { utama: "Nashrullah", badal: "Syamsudin" }
  }
};