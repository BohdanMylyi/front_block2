

let cells = 30;
let cellSize = 20;

let foodX = 15;
let foodY = 15;

let playerX = 10;
let playerY = 10;

let moveX = 0;
let moveY = 0;

let trail = [];
let tail = 3;

let bossX, bossY, bossMoveX, bossMoveY;
let bossAppeared = false;


let score = 0; 
let pastScores = []; 
let scoreBlock = document.querySelector("h2 span");

window.onload = function () {
  canv = document.getElementById("canv");
  ctx = canv.getContext("2d");

  start();
};

function start() {
  bossAppeared = false;
  playerX = 10;
  playerY = 10;

  moveX = 0;
  moveY = 0;

  trail = [];
  tail = 3;
  score = 0; 

  let background = new Image();
  background.src = "/image/background.png";
  background.onload = function () {
    ctx.drawImage(background, 0, 0);
    ctx.font = "50px Calibri";
    ctx.fillText("Start", 250, 500);
  };

  canv.onclick = function () {
    setTimer = setInterval(game, 100);
    document.addEventListener("keydown", move);
    canv.onclick = null;
  };
}

function game() {
  playerX += moveX;
  playerY += moveY;

  if (playerX < 0 || playerY < 0 || playerX > cells || playerY > cells) {
    endGame();
    scoreBlock.innerText = 0;
  }

  ctx.fillStyle = "#8ee4af";
  ctx.fillRect(0, 0, canv.width, canv.height);

  ctx.fillStyle = "red";
  ctx.fillRect(foodX * cellSize, foodY * cellSize, cellSize, cellSize);

  ctx.fillStyle = "#b1a296";
  for (let i = 0; i < trail.length; i++) {
    ctx.fillRect(trail[i].x * cellSize, trail[i].y * cellSize, cellSize, cellSize);

    if (playerX == trail[i].x && playerY == trail[i].y) {
      tail = 3;
      score = 0;
      scoreBlock.innerText = 0;
    }
  }

  trail.push({ x: playerX, y: playerY });

  while (trail.length > tail) {
    trail.shift();
  }

  if (playerX == foodX && playerY == foodY) {
    tail++;
    foodX = Math.floor(Math.random() * cells);
    foodY = Math.floor(Math.random() * cells);
    score += 50;
    scoreBlock.innerText = score;
  }
  updatePastScores(score);

  if (+scoreBlock.innerText >= 200 && !bossAppeared) {
    bossX = Math.floor(Math.random() * (cells - 1)) + 1;
    bossY = Math.floor(Math.random() * (cells - 1)) + 1;
    bossMoveX = Math.random() > 0.5 ? 1 : -1;
    bossMoveY = Math.random() > 0.5 ? 1 : -1;
    bossAppeared = true;
}

if (bossAppeared) {
    bossX += bossMoveX;
    bossY += bossMoveY;

    if (bossX <= 0 || bossX >= cells - 1) {
        bossMoveX *= -1;
    }
    if (bossY <= 0 || bossY >= cells - 1) {
        bossMoveY *= -1;
    }

    ctx.fillStyle = "purple";
    ctx.fillRect(bossX * cellSize, bossY * cellSize, cellSize, cellSize);
    if (playerX === bossX && playerY === bossY) {
        endGame();
        scoreBlock.innerText = 0;
        return;
    }
}
}

function updatePastScores(newScore) {
  pastScores.push(newScore);

  if (pastScores.length > 5) {
    pastScores.shift();
  }
  displayPastScores();
}

function displayPastScores() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(canv.width - 150, 10, 130, 100);

  ctx.fillStyle = "#000";
  ctx.font = "16px Arial";
  for (let i = 0; i < pastScores.length; i++) {
    ctx.fillText(`Game ${i + 1}: ${pastScores[i]}`, canv.width - 140, 20 + (i * 20));
  }
}

function move(e) {
    switch(e.keyCode) {
        case 65:
        moveX = -1;
        moveY = 0;
            break;

        case 87:
        moveX = 0;
        moveY = -1;
            break;

        case 68:
        moveX = 1;
        moveY = 0;
            break;

        case 83:
        moveX = 0;
        moveY = 1;
            break;
    }
}

function endGame() {
    clearInterval(setTimer);
    setTimeout(function() {
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, canv.width, canv.height);
        ctx.fillStyle = "#fff";
        ctx.font = "50px Calibri";
        ctx.fillText("Game Over!", 180, 300);
    }, 100)

    canv.onclick = start;
}
