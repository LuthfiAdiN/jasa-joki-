let accounts = JSON.parse(localStorage.getItem("accounts")) || {};
let currentUser = null;

const loginArea = document.getElementById("login-area");
const gameArea = document.getElementById("game-area");
const loginButton = document.getElementById("login-button");
const loginFeedback = document.getElementById("login-feedback");
const questionArea = document.getElementById("question-area");
const answerInput = document.getElementById("answer-input");
const submitAnswer = document.getElementById("submit-answer");
const currentScoreDisplay = document.getElementById("current-score");
const highScoreDisplay = document.getElementById("high-score");
const notification = document.getElementById("notification");

let currentQuestion = null;
let score = 0;

function loginUser() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;

  if (!username || !password) {
    loginFeedback.textContent = "Username dan Password harus diisi!";
    return;
  }

  if (accounts[username]) {
    if (accounts[username].password === password) {
      currentUser = username;
      score = 0; // Skor dimulai dari nol
      highScoreDisplay.textContent = accounts[username].highScore || 0;
      loginArea.classList.add("hidden");
      gameArea.classList.remove("hidden");
      loadQuestion();
    } else {
      loginFeedback.textContent = "Password salah!";
    }
  } else {
    accounts[username] = { password, highScore: 0 };
    localStorage.setItem("accounts", JSON.stringify(accounts));
    currentUser = username;
    score = 0;
    highScoreDisplay.textContent = 0;
    loginArea.classList.add("hidden");
    gameArea.classList.remove("hidden");
    loadQuestion();
  }
}

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
      if (num1 < num2) [num1, num2] = [num2, num1];
      answer = num1 - num2;
      break;
    case "*":
      num1 = Math.floor(Math.random() * 9) + 1; // Satuan
      num2 = Math.floor(Math.random() * 9) + 1;
      answer = num1 * num2;
      break;
    case "/":
      do {
        num1 = Math.floor(Math.random() * 90) + 10; // Puluhan
        num2 = Math.floor(Math.random() * 9) + 1; // Satuan
      } while (num1 % num2 !== 0); // Ulangi sampai hasil pembagian bulat
      answer = num1 / num2;
      break;
  }

  return {
    question: `${num1} ${randomOperator === "*" ? "×" : randomOperator === "/" ? ":" : randomOperator} ${num2}`,
    answer,
  };
}

function loadQuestion() {
  currentQuestion = generateQuestion();
  questionArea.textContent = currentQuestion.question;
  answerInput.value = "";
}

function checkAnswer() {
  const userAnswer = parseInt(answerInput.value.trim());
  if (userAnswer === currentQuestion.answer) {
    score += 10;
    currentScoreDisplay.textContent = score;

    if (score > accounts[currentUser].highScore) {
      accounts[currentUser].highScore = score;
      highScoreDisplay.textContent = score;
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }

    loadQuestion();
  } else {
    notification.textContent = `Salah! Skor akhir: ${score}`;
    notification.classList.remove("hidden");

    setTimeout(() => {
      notification.classList.add("hidden");
      resetGame();
    }, 2000);
  }
}

function resetGame() {
  score = 0;
  currentScoreDisplay.textContent = score;
  loadQuestion();
}

loginButton.addEventListener("click", loginUser);
submitAnswer.addEventListener("click", checkAnswer);