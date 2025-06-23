let currentCans = 0;
let timeLeft = 30;
let gameActive = false;
let spawnInterval;
let timerInterval;
let goal = 25;

const milestoneMessages = [
  { score: 10, message: "You're making a ripple!" },
  { score: 20, message: "Halfway to changing lives!" }
];

function createGrid() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-cell');
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
  can.classList.add('water-can');

  can.addEventListener('click', () => {
    if (!gameActive) return;
    currentCans++;
    document.getElementById('current-cans').textContent = currentCans;
    document.getElementById('collect-sound').play();
    can.style.opacity = 0.3;

    milestoneMessages.forEach(m => {
      if (currentCans === m.score) {
        document.getElementById('achievements').textContent = m.message;
      }
    });

    if (currentCans >= goal) {
      endGame("You did it! Access for all!");
    }
  });

  cells[index].appendChild(can);
}

function startGame() {
  const difficulty = document.getElementById('difficulty').value;
  let spawnRate = 1000; // default: 1 second

  switch (difficulty) {
    case 'easy':
      timeLeft = 40;
      goal = 20;
      spawnRate = 1200;
      break;
    case 'normal':
      timeLeft = 30;
      goal = 25;
      spawnRate = 900;
      break;
    case 'hard':
      timeLeft = 20;
      goal = 35;
      spawnRate = 600;
      break;
  }

  currentCans = 0;
  gameActive = true;
  document.getElementById('current-cans').textContent = currentCans;
  document.getElementById('timer').textContent = timeLeft;
  document.getElementById('achievements').textContent = '';

  createGrid();

  // Use dynamic spawn rate
  spawnInterval = setInterval(spawnWaterCan, spawnRate);

  timerInterval = setInterval(() => {
    if (!gameActive) {
      clearInterval(timerInterval);
      return;
    }

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

document.getElementById('start-game').addEventListener('click', startGame);
