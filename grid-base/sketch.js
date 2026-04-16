// 2D Grid Minesweeper
// Zichen Zhang
// 3/24/2026
//
// Extra for Experts:
// functions to sovle strings and interpret them as commands.

const BLOCK_SIZE = 40;
const UNEXPOSED = 1;
const EXPOSED = 0;
const BOMB = true;
const READABLE_CHARS = "qwertyuiopasdfghjklzxcvbnm1234567890";

let cols = 5;
let rows = 5;
let totalBombs = 10;
let currentBombCount = 0;
let bombsLeft = totalBombs;

let startX;
let startY;

let downGrid = [];
let upGrid = [];
let bombs = [];
let flags = [];
let flagImg;
let bombImg;
let instruction = [];

let firstClick = true;
let gameSituation = "playing";

// Loads image assets before the game starts.
function preload() {
  flagImg = loadImage("assets/flag.png");
  bombImg = loadImage("assets/bomb.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(100);
  // Prevents the right-click context menu from appearing when placing flags.
  document.addEventListener("contextmenu", event => event.preventDefault());

  resetGame();
}


function draw() {
  background(220);
  drawBoard();
  gameSituationSolving();
  textBackground();
}

// Draws the full board at its centered screen position.
function drawBoard() {
  push();
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

// Displays the instruction text and current game information.
function textBackground() {
  textSize(20);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  fill(0);
  text("Press 'R' to reset the game", 10, 10);
  text("Press 'Enter' to type a command", 10, 40);
  text(`Rows: ${rows}  Cols: ${cols}  Bombs: ${currentBombCount}  Bombs left: ${bombsLeft}`, 10, 70);
}

// Creates the top grid that tracks which cells are still covered.
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

// Creates the bottom grid that stores bombs and numbers.
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

// Creates the grid that tracks which cells have flags.
function createFlag() {
  flags = [];

  for (let y = 0; y < rows; y++) {
    flags[y] = [];
    for (let x = 0; x < cols; x++) {
      flags[y][x] = false;
    }
  }
}

// Draws a flag image on every flagged cell.
function displayFlag() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (flags[y][x]) {
        image(flagImg, x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }
}

// Draws the covered blocks that the player has not opened yet.
function displayUpGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (upGrid[y][x] === UNEXPOSED) {
        singleBlock(x, y);
      }
    }
  }
}

// Draws the grid lines over the board.
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

// Randomly places bombs while keeping the first clicked area safe.
function placeBombs(safeX, safeY) {
  let safeCellCount = 0;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (isInSafeZone(x, y, safeX, safeY)) {
        safeCellCount++;
      }
    }
  }

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

// Checks whether a cell is inside the safe zone around the first click.
function isInSafeZone(x, y, safeX, safeY) {
  return abs(x - safeX) <= 1 && abs(y - safeY) <= 1;
}

// Draws one covered Minesweeper block with a beveled style.
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

// Draws the bottom layer, including bombs and number clues.
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

// Calculates and stores the number clue for every non-bomb cell.
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

// Checks the current game state and shows the correct end screen.
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
    text("You Win!", width / 2, height / 2);
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

// Returns true when all safe cells have been exposed.
function checkWin() {
  let exposedSafeBlocks = 0;
  let totalSafeBlocks = cols * rows - currentBombCount;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (!bombs[y][x] && upGrid[y][x] === EXPOSED) {
        exposedSafeBlocks++;
      }
    }
  }

  return exposedSafeBlocks === totalSafeBlocks;
}

// Counts how many bombs are in the eight neighboring cells.
function countNeighborBombs(x, y) {
  let count = 0;

  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      let newX = x + i;
      let newY = y + j;

      if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
        if (bombs[newY][newX]) {
          count++;
        }
      }
    }
  }

  return count;
}

// Handles left click to reveal cells and right click to place flags.
function mousePressed() {
  if (gameSituation !== "playing") {
    return;
  }

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

// Recursively opens nearby cells when the player clicks an empty cell.
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

// Handles keyboard controls for reset and typed command mode.
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

    if (key === "Enter") {
      runTypedCommand(instruction.join(""));
    }
  }
}

// Interprets typed commands and applies game setting changes.
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

  instruction = [];
  gameSituation = "playing";
}

// Resets all game data and starts a fresh board.
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
  startX = width / 2 - cols * BLOCK_SIZE / 2;
  startY = height / 2 - rows * BLOCK_SIZE / 2;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateBoardPosition();
}
