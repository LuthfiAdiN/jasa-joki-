<!DOCTYPE html>
<html lang="id">
<head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jasa Mainin Akun Mobile Legends</title>
  <style>
    /* Reset dasar */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #4e54c8, #8f94fb);
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
      overflow-y: auto;
    }

    .form-container {
      background: rgba(0, 0, 0, 0.85);
      padding: 20px 25px;
      border-radius: 15px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
      max-width: 400px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      animation: fadeIn 1s ease-in-out;
    }

    .form-container h1 {
      text-align: center;
      font-size: 28px;
      margin-bottom: 20px;
      color: #ffd700;
    }

    .form-container input,
    .form-container textarea,
    .form-container button {
      width: 100%;
      padding: 12px 15px;
      margin: 10px 0;
      border: none;
      border-radius: 8px;
      font-size: 16px;
    }

    .form-container input,
    .form-container textarea {
      background: #fff;
      color: #333;
    }

    .form-container input:focus,
    .form-container textarea:focus {
      outline: none;
      border: 2px solid #ffd700;
    }

    .form-container button {
      background: linear-gradient(135deg, #ff7b00, #ff3d00);
      color: #fff;
      cursor: pointer;
      transition: transform 0.3s, background 0.3s;
    }

    .form-container button:hover {
      background: linear-gradient(135deg, #ff3d00, #ff7b00);
      transform: scale(1.05);
    }

    .form-container button:active {
      transform: scale(0.95);
    }

    .form-container textarea {
      resize: none;
      height: 80px;
    }

    footer {
      text-align: center;
      font-size: 14px;
      color: #ccc;
      margin-top: 20px;
      width: 100%;
      padding: 10px 0;
    }

    footer a {
      color: #ffd700;
      text-decoration: none;
    }

    footer a:hover {
      text-decoration: underline;
    }

    .note {
      font-size: 14px;
      margin-top: 10px;
      background: rgba(255, 255, 255, 0.1);
      padding: 10px;
      border-radius: 8px;
      color: #ffd700;
    }

    /* Animasi fade-in untuk form */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>
</head>
<body>
  <div class="form-container">
    <!-- Tambahkan logo di atas form -->
    <img src="assets/logo.png" alt="Logo Jasa Mainin Akun" width="150">
    <h1>Jasa Mainin Akun</h1>

    <div class="note">
      <p>Pastikan akun Anda memiliki hero <b>Argus</b> dan <b>Cecilion</b>. Karena layanan ini gratis, tidak ada jaminan menang dalam permainan.</p>
    </div>

    <!-- Form WhatsApp -->
    <form id="whatsappForm">
      <input type="text" id="name" placeholder="Nama Anda" required>
      <input type="number" id="duration" placeholder="Durasi Bermain (Hari)" required>
      <textarea id="request" placeholder="Permintaan Tambahan"></textarea>
      <button type="button" onclick="sendToWhatsApp()">Kirim via WhatsApp</button>
    </form>

    <hr style="margin: 20px 0; border: 1px solid #fff;">

    <!-- Form Email -->
    <form action="https://formsubmit.co/your_email@example.com" method="POST">
      <input type="email" name="email" placeholder="Email Anda" required>
      <input type="text" name="details" placeholder="Detail Akun (Durasi, Request)" required>
      <textarea name="request" placeholder="Request Tambahan"></textarea>
      <button type="submit">Kirim via Email</button>
    </form>
  </div>
  <footer>
    Â© 2024 anakayam. Dibuat dengan ðŸ’– oleh <a href="#">Nama Kamu</a>.
  </footer>

  <script>
    function sendToWhatsApp() {
      const name = document.getElementById('name').value;
      const duration = document.getElementById('duration').value;
      const request = document.getElementById('request').value;

      const whatsappURL = `https://wa.me/6285176980745?text=${encodeURIComponent(
        `Halo! Saya ingin menggunakan jasa mainin akun.\n\nNama: ${name}\nDurasi Bermain: ${duration} Hari\nPermintaan Tambahan: ${request || 'Tidak ada.'}\n\nCatatan: Saya memahami bahwa tidak ada jaminan menang karena layanan ini gratis.`
      )}`;

      window.open(whatsappURL, '_blank');
    }
  </script>
</body>
</html>