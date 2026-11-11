
# Tugas Minggu Ini — React Data Fetching & Search

## Deskripsi Tugas
Buat sebuah aplikasi React sederhana untuk menampilkan data pengguna (*users*) yang diperoleh dari API [JSONPlaceholder](https://jsonplaceholder.typicode.com/users).

Aplikasi harus menggunakan Axios untuk mengambil data, React Hooks untuk mengelola data dan proses pengambilan API, serta shadcn/ui untuk menampilkan data dalam bentuk tabel.

## Ketentuan Pengerjaan

### 1. Setup Project
- Gunakan React sebagai framework/library utama.
- Gunakan Axios untuk HTTP request.
- Gunakan `useState` dan `useEffect` dari React.
- Gunakan shadcn/ui sebagai komponen tabel.

### 2. Mengambil Data dari API
- Ambil data pengguna dari endpoint:
  `https://jsonplaceholder.typicode.com/users`
- Gunakan Axios dengan method `GET`.
- Gunakan `useEffect` agar proses pengambilan data dijalankan ketika komponen pertama kali dimuat.
- Simpan hasil response API ke dalam state menggunakan `useState`.

### 3. Menampilkan Data Pengguna
Tampilkan data pengguna dalam bentuk tabel menggunakan komponen Table dari shadcn/ui.

Kolom tabel minimal mencakup:
- ID
- Name
- Username
- Email
- Phone
- Website

### 4. Fitur Pencarian
Tambahkan fitur pencarian pengguna dengan ketentuan:
- Sediakan input pencarian di atas tabel.
- Pencarian dilakukan secara *client-side*, artinya data difilter langsung dari state yang sudah diperoleh melalui API, tanpa melakukan request ulang ke server.
- Pencarian minimal dapat dilakukan berdasarkan nama pengguna (`name`).
- Hasil tabel harus diperbarui sesuai kata kunci yang dimasukkan.

### 5. Tampilan dan Pengalaman Pengguna
Pastikan aplikasi memiliki:
- Tampilan tabel yang rapi dan mudah dibaca.
- Input pencarian yang jelas.
- Tampilan loading ketika data sedang diambil.
- Pesan yang informatif apabila data gagal dimuat.
- Pesan apabila data tidak ditemukan dari hasil pencarian.

## Ketentuan Pengumpulan

1. Pastikan aplikasi dapat dijalankan tanpa error.
2. Upload seluruh source code ke repository GitHub kelas yang telah disediakan.
3. Pastikan perubahan sudah di-*commit* dan di-*push* ke repository.
4. Sertakan README.md yang berisi deskripsi singkat aplikasi dan cara menjalankannya.

## Referensi
- API: https://jsonplaceholder.typicode.com/users
- Axios: https://axios-http.com/docs/intro
- React useState: https://react.dev/reference/react/useState
- React useEffect: https://react.dev/reference/react/useEffect
- shadcn/ui Table: https://ui.shadcn.com/docs/components/table

**Catatan:** Fokus pengerjaan adalah memahami proses pengambilan data dari API, pengelolaan state menggunakan React Hooks, dan penerapan pencarian data secara client-side.
