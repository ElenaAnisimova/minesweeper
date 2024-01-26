import { beginnersScoresArrOrig } from "./results.js";
let beginnersScoresArr = beginnersScoresArrOrig;
import { intermScoresArrOrig } from "./results.js";
let intermScoresArr = intermScoresArrOrig;
import { expertScoresArrOrig } from "./results.js";
let expertScoresArr = expertScoresArrOrig;

const body = document.querySelector("body");

const mainDiv = document.createElement("main");
body.appendChild(mainDiv);
mainDiv.className = "wrapper";

const commandBar = document.createElement("div");
mainDiv.appendChild(commandBar);
commandBar.className = "command-bar";

const mineIcon = document.createElement("img");
commandBar.appendChild(mineIcon);
mineIcon.className = "mine-icon";
mineIcon.width = "25";
mineIcon.height = "25";
mineIcon.src = "./assets/images/mine-bar.png";
mineIcon.alt = "";

const gameHeading = document.createElement("span");
commandBar.appendChild(gameHeading);
gameHeading.innerText = "Minesweeper";

const menuBar = document.createElement("div");
mainDiv.appendChild(menuBar);
menuBar.className = "menu-bar";

const menuWrapper = document.createElement("div");
menuBar.appendChild(menuWrapper);
menuWrapper.className = "menu-wrapper";

const menuItemGame = document.createElement("div");
menuWrapper.appendChild(menuItemGame);
menuItemGame.className = "menu-item menu-item-game";
menuItemGame.innerText = "Game";

// const menuItemHelp = document.createElement("div");
// menuWrapper.appendChild(menuItemHelp);
// menuItemHelp.className = "menu-item menu-item-help";
// menuItemHelp.innerText = "Help";

const menuContainer = document.createElement("div");
menuBar.appendChild(menuContainer);
menuContainer.className = "menu-cont";

const menuItemNewGame = document.createElement("div");
menuContainer.appendChild(menuItemNewGame);
menuItemNewGame.className = "menu-cont-item menu-new-game";
menuItemNewGame.innerText = "New";

const menuItemSaveGame = document.createElement("div");
menuContainer.appendChild(menuItemSaveGame);
menuItemSaveGame.className = "menu-cont-item menu-save-game";
menuItemSaveGame.innerText = "Save game";

const menuItemLoadGame = document.createElement("div");
menuContainer.appendChild(menuItemLoadGame);
menuItemLoadGame.className = "menu-cont-item menu-load-game";
menuItemLoadGame.innerText = "Load game";

const divideBar = document.createElement("div");
menuContainer.appendChild(divideBar);
divideBar.className = "divide-bar";

// LEVELS
const menuItemLevel1 = document.createElement("div");
menuContainer.appendChild(menuItemLevel1);
menuItemLevel1.className = "menu-cont-item menu-item-level beginner";
menuItemLevel1.innerText = "Beginner";

const menuItemLevel2 = document.createElement("div");
menuContainer.appendChild(menuItemLevel2);
menuItemLevel2.className = "menu-cont-item menu-item-level interm";
menuItemLevel2.innerText = "Intermediate";

const menuItemLevel3 = document.createElement("div");
menuContainer.appendChild(menuItemLevel3);
menuItemLevel3.className = "menu-cont-item menu-item-level expert";
menuItemLevel3.innerText = "Expert";

const menuItemMines = document.createElement("div");
menuContainer.appendChild(menuItemMines);
menuItemMines.className = "menu-cont-item menu-mines";
menuItemMines.innerText = "Custom...";

const divideBar2 = document.createElement("div");
menuContainer.appendChild(divideBar2);
divideBar2.className = "divide-bar";

const menuItemNightMode = document.createElement("div");
menuContainer.appendChild(menuItemNightMode);
menuItemNightMode.className = "menu-cont-item menu-night-mode";
menuItemNightMode.innerText = `Night mode`;

const menuItemSound = document.createElement("div");
menuContainer.appendChild(menuItemSound);
menuItemSound.className = "menu-cont-item menu-sound-btn sound-tick";
menuItemSound.innerHTML = `✔${"\xa0".repeat(4)}Sound`;

const divideBar3 = document.createElement("div");
menuContainer.appendChild(divideBar3);
divideBar3.className = "divide-bar";

const menuItemBest = document.createElement("div");
menuContainer.appendChild(menuItemBest);
menuItemBest.className = "menu-cont-item best-scores-btn";
menuItemBest.innerText = "Best Times...";

const gameDiv = document.createElement("div");
mainDiv.appendChild(gameDiv);
gameDiv.className = "game-wrapper";

// STATUS BAR
const statusBar = document.createElement("div");
gameDiv.appendChild(statusBar);
statusBar.className = "status-bar";

