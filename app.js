/** @format */

import Game from "./classes/game.js";
let game = new Game();

const start = $(".start-btn");
const lobby = $(".lobby");
start.click(() => {
  lobby.hide();
  game.init();
});

window["game"] = game;
