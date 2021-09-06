/** @format */

class Player {
  constructor(id) {
    this.id = id;
    this.coordinates = {
      x: null,
      y: null,
    };
    this.health = 100;
    this.power = 10;
    this.defense = 1;
    this.mobility = 3;
    this.weapon = null;
  }

  getHealth() {
    return this.health;
  }

  setHealth(newHealth) {
    return (this.health = newHealth);
  }

  takeDamage(damages) {
    return (this.health = Math.max(this.health - damages, 0));
  }

  getPower() {
    return this.power;
  }

  setPower(newPower) {
    return (this.power = newPower);
  }

  getDefense() {
    return this.defense;
  }

  setDefense(newDefense) {
    return (this.defense = newDefense);
  }

  getCoordinates() {
    return this.coordinates;
  }

  setCoordinates(newCoordinates) {
    const arrayCoordinates = newCoordinates.split(".");
    const coordinates = {
      x: parseInt(arrayCoordinates[0], 10),
      y: parseInt(arrayCoordinates[1], 10),
    };
    return (this.coordinates = coordinates);
  }

  getWeapon() {
    return this.weapon;
  }

  setWeapon(newWeapon) {
    return (this.weapon = newWeapon);
  }

  grabWeapon(newWeapon) {
    console.log("Player", this.id, "grab Sword", newWeapon.weaponId);
    let playerWeapon = this.getWeapon();
    this.setWeapon(newWeapon);
    this.setPower(newWeapon.power);

    if (playerWeapon) {
      return playerWeapon;
    }
  }

  createPlayers() {
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
