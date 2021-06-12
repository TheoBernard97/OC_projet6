import Map from "./map.js";

class Game {
    constructor() {
        const mapSize = 5;

        this.map = new Map(mapSize);
    }

    init (){
        console.log("Game start");
        this.map.init();
    }
}

export default Game;