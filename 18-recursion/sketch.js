// recursion circles


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(220);
  drawCircles(width / 2, width / 2);
}

function drawCircles(x, radius) {

  let fillColor = map(radius, width / 2, 50, 255, 90);
  
  fill(fillColor);
  circle(x, height / 2, radius * 2);


  let maxRadius = map(mouseX, 0, width, width / 2, 50);
  if (radius > maxRadius) {
    drawCircles(x - radius / 2, radius / 2);
    drawCircles(x + radius / 2, radius / 2);
  }
}