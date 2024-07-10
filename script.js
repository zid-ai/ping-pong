const ball = document.querySelector('.ball');
const leftPaddle = document.querySelector('.paddle.left');
const rightPaddle = document.querySelector('.paddle.right');
const leftScoreElement = document.querySelector('.score.left');
const rightScoreElement = document.querySelector('.score.right');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');

let ballX = 400;
let ballY = 200;
let ballSpeedX = 5;
let ballSpeedY = 5;
let isPlaying = false;
let intervalId;
let leftScore = 0;
let rightScore = 0;

function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX <= 0 || ballX >= 800 - 20) {
    ballSpeedX = -ballSpeedX;
    if (ballX <= 0) {
      rightScore++;
      rightScoreElement.textContent = rightScore;
    } else {
      leftScore++;
      leftScoreElement.textContent = leftScore;
    }
    if (leftScore === 5 || rightScore === 5) {
      pauseGame();
      alert(`Le joueur ${leftScore > rightScore ? 'gauche' : 'droit'} a gagné!`);
    }
  }

  if (ballY <= 0 || ballY >= 400 - 20) {
    ballSpeedY = -ballSpeedY;
  }

  if (
    ballX <= 30 &&
    ballY >= leftPaddle.offsetTop &&
    ballY <= leftPaddle.offsetTop + 80
  ) {
    ballSpeedX = -ballSpeedX;
  }

  if (
    ballX >= 770 &&
    ballY >= rightPaddle.offsetTop &&
    ballY <= rightPaddle.offsetTop + 80
  ) {
    ballSpeedX = -ballSpeedX;
  }

  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
}

function moveAIPaddle() {
  if (ballY > rightPaddle.offsetTop + 40) {
    rightPaddle.style.top = `${rightPaddle.offsetTop + 5}px`;
  } else if (ballY < rightPaddle.offsetTop + 40) {
    rightPaddle.style.top = `${rightPaddle.offsetTop - 5}px`;
  }
}

function movePaddle(e) {
  if (e.key === 'ArrowUp') {
    leftPaddle.style.top = `${Math.max(0, leftPaddle.offsetTop - 10)}px`;
  } else if (e.key === 'ArrowDown') {
    leftPaddle.style.top = `${Math.min(320, leftPaddle.offsetTop + 10)}px`;
  }
}

function startGame() {
  isPlaying = true;
  intervalId = setInterval(() => {
    moveBall();
    moveAIPaddle();
  }, 16);
  startBtn.style.display = 'none';
  pauseBtn.style.display = 'inline-block';
  document.addEventListener('keydown', movePaddle);
}

function pauseGame() {
  isPlaying = false;
  clearInterval(intervalId);
  startBtn.style.display = 'inline-block';
  pauseBtn.style.display = 'none';
  document.removeEventListener('keydown', movePaddle);
}

startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', pauseGame);