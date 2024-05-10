let mazePath = [
  [0, 287.36], [0, 260.32], [378.53, 260.32], [378.53, 234.54], [0, 234.54],
  [0, 68.54], [218.19, 68.54], [218.19, 38.36], [198.7, 38.36], [198.7, 12.58],
  [216.3, 12.58], [216.3, 0], [225.11, 0], [225.11, 21.38], [204.36, 21.38],
  [204.36, 31.44], [224.48, 31.44], [224.48, 74.83], [208.76, 74.83], [208.76, 92.43],
  [29.55, 92.43], [29.55, 203.1], [401.17, 203.1], [401.17, 287.36]
];
let scaleFactor, offsetX, offsetY;
let gameState = 'start'; 
let startButtonX, startButtonY;
let finishLineX, finishLineY, finishLineRadius = 10;

function setup() {
  createCanvas(800, 600);
  let padding = 0.05 * width;
  let mazeWidth = 401.17;
  let mazeHeight = 287.36;
  scaleFactor = min((width - 2 * padding) / mazeWidth, (height - 2 * padding) / mazeHeight);
  offsetX = (width - scaleFactor * mazeWidth) / 2;
  offsetY = (height - scaleFactor * mazeHeight) / 2;
  startButtonX = offsetX + 10 * scaleFactor;
  startButtonY = offsetY + 270 * scaleFactor;
  finishLineX = width / 1.83; 
  finishLineY = offsetY + 10; 
}

function draw() {
  background(0);
  if (gameState === 'start') {
    displayStartScreen();
  } else if (gameState === 'game') {
    drawMaze();
  } else if (gameState === 'gameOver') {
    displayGameOverScreen();
  } else if (gameState === 'win') {
    displayWinScreen();
  }
}

function displayStartScreen() {
  fill(255);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Click the red dot to start", width / 2, height / 2 - 20);
  fill(255, 0, 0);
  ellipse(startButtonX, startButtonY, 20, 20); // Start button
}

function drawMaze() {
  fill(46, 49, 146);
  noStroke();
  beginShape();
  mazePath.forEach(point => {
    vertex(offsetX + point[0] * scaleFactor, offsetY + point[1] * scaleFactor);
  });
  endShape(CLOSE);
  fill(0, 255, 0); 
  ellipse(finishLineX, finishLineY, finishLineRadius * 2, finishLineRadius * 2); 
  checkCursorInBounds();
}

function displayGameOverScreen() {
  fill(255, 0, 0);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Game Over! Click to restart", width / 2, height / 2 - 20);
  ellipse(startButtonX, startButtonY, 20, 20); 
}

function displayWinScreen() {
  fill(0, 255, 0);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("For his hand, though heavy and hard,\n is guided by the tender hand of the Unseen,", width / 2, height / 2 - 20);
}

function checkCursorInBounds() {
  let color = get(mouseX, mouseY);
  if (!(color[0] === 46 && color[1] === 49 && color[2] === 146)) {
    gameState = 'gameOver';
  } else if (mouseY < height * 0.12) { 
    gameState = 'win';
  } else if (dist(mouseX, mouseY, finishLineX, finishLineY) <= finishLineRadius) {
    gameState = 'gameOver';
  } else {
    gameState = 'game';
  }
}



function mousePressed() {
  if (dist(mouseX, mouseY, startButtonX, startButtonY) < 10 && (gameState === 'start' || gameState === 'gameOver')) {
    gameState = 'game';
  }
}
