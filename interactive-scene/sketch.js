// Hit block - Perspective version
// Zichen Zhang
// 3/2/2026

let y = 0;
let currentTrack = 0;
let velocity = 0;      // 当前速度
let gravity;           // 加速度
let tracks = 6;
let keys = ['S', 'D', 'F', 'J', 'K', 'L'];
let hitZoneY;
let combo = 0
let vanishingOffset = 0.25;
let topY = 50;
let missEffects = [];  // 存储所有正在播放的Miss动画

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  // 根据屏幕高度动态调整重力参数
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
  drawMissEffects(); // 绘制动画效果
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  hitZoneY = height - 100;
  gravity = height / 1500;
}

function checkHit(trackIsPressed){
  if (currentY > hitZoneY+20 && currentY < hitZoneY-20){
    if (trackIsPressed === currentTrack){
      return 'hit'
  }
  return 'miss'
}

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

function getTotalWidthAtY(yPos) {
  let t = map(yPos, topY, height, 0, 1);
  let topTotalW = width * vanishingOffset;
  let bottomTotalW = width;
  return lerp(topTotalW, bottomTotalW, t);
}

function getTrackCenterX(trackIndex, yPos) {
  let totalW = getTotalWidthAtY(yPos);
  let singleLaneW = totalW / tracks;
  let startX = width / 2 - totalW / 2;
  return startX + (trackIndex + 0.5) * singleLaneW;
}

function updateAndDrawBlock() {
  // 物理运动计算：速度增加，位置改变
  velocity += gravity;
  y += velocity;

  if (y > height) {
    triggerMiss(currentTrack); // 触发动画
    resetBlock();
  } else {
    drawSingleBlock(currentTrack, y);
  }
}

function resetBlock() {
  currentTrack = int(random(0, tracks));
  y = topY;
  velocity = height / 300; // 给一个初始的微小速度，避免静止太久
}

// 触发Miss动画，将新的动画对象加入数组
function triggerMiss(trackIdx) {
  let startX = getTrackCenterX(trackIdx, height - 50);
  missEffects.push({
    x: startX,
    y: height - 50,
    alpha: 255,    // 透明度初始值
    life: 60       // 动画持续帧数
  });
}

// 遍历并绘制所有Miss动画
function drawMissEffects() {
  for (let i = missEffects.length - 1; i >= 0; i--) {
    let effect = missEffects[i];
    
    // 动画逻辑：向上飘，透明度降低
    effect.y -= 1.5; 
    effect.alpha -= 4; 

    fill(255, 80, 80, effect.alpha);
    textAlign(CENTER, CENTER);
    textSize(32);
    textStyle(BOLD);
    text("MISS", effect.x, effect.y);
    textStyle(NORMAL); // 还原样式

    // 如果完全透明了，从数组中移除
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

    if (i % 2 == 0) fill(50, 60, 80);
    else fill(40, 50, 70);

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
