"use strict";


class Stat {
  constructor(value, label, x, y, color) {
    this.value = value;
    this.label = label;
    
    this.color = color;
    
    this.position = {
      x: x,
      y: y
    };
  }
  
  render(ctx) {
    ctx.font = "22px VT323";
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.label}: ${this.value}`, this.position.x, this.position.y);
  }
  
  update(text) {
    this.value = String(text);
  }
  
  increment() {
    const current = parseInt(this.value);
    const incremented = current + 1;
        
    this.update(incremented);
  }
}