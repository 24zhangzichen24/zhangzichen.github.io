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
let playerSpeed = 2;
let enemysize = 20;
let shootSpeed = 0;
let cooldown = 0;
let playerHP = 3;
let backgroundPicture;
let backgroundX = 0;
let backgroundY = 0;

function preload() {
  backgroundPicture = loadImage('Grass_Sample.png');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  grassBackground();
  background(time/60,time/60,time/60,200);// the background will get brighter as time goes by
  time++;
  textAndTime();
  bullet();
  player();
  enemy();
  expDot();
  hpBar();
}

function grassBackground() {
  for (let x = backgroundX; x < width; x += backgroundPicture.width) {
    for (let y = backgroundY; y < height; y += backgroundPicture.height) {
      image(backgroundPicture, x, y);
    }
  }
}

// all changes about player
function player() {
  fill(255);
  rect(width/2-10, height/2-10, 20, 20);
  playerMovement();
  halo();

}

// all changes about enemy
function enemy() {
  for (let enemy of enemies) {
    fill('red');
    rect(enemy.pX-enemy.size/2, enemy.pY-enemy.size/2, enemy.size, enemy.size);
  }
  if (enemies.length < numEnemies) {
    enemies.push(createEnemy());
  }
  enemyMovement();
  enemyKilled();
  enemySqueezeEachOther();
}

// all changes about exp dot
function expDot() {
  for (let expDot of expDots) {
    fill(0, 255, 0);
    circle(expDot.pX, expDot.pY, expDot.size);
  }
  expDotSpawn();
}

// all changes about bullet
function bullet() {
  
  // cooldown time for shooting
  if (cooldown > 0) {
    cooldown--;
  }
  // bullet will be created at the player position the higher the shoot speed, the faster the bullet moves
  if (mouseIsPressed) {
    if (cooldown <= 0) {
      bullets.push(createBullet());
      cooldown = 30-shootSpeed; // reset cooldown after shooting, the higher the shoot speed, the shorter the cooldown
    }
  }

  for (let bullet of bullets) {
    fill(255);
    circle(bullet.pX, bullet.pY, bullet.size);
  }
  bulletMovement();
}

// display time and text on the screen, the color of time will change as time goes by, and some text will appear when time is less than 5 minutes or more than 30 minutes
function textAndTime() {
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
    text("Try to survive untill bright!", 10, height-60);
    text("Use WASD to move, click to shoot", 10, height-30);
  }
}

function hpBar() {
  textSize(20);
  fill(0,255,0);
  text("HP: " + playerHP, 10, 50);
  // Display player HP
  fill(0, 255, 0);
  for (let i = 0; i < playerHP; i++) {
    rect(10 + i * 30, 60, 20, 20);
  }
}

function halo() {
  let haloSize = 80 + sin(time/10) * 2; // halo size will change over time
  // code of halo around the player
  fill(255, 255, 0, 20);
  circle(width/2, height/2, haloSize);
}

// Move the player by moving all the enemies, exp dots, and bullets 
function playerMovement() {
  if (keyIsDown(87)) {    // move up
    for (let enemy of enemies) {    
      enemy.pY += playerSpeed;
    }
    for (let expDot of expDots) {
      expDot.pY += playerSpeed;
    }
    for (let bullet of bullets) {
      bullet.pY += playerSpeed;
    }
    backgroundY += playerSpeed;


  }
  if (keyIsDown(83)) {    // move down
    for (let enemy of enemies) {
      enemy.pY -= playerSpeed;
    }
    for (let expDot of expDots) {
      expDot.pY -= playerSpeed;
    }
    for (let bullet of bullets) {
      bullet.pY -= playerSpeed;
    }
    backgroundY -= playerSpeed;
  }
  if (keyIsDown(68)) {    // move left
    for (let enemy of enemies) {
      enemy.pX -= playerSpeed;
    }
    for (let expDot of expDots) {
      expDot.pX -= playerSpeed;
    }
    for (let bullet of bullets) {
      bullet.pX -= playerSpeed;
    }
    backgroundX -= playerSpeed;

  }

  if (keyIsDown(65)) {    // move right
    for (let enemy of enemies) {
      enemy.pX += playerSpeed;
    }
    for (let expDot of expDots) {
      expDot.pX += playerSpeed;
    }
    for (let bullet of bullets) {
      bullet.pX += playerSpeed;
    }
    backgroundX += playerSpeed;
  }


}

// exp dot will be created at out of the screen or after the 
// enemy is killed
function expDotSpawn() {
  // code of exp dot spawn
}

function enemyMovement() {
  for (let enemy of enemies) {
    let angle = atan2(height/2 - enemy.pY, width/2 - enemy.pX);
    enemy.pX += cos(angle) * 1;
    enemy.pY += sin(angle) * 1;
  }
}

function enemyKilled() {
  if (bullets.length > 0) {
    for (let bullet of bullets) {
      for (let enemy of enemies) {
        let distance = dist(bullet.pX, bullet.pY, enemy.pX, enemy.pY);
        if (distance < enemy.size/2) {
          enemy.hp -= bullet.damage;
          enemyHitEffect(enemy);
          if (enemy.hp <= 0) {
            enemies.splice(enemies.indexOf(enemy), 1);
          }
          bullets.splice(bullets.indexOf(bullet), 1);
          break; // break to avoid multiple enemies being killed by one bullet
        }
      }
    }
  }
}

function enemyHitEffect(enemy) {
  fill(255, 0, 0, 100);
  circle(enemy.pX, enemy.pY, enemy.size + 10);
}

function enemySqueezeEachOther() {
  for (let enemy1 of enemies) {
    for (let enemy2 of enemies) {
      if (enemy1 !== enemy2) {
        let distance = dist(enemy1.pX, enemy1.pY, enemy2.pX, enemy2.pY);
        if (distance < enemysize) {
          let angle = atan2(enemy2.pY - enemy1.pY, enemy2.pX - enemy1.pX);
          enemy1.pX -= cos(angle) * 0.5;
          enemy1.pY -= sin(angle) * 0.5;
          enemy2.pX += cos(angle) * 0.5;
          enemy2.pY += sin(angle) * 0.5;
        }
      }
    }
  }
}

function bulletMovement() {
  for (let bullet of bullets) {
    bullet.pX += bullet.speed * cos(bullet.direction);
    bullet.pY += bullet.speed * sin(bullet.direction);
  }
}


function createEnemy() {
  let enemy = {
    pX: random(width),
    pY: random(height),
    size: enemysize,
    color: color(random(255), random(255), random(255)),
    hp: 3,
  };
  return enemy;
}

function createBullet() {
  let bullet = {
    pX: width/2+10,
    pY: height/2+10,
    size: 5,
    speed: 5,
    direction: 0,
    damage: 1,
  };
  bullet.direction = atan2(mouseY - bullet.pY, mouseX - bullet.pX);
  return bullet;
}

function createExp(){
  let expDot = {
    pX: random(width),
    pY: random(height),
    size: random(5,10),
  };
  expDots.push(expDot);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}