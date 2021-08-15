import Map from "./map.js";
import Weapon from "./weapon.js";
import Weapons from "../assets/weapons.js";
import Player from "./player.js";

class Game {
    constructor() {
        const mapSize = 10;
        const numberOfRocks = 20;
        // 4 Weapons
        // 2 Players
        this.currentTurn = 0;
        this.playerTurn = 0;

        this.map = new Map(mapSize, numberOfRocks, this);
    }

    init (){
        this.setupEventListener();
        console.log("Game start");
        this.map.init();
        this.researchPhase();
    }

    setupEventListener() {
        document.addEventListener("click", event => {
            if (!event.target.classList.contains('reachable-cell')) return;
            this.map.updatePlayerCoordinates(event.srcElement.attributes[0].value);
            this.researchPhase();
          });
    }

    researchPhase () {
        this.updateTurnInfo();
        this.updatePlayersInfo();

        // Show reachables cases
        this.map.displyReachableCases(this.map.area, this.map.Players[this.playerTurn - 1]);
        // Wait for a click
        // Move the player on each case beetween the selected one
        // Get a weapon if the player walk on one or exchange weapons if he already have one
        // Check if the player is close to the other player

        // Update playerTurn
        // Update currentTurn if Player2 was moving
        // Rerun the method
        // this.map.displayArea();
    }

    updateTurnInfo(){
        const htmlPlayerTurn = document.querySelector(".player-turn");
        const htmlCurrentTurn = document.querySelector(".current-turn");

        if (this.playerTurn == 1){
            this.playerTurn = 2;
        }
        else{
            this.currentTurn++;
            this.playerTurn = 1;
        }
    }
    
    updatePlayersInfo(){
        const hpPlayer1 = document.querySelector(".hp-player1");
        const hpPlayer2 = document.querySelector(".hp-player2");
        const atkPlayer1 = document.querySelector(".atk-player1");
        const atkPlayer2 = document.querySelector(".atk-player2");

        hpPlayer1.innerHTML = this.map.Players[0].health;
        hpPlayer2.innerHTML = this.map.Players[1].health;
        atkPlayer1.innerHTML = this.map.Players[0].power;
        atkPlayer2.innerHTML = this.map.Players[1].power;
    }

    battlePhase (){

    }
}

export default Game;