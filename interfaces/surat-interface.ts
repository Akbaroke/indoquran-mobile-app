export default interface Surat {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: {
    [index in AudioIndexType]: string;
  };
  ayat: Ayat[];
  suratSelanjutnya?: SuratNextPrev;
  suratSebelumnya?: SuratNextPrev;
}

export interface Tafsir {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: {
    [index in AudioIndexType]: string;
  };
  tafsir: {
    ayat: number;
    teks: string;
  }[];
}

export interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: {
    [index in AudioIndexType]: string;
  };
}

export interface SuratNextPrev {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
}

export type AudioIndexType = '01' | '02' | '03' | '04' | '05';
