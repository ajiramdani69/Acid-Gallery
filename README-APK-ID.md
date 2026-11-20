# Acid Gallery - build APK otomatis di GitHub

Folder ini berisi konfigurasi Capacitor dan GitHub Actions untuk membungkus website Acid Gallery menjadi APK Android.

## Cara memasang ke repository GitHub

1. Ekstrak ZIP ini.
2. Salin `package.json`, `capacitor.config.json`, folder `.github`, dan folder `www` ke root repository GitHub Acid Gallery.
3. Pastikan file web utama berada di `www/index.html`, bersama `www/manifest.webmanifest` dan `www/sw.js`.
4. Commit dan push ke branch `main` (atau `master`).
5. Buka tab **Actions** pada repository GitHub.
6. Pilih workflow **Build Acid Gallery APK**. Workflow juga berjalan otomatis setiap ada push ke `main` atau `master`.
7. Setelah selesai, buka hasil run workflow dan unduh artifact **Acid-Gallery-debug-APK**. Di dalamnya ada `app-debug.apk`.
8. Pindahkan APK ke Android dan izinkan instalasi dari sumber yang kamu percaya.

## Catatan penting

- Ini menghasilkan **debug APK** untuk uji coba dan instalasi langsung. Untuk publikasi Play Store diperlukan signing release dan konfigurasi package/version lebih lanjut.
- Website saat ini memakai Google Identity Services (`google.accounts.oauth2.initTokenClient`) untuk login Google. Google dapat menolak OAuth dari embedded WebView. Jadi build APK bisa berhasil, tetapi login Google Drive belum tentu berfungsi di dalam WebView. Untuk rilis yang andal, alur OAuth perlu dipindahkan ke browser sistem dengan deep link/app callback yang sesuai kebijakan Google.
- OAuth Client ID harus dikonfigurasi di Google Cloud Console. Jangan pernah menaruh client secret atau refresh token rahasia di HTML/repository.
- File kalender dan background saat ini disimpan lokal pada WebView/perangkat, bukan disinkronkan ke Google Drive.
