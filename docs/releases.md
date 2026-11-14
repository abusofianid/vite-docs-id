<script setup>
import SupportedVersions from './.vitepress/theme/components/SupportedVersions.vue';
</script>

# Rilis

Rilis Vite mengikuti [Semantic Versioning](https://semver.org/). Anda dapat melihat versi stabil terbaru Vite di [Vite npm package page](https://www.npmjs.com/package/vite).

Catatan perubahan lengkap untuk rilis sebelumnya [tersedia di GitHub](https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md).

## Siklus Rilis

Vite tidak memiliki siklus rilis yang tetap.

- **Patch** Rilis diterbitkan sesuai kebutuhan (biasanya setiap minggu).
- **Minor** rilis selalu menyertakan fitur baru dan diterbitkan sesuai kebutuhan. Rilis minor selalu melalui tahap prarilis beta (biasanya setiap dua bulan).
- **Major** Rilis umumnya diselaraskan dengan [Jadwal Akhir Masa Dukungan (EOL) Node.js](https://endoflife.date/nodejs), dan akan diumumkan jauh-jauh hari sebelumnya. Rilis ini akan melalui diskusi mendalam bersama komunitas ekosistem serta tahap prarilis alfa dan beta (biasanya setiap tahun).

## Versi yang Didukung

Singkatnya, versi Vite yang saat ini masih didukung adalah:
<SupportedVersions />

<br>

Rentang versi yang didukung ditentukan secara otomatis berdasarkan:

- **Versi Minor Saat Ini** mendapatkan perbaikan secara berkala.
- **Versi Major Sebelumnya** (only for its latest minor) (hanya untuk versi minor terbarunya), sedangkan **Versi Minor Sebelumnya** mendapatkan perbaikan penting dan patch keamanan.
- **Versi Major Kedua Terakhir** (hanya untuk versi minor terbarunya), sedangkan **Versi Minor Kedua Terakhir** mendapatkan patch keamanan.
- Semua versi sebelum versi-versi tersebut tidak lagi mendapatkan dukungan.

Kami menyarankan Anda untuk memperbarui Vite secara berkala. Lihat [Panduan Migrasi].(https://vite.dev/guide/migration.html) setiap kali Anda memperbarui ke versi Major. Tim Vite bekerja sama erat dengan proyek-proyek utama dalam ekosistem untuk memastikan kualitas versi terbaru. Kami menguji versi Vite yang baru sebelum dirilis melalui [proyek vite-ecosystem-ci](https://github.com/vitejs/vite-ecosystem-ci). Most projects using Vite should be able to quickly offer support or migrate to new versions as soon as they are released.

## Kasus Khusus dalam Semantic Versioning

### Definisi TypeScript
Kami dapat merilis perubahan yang tidak kompatibel pada definisi TypeScript di antara versi minor. Hal ini karena:

- Terkadang TypeScript sendiri merilis perubahan yang tidak kompatibel di antara versi minor. Oleh karena itu, kami mungkin perlu menyesuaikan definisi tipe agar mendukung versi TypeScript yang lebih baru.
- Terkadang, kami perlu mengadopsi fitur yang hanya tersedia pada versi TypeScript yang lebih baru sehingga meningkatkan versi minimum TypeScript yang diperlukan.
- Jika Anda menggunakan TypeScript, Anda dapat menggunakan rentang versi SemVer yang mengunci versi minor saat ini, lalu melakukan pembaruan secara manual setiap kali Vite merilis versi minor baru.

### Versi Node.js Non-LTS

Versi Node.js Non-LTS (bernomor ganjil) tidak diuji dalam proses CI Vite, tetapi seharusnya tetap berfungsi hingga mencapai [akhir masa dukungannya (EOL)](https://endoflife.date/nodejs).

## Prarilis

Rilis minor biasanya melalui sejumlah rilis beta yang tidak ditetapkan. Sementara itu, rilis mayor akan melalui tahap alfa dan beta.

Prarilis memungkinkan pengguna awal dan para pengelola proyek dalam ekosistem untuk melakukan pengujian integrasi dan stabilitas, serta memberikan masukan. Jangan gunakan versi prarilis di lingkungan produksi. Semua versi prarilis dianggap belum stabil dan dapat mengalami perubahan yang tidak kompatibel di antara rilisnya. Selalu gunakan versi yang spesifik saat menggunakan prarilis.

## Penghentian Dukungan Fitur

Kami secara berkala menetapkan fitur sebagai usang (deprecated) dalam rilis minor apabila telah tersedia alternatif yang lebih baik. Fitur yang telah ditetapkan sebagai usang akan tetap berfungsi, tetapi disertai peringatan melalui sistem tipe atau log. Fitur tersebut akan dihapus pada rilis mayor berikutnya setelah status usangnya ditetapkan. [Panduan Migrasi](https://vite.dev/guide/migration.html) untuk setiap rilis major akan mencantumkan fitur-fitur yang dihapus tersebut serta mendokumentasikan langkah-langkah untuk melakukan migrasi.

## Fitur Eksperimental
Beberapa fitur ditandai sebagai eksperimental saat dirilis dalam versi stabil Vite. Fitur eksperimental memungkinkan kami memperoleh pengalaman dari penggunaan di dunia nyata sebagai bahan pertimbangan dalam penyempurnaan desain akhirnya. Tujuannya adalah memberi kesempatan kepada pengguna untuk menyampaikan masukan dengan menguji fitur tersebut di lingkungan produksi. Fitur eksperimental dianggap belum stabil dan hanya boleh digunakan dalam kondisi yang terkendali. Fitur-fitur ini dapat mengalami perubahan pada versi minor berikutnya. Oleh karena itu, pengguna harus mengunci versi Vite yang digunakan apabila bergantung pada fitur tersebut. Kami akan membuat [diskusi di GitHub](https://github.com/vitejs/vite/discussions/categories/feedback?discussions_q=is%3Aopen+label%3Aexperimental+category%3AFeedback) untuk setiap fitur eksperimental.
