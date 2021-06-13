import Map from "./map.js";

class Game {
    constructor() {
        const mapSize = 10;
        const numberOfRocks = 10;

        this.map = new Map(mapSize, numberOfRocks);
    }

    init (){
        console.log("Game start");
        this.map.init();
    }
}

export default Game;