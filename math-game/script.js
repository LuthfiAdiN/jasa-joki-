let score = 0;
let currentQuestionIndex = 0;
let timerInterval;
let highScore = 0;

const totalQuestions = 10;
const timePerQuestion = 15;

const loginArea = document.getElementById("login-area");
const gameArea = document.getElementById("game-area");
const resultArea = document.getElementById("result");

const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer");
const feedbackElement = document.getElementById("feedback");
const submitButton = document.getElementById("submit-btn");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const finalScoreElement = document.getElementById("final-score");
const highScoreElement = document.getElementById("high-score");
const restartButton = document.getElementById("restart-btn");
const loginButton = document.getElementById("login-btn");
const loginFeedback = document.getElementById("login-feedback");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

let currentUser = null;

function generateQuestions(totalQuestions) {
  const generatedQuestions = [];
  for (let i = 0; i < totalQuestions; i++) {
    const operation = ["+", "-", "×", ":"];
    const chosenOperation = operation[Math.floor(Math.random() * operation.length)];

    let num1, num2, question, answer;
    if (chosenOperation === "+") {
      num1 = Math.floor(Math.random() * 90) + 10; // Puluhan
      num2 = Math.floor(Math.random() * 90) + 10; // Puluhan
      question = `${num1} + ${num2}`;
      answer = num1 + num2;

    } else if (chosenOperation === "-") {
      num1 = Math.floor(Math.random() * 90) + 10; // Puluhan
      num2 = Math.floor(Math.random() * 90) + 10; // Puluhan
      if (num1 < num2) [num1, num2] = [num2, num1]; // Pastikan hasilnya positif
      question = `${num1} - ${num2}`;
      answer = num1 - num2;

    } else if (chosenOperation === "×") {
      num1 = Math.floor(Math.random() * 10) + 10; // Belasan
      num2 = Math.floor(Math.random() * 10) + 10; // Belasan
      question = `${num1} × ${num2}`;
      answer = num1 * num2;

    } else if (chosenOperation === ":") {
      num2 = Math.floor(Math.random() * 9) + 1; // Satuan
      num1 = num2 * (Math.floor(Math.random() * 10) + 10); // Puluhan atau belasan
      question = `${num1} : ${num2}`;
      answer = num1 / num2;
    }

    generatedQuestions.push({ question, answer });
  }

  return generatedQuestions;
}

const questions = generateQuestions(totalQuestions);

function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endGame();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = `Berapa hasil dari ${currentQuestion.question}?`;
  answerInput.value = "";
  resetTimer();
}

function checkAnswer() {
  const userAnswer = parseInt(answerInput.value);
  const correctAnswer = questions[currentQuestionIndex].answer;

  if (userAnswer === correctAnswer) {
    feedbackElement.textContent = "Jawaban benar! 🎉";
    feedbackElement.style.color = "green";
    score += 10;
  } else {
    feedbackElement.textContent = "Jawaban salah. 😞";
    feedbackElement.style.color = "red";
    score -= 5;
  }

  scoreElement.textContent = score;
  currentQuestionIndex++;
  loadQuestion();
}

function resetTimer() {
  clearInterval(timerInterval);
  let timeLeft = timePerQuestion;
  timerElement.textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      feedbackElement.textContent = "Waktu habis!";
      feedbackElement.style.color = "orange";
      currentQuestionIndex++;
      loadQuestion();
    }
  }, 1000);
}

function endGame() {
  clearInterval(timerInterval);
  gameArea.classList.add("hidden");
  resultArea.classList.remove("hidden");
  finalScoreElement.textContent = score;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem(`${currentUser}-highScore`, highScore);
  }

  highScoreElement.textContent = highScore;
}

function restartGame() {
  score = 0;
  currentQuestionIndex = 0;
  scoreElement.textContent = score;
  resultArea.classList.add("hidden");
  gameArea.classList.remove("hidden");
  loadQuestion();
}

function loginUser() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === "" || password === "") {
    loginFeedback.textContent = "Username dan Password tidak boleh kosong.";
    loginFeedback.style.color = "red";
    return;
  }

  currentUser = username;
  highScore = parseInt(localStorage.getItem(`${currentUser}-highScore`)) || 0;

  loginArea.classList.add("hidden");
  gameArea.classList.remove("hidden");

  loadQuestion();
}

loginButton.addEventListener("click", loginUser);
submitButton.addEventListener("click", checkAnswer);
restartButton.addEventListener("click", restartGame);