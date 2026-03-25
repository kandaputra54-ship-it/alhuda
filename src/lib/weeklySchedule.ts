// src/lib/weeklySchedule.ts


export interface RamadhanSchedule {
  imam: string;
  penceramah: string;
}
export interface ImamSchedule {
  utama: string;
  badal: string;
  muadzin: string;
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
  ramadhan?: RamadhanSchedule;
}

export const weeklySchedule: Record<string, DaySchedule> = {
  Senin: {
    subuh: { utama: "Nashrullah", badal: "Syamsudin", muadzin: "Surya Andalas" },
    dzuhur: { utama: "Tedi Koswara", badal: "Azan Saleh", muadzin: "Rusman" },
    ashar: { utama: "Tedi Koswara", badal: "Azan Saleh", muadzin: "Ibra" },
    maghrib: { utama: "Galuh Yogaswara", badal: "Tedi Koswara", muadzin: "Surya Andalas" },
    isya: { utama: "Tedi Koswara", badal: "Azan Saleh", muadzin: "Surya Andalas" },
   
  },
 Selasa: {
    subuh: { utama: "Syakir Abdullah", badal: "Kanda Putra", muadzin: "Ardanel" },
    dzuhur: { utama: "Kanda Putra", badal: "Tedi Koswara", muadzin: "Rusman" },
    ashar: { utama: "Kanda Putra", badal: "Tedi Koswara", muadzin: "Icam" },
    maghrib: { utama: "Kanda Putra", badal: "Azan Saleh", muadzin: "Ardanel" },
    isya: { utama: "Kanda Putra", badal: "Tedi Koswara", muadzin: "Ardanel" },
 
  },
  Rabu: {
    subuh: { utama: "Nashrullah", badal: "Syamsudin", muadzin: "Nuryaman" },
    dzuhur: { utama: "Tedi Koswara", badal: "Kanda Putra", muadzin: "Rusman" },
    ashar: { utama: "Tedi Koswara", badal: "Kanda Putra", muadzin: "Rafki" },
    maghrib: { utama: "Kanda Putra", badal: "Azan Saleh", muadzin: "Nuryaman" },
    isya: { utama: "Tedi Koswara", badal: "Azan Saleh", muadzin: "Nuryaman" },
   
  },
  Kamis: {
    subuh: { utama: "Syakir Abdullah", badal: "Azan Saleh", muadzin: "Kanda Putra" },
    dzuhur: { utama: "Azan Saleh", badal: "Kanda Putra", muadzin: "Rusman" },
    ashar: { utama: "Azan Saleh", badal: "Kanda Putra", muadzin: "Lukman" },
    maghrib: { utama: "Azan Saleh", badal: "Kanda Putra", muadzin: "Kanda Putra" },
    isya: { utama: "Azan Saleh", badal: "Kanda Putra", muadzin: "Kanda Putra" },
   
  },
  Jumat: {
    subuh: { utama: "Syakir Abdullah", badal: "Tedi Koswara", muadzin: "Azan Salaeh" },
    jumat: { khatib: "Drs.Jhon Iskandar", imam: "M. Syamsudin", muadzin: "Muadzin Jumat" },
    ashar: { utama: "M. Syamsudin ", badal: "Azan Saleh", muadzin: "Satria" },
    maghrib: { utama: "Tedi Koswara", badal: "Azan Saleh", muadzin: "Azan Saleh" },
    isya: { utama: "Syamsudin", badal: "Azan Saleh", muadzin: "Azan Saleh" },
   
  },
  Sabtu: {
    subuh: { utama: "M. Syamsudin", badal: "Kanda Putra", muadzin: "Tedi Koswara" },
    dzuhur: { utama: "Kanda Putra", badal: "Azan Saleh", muadzin: "Remaja " },
    ashar: { utama: "Kanda Putra", badal: "Azan Saleh", muadzin: "Reza" },
    maghrib: { utama: "Syakir Abdullah", badal: "Azan Saleh", muadzin: "Tedi Koswara" },
    isya: { utama: "Syakir Abdullah", badal: "Tedi Koswara", muadzin: "Tedi Koswara" },
  
  },
  Minggu: {
    subuh: { utama: "Syakir Abdullah", badal: "Syamsudin", muadzin: "M. Syamsudin" },
    dzuhur: { utama: "Azan Saleh", badal: "Syamsudin", muadzin: " Remaja" },
    ashar: { utama: "Azan Saleh", badal: "Syamsudin", muadzin: "Ipan" },
    maghrib: { utama: "Syakir Abdullah", badal: "Syamsudin", muadzin: "M. Syamsudin" },
    isya: { utama: "Syakir Abdullah", badal: "Syamsudin", muadzin: "M. Syamsudin" },
  
  }
};