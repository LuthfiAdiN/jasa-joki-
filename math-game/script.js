// Penyimpanan akun
let accounts = JSON.parse(localStorage.getItem("accounts")) || {}; // Simpan semua akun di localStorage
let currentUser = null;

// Elemen DOM
const loginArea = document.getElementById("login-area");
const gameArea = document.getElementById("game-area");
const loginButton = document.getElementById("login-button");
const loginFeedback = document.getElementById("login-feedback");
const questionArea = document.getElementById("question-area");
const answerInput = document.getElementById("answer-input");
const submitAnswer = document.getElementById("submit-answer");
const scoreDisplay = document.getElementById("score-display");
const restartButton = document.getElementById("restart-button");

// Variabel game
let currentQuestion = null;
let score = 0;

// Fungsi Login
function loginUser() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;

  if (!username || !password) {
    loginFeedback.textContent = "Username dan Password harus diisi!";
    return;
  }

  // Cek akun
  if (accounts[username]) {
    if (accounts[username].password === password) {
      currentUser = username;
      score = accounts[username].highScore || 0;
      loginArea.classList.add("hidden");
      gameArea.classList.remove("hidden");
      updateScoreDisplay();
      loadQuestion();
    } else {
      loginFeedback.textContent = "Password salah!";
    }
  } else {
    // Buat akun baru
    accounts[username] = { password, highScore: 0 };
    localStorage.setItem("accounts", JSON.stringify(accounts));
    currentUser = username;
    score = 0;
    loginArea.classList.add("hidden");
    gameArea.classList.remove("hidden");
    updateScoreDisplay();
    loadQuestion();
  }
}

// Update Skor
function updateScoreDisplay() {
  scoreDisplay.textContent = `Skor: ${score}`;
}

// Buat Soal
function generateQuestion() {
  const randomOperator = ["+", "-", "*", "/"][Math.floor(Math.random() * 4)];
  let num1, num2, answer;

  switch (randomOperator) {
    case "+":
      num1 = Math.floor(Math.random() * 90) + 10; // Puluhan
      num2 = Math.floor(Math.random() * 90) + 10;
      answer = num1 + num2;
      break;
    case "-":
      num1 = Math.floor(Math.random() * 90) + 10;
      num2 = Math.floor(Math.random() * 90) + 10;
      if (num1 < num2) [num1, num2] = [num2, num1]; // Pastikan hasilnya positif
      answer = num1 - num2;
      break;
    case "*":
      num1 = Math.floor(Math.random() * 9) + 1; // Satuan
      num2 = Math.floor(Math.random() * 9) + 1;
      answer = num1 * num2;
      break;
    case "/":
      num1 = (Math.floor(Math.random() * 9) + 1) * 2; // Belasan kelipatan
      num2 = Math.floor(Math.random() * 9) + 1;
      answer = num1 / num2;
      break;
  }

  return { question: `${num1} ${randomOperator === "*" ? "×" : randomOperator === "/" ? ":" : randomOperator} ${num2}`, answer };
}

// Load Soal Baru
function loadQuestion() {
  currentQuestion = generateQuestion();
  questionArea.textContent = currentQuestion.question;
  answerInput.value = "";
}

// Cek Jawaban
function checkAnswer() {
  const userAnswer = parseInt(answerInput.value.trim());
  if (userAnswer === currentQuestion.answer) {
    score += 10;
    if (score > accounts[currentUser].highScore) {
      accounts[currentUser].highScore = score;
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }
    updateScoreDisplay();
    loadQuestion();
  } else {
    alert("Jawaban salah! Game over.");
    restartGame();
  }
}

// Restart Game
function restartGame() {
  score = 0;
  updateScoreDisplay();
  loadQuestion();
}

// Event Listener
loginButton.addEventListener("click", loginUser);
submitAnswer.addEventListener("click", checkAnswer);
restartButton.addEventListener("click", restartGame);