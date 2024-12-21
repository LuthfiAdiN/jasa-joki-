let score = 0;
let level = 1;

const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');

function generateQuestion() {
  const num1 = Math.floor(Math.random() * (10 + level)) + 1;
  const num2 = Math.floor(Math.random() * (10 + level)) + 1;
  const operations = ['+', '-', '*', '/'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  let question = `${num1} ${operation} ${num2}`;
  let answer = eval(question);
  
  // Ensure answer is a whole number for division
  if (operation === '/') {
    question = `${num1 * num2} / ${num1}`;
    answer = num2;
  }
  
  return { question, answer };
}

let currentQuestion = generateQuestion();
questionEl.textContent = `What is ${currentQuestion.question}?`;

document.getElementById('submit').addEventListener('click', () => {
  const userAnswer = parseFloat(answerEl.value);
  if (userAnswer === currentQuestion.answer) {
    score += 10;
    level += 1;
    feedbackEl.textContent = 'Correct! Great job!';
    feedbackEl.style.color = 'green';
  } else {
    feedbackEl.textContent = `Oops! The correct answer was ${currentQuestion.answer}.`;
    feedbackEl.style.color = 'red';
  }

  // Update score and level
  scoreEl.textContent = score;
  levelEl.textContent = level;

  // Clear input and generate new question
  answerEl.value = '';
  currentQuestion = generateQuestion();
  questionEl.textContent = `What is ${currentQuestion.question}?`;
});
