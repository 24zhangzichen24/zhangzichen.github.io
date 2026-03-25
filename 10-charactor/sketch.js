const CELL_SIZE = 50;
const IMPASSABLE = 0;
const PASSABLE = 1;
const PLAYER = 24;
let cols;
let rows;
let grid = [];
let thePlayer = {
  x: 0,
  y: 0,
};




function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / CELL_SIZE);
  rows = floor(height / CELL_SIZE);
  grid = createRandomGrid(cols, rows);
  grid[thePlayer.y][thePlayer.x] = PLAYER;
  noStroke();
}

function draw() {
  background(220);
  displayGrid();

}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === PASSABLE) {
        fill(255);
      }
      else if (grid[y][x] === IMPASSABLE) {
        fill(100);
      }
      else if (grid[y][x] === PLAYER) {
        fill(255, 0, 0);
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
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
  // r to reset the grid
  if (key === 'r' || key === 'R') {
    grid = createRandomGrid(cols, rows);
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }

  // w, a, s, d moving the player
  let newX = thePlayer.x;
  let newY = thePlayer.y;
  if (key === 'w') {
    newY--;
  }
  else if (key === 's') {
    newY++;
  }
  else if (key === 'a') {
    newX--;
  }
  else if (key === 'd') {
    newX++;
  }
  if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
    if (grid[newY][newX] === PASSABLE) {
      grid[thePlayer.y][thePlayer.x] = PASSABLE;
      thePlayer.x = newX;
      thePlayer.y = newY;
      grid[thePlayer.y][thePlayer.x] = PLAYER;
    }
  }
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
