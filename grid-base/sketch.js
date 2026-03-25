// 2D Grid Minesweeper
// Zichen Zhang
// 3/24/2026
//
// Extra for Experts:
// ask the user for the number of rows and columns and number of bombs

const BLOCK_SIZE = 40;
const UNEXPOSED = 0;
const EXPOSED = 1;
const bomb = 'bomb';
let cols;
let rows;
let startX;
let startY;

let downGrid = [];//the grid with bombs and numbers
let upGrid = [];//grids for the exposed blocks  
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
  startX = width / 2 - cols * BLOCK_SIZE / 2;
  startY = height / 2 - rows * BLOCK_SIZE / 2;

  createUpGrid();
  createdownGrid();
  setbombs(10);
}

function draw() {
  background(220);
  setnumber();
  displayDownGrid();
  // displayUpGrid();
}

function createUpGrid() {
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      row.push(1);
    }
    upGrid.push(row);
  }
}

function createdownGrid() {
  // empty grid 
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      row.push(0);
    }
    downGrid.push(row);
  }
  setbombs(10);
  setnumber();
}


function displayUpGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (upGrid[y][x] === 1) {
        singleBlock(x, y);
      }
    }
  }
}

function setbombs(numBombs) {
  for (let i = 0; i < numBombs; i++) {
    let x = floor(random(cols));
    let y = floor(random(rows));
    downGrid[y][x] = bomb;
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

function displayDownGrid() {
  translate(startX, startY);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (downGrid[y][x] === bomb) {
        image(bombImg, x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
      else {
        fill(255);
        textSize(20);
        textAlign(CENTER, CENTER);
        text(downGrid[y][x], x * BLOCK_SIZE + BLOCK_SIZE / 2, y * BLOCK_SIZE + BLOCK_SIZE / 2);
      }
    }
  }
}

function setnumber() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (downGrid[y][x] !== bomb) {
        let numBombs = countNeighborBombs(x, y);
        downGrid[y][x] = numBombs;
      }
    }
  }
}

function countNeighborBombs(x, y) {
  let count = 0;
  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      let newX = x + i;
      let newY = y + j;
      if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
        if (downGrid[newY][newX] === bomb) {
          count++;
        }
      }
    } 
  }
  return count;
}

function mousePressed() {
  let x = floor((mouseX - startX) / BLOCK_SIZE);
  let y = floor((mouseY - startY) / BLOCK_SIZE);
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    upGrid[y][x] = 0;
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    downGrid = [];
    upGrid = [];
    createUpGrid();
    createdownGrid();
  }

  if (key === 'b' || key === 'B') {
    downGrid[floor((mouseY - startY) / BLOCK_SIZE)][floor((mouseX - startX) / BLOCK_SIZE)] = bomb;
  }
}