"use strict";

class Paddle {
  constructor(side, SCREEN_WIDTH, SCREEN_HEIGHT, color) {
    this.side = side;
    this.color = color;
  
    this.SCREEN_WIDTH = SCREEN_WIDTH;
    this.SCREEN_HEIGHT = SCREEN_HEIGHT;
  
  
    this.width = 20;
    this.height = 70;
    
    this.keys = {
      up: false,
      down: false
    }
    
    this.speed = 5;
    this.AIspeed = 4;
    
    this.position = {
      x: side == "left" ? 20 : (SCREEN_WIDTH - 20) - this.width,
      y: (SCREEN_HEIGHT / 2) - (this.height / 2)
    };
}
  
  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 25;
    ctx.shadowColor = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.shadowBlur = 0;
    ctx.shadowColor = "#19191a";
  }
  
  update() {
    if (this.keys.up === true) {
      this.position.y -= this.speed;
    } 
    
    if (this.keys.down === true) {
      this.position.y += this.speed;
    }
  }
  
  checkWallCollision() {
    if (this.position.y < 0) {
      this.position.y = 0;
      
    }
    
    if (this.position.y + this.height > this.SCREEN_HEIGHT) {
      this.position.y = this.SCREEN_HEIGHT - this.height;
    }
  }
  
  
  checkBallHitPaddle(ball) {
    if ((ball.position.y + ball.radius >= this.position.y) && (ball.position.y - ball.radius <= this.position.y + this.height)) {
      if (this.side === "left") {
        if (ball.position.x - ball.radius <= this.position.x + this.width) {
          return "x";
        }
      } else if (this.side === "right") {
        if (ball.position.x + ball.radius >= this.position.x) {
          return "x";
        }
      }
    }
  
    if ((ball.position.x + ball.radius >= this.position.x) && (ball.position.x - ball.radius <= this.position.x + this.width)) {
      if ((ball.position.y + ball.radius >= this.position.y) && !(ball.position.y - ball.radius >= this.position.y + this.height)) {
        return "y";
      } else if ((ball.position.y - ball.radius <= this.position.y + this.height) && !(ball.position.y + ball.radius <= this.position.y)) {
        return "y";
      }
    }
  }
  
  checkBallBounce(ball, score) {
    const touching = this.checkBallHitPaddle(ball);
      
    if (touching === "x") {
      ball.xVel *= -1;
      ball.yVel += ((Math.random() * 4) - 2);
      ball.curl = 0;
      score.increment();
      
      if (this.keys.up === true && this.keys.down === false) { 
        ball.curl == -2;
      } else if (this.keys.down === true && this.keys.up === false) {
        ball.curl = 2;
      }
      
      
    } else if (touching === "y") {
      ball.yVel *= -1;
      ball.xVel += ((Math.random() * 4) - 2);
      ball.curl = 0;
      score.increment();
    }
  }
  
  ai(ball) {
    const justifiedY = this.position.y + (this.height / 2);

    if (ball.position.y + this.AIspeed > justifiedY) {
      this.position.y += this.AIspeed;
    }
    
    if (ball.position.y - this.AIspeed < justifiedY) {
      this.position.y -= this.AIspeed;
    }
  }
}