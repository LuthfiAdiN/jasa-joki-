// Simpan data pengguna dan leaderboard
let users = {};
let currentUser = null;

// Login function
function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !password) {
    document.getElementById('login-message').textContent = "Username dan password harus diisi!";
    return;
  }

  if (!users[username]) {
    users[username] = { password, highscore: 0 };
    document.getElementById('login-message').textContent = "Akun baru dibuat. Login berhasil!";
  } else if (users[username].password !== password) {
    document.getElementById('login-message').textContent = "Password salah!";
    return;
  } else {
    document.getElementById('login-message').textContent = "Login berhasil!";
  }

  currentUser = username;
  showLevelSelection();
}

// Logout function
function logout() {
  currentUser = null;
  document.getElementById('leaderboard-container').style.display = "none";
  document.getElementById('login-container').style.display = "block";
}

// Show level selection
function showLevelSelection() {
  document.getElementById('login-container').style.display = "none";
  document.getElementById('level-selection').style.display = "block";
}

// Game variables
let score = 0;
let highscore = 0;
let timer;
let currentLevel = "medium";

// Start game
function startGame(level) {
  currentLevel = level;
  score = 0;
  highscore = users[currentUser]?.highscore || 0;
  document.getElementById('score').textContent = score;
  document.getElementById('highscore').textContent = highscore;
  document.getElementById('level-selection').style.display = "none";
  document.getElementById('game-container').style.display = "block";
  generateQuestion();
}

// Generate question
function generateQuestion() {
  const [num1, num2] = getRandomNumbers(currentLevel);
  const operators = currentLevel === "easy" ? ["+", "-"] : ["+", "-", "×", ":"];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let question, answer;

  switch (operator) {
    case "+":
      question = `${num1} + ${num2}`;
      answer = num1 + num2;
      break;
    case "-":
      question = `${num1} - ${num2}`;
      answer = num1 - num2;
      break;
    case "×":
      question = `${num1} × ${num2}`;
      answer = num1 * num2;
      break;
    case ":":
      question = `${num1} : ${num2}`;
      answer = num1 / num2;
      break;
  }

  document.getElementById('question').textContent = question;
  document.getElementById('question').dataset.answer = answer;
}

// Get random numbers based on level
function getRandomNumbers(level) {
  if (level === "easy") {
    return [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
  } else {
    return [Math.floor(Math.random() * 20) + 1, Math.floor(Math.random() * 15) + 1];
  }
}

// Submit answer
function submitAnswer() {
  const userAnswer = parseFloat(document.getElementById('answer').value);
  const correctAnswer = parseFloat(document.getElementById('question').dataset.answer);

  if (userAnswer === correctAnswer) {
    score++;
    if (score > highscore) {
      highscore = score;
      users[currentUser].highscore = highscore;
    }
    document.getElementById('score').textContent = score;
    document.getElementById('highscore').textContent = highscore;
    generateQuestion();
  } else {
    alert("Jawaban salah! Skor Anda: " + score);
    showLeaderboard();
  }

  document.getElementById('answer').value = "";
}

// Show leaderboard
function showLeaderboard() {
  const leaderboard = Object.keys(users)
    .map(username => ({ username, highscore: users[username].highscore }))
    .sort((a, b) => b.highscore - a.highscore);

  const leaderboardList = document.getElementById('leaderboard-list');
  leaderboardList.innerHTML = leaderboard
    .map(user => `<li>${user.username}: ${user.highscore}</li>`)
    .join("");

  document.getElementById('game-container').style.display = "none";
  document.getElementById('leaderboard-container').style.display = "block";
}