let catcherImg, fallerImg, bgImg;
let fallerX, fallerY;
let fallerSpeed = 3;
let score = 0;
let gameRunning = false;

function preload() {
  // Load images
  bgImg = loadImage('img/backgroundp4.jpg');
  fallerImg = loadImage('img/faller.png');
  catcherImg = loadImage('img/catcher.png');
}

function setup() {
  createCanvas(800, 600);
  fallerX = random(width);
  fallerY = 0;
}

function draw() {
  background(bgImg); // Set the background image

  if (gameRunning) {
    drawFaller();
    drawCatcher();
    checkCatch();
  } else {
    displayStartScreen();
  }
  
  if (fallerY > height) {
    gameRunning = false; // End game if missed
    displayGameOver();
  }
}

function mouseClicked() {
  if (!gameRunning) {
    startGame();
  }
}

function startGame() {
  gameRunning = true;
  score = 0;
  fallerSpeed = 3;
  fallerY = 0;
}

function drawFaller() {
  image(fallerImg, fallerX, fallerY, 50, 50); // Draw faller image
  fallerY += fallerSpeed;
}

function drawCatcher() {
  image(catcherImg, mouseX - 50 / 2, height - 50, 100, 50); // Draw catcher image
}

function checkCatch() {
  if (fallerY >= height - 50 && fallerY <= height) {
    if (fallerX >= mouseX - 50 / 2 && fallerX <= mouseX + 50 / 2) {
      score++;
      fallerY = 0; // Reset faller position
      fallerX = random(width); // New faller position
      fallerSpeed += 0.5; // Increase falling speed
    }
  }
}

function displayStartScreen() {
  // Darken background
  fill(0, 200); // Semi-transparent black
  rect(0, 0, width, height);

  // Display start screen text
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text('Catch the falling water!', width / 2, height / 2 - 40);
  textSize(20);
  text('Click anywhere to start.', width / 2, height / 2 + 20);
}

function displayGameOver() {
  // Darken background
  fill(0, 200); // Semi-transparent black
  rect(0, 0, width, height);

  // Display game over text
  fill(255);
  textAlign(CENTER);
  textSize(20);
  text('Therefore trust the physician, \n and drink his remedy in silence and tranquility \n \n Score: ' + score, width / 2, height / 2);
}
