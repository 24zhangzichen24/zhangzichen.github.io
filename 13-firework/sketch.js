// Firework OOP demo


class Particle {
  constructor(x, y) {
    this.x= x;
    this.y= y;
    this.color = color(random(255), random(255), random(255));
    this.size = random(2, 10);
    this.speed= random(4,5);
    this.angle = random(TWO_PI);
    this.dx = cos(this.angle) * this.speed;
    this.dy = sin(this.angle) * this.speed;
    this.GRAVITY = 0.1;
    this.resistance = 0.99; // Simulate air resistance
    this.strokeWeight = this.size / 2; // Initial stroke weight based on size
  }

  display() {
    fill(this.color);
    noStroke();
    circle(this.x, this.y, this.size);
    // lightning tails    
    stroke(this.color);
    strokeWeight(this.strokeWeight);
    line(this.x, this.y, this.x - this.dx * 5, this.y - this.dy * 5);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy; 
    this.dy += this.GRAVITY; // Apply gravity
    this.dx *= this.resistance; // Apply air resistance
    this.dy *= this.resistance; // Apply air resistance
    this.size *= 0.97; // Shrink over time
    this.strokeWeight *= 0.97; // Shrink stroke weight over time
  }

  isDead() {
    return this.size < 0.5;
  }
}

let fireworks = [];
const NUM_PARTICLES = 400;
const GRAVITY = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  background(0);
  for (let firework of fireworks) {
    firework.update();
    firework.display();
    if (firework.isDead()) {
      fireworks.splice(fireworks.indexOf(firework), 1); // Remove small particles
    }
  }
}

function mousePressed() {
  for (let i = 0; i < NUM_PARTICLES; i++) {
    let firework = new Particle(mouseX, mouseY);
    fireworks.push(firework);
  }
}