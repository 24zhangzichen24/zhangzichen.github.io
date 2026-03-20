// 2D Grid Demo
// learning 2d arrays

// let grid = [[1,0,1,1,1,0],
//             [1,0,1,0,0,0],
//             [1,1,1,1,1,0],
//             [0,0,1,0,1,0],
//             [1,1,1,0,1,0],
//             [0,0,0,0,0,0]];

let theGrid;
const GRIDSIZE = 10000;
let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  if (width < height) {
    cellSize = width / GRIDSIZE;
  }
  else {    
    cellSize = height / GRIDSIZE;
  }
  theGrid = randomizeGrid(GRIDSIZE, GRIDSIZE);
}

function draw() {
  background(220);
  showgrid();
}

function showgrid() {
  for (let y = 0; y < theGrid.length; y++) {
    for (let x = 0; x < theGrid[y].length; x++) {
      if (theGrid[y][x] === 1) {
        fill(0);
      } 
      else {
        fill(255);
      }
      rect(x * width / theGrid[0].length, y * height / theGrid.length, width / theGrid[0].length, height / theGrid.length);
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX / (width / theGrid[0].length));
  let y = Math.floor(mouseY / (height / theGrid.length));
  if (theGrid[y][x] === 1) {
    theGrid[y][x] = 0;
  }
  else {
    theGrid[y][x] = 1;
  }
}

function randomizeGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid[y] = [];
    for (let x = 0; x < cols; x++) {
      if (Math.random() < 0.5) {
        newGrid[y][x] = 1;
      }
      else {
        newGrid[y][x] = 0;
      }
    }
  }
  return newGrid;
}