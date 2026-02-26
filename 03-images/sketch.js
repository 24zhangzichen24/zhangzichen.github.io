// Image Demo

let imageView;

function preload(){
  imageView = loadImage("image.webp");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  image(imageView,mouseX,mouseY,100,100);
}
