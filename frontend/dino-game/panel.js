import Player from "./Player.js";
import Ground from "./Ground.js";
import CactiController from "./CactiController.js";
import Score from "./Score.js";
import PowerUpController from "./PowerUpController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_SPEED_START = 1; // 1.0
const GAME_SPEED_INCREMENT = 0.00001;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const PLAYER_WIDTH = 88 / 1.5; //58
const PLAYER_HEIGHT = 94 / 1.5; //62
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const GROUND_WIDTH = 2400;
const GROUND_HEIGHT = 24;
const GROUND_AND_CACTUS_SPEED = 0.5;

const POWER_UP_WIDTH = 30; // New constant
const POWER_UP_HEIGHT = 30; // New constant

const CACTI_CONFIG = [
  { width: 48 / 1.5, height: 100 / 1.5, image: "images/cactus_1.png" },
  { width: 98 / 1.5, height: 100 / 1.5, image: "images/cactus_2.png" },
  { width: 68 / 1.5, height: 70 / 1.5, image: "images/cactus_3.png" },
];

//Game Objects
let player = null;
let ground = null;
let cactiController = null;
let score = null;
let powerUpController = null;

let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_SPEED_START;
let gameOver = false;
let hasAddedEventListenersForRestart = false;
let waitingToStart = true;
let canUploadScore = true;

let cycleState = 0;
let cycleColors = ["#87CEEB", "#4682B4", "#000000", "#4682B4", "#87CEEB", "rainbow"];

const audio = new Audio("music/I_Can_Explain.wav");
audio.loop = true;
audio.volume = 1; // Set the initial volume here


// Function to play the music
function playMusic() {
  audio.play();
}

// Function to stop the music
function stopMusic() {
  audio.pause();
  audio.currentTime = 0;
}

function createSprites() {
  const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
  const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
  const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
  const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

  const groundWidthInGame = GROUND_WIDTH * scaleRatio;
  const groundHeightInGame = GROUND_HEIGHT * scaleRatio;

  player = new Player(
      ctx,
      playerWidthInGame,
      playerHeightInGame,
      minJumpHeightInGame,
      maxJumpHeightInGame,
      scaleRatio
  );

  ground = new Ground(
      ctx,
      groundWidthInGame,
      groundHeightInGame,
      GROUND_AND_CACTUS_SPEED,
      scaleRatio
  );

  const cactiImages = CACTI_CONFIG.map((cactus) => {
    const image = new Image();
    image.src = cactus.image;
    return {
      image: image,
      width: cactus.width * scaleRatio,
      height: cactus.height * scaleRatio,
    };
  });

  cactiController = new CactiController(
      ctx,
      cactiImages,
      scaleRatio,
      GROUND_AND_CACTUS_SPEED
  );

  score = new Score(ctx, scaleRatio);

  // Create new power up controller
  powerUpController = new PowerUpController(ctx, POWER_UP_WIDTH * scaleRatio, POWER_UP_HEIGHT * scaleRatio, GROUND_AND_CACTUS_SPEED, scaleRatio);
}

function setScreen() {
  scaleRatio = getScaleRatio();
  canvas.width = GAME_WIDTH * scaleRatio;
  canvas.height = GAME_HEIGHT * scaleRatio;
  createSprites();
}

setScreen();
window.addEventListener("resize", () => setTimeout(setScreen, 500));

if (screen.orientation) {
  screen.orientation.addEventListener("change", setScreen);
}

function getScaleRatio() {
  const screenHeight = Math.min(
      window.innerHeight,
      document.documentElement.clientHeight
  );

  const screenWidth = Math.min(
      window.innerWidth,
      document.documentElement.clientWidth
  );

  if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
    return screenWidth / GAME_WIDTH;
  } else {
    return screenHeight / GAME_HEIGHT;
  }
}

function uploadScore(score) {
  fetch("https://www.varangianroute.com/scores", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      authorization: 'Bearer ' + window.Twitch.ext.viewer.sessionToken
    },
    body: JSON.stringify({
      score: score
    })
  })
      .then(resp => {
        return resp.json();
      })
}

