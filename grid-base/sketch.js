// 2D Grid Minesweeper
// Zichen Zhang
// 3/24/2026
//
// Extra for Experts:
// ask the user for the number of rows and columns and number of bombs

const BLOCK_SIZE = 40;
const UNEXPOSED = 0;
const EXPOSED = 1;
const bomb = true;


let cols;
let rows;
let bombsNums = 10;
let startX;
let startY;

let downGrid = [];//the grid with bombs and numbers
let upGrid = [];//grids for the exposed blocks  
let bombs = [];
let flags = [];
let flagImg;
let bombImg;


let firstClick = true;
let numsOfExposedBombs = 0;
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
  // I found this in other people's code
  document.addEventListener('contextmenu', event => event.preventDefault());

  cols = 10;
  rows = 10;
  startX = width / 2 - cols * BLOCK_SIZE / 2;
  startY = height / 2 - rows * BLOCK_SIZE / 2;

  // I remove the create grid part after first click
  createUpGrid();
  createdownGrid();
  createFlag();
}

function draw() {
  background(220);
  displayDownGrid();
  displayUpGrid();
  displayFlag();
  setCrossLines();
  gameSituationSovling();
  textBackground();

}

function setBackground(){
  fill(170);
  rect(0,0,cols * BLOCK_SIZE,rows * BLOCK_SIZE);
}

function textBackground(){
  push();
  fill(255, 255, 255, 200);
  rect(-startX, -startY, width, 100);
  textSize(20);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  fill(0);
  text("Press 'R' to reset the game", -10,-10);
  text("Press 'Enter' to type something", 10, 70);
  pop();
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
  setbombs(bombsNums);
  setnumber();
}

function createFlag(){
  for (let y = 0; y < rows; y++) {
    flags[y]=[];
    for (let x = 0; x < cols; x++) {
      flags[y][x] = false;
    }
  }
}

function displayFlag() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (flags[y][x]){
        image(flagImg, x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }
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

function setCrossLines() {
  strokeWeight(5);
  for (let y = 0; y < rows+1; y++) {
    for (let x = 0; x < cols+1; x++) {
      fill(20);
      line(x * BLOCK_SIZE, 0, x * BLOCK_SIZE, rows * BLOCK_SIZE);
      line(0, y * BLOCK_SIZE, cols * BLOCK_SIZE, y * BLOCK_SIZE);
    }
  }

}

function setbombs(numBombs) {
  for (let y = 0; y < rows; y++) {
    bombs[y]=[];
    for (let x = 0; x < cols; x++) {
      bombs[y][x] = false;
    }
  }
  for (let i = 0; i < numBombs; i++) {
    let x = floor(random(cols));
    let y = floor(random(rows));
    if (bombs[y][x] === true){
      i--;
      continue;
    }
    downGrid[y][x] = bomb;
    bombs[y][x] = true;

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
  setBackground();
  setCrossLines();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (downGrid[y][x] === bomb) {
        image(bombImg, x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
      else {
        fill(downGrid[y][x]%3 *200,downGrid[y][x]%2 *250,downGrid[y][x]%5 *100);
        textSize(30);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text(downGrid[y][x], x * BLOCK_SIZE + BLOCK_SIZE / 2, y * BLOCK_SIZE + BLOCK_SIZE / 2);
      }
    }
  }
}

function setnumber() {
  let numBombs;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (downGrid[y][x] !== bomb) {
        numBombs = countNeighborBombs(x, y);
        downGrid[y][x] = numBombs;
      }
      if (numBombs === 0) {
        downGrid[y][x] = '';
      }
    }
  }
}

