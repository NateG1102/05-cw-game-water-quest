const GOAL_CANS = 25;
const GAME_DURATION = 30;

let currentCans = 0;
let timeLeft = GAME_DURATION;
let gameActive = false;
let spawnInterval;
let timerInterval;

function createGrid() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    grid.appendChild(cell);
  }
}

function spawnWaterCan() {
  if (!gameActive) return;

  const cells = document.querySelectorAll('.grid-cell');
  cells.forEach(cell => cell.innerHTML = '');

  const index = Math.floor(Math.random() * cells.length);
  const can = document.createElement('img');
  can.src = 'img/water-can.png';
  can.alt = 'Water Can';
  can.className = 'water-can';

  can.addEventListener('click', () => {
    if (!gameActive) return;
    currentCans++;
    document.getElementById('current-cans').textContent = currentCans;
    can.style.opacity = 0.3;
    setTimeout(() => can.remove(), 200);

    if (currentCans >= GOAL_CANS) {
      endGame("Goal reached! Great job.");
    }
  });

  cells[index].appendChild(can);
}

function startGame() {
  currentCans = 0;
  timeLeft = GAME_DURATION;
  gameActive = true;
  document.getElementById('current-cans').textContent = currentCans;
  document.getElementById('timer').textContent = timeLeft;
  document.getElementById('achievements').textContent = '';

  spawnInterval = setInterval(spawnWaterCan, 1000);
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame("Time's up! Try again.");
    }
  }, 1000);
}

function endGame(message) {
  gameActive = false;
  clearInterval(spawnInterval);
  clearInterval(timerInterval);
  document.getElementById('achievements').textContent = message;
}

document.getElementById('start-game').addEventListener('click', () => {
  createGrid();
  startGame();
});
