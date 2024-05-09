let guesses = Array(6).fill("");
let currentGuess = 0;
let wordToGuess = "POTTER";
let gameOver = false;
let feedback = Array(6).fill(Array(6).fill(""));
let winMessage;

function setup() {
  createCanvas(800, 600);
  textSize(32);
  textAlign(CENTER, CENTER);

  // Create the win message element but hide it initially
  winMessage = createElement('div', "<p>And the cup he brings, though it burn your lips, has been fashioned of the clay which the Potter has moistened with His own sacred tears.</p><button onclick='winMessage.hide()'>Close</button>");
  winMessage.style('background', 'white');
  winMessage.style('padding', '20px');
  winMessage.style('text-align', 'center');
  winMessage.style('border-radius', '8px');
  winMessage.style('border', '1px solid #ccc');
  winMessage.hide();

  centerPopup();
}

function draw() {
  background(220);
  drawGrid();
}

function drawGrid() {
  let w = width / 6;
  let h = height / 6;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      let col = color(255);
      if (feedback[i][j] === "green") col = color(0, 255, 0);
      else if (feedback[i][j] === "yellow") col = color(255, 255, 0);
      else if (feedback[i][j] === "gray") col = color(128);

      fill(col);
      stroke(0);
      rect(j * w, i * h, w, h);
      fill(0);
      if (i < guesses.length && guesses[i].length > j) {
        text(guesses[i][j], j * w + w/2, i * h + h/2);
      }
    }
  }
}

function keyPressed() {
  if (gameOver) return;
  if (keyCode === BACKSPACE && guesses[currentGuess].length > 0) {
    guesses[currentGuess] = guesses[currentGuess].slice(0, -1);
  } else if (keyCode === ENTER) {
    if (guesses[currentGuess].length === 6) {
      checkGuess();
      if (guesses[currentGuess] === wordToGuess || currentGuess === 5) {
        gameOver = true;
        if (guesses[currentGuess] === wordToGuess) {
          winMessage.show();
        }
      }
      currentGuess++;
    }
  } else if (key.match(/[a-zA-Z]/) && guesses[currentGuess].length < 6) {
    guesses[currentGuess] += key.toUpperCase();
  }
}

function checkGuess() {
  let g = guesses[currentGuess];
  let tempWord = wordToGuess.slice();
  feedback[currentGuess] = Array(6).fill("gray");

  for (let i = 0; i < 6; i++) {
    if (g[i] === wordToGuess[i]) {
      feedback[currentGuess][i] = "green";
      tempWord = tempWord.replace(g[i], '-');
    }
  }

  for (let i = 0; i < 6; i++) {
    if (g[i] !== wordToGuess[i] && tempWord.includes(g[i])) {
      feedback[currentGuess][i] = "yellow";
      tempWord = tempWord.replace(g[i], '-');
    }
  }
}

function centerPopup() {
  let popupWidth = 500; // Assuming the width of the popup
  let popupHeight = 150; // Assuming the height of the popup
  let xPosition = (width - popupWidth) / 2;
  let yPosition = (height - popupHeight) / 2;
  winMessage.position(xPosition, yPosition);
}
