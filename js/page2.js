let backgroundImage;
let cauldronImage;
let tableImage;
let ingredients = ["Fear", "Doubt", "Regret", "Resentment"];
let promptIndex = 0;
let shuffledPrompts = []; 
let promptX = 100; 
let promptY = 100;
let promptSpacing = 150; 
let catalogX = 0; 
let catalogY; 
let catalogWidth = 800; 
let catalogHeight = 100; 
let catalogOpacity = 180; 
let cauldronX = 300;
let cauldronY = 280;
let cauldronWidth = 200;
let cauldronHeight = 200;
let draggedIngredient = null;
let completedIngredients = 0;
let showPopup = false;
let fadeOut = false;
let fadeAmount = 5;
let poemOpacity = 0;

function preload() {
  backgroundImage = loadImage('img/Lair.png'); 
  tableImage = loadImage('img/wooden_table.png');
  cauldronImage = loadImage('img/Cauldron.png');
}

function setup() {
  createCanvas(800, 600); 
  textAlign(CENTER, CENTER);
  textSize(20);
  catalogY = height - catalogHeight / 2;
  shuffledPrompts = shuffle(ingredients.slice()); 
}

function draw() {
  background(255, poemOpacity); 

  image(backgroundImage, 0, 0, width, height);

  image(tableImage, 0, 0, width, height); 

  image(cauldronImage, cauldronX, cauldronY, cauldronWidth, cauldronHeight); 

  drawIngredientPrompts();

  drawWordCatalog();

  if (completedIngredients === ingredients.length) {
    fadeOut = true; 
    drawPoem();
  }

  
  if (draggedIngredient) {
    fill(255, 30); 
    rect(mouseX - 50, mouseY - 15, 100, 30);
    fill(255, 0, 0); 
    text(draggedIngredient, mouseX, mouseY);
  }

  if (showPopup) {
    drawPopup();
  }

  if (fadeOut) {
    fadeOutElements();
  }
}

function fadeOutElements() {
  if (catalogOpacity > 90) {
    catalogOpacity -= fadeAmount;
  }
}

function drawIngredientPrompts() {
  fill(255); 
  let prompt = shuffledPrompts[promptIndex];
  if (prompt !== undefined) {
    textStyle(BOLD); 
    text("Add " + prompt + ":", width / 2, promptY);
    textStyle(NORMAL); 
  } else {
    fill(255, 0); 
  }
}

function drawWordCatalog() {
  fill(255, catalogOpacity); 
  rect(catalogX, catalogY - catalogHeight / 2, catalogWidth, catalogHeight);
  fill(255, 0, 0);
  for (let i = 0; i < ingredients.length; i++) {
    let x = catalogX + catalogWidth / ingredients.length * (i + 0.5); 
    let y = catalogY;
    text(ingredients[i], x, y);
  }
}

function drawPoem() {
  
  textSize(24);
  fill(255);
  text("It is the bitter potion by which the physician within you heals your sick self.", width / 2, height / 2);
  poemOpacity = 90; 
}

function drawPopup() {
  fill(255, 200); 
  rect(width / 4, height / 3, width / 2, height / 3, 20); 
  fill(0); 
  textSize(24);
  text("Wrong ingredient, starting over", width / 2, height / 2 - 20); 
  fill(255); 
  rect(width / 2 - 50, height / 2 + 20, 100, 40, 10); 
  fill(0); 
  text("OK", width / 2, height / 2 + 40); 
}

function mousePressed() {
  if (draggedIngredient) return;

  for (let i = 0; i < ingredients.length; i++) {
    let x = catalogX + catalogWidth / ingredients.length * i;
    let y = catalogY - catalogHeight / 2;
    let w = catalogWidth / ingredients.length;
    let h = catalogHeight;
    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
      draggedIngredient = ingredients[i]; 
      break;
    }
  }

  
  if (showPopup && mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 + 20 && mouseY < height / 2 + 60) {
    promptIndex = 0;
    completedIngredients = 0; 
    shuffledPrompts = shuffle(ingredients.slice()); // Reshuffle prompts
    showPopup = false; 
  }
}

function mouseReleased() {
  if (!draggedIngredient) return;

  if (mouseX > cauldronX && mouseX < cauldronX + cauldronWidth && mouseY > cauldronY && mouseY < cauldronY + cauldronHeight) {
    if (draggedIngredient === shuffledPrompts[promptIndex]) {
      completedIngredients++; // Increment completed ingredients count
      promptIndex++; // Move to the next prompt
      if (promptIndex < ingredients.length) {
        displayPrompt();
      }
    } else {
      showPopup = true;
    }
  }

  draggedIngredient = null; 
}

function displayPrompt() {
  fill(255); 
  let prompt = shuffledPrompts[promptIndex];
  if (prompt !== undefined) {
    textStyle(BOLD); 
    text("Add " + prompt + ":", width / 2, promptY);
    textStyle(NORMAL); // Reset text style
    back
  } else {
    fill(255, 0); // Set text opacity to 0%
  }
}

// Fisher-Yates shuffle algorithm to shuffle an array
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
