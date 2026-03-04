// Ball Object Notation Array

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(220);

  for (let ball of ballArray) {
    //move
    ball.x += ball.dx;
    ball.y += ball.dy;

    //display
    fill(ball.color);
    circle(ball.x, ball.y, ball.radius * 2);
    // teleport
    if (ball.x + ball.radius < 0 ) {
      ball.x = width + ball.radius;
    }
    if (ball.x - ball.radius > width) {
      ball.x = -ball.radius;
    }
    if (ball.y + ball.radius < 0 ) {
      ball.y = height + ball.radius;
    }
    if (ball.y - ball.radius > height) {
      ball.y = -ball.radius;
    }
  }
}

function mousePressed() {
  spawnBall(mouseX, mouseY);
}

function spawnBall(_x, _y) {
  let theBall = {
    x: _x !== undefined ? _x : random(width),
    y: _y !== undefined ? _y : random(height),
    dx: random(-5, 5),
    dy: random(-5, 5),
    radius: random(10, 40),
    color: color(random(255), random(255), random(255))
  };
  ballArray.push(theBall);
}