/** @format */

import Game from "./classes/game.js";

let game = new Game();

const start = document.querySelector(".start-btn");
start.addEventListener("click", () => {
  start.style.display = "none";
  game.init();
});

window["game"] = game;
