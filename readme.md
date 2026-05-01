# 🗺️ Navigasi Pintar PWA (OpenLayers Edition)

Aplikasi Web Progresif (PWA) navigasi gratis dan open-source yang dibangun menggunakan **OpenLayers**. Aplikasi ini memiliki antarmuka mirip Google Maps / Amap dengan dukungan navigasi *Head-up*, speedometer real-time, dan informasi rute.

## ✨ Fitur Utama

* **Mode Head-up Navigation (🧭):** Peta akan mengunci lokasi Anda dan berputar secara dinamis menyesuaikan arah kendaraan (Heading) secara *real-time*.
* **Speedometer Digital:** Memanfaatkan API Geolocation HTML5 untuk membaca kecepatan (KM/H) secara akurat.
* **Smart Autocomplete:** Pencarian lokasi cepat tanpa API Key menggunakan [Photon (Komoot)](https://photon.komoot.io/).
* **Routing Otomatis:** Perhitungan jarak, ETA (Waktu Tiba), dan pembuatan garis rute menggunakan API publik [OSRM](http://project-osrm.org/).
* **Pilihan Kendaraan:** Kursor animasi kustom berbasis HTML/CSS untuk Mobil (🚗) dan Motor (🏍️) yang berputar halus mengikuti arah jalan.
* **Traffic Layer (Opsional):** Integrasi siap pakai untuk overlay lalu lintas dan insiden (Perlu mendaftar API Key gratis dari TomTom).
* **PWA Ready:** Dapat diinstal di layar utama (Home Screen) Android/iOS.

## 🛠️ Tech Stack

* **Rendering Peta:** [OpenLayers v9](https://openlayers.org/)
* **Base Map Tiles:** CARTO Voyager (OpenStreetMap data)
* **Geocoding API:** Photon (Komoot)
* **Routing Engine:** OSRM Public API
* **Lalu Lintas:** TomTom Traffic Flow API *(opsional)*

## 🚀 Cara Menjalankan (Development)

Karena aplikasi ini membutuhkan akses ke GPS (Geolocation API) dan menggunakan Service Worker, aplikasi **harus** dijalankan di server lokal (localhost) atau melalui protokol HTTPS. 

1. *Clone* atau unduh *repository* ini.
2. Buka folder proyek di **Visual Studio Code**.
3. Instal ekstensi **Live Server**.
4. Klik kanan pada `index.html` dan pilih **"Open with Live Server"**.
5. Untuk menguji navigasi dan speedometer, buka alamat IP lokal yang diberikan oleh Live Server di browser ponsel Anda (pastikan ponsel dan PC berada di jaringan WiFi yang sama).
6. Berikan izin akses lokasi (*Allow Location*) pada browser ponsel.

## 📝 Catatan Penting

* **OSRM Public API** yang digunakan dalam proyek ini adalah layanan demo. Penggunaannya tunduk pada kebijakan *fair-use*. Jangan membombardir API dengan *request* secara berlebihan.
* **Layer Lalu Lintas:** Pada skrip `index.html`, fitur tombol (🚥) menggunakan endpoint URL TomTom. Anda wajib mengganti `YOUR_API_KEY_HERE` dengan kunci API Anda sendiri jika ingin fitur lalu lintas berfungsi. Dapatkan secara gratis di [TomTom Developer Portal](https://developer.tomtom.com/).

## 📄 Lisensi
MIT License
