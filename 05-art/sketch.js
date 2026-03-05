// Generative art demo

let theTiles = [];
const THE_SIZE = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
 
}

function draw() {
  background(220);
  for (let x = THE_SIZE/2; x <= width; x += THE_SIZE) {
    for (let y = THE_SIZE/2; y <= height; y += THE_SIZE) {
      let someTiles = spawnTile(x, y, THE_SIZE);
      theTiles.push(someTiles);
    }
  }
  for (let tile of theTiles) {
    line(tile.x1, tile.y1, tile.x2, tile.y2);
  }
  theTiles = [];
}

function spawnTile(x, y, tileSize) {
  let choice = random(100);
  let tile;
  if (choice < 50) {
    tile = {
      x1: x - tileSize/2,
      y2: y - tileSize/2,
      x2: x + tileSize/2,
      y1: y + tileSize/2
    };
  }
  else {
    tile = {
      x1: x - tileSize/2,
      y1: y - tileSize/2,
      x2: x + tileSize/2,
      y2: y + tileSize/2
    };
    
  }
  return tile;
}