function showGameOver(score) {
  const fontSize = 70 * scaleRatio;
  ctx.font = `${fontSize}px Verdana`;
  ctx.fillStyle = "grey";
  const x = canvas.width / 4.5;
  const y = canvas.height / 2;
  ctx.fillText("GAME OVER", x, y);
  if (canUploadScore) {
    uploadScore(Math.floor(score));
  }
  canUploadScore = false;
  stopMusic(); // Stop the music when the game ends
}

function setupGameReset() {
  if (!hasAddedEventListenersForRestart) {
    hasAddedEventListenersForRestart = true;

    setTimeout(() => {
      window.addEventListener("keyup", reset, { once: true });
      window.addEventListener("touchstart", reset, { once: true });
    }, 1000);
  }
}

function reset() {
  hasAddedEventListenersForRestart = false;
  gameOver = false;
  waitingToStart = false;
  ground.reset();
  cactiController.reset();
  powerUpController.reset();
  score.reset();
  gameSpeed = GAME_SPEED_START;
  canUploadScore = true;
  playMusic(); // Start playing the music when the game resets
}

function showStartGameText() {
  const fontSize = 40 * scaleRatio;
  ctx.font = `${fontSize}px Verdana`;
  ctx.fillStyle = "grey";
  const x = canvas.width / 14;
  const y = canvas.height / 2;
  ctx.fillText("Tap Screen or Press Space To Start", x, y);
  playMusic(); // Start playing the music when waiting to start
}

function updateGameSpeed(frameTimeDelta) {
  gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
}

function clearScreen() {
  let gradient;
  if (gameSpeed >= 2.25) {
    gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.15, "orange");
    gradient.addColorStop(0.3, "yellow");
    gradient.addColorStop(0.5, "green");
    gradient.addColorStop(0.65, "blue");
    gradient.addColorStop(0.8, "indigo");
    gradient.addColorStop(1, "violet");
  } else {
    gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, cycleColors[cycleState]);
    gradient.addColorStop(1, cycleColors[(cycleState + 1) % (cycleColors.length - 1)]);
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function gameLoop(currentTime) {
  if (previousTime === null) {
    previousTime = currentTime;
    requestAnimationFrame(gameLoop);
    return;
  }

  const frameTimeDelta = currentTime - previousTime;
  previousTime = currentTime;

  clearScreen();

  if (!gameOver && !waitingToStart) {
    ground.update(gameSpeed, frameTimeDelta);
    powerUpController.update(gameSpeed, frameTimeDelta);
    cactiController.update(gameSpeed, frameTimeDelta);
    player.update(gameSpeed, frameTimeDelta);
    score.update(frameTimeDelta, gameSpeed);
    updateGameSpeed(frameTimeDelta);
  }

  if (!gameOver && (cactiController.collideWith(player) || powerUpController.collideWith(player))) {
    if (powerUpController.collideWith(player)) {
      // Player hit power up
      gameSpeed *= 1.20; // Increase speed by 20%
      console.log(`Game speed: ${gameSpeed}`); // Add this line
      if (gameSpeed >= 2.25) {
        cycleState = cycleColors.length - 1;  // Set to rainbow state
      } else {
        cycleState = (cycleState + 1) % (cycleColors.length - 1);  // Cycle through dusk-dawn states
      }
      console.log(`Cycle state: ${cycleState}`); // Add this line
      powerUpController.reset(); // Reset the power up
    } else {
      // Player hit cactus
      gameOver = true;
      setupGameReset();
      score.setHighScore();
    }
  }

  ground.draw();
  powerUpController.draw();
  cactiController.draw();
  player.draw();
  score.draw(gameSpeed);

  if (gameOver) {
    showGameOver(score.getScore());
  }

  if (waitingToStart) {
    showStartGameText();
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

window.addEventListener("keyup", reset, { once: true });
window.addEventListener("touchstart", reset, { once: true });
