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
  background(bgImg); 

  if (gameRunning) {
    drawFaller();
    drawCatcher();
    checkCatch();
  } else {
    displayStartScreen();
  }
  
  if (fallerY > height) {
    gameRunning = false; 
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
  image(fallerImg, fallerX, fallerY, 50, 50); 
  fallerY += fallerSpeed;
}

function drawCatcher() {
  image(catcherImg, mouseX - 50 / 2, height - 50, 100, 50); 
}

function checkCatch() {
  if (fallerY >= height - 50 && fallerY <= height) {
    if (fallerX >= mouseX - 50 / 2 && fallerX <= mouseX + 50 / 2) {
      score++;
      fallerY = 0; 
      fallerX = random(width); 
      fallerSpeed += 0.5; 
    }
  }
}

function displayStartScreen() {
  fill(0, 200); 
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
  fill(0, 200);
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER);
  textSize(20);
  text('Therefore trust the physician, \n and drink his remedy in silence and tranquility \n \n Score: ' + score, width / 2, height / 2);
}