const time = document.createElement("div");
statusBar.appendChild(time);
time.className = "time";
time.innerHTML = "00:00";

const minesLeftDiv = document.createElement("div");
statusBar.appendChild(minesLeftDiv);
minesLeftDiv.className = "mines-left-div";

const newGameButton = document.createElement("div");
statusBar.appendChild(newGameButton);
newGameButton.className = "new-game-btn";
newGameButton.title = "New game";

const flagesLeftDiv = document.createElement("div");
statusBar.appendChild(flagesLeftDiv);
flagesLeftDiv.className = "flages-left-div";

const clicks = document.createElement("div");
statusBar.appendChild(clicks);
clicks.className = "clicks";
clicks.innerHTML = "000";

const minesLeftImage = document.createElement("img");
minesLeftDiv.appendChild(minesLeftImage);
minesLeftImage.className = "mines-left-img";
minesLeftImage.width = "25";
minesLeftImage.height = "25";
minesLeftImage.src = "./assets/images/mine-icon.png";
minesLeftImage.alt = "";

const minesLeftSpan = document.createElement("div");
minesLeftDiv.appendChild(minesLeftSpan);
minesLeftSpan.className = "mines-left-text";

const flagesLeftImage = document.createElement("img");
flagesLeftDiv.appendChild(flagesLeftImage);
flagesLeftImage.className = "flages-left-img";
flagesLeftImage.width = "25";
flagesLeftImage.height = "25";
flagesLeftImage.src = "./assets/images/flag-icon.png";
flagesLeftImage.alt = "";

const flagesLeftSpan = document.createElement("div");
flagesLeftDiv.appendChild(flagesLeftSpan);
flagesLeftSpan.className = "flages-left-text";

const gameField = document.createElement("div");
gameDiv.appendChild(gameField);
gameField.className = "game-field";

// const message = document.createElement("div");
// body.appendChild(message);
// message.className = "message";
// message.innerText = "Info message";

// GAME SCRIPT

let allCells = [];
let rows = 10;
let columns = 10;
let fieldSize = "beginner 10*10";
let bombsTotal = 10;
let nightModeVar = false;
minesLeftSpan.innerHTML = bombsTotal;

let bombsLocation = [];
let firstCell = [];
let countClicks = 0;
let cellsOpened = 0;

let gameOver = false;

function startGame() {
  if (fieldSize == "beginner 10*10") {
    gameField.className = "game-field beginner-size";
  }
  if (fieldSize == "interm 15*15") {
    gameField.className = "game-field interm-size";
  }
  if (fieldSize == "expert 25*25") {
    gameField.className = "game-field expert-size";
  }
  nightModeVar = nightModeVar;
  if (nightModeVar) {
    gameField.classList.add("game-field-night");
  }
  console.log("Level: " + fieldSize + "\nTotal amount of mines: " + bombsTotal);
  gameOver = false;
  // message.innerText = "Info message";
  cellsOpened = 0;
  time.textContent = "00:00";
  clicks.textContent = "000";
  countClicks = 0;
  sec = 0;
  min = 0;
  clearTimeout(t);
  timer();
  allCells = [];
  bombsLocation = [];
  firstCell = [];
  flaggedCells = [];
  gameField.innerHTML = "";
  minesLeftSpan.innerHTML = bombsTotal;
  flagesLeftSpan.innerHTML = "00";
  newGameButton.classList = "new-game-btn";
  if (nightModeVar) {
    newGameButton.classList.add("new-game-btn-night");
  }
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let cell = document.createElement("div");
      cell.id = r.toString() + "-" + c.toString();
      cell.addEventListener("click", firstClick);
      cell.addEventListener("click", clickFunction);
      cell.addEventListener("click", clickCell);
      cell.addEventListener("mousedown", clickStylesDown);
      cell.addEventListener("mouseup", clickStylesUp);
      cell.addEventListener("contextmenu", markFlag);
      if (fieldSize == "beginner 10*10") {
        cell.className = "cell cell-bgn-size";
      }
      if (fieldSize == "interm 15*15") {
        cell.className = "cell cell-int-size";
      }
      if (fieldSize == "expert 25*25") {
        cell.className = "cell cell-exp-size";
      }
      if (nightModeVar) {
        cell.classList.add("cell-night-mode");
      }
      document.querySelector(".game-field").append(cell);
      row.push(cell);
    }
    allCells.push(row);
  }
}

function firstClick(el) {
  let cell = this;
  if (countClicks == 0) {
    firstCell.push(cell.id);
  } else return;

  if (firstCell.length == 1) placeBombs();
}

