import Map from "./map.js";
import Weapon from "./weapon.js";
import Weapons from "../assets/weapons.js";
import Player from "./player.js";

class Game {
    constructor() {
        const mapSize = 10;
        const numberOfRocks = 15;
        // 4 Weapons
        // 2 Players
        this.currentTurn = 0;
        this.playerTurn = 0;

        this.map = new Map(mapSize, numberOfRocks);
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
            console.log(event.srcElement.attributes[0].value);
          });
    }

    researchPhase () {
        console.log("Research phase !");
        this.updateTurnInfo();

        // Show reachables cases
        this.map.displyReachableCases(this.map.area, this.map.Players[this.playerTurn - 1]);
        // Wait for a click
        // Move the player on each case between the selected one 
        // Get a weapon if the player walk on one or exchange weapons if he already have one
        // Check if the player is close to the other player
        // Update playerTurn
        // Update currentTurn if Player2 was moving
        // Rerun the method
    }

    updateTurnInfo(){
        const htmlPlayerTurn = document.querySelector(".player-turn");
        const htmlCurrentTurn = document.querySelector(".current-turn");
        this.currentTurn++;
        htmlCurrentTurn.innerHTML = this.currentTurn;

        if (this.playerTurn == 1){
            this.playerTurn = 2;
            htmlPlayerTurn.innerHTML = this.currentTurn;
        }
        else{
            this.playerTurn = 1;
            htmlPlayerTurn.innerHTML = this.currentTurn;
        }
    }
}

export default Game;