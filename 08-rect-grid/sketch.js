// 2d rectangle grid demo
//  life game


const CELL_SIZE = 2;
let cols;
let rows;
let grid = [];
let autoPlay = false;
const RENDER_ON_FEAME = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / CELL_SIZE);
  rows = floor(height / CELL_SIZE);
  grid = createRandomGrid(cols, rows);
  noStroke();
}

function draw() {
  background(220);
  displayGrid();
  if (autoPlay && frameCount % RENDER_ON_FEAME === 0) {
    liveOrDie();
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 1) {
        fill(0);
      }
      else {
        fill(255);
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function liveOrDie() {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      let neighbors = countNeighbors(x, y);
      if (grid[y][x] === 1) {
        if (neighbors === 2 || neighbors === 3) {
          newGrid[y][x] = 1;
        }
        else {
          newGrid[y][x] = 0;
        }
      }
      else {
        if (neighbors === 3) {
          newGrid[y][x] = 1;
        }
        else {
          newGrid[y][x] = 0;
        }
      }
    }
  }
  grid = newGrid;
}

function countNeighbors(x, y) {
  let count = 0;
  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      if (i === 0 && j === 0) {
        continue;
      }
      if (x + i < 0 || x + i >= cols || y + j < 0 || y + j >= rows) {
        continue;
      }
      let _col = x + i;
      let _row = y + j;
      count += grid[_row][_col];
    } 
  }
  return count;
}


function createRandomGrid(cols, rows) {
  let newgrid = [];
  for (let y = 0; y < rows; y++) {
    newgrid.push([]);
    for (let x = 0; x < cols; x++) {
      newgrid[y][x] = random(0, 1) >= 0.5 ? 1 : 0;
    }
  }
  return newgrid;
}

function keyPressed() {
  if (key === 'r') {
    grid = createRandomGrid(cols, rows);
  }
  if (key === ' ') {
    autoPlay = !autoPlay; 
  }
}

function takeTurn() {
  let nextTurn = generateEmptyGrid(cols, rows);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
    }
  }
  return nextTurn;
}

function mousePressed() {
  let x = floor(mouseX / CELL_SIZE);
  let y = floor(mouseY / CELL_SIZE);  
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    grid[y][x] = grid[y][x] === 1 ? 0 : 1;
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cols = floor(width / CELL_SIZE);
  rows = floor(height / CELL_SIZE);
}