function placeBombs() {
  let bombsLeft = bombsTotal;
  while (bombsLeft > 0) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);

    let id = r.toString() + "-" + c.toString();

    if (!bombsLocation.includes(id) && !firstCell.includes(id)) {
      bombsLocation.push(id);
      bombsLeft -= 1;
    }
  }
}
let clickedCells = [];

function clickCell(el) {
  if (gameOver || this.classList.contains("cell-opened")) {
    return;
  }
  playClickSound();
  let cell = this;
  clickedCells.push(cell.id);
  if (cell.classList.contains("flag")) return;
  if (bombsLocation.includes(cell.id)) {
    newGameButton.classList.add("new-game-btn-lose");
    alert("Game over. Try again");
    playLoseSound();
    showBombs();
    gameOver = true;
    return;
  }

  let coordinates = cell.id.split("-");
  let r = parseInt(coordinates[0]);
  let c = parseInt(coordinates[1]);
  checkBomb(r, c);
}

let flaggedCells = [];

minesLeftSpan.innerHTML = bombsTotal;
flagesLeftSpan.innerHTML = "0" + flaggedCells.length;

function markFlag() {
  playMarkSound();
  let cell = this;
  if (
    !cell.classList.contains("flag") &&
    !cell.classList.contains("cell-opened") &&
    !gameOver
  ) {
    cell.classList.add("flag");
    flaggedCells.push(cell.id);
    flagesLeftSpan.innerHTML =
      flaggedCells.length > 9 ? flaggedCells.length : "0" + flaggedCells.length;
    minesLeftSpan.innerHTML =
      bombsTotal - flaggedCells.length > 9
        ? bombsTotal - flaggedCells.length
        : "0" + (bombsTotal - flaggedCells.length);
    if (bombsTotal - flaggedCells.length < 0) {
      minesLeftSpan.innerHTML = "00";
    }
    return;
  } else cell.classList.remove("flag");

  flaggedCells = flaggedCells.filter((x) => x != cell.id);
  flagesLeftSpan.innerHTML =
    flaggedCells.length > 9 ? flaggedCells.length : "0" + flaggedCells.length;
  minesLeftSpan.innerHTML =
    bombsTotal - flaggedCells.length > 9
      ? bombsTotal - flaggedCells.length
      : "0" + (bombsTotal - flaggedCells.length);
  if (bombsTotal - flaggedCells.length < 0) {
    minesLeftSpan.innerHTML = "00";
  }
}

function clickStylesDown() {
  let tile = this;
  if (gameOver) return;
  if (!tile.classList.contains("cell-opened")) {
    tile.classList.add("cell-clicked");
  }
  newGameButton.classList.add("new-game-btn-click");
}

function clickStylesUp() {
  let tile = this;
  if (
    !tile.classList.contains("cell-opened") &&
    tile.classList.contains("cell-clicked")
  ) {
    tile.classList.remove("cell-clicked");
  }
  newGameButton.classList.remove("new-game-btn-click");
}

mainDiv.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

function showBombs() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let cell = allCells[r][c];
      if (bombsLocation.includes(cell.id)) {
        cell.classList.add("mine");
        cell.style.backgroundColor = "red";
      }
    }
  }
  console.log("mines revealed");
}

function checkBomb(r, c) {
  if (r < 0 || r >= rows || c < 0 || c >= columns) {
    return;
  }
  if (
    allCells[r][c].classList.contains("cell-opened") ||
    allCells[r][c].classList.contains("flag")
  ) {
    return;
  }

  allCells[r][c].classList.add("cell-opened");

  cellsOpened += 1;

  let bombsFound = 0;
  bombsFound += calculateBombs(r - 1, c - 1);
  bombsFound += calculateBombs(r - 1, c);
  bombsFound += calculateBombs(r - 1, c + 1);

  bombsFound += calculateBombs(r, c - 1);
  bombsFound += calculateBombs(r, c + 1);

  bombsFound += calculateBombs(r + 1, c - 1);
  bombsFound += calculateBombs(r + 1, c);
  bombsFound += calculateBombs(r + 1, c + 1);

  if (bombsFound > 0) {
    allCells[r][c].innerText = bombsFound;
    allCells[r][c].classList.add("bombs" + bombsFound.toString());
  } else {
    checkBomb(r - 1, c - 1);
    checkBomb(r - 1, c);
    checkBomb(r - 1, c + 1);

    checkBomb(r, c - 1);
    checkBomb(r, c + 1);

    checkBomb(r + 1, c - 1);
    checkBomb(r + 1, c);
    checkBomb(r + 1, c + 1);
  }
  if (cellsOpened == rows * columns - bombsTotal) {
    let totalTime = min * 60 + sec;
    newGameButton.classList.add("new-game-btn-win");
    playWinSound();
    alert(
      `Hooray! You found all mines in ${totalTime} seconds and ${countClicks} moves!`
    );
    // message.innerHTML = `Hooray! You found all mines in ${totalTime} seconds and ${countClicks} moves!`;
    recordResult();
    closeWindowBestRes();
    gameOver = true;
  }
}

