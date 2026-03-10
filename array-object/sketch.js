// Array and Objects Notation
// Zichen Zhang
// 3/5/2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let enemies = [];
let expDots = [];
let bullets = [];
let numEnemies = 5;
let time = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(time/60);
  textSize(40);
  fill(255-time/100, 0, time/100);
  
  text("Time: " + floor(time/60), width/2-40, 30);
  if (time/60 > 30) {
    textSize(30);
    fill(255, 0, 0);
    text("Bright is coming!", 10, 90);
  }
  if (time/60 < 5) {
    textSize(20);
    text("Try to survive untill bright!", 10, 60);
    text("Use WASD to move, click to shoot", 10, 30);
  }
  time += 1;

  playerMovement();


  for (let enemy of enemies) {
    fill('red');
    rect(enemy.pX, enemy.pY, enemy.size);
  }
  for (let expDot of expDots) {
    fill(255, 0, 0);
    circle(expDot.pX, expDot.pY, expDot.size);
  } 
  for (let bullet of bullets) {
    fill(0);
    circle(bullet.pX, bullet.pY, bullet.size);
  }
  if (enemies.length < numEnemies) {
    enemies.push(createEnemy());
  }

}

function playerMovement() {
  if (keyIsDown(87)) {    // move up
    for (let enemy of enemies) {    
      enemy.pY += 1;
    }
    for (let expDot of expDots) {
      expDot.pY += 1;
    }
    for (let bullet of bullets) {
      bullet.pY += 1;
    }
  }
  if (keyIsDown(83)) {    // move down
    for (let enemy of enemies) {
      enemy.pY -= 1;
    }
    for (let expDot of expDots) {
      expDot.pY -= 1;
    }
    for (let bullet of bullets) {
      bullet.pY -= 1;
    }
  }
  if (keyIsDown(65)) {    // move left
    for (let enemy of enemies) {
      enemy.pX -= 1;
    }
    for (let expDot of expDots) {
      expDot.pX -= 1;
    }
    for (let bullet of bullets) {
      bullet.pX -= 1;
    }
  }
  if (keyIsDown(68)) {    // move right
    for (let enemy of enemies) {
      enemy.pX += 1;
    }
    for (let expDot of expDots) {
      expDot.pX += 1;
    }
    for (let bullet of bullets) {
      bullet.pX += 1;
    }
  }

  if (mouseIsPressed) {
    shoot();
  }
}



function shoot() {
  for (let bullet of bullets) {
    bullet.pX += bullet.speed * cos(bullet.direction);
    bullet.pY += bullet.speed * sin(bullet.direction);
  }
}


function createEnemy() {
  let enemy = {
    pX: random(width),
    pY: random(height),
    size: random(5,10),
    color: color(random(255), random(255), random(255))
  };
  return enemy;
}

function createBullet() {
  let bullet = {
    pX: width/2,
    pY: height/2,
    size: 10,
    speed: 5,
    direction: 0
  };
  bullet.direction = atan2(mouseY - bullet.pY, mouseX - bullet.pX);
  return bullet;
}

function createExp(){
  let expDot = {
    pX: random(width),
    pY: random(height),
    size: random(10, 30),
  };
  expDots.push(expDot);
}