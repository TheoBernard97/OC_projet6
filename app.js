import Game from "./classes/game.js";

let game = new Game();

const start = document.querySelector(".start-btn");
start.addEventListener("click", () => {
    start.setAttribute("disabled" ,"true");
    game.init();
});