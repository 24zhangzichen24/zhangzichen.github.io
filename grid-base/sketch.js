// 2D Grid Minesweeper
// Zichen Zhang
// 3/24/2026
//
// Extra for Experts:
// Ask the user for the number of rows, columns, and bombs.

const BLOCK_SIZE = 40;
<<<<<<< HEAD
const UNEXPOSED = 0;
const EXPOSED = 1;
const bomb = true;


let cols;
let rows;
let bombsNums = 10;
=======
const UNEXPOSED = 1;
const EXPOSED = 0;
const BOMB = true;
const READABLE_CHARS = "qwertyuiopasdfghjklzxcvbnm1234567890";

let cols = 5;
let rows = 5;
let totalBombs = 10;
let currentBombCount = 0;
let bombsLeft = totalBombs;

>>>>>>> 53dd351201a4be1f14ac28b03d8d6838b1a5a1f3
let startX;
let startY;

let downGrid = []; // Stores bombs and numbers underneath
let upGrid = [];   // Stores whether a block is still covered
let bombs = [];    // Stores bomb positions only
let flags = [];
let flagImg;
let bombImg;


let firstClick = true;
let gameSituation = "playing";

let instruction = [];
const readableChars = "qwertyuiopasdfghjklzxcvbnm1234567890";
const instructionisRows = instruction[0] === "r"&& 
                        instruction[1] === "o"&&
                        instruction[2] === "w"&&
                        instruction[3] === "s";
const instructionisCols = instruction[0] === "c"&&
                        instruction[1] === "o"&&
                        instruction[2] === "l"&&
                        instruction[3] === "s";
const instructionisBombs = instruction[0] === "b"&&
                        instruction[1] === "o"&&
                        instruction[2] === "m"&&
                        instruction[3] === "b"&&
                        instruction[4] === "s";
const instructionisEasy = instruction.join('') === "easy";
const instructionisMedium = instruction.join('') === "medium";
const instructionisHard = instruction.join('') === "hard";
                        

function preload() {
  flagImg = loadImage("assets/flag.png");
  bombImg = loadImage("assets/bomb.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(100);

<<<<<<< HEAD
  cols = 10;
  rows = 10;
  startX = width / 2 - cols * BLOCK_SIZE / 2;
  startY = height / 2 - rows * BLOCK_SIZE / 2;
=======
  // Disable the browser right-click menu so right click can be used for flags.
  document.addEventListener("contextmenu", event => event.preventDefault());
>>>>>>> 53dd351201a4be1f14ac28b03d8d6838b1a5a1f3

  resetGame();
}

function draw() {
  background(220);
  drawBoard();
  gameSituationSolving();
  textBackground();
}

function drawBoard() {
  push();
  // Move the whole board so it stays centered on the screen.
  translate(startX, startY);
  setBackground();
  displayDownGrid();
  displayUpGrid();
  displayFlag();
  setCrossLines();
  pop();
}

function setBackground() {
  fill(170);
  rect(0, 0, cols * BLOCK_SIZE, rows * BLOCK_SIZE);
}

<<<<<<< HEAD
function textBackground(){
  push();
  fill(255, 255, 255, 200);
  rect(-startX, -startY, width, 100);
=======
function textBackground() {
>>>>>>> 53dd351201a4be1f14ac28b03d8d6838b1a5a1f3
  textSize(20);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  fill(0);
<<<<<<< HEAD
  text("Press 'R' to reset the game", -10,-10);
  text("Press 'Enter' to type something", 10, 70);
  pop();
=======
  text("Press 'R' to reset the game", 10, 10);
  text("Press 'Enter' to type a command", 10, 40);
  text(`Rows: ${rows}  Cols: ${cols}  Bombs: ${currentBombCount}  Bombs left: ${bombsLeft}`, 10, 70);
>>>>>>> 53dd351201a4be1f14ac28b03d8d6838b1a5a1f3
}

function createUpGrid() {
  upGrid = [];
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      row.push(UNEXPOSED);
    }
    upGrid.push(row);
  }
}

function createDownGrid() {
  downGrid = [];
  bombs = [];

  for (let y = 0; y < rows; y++) {
    let row = [];
    let bombRow = [];
    for (let x = 0; x < cols; x++) {
      row.push(0);
      bombRow.push(false);
    }
    downGrid.push(row);
    bombs.push(bombRow);
  }
}

function createFlag() {
  flags = [];
  for (let y = 0; y < rows; y++) {
    flags[y] = [];
    for (let x = 0; x < cols; x++) {
      flags[y][x] = false;
    }
  }
}

function displayFlag() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (flags[y][x]) {
        image(flagImg, x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }
}

function displayUpGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (upGrid[y][x] === UNEXPOSED) {
        singleBlock(x, y);
      }
    }
  }
}

