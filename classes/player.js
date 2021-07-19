class Player {
    constructor(id) {
        this.id = id;
        this.coordinates = {
            x: null,
            y: null
        };
        this.power = 10;
        this.health = 100;
        this.mobility = 3;
    }

    getHealth () {
        return this.health;
    }

    setHealth (newHealth) {
        return this.health = newHealth;
    }

    getCoordinates () {
        return this.coordinates;
    }

    setCoordinates (newCoordinates) {
        const arrayCoordinates = newCoordinates.split(".");
        const coordinates = {
            x : parseInt(arrayCoordinates[0], 10),
            y : parseInt(arrayCoordinates[1], 10)
        }
        return this.coordinates = coordinates;
    }

    createPlayers () {
        const Players = [];
        for (let i = 0; i < 2; i++) {
            let id = i + 1;
            const player = new Player(id);
            Players.push(player);
        }
        return Players;
    }
}

export default Player;