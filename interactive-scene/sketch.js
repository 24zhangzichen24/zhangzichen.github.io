// Hit block
// Zichen Zhang
// 3/2/2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Game Configuration
let y = 0;
let x
let blockWidth
let blockHeight
let speed;
let drop;
let strenth
let tracks = 6;
let keys = ['S', 'D', 'F', 'J', 'K', 'L'];
let hitZoneY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke()
  speed = height/60;  
  hitZoneY = height - 100;
  x=0
  strenth= 1
}


function draw() {
  background(40);
  dropping()
  drawTracks()
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



function dropping(){
  drop = (y < height)
  if (drop){
    strenth *= 1.004
    singleBlock();
  }
  else{
    x =width/6 * int(random(0,5)) 
    y=0  
    strenth= 1
  }
}


function singleBlock() {
  y+=speed;
  fill('#5d8aa8');
  rect(x,y,width/6,width/18,20,20);
  // quad(x*-strenth,y*strenth,(x+200)*strenth,y*strenth,
  //      (x+200)*-strenth,(y+100)*strenth,x*strenth,(y+100)*strenth);
  // quad(x+(x-(x*strenth)),y,(x+200),y,(x+250),(y+100),(x-50)+(x-(x*strenth)),(y+100));
  

  describe('create basic single block');
}

// Function to draw the 6 lanes and hit line
function drawTracks() {
  let laneWidth = width / tracks;
  
  // Draw Lane Dividers
  stroke(100);
  strokeWeight(2);
  for (let i = 1; i < tracks; i++) {
    line(i * laneWidth, 0, i * laneWidth, height);
  }
  
  // Draw Hit Zone
  stroke(255, 0, 0);
  strokeWeight(5);
  line(0, hitZoneY, width, hitZoneY);
  noStroke();
  
  // Write Keys Label
  fill(255, 100);
  textAlign(CENTER, CENTER);
  textSize(32);
  for (let i = 0; i < tracks; i++) {
    text(keys[i], (i * laneWidth) + (laneWidth / 2), hitZoneY + 40);
  }
}

// Startup Page
function mousePressed() {
  let fs = fullscreen();
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {   
    fullscreen(!fs);
  }
}