function setCrossLines() {
  strokeWeight(2);
  stroke(20);

  for (let x = 0; x <= cols; x++) {
    line(x * BLOCK_SIZE, 0, x * BLOCK_SIZE, rows * BLOCK_SIZE);
  }

  for (let y = 0; y <= rows; y++) {
    line(0, y * BLOCK_SIZE, cols * BLOCK_SIZE, y * BLOCK_SIZE);
  }
}

function placeBombs(safeX, safeY) {
  let safeCellCount = 0;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (isInSafeZone(x, y, safeX, safeY)) {
        safeCellCount++;
      }
    }
  }

  // The board cannot hold more bombs than the number of non-safe cells.
  currentBombCount = min(totalBombs, cols * rows - safeCellCount);
  bombsLeft = currentBombCount;

  let placed = 0;
  while (placed < currentBombCount) {
    let x = floor(random(cols));
    let y = floor(random(rows));

    if (bombs[y][x] || isInSafeZone(x, y, safeX, safeY)) {
      continue;
    }

    bombs[y][x] = true;
    downGrid[y][x] = BOMB;
    placed++;
  }
}

function isInSafeZone(x, y, safeX, safeY) {
  // Keep the first clicked cell and its surrounding 3x3 area safe.
  return abs(x - safeX) <= 1 && abs(y - safeY) <= 1;
}

function singleBlock(x, y) {
  noStroke();
  fill(190);
  square(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE);

  fill(255);
  rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 5, BLOCK_SIZE);
  rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, 5);

  fill(100);
  rect(x * BLOCK_SIZE + BLOCK_SIZE - 5, y * BLOCK_SIZE, 5, BLOCK_SIZE);
  rect(x * BLOCK_SIZE, y * BLOCK_SIZE + BLOCK_SIZE - 5, BLOCK_SIZE, 5);

  fill(255);
  triangle(
    x * BLOCK_SIZE,
    (y + 1) * BLOCK_SIZE - 5,
    x * BLOCK_SIZE,
    (y + 1) * BLOCK_SIZE,
    x * BLOCK_SIZE + 5,
    (y + 1) * BLOCK_SIZE - 5
  );
  triangle(
    (x + 1) * BLOCK_SIZE - 5,
    y * BLOCK_SIZE + 5,
    (x + 1) * BLOCK_SIZE - 5,
    y * BLOCK_SIZE,
    (x + 1) * BLOCK_SIZE,
    y * BLOCK_SIZE
  );
}

function displayDownGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (downGrid[y][x] === BOMB) {
        image(bombImg, x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
      else if (downGrid[y][x] !== "") {
        fill(downGrid[y][x] % 3 * 200, downGrid[y][x] % 2 * 250, downGrid[y][x] % 5 * 100);
        textSize(30);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text(downGrid[y][x], x * BLOCK_SIZE + BLOCK_SIZE / 2, y * BLOCK_SIZE + BLOCK_SIZE / 2);
      }
    }
  }
}

function setNumber() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (downGrid[y][x] !== BOMB) {
        let numBombs = countNeighborBombs(x, y);
        downGrid[y][x] = numBombs === 0 ? "" : numBombs;
      }
    }
  }
}

function gameSituationSolving() {
  if (gameSituation === "playing" && checkWin()) {
    gameSituation = "won";
  }

  if (gameSituation === "won") {
    fill(0, 255, 0, 150);
    rect(0, 0, width, height);
    fill(0);
    textSize(50);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
<<<<<<< HEAD
    text("You Win!", width / 2 - startX, height / 2 - startY);
    victoryFireworks_3D();
=======
    text("You Win!", width / 2, height / 2);
>>>>>>> 53dd351201a4be1f14ac28b03d8d6838b1a5a1f3
  }
  else if (gameSituation === "lost") {
    fill(255, 0, 0, 150);
    rect(0, 0, width, height);
    fill(0);
    textSize(50);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("Game Over!", width / 2, height / 2);
  }
  else if (gameSituation === "typed") {
    fill(0, 0, 255, 150);
    rect(0, 0, width, height);
    fill(255);
    textSize(40);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("Typed command mode", width / 2, height / 2 - 30);
    text(instruction.join(""), width / 2, height / 2 + 30);
  }
}

function checkWin() {
  let exposedSafeBlocks = 0;
  let totalSafeBlocks = cols * rows - currentBombCount;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // Winning means every non-bomb block has been opened.
      if (!bombs[y][x] && upGrid[y][x] === EXPOSED) {
        exposedSafeBlocks++;
      }
    }
  }

  return exposedSafeBlocks === totalSafeBlocks;
}

function countNeighborBombs(x, y) {
  let count = 0;

  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      let newX = x + i;
      let newY = y + j;

      // Only count neighbors that stay inside the board.
      if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
        if (bombs[newY][newX]) {
          count++;
        }
      }
    }
  }

  return count;
}

