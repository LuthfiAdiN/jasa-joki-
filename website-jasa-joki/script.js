function sendToWhatsApp() {
  const name = document.getElementById('name').value;
  const duration = document.getElementById('duration').value;
  const request = document.getElementById('request').value;

  const whatsappURL = `https://wa.me/6285176980745?text=${encodeURIComponent(
    `Halo! Saya ingin menggunakan jasa mainin akun.\n\nNama: ${name}\nDurasi Bermain: ${duration} Hari\nPermintaan Tambahan: ${request || 'Tidak ada.'}\n\nCatatan: Saya memahami bahwa tidak ada jaminan menang karena layanan ini gratis.`
  )}`;

  window.open(whatsappURL, '_blank');
}