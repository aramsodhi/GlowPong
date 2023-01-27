"use strict";

function randomColor() {
  const colors = ["#FFFF00", "#FF0000", "#00FF00", "#00FFFF", "#FF00FF"];
  const chosen = colors[Math.round(Math.random() * (colors.length - 1))]

  return chosen;
}

function degRad(convertTo, value) {
  if (convertTo === "deg") {
    return value / (Math.PI / 180);
  }
  
  if (convertTo === "rad") {
    return value * (Math.PI / 180);
  }
}
