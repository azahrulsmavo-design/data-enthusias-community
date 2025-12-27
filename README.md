# Data Enthusiast Community (DEC) Website

Website resmi untuk **Data Enthusiast Community (DEC)** — ruang kolaborasi untuk belajar, berbagi, dan bertumbuh bersama di dunia data. 🚀

## 📋 Tentang Project

Website ini dibangun dengan pendekatan **"Back to Basics"** untuk performa maksimal, tanpa framework frontend yang berat (No React/Vue):

### Tech Stack
- **Frontend**: 
  - **Vanilla JavaScript (ES6+)**: Logic utama tanpa framework dependency.
  - **HTML5 & CSS3**: Layout modern dengan CSS Variables & Flexbox/Grid (Vanilla CSS, **No Tailwind**).
  - **Vite**: Build tool super cepat untuk development.
- **Data Pipeline**:
  - **Python**: Script (`sync_sessions.py`) untuk mengambil data dari Google Sheets.
  - **Google Sheets**: Digunakan sebagai CMS (Content Management System) agar tim non-teknis bisa update jadwal.
  - **JSON**: Output data statis (`sessions.json`) yang ringan untuk diload website.

Fitur Utama:
- **Mobile First Design**: Tampilan optimal di perangkat seluler dengan navigasi kaca (glassmorphism).
- **Fast Performance**: Tanpa render blocking dari framework besar.
- **Dynamic Content**: Jadwal sesi selalu update via sinkronisasi Google Sheets.

## 🛠️ Cara Menjalankan (Development)

Jika Anda ingin menjalankan website ini secara lokal di komputer Anda:

1.  **Clone Repository**
    ```bash
    git clone https://github.com/azahrulsmavo-design/data-enthusias-community.git
    cd data-enthusias-community
    ```

2.  **Install Dependencies** (Pastikan Node.js sudah terinstall)
    ```bash
    npm install
    ```

3.  **Jalankan Server Lokal**
    ```bash
    npm run dev
    ```
    Buka `http://localhost:5173` di browser Anda.

## 📅 Cara Update Jadwal Sesi

Daftar "Upcoming Sessions" kini diambil **langsung** dari Google Sheets secara realtime (dengan caching ringan). Anda tidak perlu lagi menjalankan script Python manual.

### 1. Setup Environment (Pertama Kali)
Pastikan Anda memiliki file `.env` di root folder antum:
```env
VITE_SHEET_ID=your_spreadsheet_id
VITE_SHEETS_API_KEY=your_api_key
```

### 2. Update Data di Google Sheets
Cukup edit langsung di Google Sheet. Website akan otomatis menampilkan data terbaru dalam waktu kurang lebih 2 menit (polling interval) atau saat refresh.

- **Kolom Wajib**: `id`, `title`, `subtitle`, `date` (YYYY-MM-DD), `time`, `location`, `link`, `description`, `poster_url`, `featured` (TRUE/FALSE).
- **Featured**: Set `TRUE` pada satu sesi untuk menampilkannya sebagai highlight utama.
- **Status**: Pastikan status adalah `upcoming` agar muncul di daftar.

### 3. Cara Mengupload Gambar Poster
Kolom `poster_url` di Google Sheets membutuhkan **Link Gambar** yang valid (bukan file lokal di komputer Anda).

**Opsi A: Gunakan Link Eksternal (Paling Mudah)**
Jika Anda punya link gambar dari internet (misal: LinkedIn, Imgur, Google Drive yang dipublish, atau website lain), copas langsung linknya ke kolom `poster_url`.

**Opsi B: Upload ke Repository GitHub (Untuk Aset Sendiri)**
Jika Anda ingin menyimpan file gambar di dalam website ini:

1.  Siapkan file gambar (JPG/PNG/WEBP), misal `poster-januari.jpg`.
2.  Simpan file tersebut ke dalam folder `public/images/` di komputer Anda (buat folder `images` di dalam `public` jika belum ada).
3.  Di Google Sheets, isi kolom `poster_url` dengan path: `/images/poster-januari.jpg`
4.  **Wajib**: Lakukan Push ke GitHub agar gambar tersebut online.

    ```bash
    git add public/images/poster-januari.jpg
    git commit -m "add: poster image for january session"
    git push origin main
    ```
    *Selama gambar belum ada di GitHub, website live tidak akan bisa menampilkannya (broken image).*

## 📂 Struktur Folder

```
├── docs/                # Dokumentasi proyek
├── public/
│   ├── sessions.json    # Data sesi (Output dari script python)
│   └── vite.svg
├── scripts/
│   └── sync_sessions.py # Script untuk fetch data dari GSheets
├── src/
│   ├── main.js          # Logic utama frontend
│   └── style.css        # Styling utama
├── index.html           # Halaman utama
├── package.json         # Dependencies Node.js
└── .gitignore           # Daftar file yang diabaikan Git
```

## 👥 Kontak

Jika ada pertanyaan teknis atau ingin berkontribusi, silakan hubungi tim pengurus DEC atau buat Issue di repository ini.

---
*Learn, Build, and Grow Together Through Data.*
