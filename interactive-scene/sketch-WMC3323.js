// Hit block - Perspective version
// Zichen Zhang
// 3/2/2026

let y = 0;
let currentTrack = 0;
let velocity = 0;     
let gravity;           
let tracks = 6;
let keys = ['S', 'D', 'F', 'J', 'K', 'L'];
let hitZoneY;
let combo = 0
let vanishingOffset = 0.25;
let topY = 50;
let missEffects = [];  

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  gravity = height / 1500; 
  hitZoneY = height - 100;
  currentTrack = int(random(0, tracks));
  textFont('Arial');
  resetBlock();
}

function draw() {
  background(40);
  drawTracks();
  updateAndDrawBlock();
  drawMissEffects(); 
  drawCombo();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  hitZoneY = height - 100;
  gravity = height / 1500;
}

// check if this is a good hit
function checkHit(trackIsPressed){
  if (y > hitZoneY - 50 && y < hitZoneY + 50){
    if (trackIsPressed === currentTrack){
      return 'hit';
    }
  }
  return 'miss';
}
// get the key that the player is pressing
function keyPressed(){
  let pressed = key.toUpperCase();
  let trackIsPressed = keys.indexOf(pressed);

  if (trackIsPressed !== -1){
    let hitResult = checkHit(trackIsPressed);
    if (hitResult === 'hit'){
      combo++;
      resetBlock();
    } else {
      combo = 0;
      triggerMiss(trackIsPressed);
    }
  }
}
// show the combo number
function drawCombo() {
  if (combo <= 0) return;   

  push();
  textAlign(CENTER, CENTER);
  textSize(72);
  textStyle(BOLD);
  fill(255, 255, 255, 90);  
  text(combo + " COMBO", width / 2, height / 2);
  pop();
}
// use map function and lerp function get the smooth change number between the top and bottom
function getTotalWidthAtY(yPos) {
  let t = map(yPos, topY, height, 0, 1);
  let topTotalW = width * vanishingOffset;
  let bottomTotalW = width;
  
  return lerp(topTotalW, bottomTotalW, t);
}

// get the center x position for each track that will use to draw the tracks and the block
function getTrackCenterX(trackIndex, yPos) {
  let totalW = getTotalWidthAtY(yPos);
  let singleLaneW = totalW / tracks;
  let startX = width / 2 - totalW / 2;
  
  return startX + (trackIndex + 0.5) * singleLaneW;
}


function updateAndDrawBlock() {
  // dropping
  velocity += gravity;
  y += velocity;
  
  if (y > height) {
    triggerMiss(currentTrack); 
    resetBlock();
  } else {
    drawSingleBlock(currentTrack, y);
  }
}

function resetBlock() {
  currentTrack = int(random(0, tracks));
  y = topY;
  velocity = height / 300; 
}

  // use an array include dictionary to save every animation of missing
function triggerMiss(trackIdx) {
  let startX = getTrackCenterX(trackIdx, height - 50);
  missEffects.push({
    x: startX,
    y: height - 50,
    alpha: 255,          
  });
}

// test animation of missing
function drawMissEffects() {
  for (let i = missEffects.length - 1; i >= 0; i--) {
    let effect = missEffects[i];
    

    effect.y -= 1.5; 
    effect.alpha -= 4; 

    fill(255, 80, 80, effect.alpha);
    textAlign(CENTER, CENTER);
    textSize(32);
    textStyle(BOLD);
    text("MISS", effect.x, effect.y);
    textStyle(NORMAL); 


    if (effect.alpha <= 0) {
      missEffects.splice(i, 1);
    }
  }
}

function drawTracks() {
  noStroke();

  for (let i = 0; i < tracks; i++) {
    let tx = getTrackCenterX(i, topY);
    let tw_top = getTotalWidthAtY(topY) / tracks;
    
    let bx = getTrackCenterX(i, height);
    let bw_bottom = getTotalWidthAtY(height) / tracks;

    if (i % 2 == 0) {
      fill(50, 60, 80);
    }
    else {
      fill(40, 50, 70);
    }

    quad(
      tx - tw_top / 2, topY,
      tx + tw_top / 2, topY,
      bx + bw_bottom / 2, height,
      bx - bw_bottom / 2, height
    );
  }

  let hitLineW = getTotalWidthAtY(hitZoneY);
  let hitLineLeft = width / 2 - hitLineW / 2;

  stroke(255, 50, 50, 150);
  strokeWeight(2);
  line(hitLineLeft, hitZoneY, hitLineLeft + hitLineW, hitZoneY);

  stroke(255, 0, 0);
  strokeWeight(4);
  line(hitLineLeft, hitZoneY, hitLineLeft + hitLineW, hitZoneY);
  noStroke();

  fill(255, 200);
  textAlign(CENTER, CENTER);
  textSize(28);
  for (let i = 0; i < tracks; i++) {
    let keyX = getTrackCenterX(i, height - 40);
    text(keys[i], keyX, height - 40);
  }
}

function drawSingleBlock(trackIdx, currentY) {
  let scale = map(currentY, topY, height, 0.2, 1);
  let blockH = (height / 15) * scale;
  
  let bottomY = currentY;
  let topY_block = currentY - blockH;

  if (topY_block < topY) return;

  let cx_bottom = getTrackCenterX(trackIdx, bottomY);
  let w_bottom = (getTotalWidthAtY(bottomY) / tracks) * 0.9;
  
  let cx_top = getTrackCenterX(trackIdx, topY_block);
  let w_top = (getTotalWidthAtY(topY_block) / tracks) * 0.9;

  if (bottomY > hitZoneY) {
    fill('#ff6b6b');
  } else {
    fill('#4ecdc4');
  }

  quad(
    cx_top - w_top / 2, topY_block,
    cx_top + w_top / 2, topY_block,
    cx_bottom + w_bottom / 2, bottomY,
    cx_bottom - w_bottom / 2, bottomY
  );

  fill(255, 255, 255, 100);
  let highlightH = blockH * 0.1;

  quad(
    cx_top - w_top / 2, topY_block,
    cx_top + w_top / 2, topY_block,
    cx_top + w_top / 2, topY_block + highlightH,
    cx_top - w_top / 2, topY_block + highlightH
  );
}

function mousePressed() {
  let fs = fullscreen();
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    fullscreen(!fs);
  }
}
