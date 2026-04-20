// Connected Nodes OOP Demo

let nodes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  //draw the lines first
  for (let node of nodes){
    node.display();
    node.update();
    node.conntectTo(nodes);
  }
}


function mousePressed() {
  let somepoint = new MovingPoint(mouseX,mouseY);
  nodes.push(somepoint);
}

class MovingPoint {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.xTime = random(1000);
    this.ytime = random(1000);
    this.color = color(random(255), random(255), random(255));
    this.speed = 5;
    this.deltaTime = 0.01;
    this.reach = 200;
    this.maxRadius = 50;
    this.minRadius = 15;
  }

  display(){
    fill(this.color);
    noStroke();
    circle(this.x, this.y, this.radius*2);
  }

  update(){
    this.move();
    this.warpAroundScreen();
    this.adjustSizeBasedOnMouse();
  }

  adjustSizeBasedOnMouse(){
    let mouseDistance = dist(mouseX,mouseY,this.x,this.y);
    if (mouseDistance < this.reach){
      let theSize = map(mouseDistance, 0, this.reach, this.maxRadius, this.minRadius);
      this.radius = theSize;
    }
    else{
      this.radius = this.minRadius;
    }
  }

  conntectTo(nodesArray){
    for (let otherNode of nodesArray){
      if (otherNode !== this){
        let distanceApart = dist(this.x, this.y, otherNode.x, otherNode.y);
        if (distanceApart < this.reach){
          stroke(this.color);
          line(this.x, this.y, otherNode.x, otherNode.y);
        }
      }
    }
  }

  warpAroundScreen(){
    if (this.x < 0-this.radius){
      this.x += width+this.radius;
    }
    if (this.x > width+this.radius){
      this.x -= width+this.radius;
    }
    if (this.y < 0-this.radius){
      this.y += height+this.radius;
    }
    if (this.y > height+this.radius){
      this.y -= height+this.radius;
    }
  }

  move(){
    let dx = noise(this.xTime);
    let dy = noise(this.ytime);

    // scale from 0-1 to movement speed
    dx = map(dx, 0, 1, -this.speed, this.speed);
    dy = map(dy, 0, 1, -this.speed, this.speed);

    // move point
    this.x += dx;
    this.y += dy;

    //move time axis
    this.xTime += this.deltaTime;
    this.ytime += this.deltaTime;  
  }
}