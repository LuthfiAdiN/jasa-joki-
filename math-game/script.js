let score = 0;
let currentQuestionIndex = 0;
let timerInterval;

const totalQuestions = 10;
const timePerQuestion = 15; // 15 detik

const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer");
const feedbackElement = document.getElementById("feedback");
const submitButton = document.getElementById("submit-btn");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const resultSection = document.getElementById("result");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");

function generateQuestions(totalQuestions, level = "easy") {
  const generatedQuestions = [];
  let maxNumber = 10;

  if (level === "medium") maxNumber = 50;
  if (level === "hard") maxNumber = 100;

  for (let i = 0; i < totalQuestions; i++) {
    const num1 = Math.floor(Math.random() * maxNumber) + 1;
    const num2 = Math.floor(Math.random() * maxNumber) + 1;
    const operation = Math.random() > 0.5 ? "×" : ":";

    let question, answer;
    if (operation === "×") {
      question = `${num1} × ${num2}`;
      answer = num1 * num2;
    } else {
      question = `${num1 * num2} : ${num2}`;
      answer = num1;
    }

    generatedQuestions.push({ question, answer });
  }
  return generatedQuestions;
}

const questions = generateQuestions(totalQuestions, "medium");

function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endGame();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = `Berapa hasil dari ${currentQuestion.question}?`;
  resetTimer();
}

function checkAnswer() {
  const userAnswer = parseInt(answerInput.value);
  const correctAnswer = questions[currentQuestionIndex].answer;

  if (userAnswer === correctAnswer) {
    feedbackElement.textContent = "Jawaban benar! 🎉";
    feedbackElement.style.color = "green";
    score += 10;
    scoreElement.textContent = score;
  } else {
    feedbackElement.textContent = "Jawaban salah. 😞";
    feedbackElement.style.color = "red";
  }

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
  document.getElementById("game-area").classList.add("hidden");
  resultSection.classList.remove("hidden");
  finalScoreElement.textContent = score;
}

function restartGame() {
  score = 0;
  currentQuestionIndex = 0;
  scoreElement.textContent = score;
  resultSection.classList.add("hidden");
  document.getElementById("game-area").classList.remove("hidden");
  loadQuestion();
}

submitButton.addEventListener("click", checkAnswer);
restartButton.addEventListener("click", restartGame);

loadQuestion();