function calculateBombs(r, c) {
  if (r < 0 || r >= rows || c < 0 || c >= columns) {
    return 0;
  }
  if (bombsLocation.includes(r.toString() + "-" + c.toString())) {
    return 1;
  }
  return 0;
}

// // TIMER

let sec = 0;
let min = 0;
let t;

function tick() {
  sec++;
  if (sec >= 60) {
    sec = 0;
    min++;
  }
}

function add() {
  tick();
  time.textContent =
    (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec);
  timer();
}
function timer() {
  if (gameOver) {
    return;
  }
  t = setTimeout(add, 1000);
}
timer();

// CLICKCOUNTER

function clickFunction(el) {
  if (
    gameOver ||
    el.target.classList.contains("cell-opened") ||
    el.target.classList.contains("flag")
  ) {
    return;
  }

  countClicks++;
  if (countClicks < 10) {
    clicks.textContent = `00${countClicks}`;
  } else if (countClicks >= 10 && countClicks < 100) {
    clicks.textContent = `0${countClicks}`;
  } else clicks.textContent = countClicks;
}

// // START NEW GAME

startGame();

newGameButton.addEventListener("click", () => {
  startGame();
});
menuItemNewGame.addEventListener("click", () => {
  startGame();
});

const menuOpenButton = document.querySelector(".menu-item-game");
const gameMenu = document.querySelector(".menu-cont");
const menuLinks = document.querySelectorAll(".menu-cont-item");
// const popup = document.querySelector('.pop-up-background');

menuOpenButton.addEventListener("click", () => {
  gameMenu.classList.toggle("appearing");
  // popup.classList.toggle('appearing');
});
for (let i = 0; i < menuLinks.length; i += 1) {
  menuLinks[i].addEventListener("click", () => {
    gameMenu.classList.toggle("appearing");
    // popup.classList.toggle("appearing");
  });
}

function customField() {
  const beginnerLvlBtn = document.querySelector(".beginner");
  const intermLvlBtn = document.querySelector(".interm");
  const expertLvlBtn = document.querySelector(".expert");
  beginnerLvlBtn.addEventListener("click", () => {
    fieldSize = "beginner 10*10";
    rows = 10;
    columns = 10;
    startGame();
  });
  intermLvlBtn.addEventListener("click", () => {
    fieldSize = "interm 15*15";
    rows = 15;
    columns = 15;
    startGame();
  });
  expertLvlBtn.addEventListener("click", () => {
    fieldSize = "expert 25*25";
    rows = 25;
    columns = 25;
    startGame();
  });
}
customField();

function createCustomMines() {
  const minesNumberDiv = document.createElement("div");
  menuBar.appendChild(minesNumberDiv);
  minesNumberDiv.className = "mines-nmb";

  const commandBarMines = document.createElement("div");
  minesNumberDiv.appendChild(commandBarMines);
  commandBarMines.className = "comm-bar-mines";

  const mineImg = document.createElement("img");
  commandBarMines.appendChild(mineImg);
  mineImg.width = "25";
  mineImg.height = "25";
  mineImg.src = "./assets/images/mine-icon.png";
  mineImg.alt = "";

  const mineNmbHeading = document.createElement("div");
  commandBarMines.appendChild(mineNmbHeading);
  mineNmbHeading.innerText = "Custom field";
  mineNmbHeading.className = "mines-nmb-hdn";

  const mineNmbCross = document.createElement("img");
  commandBarMines.appendChild(mineNmbCross);
  mineNmbCross.width = "27";
  mineNmbCross.height = "27";
  mineNmbCross.src = "./assets/images/cross-small.svg";
  mineNmbCross.className = "cross mines-number";

  const minesNmbFormDiv = document.createElement("form");
  minesNumberDiv.appendChild(minesNmbFormDiv);
  minesNmbFormDiv.className = "form-div";

  const minesLabel = document.createElement("label");
  minesNmbFormDiv.appendChild(minesLabel);
  minesLabel.innerText = "Mines: ";

  const minesInput = document.createElement("input");
  minesLabel.appendChild(minesInput);
  minesInput.className = "mines-input";
  minesInput.type = "number";
  minesInput.value = 10;

  const OKBtn = document.createElement("button");
  minesNumberDiv.appendChild(OKBtn);
  OKBtn.className = "btn ok-btn mines-number";
  OKBtn.innerText = "OK";
  OKBtn.type = "button";

  const cancelBtn = document.createElement("button");
  minesNumberDiv.appendChild(cancelBtn);
  cancelBtn.className = "btn cancel-btn mines-number";
  cancelBtn.innerText = "Cancel";
  cancelBtn.type = "button";
}
createCustomMines();

