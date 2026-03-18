// 2D Grid Demo
// learning 2d arrays

let grid = [[1,0,1,1,1],
            [1,0,1,0,0],
            [1,1,1,1,1],
            [0,0,1,0,1],
            [1,1,1,0,1],
            [0,0,0,0,0]];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(220);
  showgrid();
}

function showgrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 1) {
        fill(0);
      } 
      else {
        fill(255);
      }
      rect(x * width / grid[0].length, y * height / grid.length, width / grid[0].length, height / grid.length);
    }
  }
}

function mousePressed() {
  let x = floor(mouseX / (width / grid[0].length));
  let y = floor(mouseY / (height / grid.length));
  if (grid[y][x] === 1) {
    grid[y][x] = 0;
  }
  else {
    grid[y][x] = 1;
  }
}