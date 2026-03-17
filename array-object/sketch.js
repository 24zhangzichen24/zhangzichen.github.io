// Array and Objects Notation
// Zichen Zhang
// 3/5/2026
//
// Extra for Experts:
// use trignometry function calculate the direction and angle between objects or mouse
// Use % to loop the offset so the background seamlessly repeats infinitely
// Use push and pop and translate to rotate the bullet image according to its direction

let enemies = [];
let expDots = [];
let bullets = [];

let numEnemies = 5;
let time = 0;
let playerSpeed = 2;
let enemysize = 100;
let shootSpeed = 0;
let cooldown = 0;
let playerHP = 3;
let playerExp = 0;

let backgroundPicture;
let backgroundX = 0;
let backgroundY = 0;
let enemyPicture;
let playerPicture;
let bulletPicture;

function preload() {
  backgroundPicture = loadImage('Grass_Sample.png');
  enemyPicture = loadImage('Enemy_Sample.png');
  playerPicture = loadImage('Player_Sample.png');
  bulletPicture = loadImage('Bullet_Sample.png');

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  grassBackground();
  time++;    
  background(0,0,0,200-time/100);// the background will get brighter as time goes by
  textAndTime();
  enemy(); 
  halo(); 
  player();
  bullet();
  expDot();
  hpBar();
}

function grassBackground() {
  let offsetX = backgroundX % backgroundPicture.width;
  let offsetY = backgroundY % backgroundPicture.height;
  
  // Start drawing one image-width outside the screen to prevent pop-in
  for (let x = offsetX - backgroundPicture.width; x < width + backgroundPicture.width; x += backgroundPicture.width) {
    for (let y = offsetY - backgroundPicture.height; y < height + backgroundPicture.height; y += backgroundPicture.height) {
      image(backgroundPicture, x, y);
    }
  }
}

// all changes about player
function player() {
  image(playerPicture, width/2-50, height/2-50, 100, 100);
  playerMovement();

}

// all changes about enemy
function enemy() {
  for (let enemy of enemies) {
    if (enemy.px > width/2) {
      scale(-1, 1); // Flip horizontally
    }
    image(enemyPicture, enemy.pX-enemy.size/2, enemy.pY-enemy.size/2, enemy.size, enemy.size);
  }
  
  if (enemies.length < numEnemies) {
    enemies.push(createEnemy());
  }
  numEnemies = floor(time/300)+5; // the number of enemies will increase as time goes by
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
  // bullet will be created at the player position
  // the higher the shoot speed, the faster the bullet moves
  if (mouseIsPressed) {
    if (cooldown <= 0) {
      bullets.push(createBullet());
      cooldown = 30-shootSpeed; // the higher the shoot speed, the shorter the cooldown
    }
  }

  for (let bullet of bullets) {
    push(); // Save current drawing settings
    translate(bullet.pX, bullet.pY); // Move the origin to the bullet's center
    rotate(bullet.direction-PI); // Rotate to match the bullet's travel direction
    
    // Because we translated to the bullet's center, draw the image at 0,0 
    image(bulletPicture, -bullet.size/2, -bullet.size/2, bullet.size, bullet.size-bullet.size/3);
    pop(); // Restore original drawing settings
  }
  bulletMovement();
}

function textAndTime(){
// display time and text on the screen, the color of time will change as time goes by
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
  let haloSize =  sin(time/10) * 6; // halo size will change over time
  // code of halo around the player
  for (let i = 0; i < 20; i++) {
    fill(255, 255, 0, 20+sin(time/10+i)*10);
    circle(width/2, height/2, haloSize + i*10);
  }

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
  tint(255, 0, 0, 150);
  image(enemyPicture, enemy.pX-enemy.size/2, enemy.pY-enemy.size/2, enemy.size, enemy.size);
  noTint();
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
    pX: randompositionX(),
    pY: randompositionY(),
    size: enemysize,
    color: color(random(255), random(255), random(255)),
    hp: 3,
  };
  return enemy;
}

let rand =0;
function randompositionX() {
  rand = random(1);
  if (rand < 0.25) {
    return 0;
  } 
  else if (rand < 0.5) {
    return width+10;
  }
  else {
    return random(-10, width+10);
  }
}

function randompositionY() {
  if (rand > 0.75) {
    return 0;
  }
  else if (rand >= 0.5) {
    return height+10;
  }
  else {
    return random(-10, height+10);
  }
}


function createBullet() {
  let bullet = {
    pX: width/2,
    pY: height/2,
    size:80,
    speed: 5,
    direction: 0,
    damage: 1,
  };
  bullet.direction = atan2(mouseY - bullet.pY, mouseX - bullet.pX);
  return bullet;
}

function createExp(){
  let expDot = {
    pX: randompositionX(),
    pY: randompositionY(),
    size: random(5,10),
  };
  expDots.push(expDot);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