const minesNumberBtn = document.querySelector(".menu-mines");
const minesNumberDiv = document.querySelector(".mines-nmb");
const mineNmbCross = document.querySelector(".cross.mines-number");
const OKBtn = document.querySelector(".ok-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const minesInput = document.querySelector(".mines-input");
minesNumberBtn.addEventListener("click", () => {
  minesNumberDiv.classList.toggle("appearing");
});

function closeWindowMinesNmb() {
  minesNumberDiv.classList.toggle("appearing");
}
function changeMinesNmb() {
  bombsTotal = minesInput.value;
  startGame();
}

mineNmbCross.addEventListener("click", closeWindowMinesNmb);
OKBtn.addEventListener("click", changeMinesNmb);
OKBtn.addEventListener("click", closeWindowMinesNmb);
cancelBtn.addEventListener("click", closeWindowMinesNmb);

minesInput.addEventListener("keydown", function () {
  if (this.value > 99 || this.value.length > 2) {
    this.value = this.value.substr(0, 2);
  }
  if (this.value <= 99 && this.value >= 10) {
    OKBtn.disabled = false;
  }
  if (this.value < 10) {
    OKBtn.disabled = true;
  }
});
minesInput.addEventListener("keyup", function () {
  if (this.value > 99 || this.value.length > 2) {
    this.value = this.value.substr(0, 2);
  }
  if (this.value <= 99 && this.value >= 10) {
    OKBtn.disabled = false;
  }
  if (this.value < 10) {
    OKBtn.disabled = true;
  }
});

function bestScoresElements() {
  const bestScoresDiv = document.createElement("div");
  menuBar.appendChild(bestScoresDiv);
  bestScoresDiv.className = "best-scores";

  const commandBarScores = document.createElement("div");
  bestScoresDiv.appendChild(commandBarScores);
  commandBarScores.className = "comm-bar-scores";

  const mineImg = document.createElement("img");
  commandBarScores.appendChild(mineImg);
  mineImg.width = "25";
  mineImg.height = "25";
  mineImg.src = "./assets/images/mine-icon.png";
  mineImg.alt = "";

  const bestScoresHeading = document.createElement("div");
  commandBarScores.appendChild(bestScoresHeading);
  bestScoresHeading.innerText = "Fastest Mine Sweepers";
  bestScoresHeading.className = "best-scores-hdn";

  const scoresCross = document.createElement("img");
  commandBarScores.appendChild(scoresCross);
  scoresCross.width = "27";
  scoresCross.height = "27";
  scoresCross.src = "./assets/images/cross-small.svg";
  scoresCross.className = "cross best-res";

  const resultsLevelDiv = document.createElement("div");
  bestScoresDiv.appendChild(resultsLevelDiv);
  resultsLevelDiv.className = "res-lvl-div";

  for (let i = 0; i < 3; i++) {
    const level = ["Beginner", "Intermediate", "Expert"];
    const scoresLabel = document.createElement("label");
    resultsLevelDiv.appendChild(scoresLabel);
    scoresLabel.innerText = level[i];
    scoresLabel.className = "scores-label";

    const resultsLevel = document.createElement("input");
    resultsLevel.type = "radio";
    scoresLabel.appendChild(resultsLevel);
    resultsLevel.className = "scores-radio";
    resultsLevel.name = "level";
    resultsLevel.value = level[i];
    if (i == 0) {
      resultsLevel.checked = true;
    }
  }
  for (let i = 0; i < 3; i++) {
    const resultTimeDiv = document.createElement("div");
    resultsLevelDiv.appendChild(resultTimeDiv);

    if (i == 0) {
      resultTimeDiv.className = "res-time-div beginner";
    }
    if (i == 1) {
      resultTimeDiv.className = "res-time-div interm no-display";
    }
    if (i == 2) {
      resultTimeDiv.className = "res-time-div expert no-display";
    }
    for (let j = 0; j < 10; j++) {
      const resultTime = document.createElement("div");
      resultTimeDiv.appendChild(resultTime);
      if (i == 0) {
        resultTime.innerText =
          beginnersScoresArr[j].name +
          "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
          beginnersScoresArr[j].time +
          "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
          " Clicks: " +
          beginnersScoresArr[j].clicks;
      }
      if (i == 1) {
        resultTime.innerText =
          intermScoresArr[j].name +
          "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
          intermScoresArr[j].time +
          "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
          " Clicks: " +
          intermScoresArr[j].clicks;
      }
      if (i == 2) {
        resultTime.innerText =
          expertScoresArr[j].name +
          "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
          expertScoresArr[j].time +
          "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
          " Clicks: " +
          expertScoresArr[j].clicks;
      }
      resultTime.className = "result-line";
    }
  }

  const OKBtn = document.createElement("button");
  bestScoresDiv.appendChild(OKBtn);
  OKBtn.className = "btn ok-btn best-res";
  OKBtn.innerText = "OK";
  OKBtn.type = "button";

  // const cancelBtn = document.createElement("button");
  // bestScoresDiv.appendChild(cancelBtn);
  // cancelBtn.className = "btn cancel-btn best-res";
  // cancelBtn.innerText = "Cancel";
  // cancelBtn.type = "button";
}
bestScoresElements();

const bestScoresBtn = document.querySelector(".best-scores-btn");
const bestScoresDiv = document.querySelector(".best-scores");
const scoresCross = document.querySelector(".cross.best-res");
const beginnersScores = document.querySelector(".res-time-div.beginner");

const intermScores = document.querySelector(".res-time-div.interm");
const expertsScores = document.querySelector(".res-time-div.expert");
const OKBtnScores = document.querySelector(".ok-btn.best-res");
// const cancelBtn = document.querySelector(".cancel-btn");

function closeWindowBestRes() {
  bestScoresDiv.classList.toggle("appearing");
}
scoresCross.addEventListener("click", closeWindowBestRes);
bestScoresBtn.addEventListener("click", closeWindowBestRes);
// OKBtn.addEventListener("click", changeMinesNmb);
OKBtnScores.addEventListener("click", closeWindowBestRes);
// cancelBtn.addEventListener("click", closeWindowMinesNmb);

function fillBeginnerScores() {
  beginnersScores.innerHTML = "";
  for (let j = 0; j < 10; j++) {
    const resultTime = document.createElement("div");
    resultTime.className = "result-line";
    beginnersScores.appendChild(resultTime);
    resultTime.innerText =
      beginnersScoresArr[j].name +
      "\xa0\xa0\xa0\xa0" +
      beginnersScoresArr[j].time +
      " Clicks: " +
      beginnersScoresArr[j].clicks;
  }
}

function fillIntermScore() {
  intermScores.innerHTML = "";
  for (let j = 0; j < 10; j++) {
    const resultTime = document.createElement("div");
    resultTime.className = "result-line";
    intermScores.appendChild(resultTime);
    resultTime.innerText =
      intermScoresArr[j].name +
      "\xa0\xa0\xa0\xa0" +
      intermScoresArr[j].time +
      " Clicks: " +
      intermScoresArr[j].clicks;
  }
}

function fillExpertScore() {
  expertsScores.innerHTML = "";
  for (let j = 0; j < 10; j++) {
    const resultTime = document.createElement("div");
    resultTime.className = "result-line";
    expertsScores.appendChild(resultTime);
    resultTime.innerText =
      expertScoresArr[j].name +
      "\xa0\xa0\xa0\xa0" +
      expertScoresArr[j].time +
      " Clicks: " +
      expertScoresArr[j].clicks;
  }
}
function recordResult() {
  const namePrompt = prompt("Введите ваше имя", "Anonymous");
  let totalTime = min * 60 + sec;
  let result = {
    name: namePrompt,
    time: totalTime + " seconds",
    clicks: countClicks,
  };
  if (fieldSize == "beginner 10*10") {
    beginnersScoresArr.pop();
    beginnersScoresArr.unshift(result);
    // beginnersScoresArr.sort(
    //   (a, b) =>
    //     parseFloat(a.time.split(" ")[0]) - parseFloat(b.time.split(" ")[0])
    // );
    fillBeginnerScores();
  } else if (fieldSize == "interm 15*15") {
    intermScoresArr.pop();
    intermScoresArr.unshift(result);
    // intermScoresArr.sort(
    //   (a, b) =>
    //     parseFloat(a.time.split(" ")[0]) - parseFloat(b.time.split(" ")[0])
    // );
    fillIntermScore();
  } else if (fieldSize == "expert 25*25") {
    expertScoresArr.pop();
    expertScoresArr.unshift(result);
    // expertScoresArr.sort(
    //   (a, b) =>
    //     parseFloat(a.time.split(" ")[0]) - parseFloat(b.time.split(" ")[0])
    // );
    fillExpertScore();
  }
}

let radios = document.querySelectorAll('input[type="radio"]');
function showLevelScores() {
  for (const radio of radios) {
    radio.onclick = (e) => {
      if (e.target.value == "Beginner") {
        beginnersScores.classList.remove("no-display");
        intermScores.classList.add("no-display");
        expertsScores.classList.add("no-display");
      }
      if (e.target.value == "Intermediate") {
        beginnersScores.classList.add("no-display");
        intermScores.classList.remove("no-display");
        expertsScores.classList.add("no-display");
      }
      if (e.target.value == "Expert") {
        beginnersScores.classList.add("no-display");
        intermScores.classList.add("no-display");
        expertsScores.classList.remove("no-display");
      }
    };
  }
}
showLevelScores();

function setLocalStorageTopResults() {
  localStorage.setItem("results-beginner", JSON.stringify(beginnersScoresArr));
  localStorage.setItem("results-interm", JSON.stringify(intermScoresArr));
  localStorage.setItem("results-expert", JSON.stringify(expertScoresArr));
}

window.addEventListener("beforeunload", setLocalStorageTopResults);

function getLocalStorageTopResults() {
  if (localStorage.getItem("results-beginner")) {
    beginnersScoresArr = JSON.parse(localStorage.getItem("results-beginner"));
  }
  if (localStorage.getItem("results-interm")) {
    intermScoresArr = JSON.parse(localStorage.getItem("results-interm"));
  }
  if (localStorage.getItem("results-expert")) {
    expertScoresArr = JSON.parse(localStorage.getItem("results-expert"));
  }
}
const saveButton = document.querySelector(".menu-save-game");

function saveGame() {
  localStorage.setItem("field-size", fieldSize);
  localStorage.setItem("bombs-location", JSON.stringify(bombsLocation));
  localStorage.setItem("bombs-total", bombsTotal);
  localStorage.setItem("clicked-cells", JSON.stringify(clickedCells));
  localStorage.setItem("flagged-cells", JSON.stringify(flaggedCells));
  localStorage.setItem("time", time.textContent);
  localStorage.setItem("minutes", min);
  localStorage.setItem("seconds", sec);
  localStorage.setItem("clicks", countClicks);
  localStorage.setItem("mines-left", minesLeftSpan.innerHTML);
  localStorage.setItem("flags-left", flagesLeftSpan.innerHTML);
}

saveButton.addEventListener("click", saveGame);

const loadButton = document.querySelector(".menu-load-game");

function loadGame() {
  gameField.innerHTML = "";
  if (localStorage.getItem("field-size")) {
    fieldSize = localStorage.getItem("field-size");
  }
  if (fieldSize == "beginner 10*10") {
    gameField.className = "game-field beginner-size";
    rows = 10;
    columns = 10;
  }
  if (fieldSize == "interm 15*15") {
    gameField.className = "game-field interm-size";
    rows = 15;
    columns = 15;
  }
  if (fieldSize == "expert 25*25") {
    gameField.className = "game-field expert-size";
    rows = 25;
    columns = 25;
  }

  gameOver = false;
  cellsOpened = 0;
  if (localStorage.getItem("clicks")) {
    countClicks = localStorage.getItem("clicks");
  }
  if (countClicks < 10) {
    clicks.textContent = `00${countClicks}`;
  } else if (countClicks >= 10 && countClicks < 100) {
    clicks.textContent = `0${countClicks}`;
  } else clicks.textContent = countClicks;

  if (localStorage.getItem("minutes")) {
    min = localStorage.getItem("minutes");
  }
  if (localStorage.getItem("seconds")) {
    sec = localStorage.getItem("seconds");
  }
  time.textContent =
    (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec);
  clearTimeout(t);
  timer();
  allCells = [];
  if (localStorage.getItem("mines-left")) {
    minesLeftSpan.innerHTML = localStorage.getItem("mines-left");
  }
  if (localStorage.getItem("flags-left")) {
    flagesLeftSpan.innerHTML = localStorage.getItem("flags-left");
  }
  if (localStorage.getItem("bombs-location")) {
    bombsLocation = JSON.parse(localStorage.getItem("bombs-location"));
  }
  if (localStorage.getItem("bombs-total")) {
    bombsTotal = localStorage.getItem("bombs-total");
  }
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let cell = document.createElement("div");
      cell.id = r.toString() + "-" + c.toString();
      cell.addEventListener("click", clickFunction);
      cell.addEventListener("click", clickCell);
      cell.addEventListener("mousedown", clickStylesDown);
      cell.addEventListener("mouseup", clickStylesUp);
      cell.addEventListener("contextmenu", markFlag);
      if (fieldSize == "beginner 10*10") {
        cell.className = "cell cell-bgn-size";
      }
      if (fieldSize == "interm 15*15") {
        cell.className = "cell cell-int-size";
      }
      if (fieldSize == "expert 25*25") {
        cell.className = "cell cell-exp-size";
      }
      document.querySelector(".game-field").append(cell);
      row.push(cell);
    }
    allCells.push(row);
  }
  if (localStorage.getItem("clicked-cells")) {
    clickedCells = JSON.parse(localStorage.getItem("clicked-cells"));
  }
  if (localStorage.getItem("flagged-cells")) {
    flaggedCells = JSON.parse(localStorage.getItem("flagged-cells"));
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let cell = allCells[r][c];
      if (clickedCells.includes(cell.id)) {
        cell.click();
      }
      if (flaggedCells.includes(cell.id)) {
        cell.classList.add("flag");
      }
    }
  }
  console.log("Level: " + fieldSize + "\nTotal amount of mines: " + bombsTotal);
}

