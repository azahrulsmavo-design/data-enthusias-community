# Data Enthusiast Community (DEC) Website

Website resmi untuk **Data Enthusiast Community (DEC)** — ruang kolaborasi untuk belajar, berbagi, dan bertumbuh bersama di dunia data. 🚀

## 📋 Tentang Project

Website ini dibangun dengan pendekatan **"Back to Basics"** untuk performa maksimal, tanpa framework frontend yang berat (No React/Vue):

### Tech Stack
- **Frontend**: 
  - **Vanilla JavaScript (ES6+)**: Logic utama tanpa framework dependency.
  - **HTML5 & CSS3**: Layout modern dengan CSS Variables & Flexbox/Grid.
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

Daftar "Upcoming Sessions" dikelola melalui Google Sheets dan disinkronkan ke file `public/sessions.json`.

1.  **Isi Data di Google Sheets**
    - Tambahkan baris baru untuk sesi mendatang.
    - Kolom yang wajib: `id`, `title`, `subtitle`, `date` (YYYY-MM-DD), `time`, `location`, `link`, `description`, `poster_url`, `featured` (TRUE/FALSE).
    - **Catatan**: Maksimal 5 sesi terdekat yang akan ditampilkan di website.

2.  **Jalankan Script Sinkronisasi**
    Koneksi ke Google Sheets memerlukan `credentials.json` (Service Account Key).
    *File `credentials.json` bersifat RAHASIA dan tidak boleh di-upload ke GitHub.*

    Jalankan perintah ini di terminal:
    ```bash
    python scripts/sync_sessions.py
    ```
    Script ini akan membaca Google Sheet dan memperbarui file `public/sessions.json`.

3.  **Deploy Perubahan**
    Setelah `sessions.json` terupdate, lakukan commit dan push ke GitHub:
    ```bash
    git add public/sessions.json
    git commit -m "update: sync new sessions"
    git push origin main
    ```

## 🔒 Keamanan (PENTING)

- **`credentials.json`**: File ini berisi kunci akses ke Google Cloud. **JANGAN PERNAH** meng-commit file ini ke Git. Pastikan file ini selalu ada di dalam `.gitignore`.
- Jika tidak sengaja ter-upload, segera hapus key service account lama di Google Cloud Console dan buat yang baru.

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
