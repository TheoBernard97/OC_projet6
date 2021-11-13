/** @format */

import Game from "./classes/game.js";
let game = new Game();

const start = $(".start-btn");
start.click(() => {
  start.hide();
  game.init();
});

window["game"] = game;
