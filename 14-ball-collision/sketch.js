// Ball Collision OOP Demo

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = random(10, 30);
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.color = color(random(255), random(255), random(255));
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.bonce();
    for (let otherBall of balls) {
      if (otherBall !== this) {
        this.checkCollision(otherBall);
      }
    }
  }

  bonce() {
    if (this.x - this.radius < 0 || this.x + this.radius > width) {
      this.dx *= -1;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.dy *= -1;
    }
  }

  checkCollision(otherBall) {
    let radiusSum = this.radius + otherBall.radius;
    let distance = dist(this.x, this.y, otherBall.x, otherBall.y);
    if (distance < radiusSum) {
      let tempDx = this.dx;
      let tempDy = this.dy;
      this.dx = otherBall.dx;
      this.dy = otherBall.dy;
      otherBall.dx = tempDx;
      otherBall.dy = tempDy;
    }
  }
}

let balls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for (let ball of balls) {
    ball.update();
    ball.display();
  }
}

function mousePressed() {
  let newBall = new Ball(mouseX, mouseY);
  balls.push(newBall);
}