function gameSituationSovling() {
  
  if (bombsNums === 0) {
    gameSituation = "won";
  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (upGrid[y][x] === 0 && downGrid[y][x] === bomb) {
        gameSituation = "lost";
      } 
    }
  }

  if (gameSituation === "won") {
    fill(0, 255, 0, 150);
    rect(-startX, -startY, width, height);
    fill(0);
    textSize(50);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("You Win!", width / 2 - startX, height / 2 - startY);
    victoryFireworks_3D();
  }

  else if (gameSituation === "lost") {
    fill(255, 0, 0, 150);
    rect(-startX, -startY, width, height);
    fill(0);
    textSize(50);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("Game Over!", width / 2 - startX, height / 2 - startY);
  }

  else if (gameSituation === "typed") {
    fill(0, 0, 255, 150);
    rect(-startX, -startY, width, height);
    fill(255);
    textSize(50);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("You typed Enter!", width / 2 - startX, height / 2 - startY);
    text(instruction.join(''), width / 2 - startX, height / 2 - startY + 60);
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
    if (mouseButton === LEFT) {
      if (flags[y][x]!==true){
        if (firstClick){
          for (let j = -1; j <= 1; j++) {
            for (let i = -1; i <= 1; i++) {
              if (downGrid[y+j][x+i] === bomb){
                bombsNums--;
              }
              downGrid[y+j][x+i]=0;
            }
          }
          firstClick =false;
          setnumber();
        }
        upGrid[y][x] = 0;
        clearBeside(x, y);
      }
    }
    if (mouseButton === RIGHT) {
      if(upGrid[y][x] === 1){
        flags[y][x] = !flags[y][x];
        if (downGrid[y][x] === bomb){
          if (flags[y][x] === true){
            bombsNums--;
          }
          else {
            bombsNums++;
          }
        }
      }
      console.log(bombsNums);
    }
    // if (mouseButton === doubleClicked) {
    //   let numFlags = 0;
    //   for (let j = -1; j <= 1; j++) {
    //     for (let i = -1; i <= 1; i++) {
    //       if (x + i >= 0 && x + i < cols && y + j >= 0 && y + j < rows) {
    //         if (flags[y+j][x+i] === true){
    //           numFlags++;
    //         }
    //       }
    //     }
    //   }
      
    //   if (numFlags === downGrid[y][x]){
    //     for (let j = -1; j <= 1; j++) {
    //       for (let i = -1; i <= 1; i++) {
    //         if (x + i >= 0 && x + i < cols && y + j >= 0 && y + j < rows) {
    //           if (flags[y+j][x+i] === false){
    //             upGrid[y+j][x+i] = 0;
    //             clearBeside(x+i, y+j);
    //             if (downGrid[y+j][x+i] === bomb) {
    //               gameSituation = "lost";
    //             }
    //           }
    //         }
    //       }       
    //     }
    //   }
    // }
  }
}

function clearBeside(x, y) {
  if (downGrid[y][x] === '') {
    for (let j = -1; j <= 1; j++) {
      for (let i = -1; i <= 1; i++) {
        let newX = x + i;
        let newY = y + j;
        if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
          if (upGrid[newY][newX] === 1) {
            upGrid[newY][newX] = 0;
            flags[newY][newX] = false;
            clearBeside(newX, newY);
          }
        }
      }
    }
  }
}


function keyPressed() {
  if ((key === 'r' || key === 'R')&& gameSituation !== "typed") {
    downGrid = [];
    upGrid = [];
    createUpGrid();
    createdownGrid();
    createFlag();
    bombsNums = 10;
    firstClick = true;
    gameSituation = "playing";
  }

  // use enter to change variable in game
  if (key === 'Enter' && gameSituation !== "typed") {
    gameSituation = "typed";
  }
  if (gameSituation === "typed") {
    if (readableChars.includes(key)) {
      instruction.push(key);
    }
    if (key === 'Backspace') {
      instruction.pop();
    }
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
      
    }
  }
}

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
  instruction = [];
  gameSituation = "playing";
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  startX = width / 2 - cols * BLOCK_SIZE / 2;
  startY = height / 2 - rows * BLOCK_SIZE / 2;
}