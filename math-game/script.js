// Daftar variabel global
let username = '';
let password = '';
let currentLevel = 'medium';
let score = 0;
let highScore = 0;
let timer = null;

// Fungsi Login
function login() {
  const userInput = document.getElementById('username').value;
  const passInput = document.getElementById('password').value;

  if (localStorage.getItem(userInput) === passInput) {
    username = userInput;
    highScore = parseInt(localStorage.getItem(`${username}-highscore`)) || 0;
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('level-selection').style.display = 'block';
    alert(`Selamat datang, ${username}!`);
  } else {
    document.getElementById('login-message').innerText = 'Username atau password salah!';
    document.getElementById('login-message').style.display = 'block';
  }
}

// Fungsi Logout
function logout() {
  username = '';
  score = 0;
  highScore = 0;
  document.getElementById('login-container').style.display = 'block';
  document.getElementById('level-selection').style.display = 'none';
  document.getElementById('game-container').style.display = 'none';
}

// Fungsi Mulai Game
function startGame(level) {
  currentLevel = level;
  score = 0;
  document.getElementById('level-selection').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';
  nextQuestion();
}

// Fungsi Soal Baru
function nextQuestion() {
  const [question, answer] = generateQuestion();
  document.getElementById('question').innerText = question;
  document.getElementById('answer').value = '';
  document.getElementById('notif').style.display = 'none';
  timer = setTimeout(() => gameOver('Waktu habis!'), currentLevel === 'easy' ? 15000 : 30000);
}

// Fungsi Membuat Soal
function generateQuestion() {
  let num1, num2, operation, question, answer;

  if (currentLevel === 'easy') {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
  } else if (currentLevel === 'medium') {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
  }

  const operations = ['+', '-', '×']; // Hilangkan pembagian
  operation = operations[Math.floor(Math.random() * operations.length)];

  if (operation === '+') {
    answer = num1 + num2;
  } else if (operation === '-') {
    answer = num1 - num2;
  } else if (operation === '×') {
    answer = num1 * num2;
  }

  question = `${num1} ${operation} ${num2}`;
  return [question, answer];
}

// Fungsi Submit Jawaban
function submitAnswer() {
  const userAnswer = parseInt(document.getElementById('answer').value);
  const correctAnswer = eval(document.getElementById('question').innerText.replace('×', '*'));

  clearTimeout(timer);

  if (userAnswer === correctAnswer) {
    score++;
    document.getElementById('notif').innerText = 'Benar!';
    document.getElementById('notif').classList.add('success');
    document.getElementById('notif').style.display = 'block';
    nextQuestion();
  } else {
    gameOver('Jawaban salah!');
  }
}

// Fungsi Game Over
function gameOver(reason) {
  clearTimeout(timer);
  alert(`${reason}\nSkor kamu: ${score}`);

  if (score > highScore) {
    highScore = score;
    localStorage.setItem(`${username}-highscore`, highScore);
  }

  document.getElementById('game-container').style.display = 'none';
  document.getElementById('level-selection').style.display = 'block';
}

// Fungsi Logout
function logout() {
  username = '';
  password = '';
  document.getElementById('login-container').style.display = 'block';
  document.getElementById('level-selection').style.display = 'none';
  document.getElementById('game-container').style.display = 'none';
}