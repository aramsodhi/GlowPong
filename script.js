"use strict"

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 400;
const FPS = 45;

canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;

const player1 = new Paddle("left", SCREEN_WIDTH, SCREEN_HEIGHT, randomColor());
const player2 = new Paddle("right", SCREEN_WIDTH, SCREEN_HEIGHT, randomColor());
const ball = new Ball(SCREEN_WIDTH, SCREEN_HEIGHT, randomColor());
const score = new Stat(0, "Score", 20, 30, "white");

const paddles = [player1, player2];

let interval = window.setInterval(gameLoop, 1000 / FPS);
function gameLoop() {
  ctx.fillStyle = "rgba(25, 25, 26, 0.2)";
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  
  ball.render(ctx);
  ball.update();
  ball.checkWallCollision();
  
  
  paddles.forEach((paddle, index) => {
    paddle.render(ctx);
    paddle.update();
    paddle.checkWallCollision();
    paddle.checkBallBounce(ball, score);
    
    if (index === 1) {
      paddle.ai(ball);
    } 
  });
  
  score.render(ctx);
  
  if (ball.touchingSideWall() === "left") {
    window.clearInterval(interval);
    alert("Computer Wins! Reload to play again");
  }
  
  if (ball.touchingSideWall() === "right") {
    window.clearInterval(interval);
    alert("You Win! Reload to play again");
  }
}

window.addEventListener("keydown", (event) => updateKeys(event));
window.addEventListener("keyup", (event) => updateKeys(event));


function updateKeys(event) {
  const changeTo = event.type === "keydown" ? true : false;
  const key = event.key;  
  
  switch (key) {
    case "w":
      player1.keys.up = changeTo;
      break;
    case "s":
      player1.keys.down = changeTo;
      break;
    default:
      break;
  }
}