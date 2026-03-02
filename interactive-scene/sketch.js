// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let y = 0;
let x
let singleBlockWidth
let singleBlockHeight
let speed;
let drop;
let strenth

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke()
  speed = height/60;  
  x=random(200,width-200)
  strenth= 1
}


function draw() {
  background(255);
  dropping()
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
    x =random(200,width-200)  
    y=0  
    strenth= 1
  }
}


function singleBlock() {
  y+=speed;
  fill('#5d8aa8');
  // rect(x,y,200,100,20,20);
  // quad(x*-strenth,y*strenth,(x+200)*strenth,y*strenth,
  //      (x+200)*-strenth,(y+100)*strenth,x*strenth,(y+100)*strenth);
  quad(x+(x-(x*strenth)),y,(x+200),y,(x+250),(y+100),(x-50)+(x-(x*strenth)),(y+100));
  

  describe('create basic single block');
}


// Startup page
function mousePressed() {
  let fs = fullscreen();
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {   
    fullscreen(!fs);
  }
}