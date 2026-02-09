// src/lib/prayerTimes.ts
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';

export const getPrayerTimes = (date: Date) => {
    // Koordinat Matraman
    const coordinates = new Coordinates(-6.2018, 106.8688);

    const params = CalculationMethod.Singapore();
    params.fajrAngle = 18;
    params.ishaAngle = 18;

    params.adjustments.fajr = 1;
    params.adjustments.sunrise = -4;
     params.adjustments.dhuhr = 0;
     params.adjustments.asr = 1;
    params.adjustments.maghrib = 2;
    params.adjustments.isha = 1;
   
    

    const prayerTimes = new PrayerTimes(coordinates, date, params);

    // --- LOGIKA TESTING ---
    // Kita buat objek Date baru berdasarkan tanggal yang sedang berjalan
    const asharTest = new Date(date); 
    // Set ke jam 19, menit 08, detik 00
    asharTest.setHours(13, 51, 0, 0); 
    // ----------------------

    return {
        Subuh: prayerTimes.fajr,
        Terbit: prayerTimes.sunrise,
        Dzuhur: prayerTimes.dhuhr,
        Ashar: prayerTimes.asr,
        Maghrib: prayerTimes.maghrib,
        Isya: prayerTimes.isha, 
    };
};