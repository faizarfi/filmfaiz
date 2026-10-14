# 🎬 FaizFilm - Web Nonton Film & Anime Gratis (React)

Aplikasi web streaming film bioskop, serial TV, drama Korea (Drakor), dan anime gratis bergaya **IDLIX, LK21, Moviebox, dan Bstation** yang dibangun murni menggunakan **React + Vite**.

---

## ✨ Fitur Utama FaizFilm

1. **Multi-Server Streaming Player**:
   - **Server 1: MultiEmbed (Utama)** - 1080p Full HD, terbukti paling stabil & lancar
   - **Server 2: MultiEmbed Direct** - Mirror direct stream super cepat
   - **Server 3: Smashy 5-in-1** - Pilihan 5 server alternatif di dalam player
   - **Server 4: VidSrc (LK21 / Idlix)** - Server populer film bioskop & serial
   - **Server 5: AutoEmbed Cloud** - Cadangan cepat tanpa iklan pop-up
   - **Server 6: 2Embed VIP** - Server cadangan stabil
   - **Server 7: VidLink Fast** - 1080p / 4K UHD High Bitrate
   - *Tersedia shortcut keyboard (Angka 1-7 ganti server, Panah Kiri/Kanan ganti episode, ESC untuk keluar).*

2. **Siaran Langsung Olahraga Asli (Live Sports 24/7)**:
   - **Saluran TV Olahraga 24 Jam**: SpoTV 1 & 2 (MotoGP & BWF Badminton), beIN Sports 1 & 3 (Liga Champions & La Liga), Sky Sports Premier League & F1, Trans7 Live (MotoGP Indonesia), BWF TV Official, TNT Sports (UFC), NBA TV, TVRI Sport.
   - **Jadwal & Pertandingan Asli Hari Ini**: Laga Champions League, Premier League, MotoGP, dan Badminton BWF yang tayang hari ini.
   - **Portal Live Streaming**: Score808 (Komentator Indonesia), Yalla Shoot VIP, TotalSportek 60FPS.

2. **Lanjutkan Menonton (Continue Watching)**:
   - Baris khusus di beranda menampilkan film/serial yang sedang ditonton lengkap dengan progress bar dan tombol lanjut instan.

3. **Aku Lagi Bingung (Acak Film / Random Picker)**:
   - Fitur seru untuk memilih film atau anime acak dari rating tinggi ketika pengguna bingung memilih tontonan.

4. **Bagikan Film (Share Modal)**:
   - Berbagi rekomendasi film langsung ke **WhatsApp**, **Telegram**, **Twitter/X**, **Facebook**, **LINE**, atau salin tautan langsung.

5. **Kategori Lengkap & Kartu Genre**:
   - **Film Bioskop Terbaru** (Now Playing & Box Office)
   - **Trending Hari Ini** (Film & Series viral 24 jam)
   - **Serial TV** (Series global dengan season & episode picker)
   - **Drama Korea (Drakor)** (K-Drama hits & terbaru)
   - **Anime Sub Indo (Bstation Style)** (Animasi Jepang dengan episode lengkap)
   - **Film Bioskop Indonesia** (Karya sinema anak bangsa)
   - **Jelajah Genre Interaktif** (Kartu visual gradien warna-warni)
   - **Rating Tertinggi (IMDb 8.0+)**

6. **Pencarian Cepat & Filter**:
   - Pencarian judul film/series dengan *live debounced autocomplete preview*.
   - Filter berdasarkan Genre, Tahun Rilis, dan Urutan Popularitas/Rating.

7. **Fitur Pengalaman Pengguna (UX Premium)**:
   - **Animated Splash Screen**: Layar pemuatan modern FaizFilm dengan progress bar.
   - **Floating Scroll to Top**: Tombol halus untuk kembali ke atas halaman.
   - **Daftar Disimpan (Watchlist)**: Simpan film favorit ke browser (*LocalStorage*).
   - **Riwayat Menonton (History)**: Otomatis mencatat episode dan film terakhir yang ditonton.
   - **PWA (Progressive Web App)**: Mendukung penginstalan ke layar beranda HP Android & iOS.
   - **Error Boundary**: Menjaga aplikasi tetap aman dari crash fatal.

---

## 🚀 Cara Menjalankan Aplikasi

Pastikan Node.js sudah terinstal di komputer.

```bash
# 1. Masuk ke folder proyek
cd d:\film

# 2. Jalankan server lokal
npm run dev
```

Buka browser dan akses alamat:
```
http://localhost:5173/
```

Untuk membuat paket rilis siap publikasi (*production build*):
```bash
npm run build
```
