// Variabel Global
let username = null;
let highScore = 0;
let score = 0;

// Fungsi Login
function login() {
  const userInput = document.getElementById('username').value.trim();
  const passInput = document.getElementById('password').value;

  const storedPassword = localStorage.getItem(userInput);

  if (storedPassword && storedPassword === passInput) {
    username = userInput;
    highScore = parseInt(localStorage.getItem(`${username}-highscore`)) || 0;

    document.getElementById('login-container').style.display = 'none';
    document.getElementById('level-selection').style.display = 'block';
    document.getElementById('highscore-display').innerText = highScore;
    alert(`Selamat datang, ${username}!`);
  } else {
    document.getElementById('login-message').innerText = 'Username atau password salah!';
    document.getElementById('login-message').style.display = 'block';
  }
}

// Fungsi Registrasi Akun Baru
function register() {
  const userInput = document.getElementById('username').value.trim();
  const passInput = document.getElementById('password').value;

  if (!userInput || !passInput) {
    document.getElementById('login-message').innerText = 'Username dan password tidak boleh kosong!';
    document.getElementById('login-message').style.display = 'block';
    return;
  }

  if (localStorage.getItem(userInput)) {
    document.getElementById('login-message').innerText = 'Username sudah terdaftar!';
    document.getElementById('login-message').style.display = 'block';
    return;
  }

  localStorage.setItem(userInput, passInput);
  localStorage.setItem(`${userInput}-highscore`, 0);

  document.getElementById('login-message').innerText = 'Registrasi berhasil! Silakan login.';
  document.getElementById('login-message').style.display = 'block';
}

// Fungsi Logout
function logout() {
  username = null;
  highScore = 0;

  document.getElementById('login-container').style.display = 'block';
  document.getElementById('level-selection').style.display = 'none';
  alert('Anda telah logout.');
}

// Event Listener untuk Tombol
document.getElementById('login-btn').addEventListener('click', login);
document.getElementById('register-btn').addEventListener('click', register);
document.getElementById('logout-btn').addEventListener('click', logout);

// Variabel Global untuk Game
let currentQuestion = {};
let difficulty = 'medium';

// Fungsi Random Angka
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fungsi untuk Menghasilkan Soal Berdasarkan Kesulitan
function generateQuestion(difficulty) {
  let num1, num2, operator, question, answer;

  if (difficulty === 'easy') {
    num1 = getRandomInt(1, 9);
    num2 = getRandomInt(1, 9);
  } else if (difficulty === 'medium') {
    num1 = getRandomInt(1, 9);
    num2 = getRandomInt(1, 9);
  }

  const operators = ['+', '-', '×'];
  operator = operators[getRandomInt(0, operators.length - 1)];

  if (operator === '+') {
    answer = num1 + num2;
    question = `${num1} + ${num2}`;
  } else if (operator === '-') {
    answer = num1 - num2;
    question = `${num1} - ${num2}`;
  } else if (operator === '×') {
    answer = num1 * num2;
    question = `${num1} × ${num2}`;
  }

  return { question, answer };
}

// Fungsi Mulai Game
function startGame(level) {
  difficulty = level;
  score = 0;

  document.getElementById('level-selection').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';

  generateNewQuestion();
}

// Fungsi untuk Menghasilkan Soal Baru
function generateNewQuestion() {
  currentQuestion = generateQuestion(difficulty);
  document.getElementById('question').innerText = currentQuestion.question;
  document.getElementById('answer').value = '';
}

// Fungsi Submit Jawaban
function submitAnswer() {
  const userAnswer = parseInt(document.getElementById('answer').value);

  if (userAnswer === currentQuestion.answer) {
    score++;
    alert('Benar!');
    generateNewQuestion();
  } else {
    alert('Salah! Game berakhir.');
    if (score > highScore) {
      highScore = score;
      localStorage.setItem(`${username}-highscore`, highScore);
    }

    document.getElementById('game-container').style.display = 'none';
    document.getElementById('level-selection').style.display = 'block';
    document.getElementById('highscore-display').innerText = highScore;
  }

  document.getElementById('score-display').innerText = score;
}

// Event Listener untuk Tombol
document.getElementById('easy-level-btn').addEventListener('click', () => startGame('easy'));
document.getElementById('medium-level-btn').addEventListener('click', () => startGame('medium'));
document.getElementById('submit-btn').addEventListener('click', submitAnswer);