document.getElementById("whatsappForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const duration = document.getElementById("duration").value;
  const request = document.getElementById("request").value;

  // Format pesan
  const message = `Halo Admin Anakayam, saya ingin memesan jasa joki.\n\n` +
                  `Nama: ${name}\n` +
                  `Durasi Joki: ${duration} hari\n` +
                  `Request Tambahan: ${request || "Tidak ada"}\n\n` +
                  `Catatan: *Tidak menerima request hero.*`;

  // Buka WhatsApp dengan pesan yang diformat
  const whatsappURL = `https://wa.me/6285176980745?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
});