// 2D Grid Minesweeper
// Zichen Zhang
// 3/24/2026
//
// Extra for Experts:
// ask the user for the number of rows and columns and number of bombs

const BLOCK_SIZE = 40;
let cols;
let rows;
let grid = [];
let flagImg;
let bombImg;

function preload() {
  flagImg = loadImage("assets/flag.png");
  bombImg = loadImage("assets/bomb.png");
}

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  stroke(100);
  cols = 8;
  rows = 8;
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid() {
  let startX = width / 2 - (cols * BLOCK_SIZE) / 2;
  let startY = height / 2 - (rows * BLOCK_SIZE) / 2;
  translate(startX, startY);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      singleBlock(x, y);
    }
  }
}



function singleBlock(x, y) {
  noStroke();
  fill(190);
  square(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE);

  fill(255);
  rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 5, BLOCK_SIZE);
  rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE,5);
  
  fill(100);
  rect(x * BLOCK_SIZE + BLOCK_SIZE - 5, y * BLOCK_SIZE, 5, BLOCK_SIZE);
  rect(x * BLOCK_SIZE, y * BLOCK_SIZE + BLOCK_SIZE - 5, BLOCK_SIZE, 5);
 
  fill(255);
  triangle(x * BLOCK_SIZE , (y+1) * BLOCK_SIZE-5, x * BLOCK_SIZE, (y+1) * BLOCK_SIZE , x * BLOCK_SIZE + 5, (y+1) * BLOCK_SIZE-5);
  triangle((x+1) * BLOCK_SIZE-5, y * BLOCK_SIZE+5, (x+1) * BLOCK_SIZE - 5, y * BLOCK_SIZE, (x+1) * BLOCK_SIZE, y * BLOCK_SIZE );
}