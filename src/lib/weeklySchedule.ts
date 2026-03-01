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
    isya: { utama: "Ust.Syakir Abdullah", badal: "Azan Saleh", muadzin: "Surya Andalas" },
     ramadhan: { 
      imam: "Ust.Syakir Abdullah", 
      penceramah: "Ust.Syakir Abdullah" 
    }
  },
 Selasa: {
    subuh: { utama: "Syakir Abdullah", badal: "Kanda Putra", muadzin: "Ardanel" },
    dzuhur: { utama: "Kanda Putra", badal: "Tedi Koswara", muadzin: "Rusman" },
    ashar: { utama: "Kanda Putra", badal: "Tedi Koswara", muadzin: "Icam" },
    maghrib: { utama: "Kanda Putra", badal: "Kanda Putra", muadzin: "Ardanel" },
    isya: { utama: "Ust.Latief Utomo", badal: "Tedi Koswara", muadzin: "Ardanel" },
   ramadhan: { 
      imam: "Tedi Koswara", 
      penceramah: "Ust.Latief Utomo" 
    }
  },
  Rabu: {
    subuh: { utama: "Nashrullah", badal: "Syamsudin", muadzin: "Nuryaman" },
    dzuhur: { utama: "Tedi Koswara", badal: "Kanda Putra", muadzin: "Rusman" },
    ashar: { utama: "Tedi Koswara", badal: "Kanda Putra", muadzin: "Rafki" },
    maghrib: { utama: "Dewa Alfian", badal: "Azan Saleh", muadzin: "Nuryaman" },
    isya: { utama: "Kanda Putra", badal: "Azan Saleh", muadzin: "Nuryaman" },
     ramadhan: { 
      imam: "Galuh Yogaswara", 
      penceramah: "Kanda Putra" 
    }
  },
  Kamis: {
    subuh: { utama: "Syakir Abdullah", badal: "Azan Saleh", muadzin: "Kanda Putra" },
    dzuhur: { utama: "Azan Saleh", badal: "Kanda Putra", muadzin: "Rusman" },
    ashar: { utama: "Azan Saleh", badal: "Kanda Putra", muadzin: "Lukman" },
    maghrib: { utama: "Azan Saleh", badal: "Kanda Putra", muadzin: "Kanda Putra" },
    isya: { utama: "Ust.Idrus ", badal: "Kanda Putra", muadzin: "Kanda Putra" },
     ramadhan: { 
      imam: "Azan Saleh", 
      penceramah: "Ust.Idrus" 
    }
  },
  Jumat: {
    subuh: { utama: "Syakir Abdullah", badal: "Tedi Koswara", muadzin: "Azan Salaeh" },
    jumat: { khatib: "", imam: "", muadzin: "Muadzin Jumat" },
    ashar: { utama: "M. Syamsudin ", badal: "Azan Saleh", muadzin: "Satria" },
    maghrib: { utama: "Tedi Koswara", badal: "Azan Saleh", muadzin: "Azan Saleh" },
    isya: { utama: "Tedi Koswara", badal: "Azan Saleh", muadzin: "Azan Saleh" },
    ramadhan: { 
      imam: "Ust. Fikri", 
      penceramah: "Ust. Ahmad Nashrullah" 
    }
  },
  Sabtu: {
    subuh: { utama: "M. Syamsudin", badal: "Kanda Putra", muadzin: "Tedi Koswara" },
    dzuhur: { utama: "Kanda Putra", badal: "Azan Saleh", muadzin: "Remaja " },
    ashar: { utama: "Kanda Putra", badal: "Azan Saleh", muadzin: "Reza" },
    maghrib: { utama: "Syakir Abdullah", badal: "Azan Saleh", muadzin: "Tedi Koswara" },
    isya: { utama: "Galuh Yogaswara", badal: "Tedi Koswara", muadzin: "Tedi Koswara" },
     ramadhan: { 
      imam: "Ust. Fatul Falah", 
      penceramah: "Ust. Fatul Falah" 
    }
  },
  Minggu: {
    subuh: { utama: "Syakir Abdullah", badal: "Syamsudin", muadzin: "M. Syamsudin" },
    dzuhur: { utama: "Azan Saleh", badal: "Syamsudin", muadzin: " Remaja" },
    ashar: { utama: "Azan Saleh", badal: "Syamsudin", muadzin: "Ipan" },
    maghrib: { utama: "Syakir Abdullah", badal: "Syamsudin", muadzin: "M. Syamsudin" },
    isya: { utama: "Ust. Syakir Abdullah", badal: "Syamsudin", muadzin: "M. Syamsudin" },
     ramadhan: { 
      imam: "Ust. Syakir Abdullah", 
      penceramah: "Ust. Syakir Abdullah" 
    }
  }
};