function mousePressed() {
  if (gameSituation !== "playing") {
    return;
  }

  // Convert mouse position on the screen into grid coordinates.
  let x = floor((mouseX - startX) / BLOCK_SIZE);
  let y = floor((mouseY - startY) / BLOCK_SIZE);

  if (x < 0 || x >= cols || y < 0 || y >= rows) {
    return;
  }

  if (mouseButton === LEFT) {
    if (flags[y][x]) {
      return;
    }

    if (firstClick) {
      createDownGrid();
      placeBombs(x, y);
      setNumber();
      firstClick = false;
    }

    upGrid[y][x] = EXPOSED;

    if (downGrid[y][x] === BOMB) {
      gameSituation = "lost";
      return;
    }

    clearBeside(x, y);
  }

  if (mouseButton === RIGHT) {
    if (upGrid[y][x] === UNEXPOSED) {
      flags[y][x] = !flags[y][x];

      if (bombs[y][x]) {
        bombsLeft += flags[y][x] ? -1 : 1;
      }
    }
  }
}

function clearBeside(x, y) {
  if (downGrid[y][x] !== "") {
    return;
  }

  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      let newX = x + i;
      let newY = y + j;

      if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
        if (upGrid[newY][newX] === UNEXPOSED && !flags[newY][newX]) {
          upGrid[newY][newX] = EXPOSED;
          clearBeside(newX, newY);
        }
      }
    }
  }
}

function keyPressed() {
  if ((key === "r" || key === "R") && gameSituation !== "typed") {
    resetGame();
    return;
  }

  if (key === "Enter" && gameSituation !== "typed") {
    gameSituation = "typed";
    instruction = [];
    return;
  }

  if (gameSituation === "typed") {
    if (READABLE_CHARS.includes(key.toLowerCase())) {
      instruction.push(key.toLowerCase());
    }

    if (key === "Backspace") {
      instruction.pop();
    }
<<<<<<< HEAD
    if (key === 'Enter'&& instruction.length > 0) {
      console.log(instruction.join(''));
      if (instruction.join('') === "reset") {
        resetGame();
        instruction = [];
        gameSituation = "playing";
      }

      else if (instructionisEasy) {
        rows = 10;
        cols = 10;
        bombsNums = 20;
        console.log(instructionisEasy);
        resetGame();
        
      }
      else if (instructionisMedium) {
        rows = 15;
        cols = 15;
        bombsNums = 40;
        resetGame();
      }
      else if (instructionisHard) {
        rows = 20;
        cols = 20;
        bombsNums = 80;
        resetGame();
      }
      
=======

    if (key === "Enter") {
      runTypedCommand(instruction.join(""));
>>>>>>> 53dd351201a4be1f14ac28b03d8d6838b1a5a1f3
    }
  }
}

<<<<<<< HEAD
function victoryFireworks_3D() {
  push();
  translate(width / 2 - startX, height / 2 - startY); 
  for (let i = 0; i < 100; i++) {
    let angle = random(TWO_PI);
    let radius = random(50, 150);
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;
    fill(random(255), random(255), random(255));
    ellipse(x, y, 10, 10);
  }
  pop();
}

function resetGame() {
  startX = width / 2 - cols * BLOCK_SIZE / 2;
  startY = height / 2 - rows * BLOCK_SIZE / 2;
  downGrid = [];
  upGrid = [];
  createUpGrid();
  createdownGrid();
  createFlag();
  bombsNums = 10;
  firstClick = true;
=======
function runTypedCommand(command) {
  if (command === "reset") {
    resetGame();
    return;
  }

  if (command.startsWith("rows")) {
    let value = Number(command.slice(4));
    if (!Number.isNaN(value) && value > 0) {
      rows = value;
      resetGame();
      return;
    }
  }

  if (command.startsWith("cols")) {
    let value = Number(command.slice(4));
    if (!Number.isNaN(value) && value > 0) {
      cols = value;
      resetGame();
      return;
    }
  }

  if (command.startsWith("bombs")) {
    let value = Number(command.slice(5));
    if (!Number.isNaN(value) && value >= 0) {
      totalBombs = value;
      resetGame();
      return;
    }
  }

>>>>>>> 53dd351201a4be1f14ac28b03d8d6838b1a5a1f3
  instruction = [];
  gameSituation = "playing";
}

function resetGame() {
  updateBoardPosition();
  createUpGrid();
  createDownGrid();
  createFlag();
  firstClick = true;
  currentBombCount = 0;
  bombsLeft = totalBombs;
  instruction = [];
  gameSituation = "playing";
}

function updateBoardPosition() {
  // Center the board: half of canvas width minus half of board width.
  startX = width / 2 - cols * BLOCK_SIZE / 2;
  startY = height / 2 - rows * BLOCK_SIZE / 2;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateBoardPosition();
}
