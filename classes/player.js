class Player {
    constructor(id) {
        this.id = id;
        this.power = 10;
        this.health = 100;
        this.mobility = 3;
    }

    getHealth () {
        return this.health;
    }

    setHealth (newValue) {
        return this.health = newValue;
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