let angkaList = [];

// Fungsi untuk menambahkan angka ke daftar
function tambahAngka() {
    const inputElement = document.getElementById('numberInput');
    const nilai = parseInt(inputElement.value); // Konversi ke integer
    
    // Pastikan input tidak kosong dan angka valid
    if (!isNaN(nilai)) {
        // Tambahkan angka ke dalam array angkaList
        angkaList.push(nilai);

        // Buat elemen list baru dan tampilkan angka
        const listItem = document.createElement('li');
        listItem.textContent = nilai;
        
        const list = document.getElementById('listAngka');
        list.appendChild(listItem);

        // Tampilkan bagian sorting jika ada angka yang dimasukkan
        document.getElementById('sortingSection').style.display = 'block';

        // Kosongkan input setelah angka ditambahkan
        inputElement.value = '';
    }
}

// Fungsi untuk mengurutkan angka dari terkecil ke terbesar
function urutkanAngka() {
    // Sortir angkaList
    const sortedList = angkaList.slice().sort((a, b) => a - b);
    
    // Tampilkan angka yang sudah diurutkan
    const hasilSorting = document.getElementById('hasilSorting');
    hasilSorting.innerHTML = `<h3>Hasil Urutan:</h3> [ ${sortedList.join(', ')} ]`;

    // Cari angka yang hilang
    const missingNumbers = cariAngkaHilang(sortedList);
    
    // Tampilkan angka yang hilang (jika ada)
    const angkaHilang = document.getElementById('angkaHilang');
    if (missingNumbers.length > 0) {
        angkaHilang.innerHTML = `<h3>Angka yang Hilang:</h3> [ ${missingNumbers.join(', ')} ]`;
    } else {
        angkaHilang.innerHTML = `<h3>Tidak ada angka yang hilang.</h3>`;
    }
}

// Fungsi untuk menemukan angka yang hilang dalam array
function cariAngkaHilang(sortedList) {
    let missingNumbers = [];
    // Iterasi dari angka pertama hingga terakhir dalam array yang sudah diurutkan
    for (let i = 0; i < sortedList.length - 1; i++) {
        const current = sortedList[i];
        const next = sortedList[i + 1];
        // Cek jika ada angka yang hilang di antara dua angka berturut-turut
        if (next - current > 1) {
            for (let j = current + 1; j < next; j++) {
                missingNumbers.push(j);
            }
        }
    }
    return missingNumbers;
}
