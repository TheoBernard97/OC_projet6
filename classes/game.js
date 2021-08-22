/** @format */

import Map from "./map.js";
import Weapon from "./weapon.js";
import Weapons from "../assets/weapons.js";
import Player from "./player.js";
import BattleLogic from "./battleLogic.js";

class Game {
  constructor() {
    const mapSize = 10;
    const numberOfRocks = 20;
    // 4 Weapons
    // 2 Players
    this.currentTurn = 0;
    this.playerTurn = 0;

    this.BattleLogic = new BattleLogic();
    this.map = new Map(mapSize, numberOfRocks, this);
  }

  init() {
    this.setupEventListeners();
    console.log("Game start");
    this.map.init();
    this.researchPhase();
  }

  setupEventListeners() {
    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("reachable-cell")) {
        this.map.updatePlayerCoordinates(event.srcElement.attributes[0].value);
        this.researchPhase();
      }
    });
  }

  researchPhase() {
    this.updateTurnInfo();
    this.updatePlayersInfo();

    // Show reachables cases
    this.map.displayReachableCases(
      this.map.area,
      this.map.Players[this.playerTurn - 1]
    );
    // Wait for a click
    // Move the player on each case beetween the selected one
    // Get a weapon if the player walk on one or exchange weapons if he already have one
    // Check if the player is close to the other player

    // Update playerTurn
    // Update currentTurn if Player2 was moving
    // Rerun the method
    // this.map.displayArea();
  }

  updateTurnInfo() {
    const htmlPlayerTurn = document.querySelector(".player-turn");

    if (this.playerTurn == 1) {
      this.playerTurn = 2;
    } else {
      this.currentTurn++;
      this.playerTurn = 1;
    }

    htmlPlayerTurn.innerHTML = this.playerTurn;
  }

  updatePlayersInfo() {
    const hpPlayer1 = document.querySelector(".hp-player1");
    const hpPlayer2 = document.querySelector(".hp-player2");
    const atkPlayer1 = document.querySelector(".atk-player1");
    const atkPlayer2 = document.querySelector(".atk-player2");

    hpPlayer1.innerHTML = this.map.Players[0].health;
    hpPlayer2.innerHTML = this.map.Players[1].health;
    atkPlayer1.innerHTML = this.map.Players[0].power;
    atkPlayer2.innerHTML = this.map.Players[1].power;
  }

  battlePhase() {
    console.log("Battle Phase");
    this.displayActions();
  }

  displayActions() {
    this.updateTurnInfo();
    const actions = document.querySelector(".battle-ui");
    actions.style.display = "block";
    this.setupBattleListeners();
  }

  setupBattleListeners() {
    document.addEventListener("click", (event) => {
      let playingPlayer;
      let waitingPlayer;

      if (this.playerTurn == 1) {
        playingPlayer = 0;
        waitingPlayer = 1;
      } else {
        playingPlayer = 1;
        waitingPlayer = 0;
      }

      if (event.target.classList.contains("attack")) {
        const targetIsDead = this.BattleLogic.attack(
          this.map.Players[playingPlayer],
          this.map.Players[waitingPlayer]
        );
        this.battleTurn(targetIsDead);
      }
      if (event.target.classList.contains("defend")) {
        this.BattleLogic.defend(this.map.Players[playingPlayer]);
        this.battleTurn();
      }
    });
  }

  battleTurn(targetIsDead) {
    this.updatePlayersInfo();
    this.updateTurnInfo();
    if (targetIsDead) {
      this.displayWinScreen();
    }
  }

  displayWinScreen() {
    console.log("GG");
    const finalScreen = document.querySelector(".final");
    const winner = document.querySelector(".winner");
    const actions = document.querySelector(".battle-ui");
    actions.style.display = "none";
    finalScreen.style.display = "block";

    if (this.playerTurn == 1) {
      winner.innerHTML = "Red";
    } else {
      winner.innerHTML = "Blue";
    }
  }
}

export default Game;
