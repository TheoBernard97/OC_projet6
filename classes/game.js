import Map from "./map.js";

class Game {
    constructor() {
        const mapSize = 10;
        const numberOfRocks = 15;
        // 4 Weapons
        // 2 Players

        this.map = new Map(mapSize, numberOfRocks);
    }

    init (){
        console.log("Game start");
        this.map.init();
    }
}

export default Game;