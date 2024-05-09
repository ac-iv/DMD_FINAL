let cup;
let liquidHeight = 0;
let overflowing = false;

function setup() {
  createCanvas(600, 400);
  cup = new Cup(width / 2, height / 2);
}

function draw() {
  background(230, 240, 255);
  cup.display();
  if (overflowing) {
    displayText();
  }
}

function mousePressed() {
  if (cup.contains(mouseX, mouseY)) {
    liquidHeight += 5;
    if (liquidHeight > cup.height) {
      overflowing = true;
    }
  }
}

function displayText() {
  textSize(16);
  fill(10);
  text("And the cup he brings, though it burn your lips, has been fashioned of the clay which the Potter has moistened with His own sacred tears.", 50, 350, 500, 100); // Wraps text within a box
}

class Cup {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 150;
    this.liquidColor = color(255, 150, 0, 150); // Glowing liquid color
  }

  display() {
    // Draw cup
    stroke(70);
    fill(255);
    rect(this.x, this.y, this.width, -this.height, 10);

    // Draw liquid inside cup
    if (liquidHeight > 0) {
      noStroke();
      fill(this.liquidColor);
      rect(this.x + 5, this.y - 5, this.width - 10, -liquidHeight, 5);
    }
  }

  contains(px, py) {
    return px >= this.x && px <= this.x + this.width && py <= this.y && py >= this.y - this.height;
  }
}
