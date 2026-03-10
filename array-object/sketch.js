// Array and Objects Notation
// Zichen Zhang
// 3/5/2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  

}

function createEnemy() {
  let enemy = {
    x: random(width),
    y: random(height),
    size: random(20, 50),
    color: color(random(255), random(255), random(255))
  };
  return enemy;
}

function createExp(){
  let expDot = {
    x: random(width),
    y: random(height),
    size: random(10, 30),
  }
  return expDot;
}