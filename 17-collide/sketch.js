// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let hit;
let rectX = 200;
let rectY = 200;
let dRectX = 0;
let dRectY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  rect(rectX, rectY, 100, 150);
  circle(mouseX, mouseY, 100);

  hit = collideRectCircle(rectX, rectY, 100, 150, mouseX, mouseY, 100);

  if (hit) {
    dRectX = mouseX - pmouseX;
    dRectY = mouseY - pmouseY;
  }

  if (rectX < 0 - 100) {
    rectX = width;
  }
  if (rectX > width) {
    rectX = 0 - 100;
  }
  if (rectY < 0 - 150) {
    rectY = height;
  }
  if (rectY > height) {
    rectY = 0 - 150;
  }

  rectX += dRectX;
  rectY += dRectY;
}