loadButton.addEventListener("click", loadGame);

window.addEventListener("load", getLocalStorageTopResults);
window.addEventListener("load", fillBeginnerScores);
window.addEventListener("load", fillIntermScore);
window.addEventListener("load", fillExpertScore);

//  SOUND

const soundBtn = document.querySelector(".menu-sound-btn");

const audioClick = new Audio();
audioClick.src = "./assets/sounds/markcut.mp3";
audioClick.volume = 0.5;

function playClickSound() {
  audioClick.play();
}

const audioFlag = new Audio();
audioFlag.src = "./assets/sounds/soundcut.mp3";
audioFlag.volume = 0.5;

function playMarkSound() {
  audioFlag.play();
}

const audioWin = new Audio();
audioWin.src = "./assets/sounds/victory.mp3";

function playWinSound() {
  audioWin.play();
}
audioWin.volume = 0.5;

const audioLose = new Audio();
audioLose.src = "./assets/sounds/lose.mp3";
audioLose.volume = 0.5;

function playLoseSound() {
  audioLose.play();
}

let muted = false;
function toggleSound() {
  if (muted == false) {
    soundBtn.innerHTML = `Sound`;
    soundBtn.classList.remove("sound-tick");
    audioClick.volume = 0.0;
    audioFlag.volume = 0.0;
    audioWin.volume = 0.0;
    audioLose.volume = 0.0;
    muted = true;
  } else if (muted == true) {
    soundBtn.innerHTML = `✔${"\xa0".repeat(4)}Sound`;
    soundBtn.classList.add("sound-tick");
    audioClick.volume = 0.5;
    audioFlag.volume = 0.5;
    audioWin.volume = 0.5;
    audioLose.volume = 0.5;
    muted = false;
  }
}

