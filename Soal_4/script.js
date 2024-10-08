function hitungCara() {
  const angkaInput = document.getElementById('numberInput').value;
  const target = parseInt(document.getElementById('targetInput').value);

  // Pisahkan input angka menjadi array integer
  const angkaList = angkaInput.split(',').map(Number);
  // Siapkan data untuk dikirim ke backend
  const data = {
      numbers: angkaList,
      target: target
  };

  // Kirim data ke backend menggunakan fetch
  fetch('http://localhost:5000/submit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
      // Tampilkan hasil di halaman
      document.getElementById('caraMenghitung').textContent = data.result;
  })
  .catch((error) => {
      console.error('Error:', error);
      document.getElementById('caraMenghitung').textContent = "Terjadi kesalahan saat memproses permintaan.";
  });
}
