// Walker OOP Demo

class Walker {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.size = 2;
    this.speed = 10;
    this.color = color(random(255), random(255), random(255));
  }

  display() {
    fill(this.color);
    stroke(this.color);
    circle(this.x, this.y, this.size);
  }

  move() {
    let direction = floor(random(4));  
    if (direction === 0) {
      //up
      this.y -= this.speed;
    } 
    else if (direction === 1) {
      //down
      this.y += this.speed;
    } 
    else if (direction === 2) {
      //left
      this.x -= this.speed;
    }
    else {
      //right
      this.x += this.speed;
    }
  }
}

let theWalkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  for (aWalker of theWalkers) {
    aWalker.move();
    aWalker.display();
  }
}

function mousePressed() {
  let someWalker = new Walker(mouseX, mouseY);
  theWalkers.push(someWalker);  
}
