const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer");
const feedbackElement = document.getElementById("feedback");
const submitButton = document.getElementById("submit-btn");

const questions = [
  { question: "5 × 6", answer: 30 },
  { question: "8 : 4", answer: 2 },
  { question: "9 × 7", answer: 63 },
  { question: "12 : 3", answer: 4 },
];

let currentQuestionIndex = 0;

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = `Berapa hasil dari ${currentQuestion.question}?`;
}

function checkAnswer() {
  const userAnswer = parseInt(answerInput.value);
  const correctAnswer = questions[currentQuestionIndex].answer;

  if (userAnswer === correctAnswer) {
    feedbackElement.textContent = "Jawaban benar! 🎉";
    feedbackElement.style.color = "green";
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    loadQuestion();
  } else {
    feedbackElement.textContent = "Jawaban salah. Coba lagi!";
    feedbackElement.style.color = "red";
  }

  answerInput.value = "";
}

submitButton.addEventListener("click", checkAnswer);
loadQuestion();