soundBtn.addEventListener("click", toggleSound);
const nightModeBtn = document.querySelector(".menu-night-mode");

function nightMode() {
  nightModeVar ? (nightModeVar = false) : (nightModeVar = true);
  nightModeVar
    ? (nightModeBtn.innerHTML = `✔${"\xa0".repeat(4)}Night mode`)
    : (nightModeBtn.innerHTML = "Night mode");
  nightModeBtn.classList.toggle("sound-tick");
  body.classList.toggle("night-mode");
  mainDiv.classList.toggle("night-mode-main-color");
  gameDiv.classList.toggle("night-mode-borders");
  gameField.classList.toggle("game-field-night");
  statusBar.classList.toggle("status-night");
  time.classList.toggle("status-night");
  time.classList.toggle("text-night-one");
  clicks.classList.toggle("status-night");
  clicks.classList.toggle("text-night-one");
  minesLeftDiv.classList.toggle("status-night");
  flagesLeftDiv.classList.toggle("status-night");
  minesLeftSpan.classList.toggle("text-night-two");
  flagesLeftSpan.classList.toggle("text-night-two");
  newGameButton.classList.toggle("new-game-btn-night");
  commandBar.classList.toggle("command-bar-night");
  menuContainer.classList.toggle("menu-cont-night");
  minesNumberDiv.classList.toggle("menu-cont-night");
  bestScoresDiv.classList.toggle("menu-cont-night");

  const commandBarScores = document.querySelector(".comm-bar-scores");
  commandBarScores.classList.toggle("night-mode");
  const commandBarMines = document.querySelector(".comm-bar-mines");
  commandBarMines.classList.toggle("night-mode");

  const cells = document.querySelectorAll(".cell");
  for (let cell of cells) {
    cell.classList.toggle("cell-night-mode");
  }

  const divideBars = document.querySelectorAll(".divide-bar");
  for (let bar of divideBars) {
    bar.classList.toggle("divide-bar-night");
  }
}
nightModeBtn.addEventListener("click", nightMode);

//todo: клик снаружи меню закрывает его
// new button after night mode 
