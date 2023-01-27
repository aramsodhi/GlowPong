"use strict";

class Ball {
  constructor(SCREEN_WIDTH, SCREEN_HEIGHT, color) {
    this.radius = 10;
    this.color = color;
    
    this.SCREEN_WIDTH = SCREEN_WIDTH;
    this.SCREEN_HEIGHT = SCREEN_HEIGHT;
    
    this.position = {
      x: SCREEN_WIDTH / 2,
      y: SCREEN_HEIGHT / 2
    };
    
    this.speed = 4;
    this.angle = (Math.random() * 40) - 20;
    this.xVelPre = this.speed * Math.cos(degRad("rad", this.angle));
    this.xVel = Math.random() > 0.5 ? this.xVelPre : this.xVelPre * (-1);
    this.yVel = this.speed * Math.sin(degRad("rad", this.angle));
    
    this.curl = 0;
  }
  
  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.shadowColor = "#19191a";
  }
  
  update() {
    this.position.x += this.xVel;
    this.position.y += this.yVel;
    
    
    if (this.xVel > 5) {
      this.xVel = 5;
    }
    
    
    if (this.yVel > 5) {
      this.yVel = 5;
    }
        
    if (this.yVel > 0) {
      this.curl -= 0.03;
    } else if (this.yVel < 0) {
      this.curl += 0.03;
    }
    
    //this.xVel += randomNumber(-1, 1);
    //this.yVel += randomNumber(-1, 1);
    
    this.position.y -= this.curl;
  }
  
  checkWallCollision(score) {
    if (this.position.x - this.radius < 0) {
      this.position.x = this.radius;
      this.xVel *= -1;
    }
    
    if (this.position.x + this.radius > this.SCREEN_WIDTH) {
      this.position.x = this.SCREEN_WIDTH - this.radius;
      this.xVel *= -1;
    }
    
    if (this.position.y - this.radius < 0) {
      this.position.y = this.radius;
      this.yVel *= -1;
      this.curl *= -1;
    }
    
    if(this.position.y + this.radius > this.SCREEN_HEIGHT) {
      this.position.y = this.SCREEN_HEIGHT - this.radius;
      this.yVel *= -1;
      this.curl *= -1;
    }
  }
  
  touchingSideWall() {
    if (this.position.x - this.radius <= 0) {
      return "left";
    }
    
    if (this.position.x + this.radius >= this.SCREEN_WIDTH) {
      return "right";
    }
  }
}