/** @format */

import Weapon from "./weapon.js";
import Weapons from "../assets/weapons.js";
import Player from "./player.js";
import Game from "./game.js";

class Map {
  constructor(mapSize, nomberOfRocks, game) {
    this.area = [];
    this.size = mapSize;
    this.rocks = nomberOfRocks;
    this.rocksPos = [];

    this.Swords = [];
    this.Player = [];

    this.game = game;
    this.player = new Player();
    this.weapon = new Weapon(Weapons);
  }

  init = () => {
    this.createArea(this.size, this.area);
    this.addRocks(this.area, this.rocks);
    this.Swords = this.weapon.createWeapons(Weapons);
    this.addWeapons(this.area, this.Swords);
    this.Players = this.player.createPlayers();
    this.addPlayers(this.area, this.Players);
    this.displayArea(this.area);
  };

  createArea(size, area) {
    console.log("Create a map with " + size * size + " cases");
    for (let i = 0; i < size; i++) {
      area.push([]);
      for (let j = 0; j < size; j++) {
        area[i].push({
          isAccessible: true,
          coordinates: {
            x: i,
            y: j,
          },
          entityOnTheCase: [],
        });
      }
    }
  }

  addRocks(area, rocks) {
    for (let i = 0; i < rocks; i++) {
      const randomX = Math.floor(Math.random() * area.length);
      const randomY = Math.floor(Math.random() * area.length);
      if (area[randomX][randomY].entityOnTheCase.length == 0) {
        area[randomX][randomY].isAccessible = false;
        area[randomX][randomY].entityOnTheCase.push("rock");
        this.rocksPos.push({ x: randomX, y: randomY });
      } else {
        i--;
      }
    }
  }

  addWeapons(area, weapons) {
    for (let i = 0; i < weapons.length; i++) {
      const randomX = Math.floor(Math.random() * area.length);
      const randomY = Math.floor(Math.random() * area.length);
      if (area[randomX][randomY].entityOnTheCase.length == 0) {
        area[randomX][randomY].entityOnTheCase.push(weapons[i]);
      } else {
        i--;
      }
    }
  }

  // TODO : Changer isAccessible en methode qui check ce que contient la cellule

  addPlayers(area, players) {
    for (let i = 0; i < players.length; i++) {
      const randomX = Math.floor(Math.random() * area.length);
      const randomY = Math.floor(Math.random() * area.length);
      const randomPos = area[randomX][randomY];
      if (randomPos.entityOnTheCase.length == 0) {
        const playerIsClose = this.checkIfPlayerIsClose(area, randomX, randomY);
        if (playerIsClose == true) {
          i--;
        } else {
          randomPos.isAccessible = false;
          randomPos.entityOnTheCase.push(players[i]);
          const newCoordinates = randomX + "." + randomY;
          this.player.setCoordinates(newCoordinates);
          players[i].coordinates.x = randomX;
          players[i].coordinates.y = randomY;
        }
      } else {
        i--;
      }
    }
  }

  checkIfPlayerIsClose(area, xPos, yPos) {
    if (xPos - 1 >= 0) {
      if (
        area[xPos - 1][yPos].entityOnTheCase.some(
          (entity) => entity instanceof Player
        )
      ) {
        return true;
      }
    }
    if (xPos + 1 < area.length) {
      if (
        area[xPos + 1][yPos].entityOnTheCase.some(
          (entity) => entity instanceof Player
        )
      ) {
        return true;
      }
    }
    if (yPos - 1 >= 0) {
      if (
        area[xPos][yPos - 1].entityOnTheCase.some(
          (entity) => entity instanceof Player
        )
      ) {
        return true;
      }
    }
    if (yPos + 1 < area.length) {
      if (
        area[xPos][yPos + 1].entityOnTheCase.some(
          (entity) => entity instanceof Player
        )
      ) {
        return true;
      }
    }
    return false;
  }

  displayArea(area) {
    const map = document.querySelector(".map");

    area.forEach((element) => {
      const newDiv = document.createElement("div");
      map.appendChild(newDiv);
    });

    const divs = document.querySelectorAll(".map>div");

    divs.forEach((element, index) => {
      for (let i = 0; i < divs.length; i++) {
        const newDiv = document.createElement("div");
        const idPos = index + "." + i;
        newDiv.setAttribute("data-id", idPos);
        if (
          area[index][i].entityOnTheCase.some((entity) => entity === "rock")
        ) {
          newDiv.setAttribute("class", "rock");
        } else if (
          area[index][i].entityOnTheCase.some(
            (entity) => entity instanceof Player
          )
        ) {
          const cssClass =
            "player" +
            area[index][i].entityOnTheCase.find(
              (entity) => entity instanceof Player
            ).id;
          newDiv.setAttribute("class", cssClass);
        } else if (
          area[index][i].entityOnTheCase.some(
            (entity) => entity instanceof Weapon
          )
        ) {
          const cssID =
            "weapon" +
            area[index][i].entityOnTheCase.find(
              (entity) => entity instanceof Weapon
            ).weaponId;
          newDiv.setAttribute("id", cssID);
        }
        element.appendChild(newDiv);
      }
    });

    const gameboard = document.querySelector(".gameboard");
    gameboard.style.display = "block";
  }

  displayReachableCases(area, player) {
    const xPos = player.coordinates.x;
    const yPos = player.coordinates.y;

    //Check top cell
    for (let i = 1; i <= player.mobility; i++) {
      if (yPos - i >= 0) {
        if (area[xPos][yPos - i].isAccessible) {
          const dataID = xPos + "." + (yPos - i);
          const cell = document.querySelector("[data-id|='" + dataID + "']");
          cell.setAttribute("class", "reachable-cell");
        } else {
          break;
        }
      }
    }

    //Check left cell
    for (let i = 1; i <= player.mobility; i++) {
      if (xPos - i >= 0) {
        if (area[xPos - i][yPos].isAccessible) {
          const dataID = xPos - i + "." + yPos;
          const cell = document.querySelector("[data-id|='" + dataID + "']");
          cell.setAttribute("class", "reachable-cell");
        } else {
          break;
        }
      }
    }

    //Check right cell
    for (let i = 1; i <= player.mobility; i++) {
      if (xPos + i < area.length) {
        if (area[xPos + i][yPos].isAccessible) {
          const dataID = xPos + i + "." + yPos;
          const cell = document.querySelector("[data-id|='" + dataID + "']");
          cell.setAttribute("class", "reachable-cell");
        } else {
          break;
        }
      }
    }

    //Check bottom cell
    for (let i = 1; i <= player.mobility; i++) {
      if (yPos + i < area.length) {
        if (area[xPos][yPos + i].isAccessible) {
          const dataID = xPos + "." + (yPos + i);
          const cell = document.querySelector("[data-id|='" + dataID + "']");
          cell.setAttribute("class", "reachable-cell");
        } else {
          break;
        }
      }
    }
  }

  updatePlayerCoordinates(newCoordinates) {
    const player = this.Players[this.game.playerTurn - 1];
    const oldCoordinates = player.getCoordinates();

    // Remove player from oldCoordinates
    this.area[oldCoordinates.x][oldCoordinates.y].entityOnTheCase.pop();
    this.area[oldCoordinates.x][oldCoordinates.y].isAccessible = true;

    // Set player newCoordinates
    player.setCoordinates(newCoordinates);
    const coordinates = player.getCoordinates();

    this.checkIfPlayerWalksOnAWeapon(player, oldCoordinates, coordinates);

    // Add player to newCoordinates
    this.area[coordinates.x][coordinates.y].entityOnTheCase.push(player);
    this.area[coordinates.x][coordinates.y].isAccessible = false;

    // Trigger the battle phase if the players are close
    const playerIsClose = this.checkIfPlayerIsClose(
      this.area,
      coordinates.x,
      coordinates.y
    );
    if (playerIsClose) {
      const map = document.querySelector(".map");
      map.style.display = "none";
      this.game.battlePhase();
    }

    // Update map cells
    this.updateArea(this.area, this.Players, player);
  }

  checkIfPlayerWalksOnAWeapon(player, oldCoordinates, newCoordinates) {
    let direction;
    let distance;

    if (oldCoordinates.x - newCoordinates.x > 0) {
      direction = "west";
      distance = Math.abs(oldCoordinates.x - newCoordinates.x);
    } else if (oldCoordinates.x - newCoordinates.x < 0) {
      direction = "east";
      distance = Math.abs(oldCoordinates.x - newCoordinates.x);
    } else if (oldCoordinates.y - newCoordinates.y > 0) {
      direction = "north";
      distance = Math.abs(oldCoordinates.y - newCoordinates.y);
    } else if (oldCoordinates.y - newCoordinates.y < 0) {
      direction = "south";
      distance = Math.abs(oldCoordinates.y - newCoordinates.y);
    }

    if (direction == "west") {
      for (let i = 1; i <= distance; i++) {
        if (
          this.area[oldCoordinates.x - i][
            oldCoordinates.y
          ].entityOnTheCase.find((entity) => entity instanceof Weapon)
        ) {
          const newWeapon = this.area[oldCoordinates.x - i][
            oldCoordinates.y
          ].entityOnTheCase.find((entity) => entity instanceof Weapon);
          const oldWeapon = this.grabWeapon(player, newWeapon);
          this.area[oldCoordinates.x - i][
            oldCoordinates.y
          ].entityOnTheCase.pop();
          this.area[oldCoordinates.x - i][
            oldCoordinates.y
          ].entityOnTheCase.push(oldWeapon);
          if (oldWeapon) {
            console.log("Throw weapon", oldWeapon.weaponId);
          }
        }
      }
    } else if (direction == "east") {
      for (let i = 1; i <= distance; i++) {
        if (
          this.area[oldCoordinates.x + i][
            oldCoordinates.y
          ].entityOnTheCase.find((entity) => entity instanceof Weapon)
        ) {
          const newWeapon = this.area[oldCoordinates.x + i][
            oldCoordinates.y
          ].entityOnTheCase.find((entity) => entity instanceof Weapon);
          const oldWeapon = this.grabWeapon(player, newWeapon);
          this.area[oldCoordinates.x + i][
            oldCoordinates.y
          ].entityOnTheCase.pop();
          this.area[oldCoordinates.x + i][
            oldCoordinates.y
          ].entityOnTheCase.push(oldWeapon);
          if (oldWeapon) {
            console.log("Throw weapon", oldWeapon.weaponId);
          }
        }
      }
    } else if (direction == "north") {
      for (let i = 1; i <= distance; i++) {
        if (
          this.area[oldCoordinates.x][
            oldCoordinates.y - i
          ].entityOnTheCase.find((entity) => entity instanceof Weapon)
        ) {
          const newWeapon = this.area[oldCoordinates.x][
            oldCoordinates.y - i
          ].entityOnTheCase.find((entity) => entity instanceof Weapon);
          const oldWeapon = this.grabWeapon(player, newWeapon);
          this.area[oldCoordinates.x][
            oldCoordinates.y - i
          ].entityOnTheCase.pop();
          this.area[oldCoordinates.x][
            oldCoordinates.y - i
          ].entityOnTheCase.push(oldWeapon);
          if (oldWeapon) {
            console.log("Throw weapon", oldWeapon.weaponId);
          }
        }
      }
    } else if (direction == "south") {
      for (let i = 1; i <= distance; i++) {
        if (
          this.area[oldCoordinates.x][
            oldCoordinates.y + i
          ].entityOnTheCase.find((entity) => entity instanceof Weapon)
        ) {
          const newWeapon = this.area[oldCoordinates.x][
            oldCoordinates.y + i
          ].entityOnTheCase.find((entity) => entity instanceof Weapon);
          const oldWeapon = this.grabWeapon(player, newWeapon);
          this.area[oldCoordinates.x][
            oldCoordinates.y + i
          ].entityOnTheCase.pop();
          this.area[oldCoordinates.x][
            oldCoordinates.y + i
          ].entityOnTheCase.push(oldWeapon);
          if (oldWeapon) {
            console.log("Throw weapon", oldWeapon.weaponId);
          }
        }
      }
    }
  }

  grabWeapon(player, newWeapon) {
    console.log("GrabWeapon", newWeapon.weaponId);
    let playerWeapon = player.getWeapon();
    player.setWeapon(newWeapon);
    player.setPower(newWeapon.power);

    if (playerWeapon) {
      let newPower = player.power - playerWeapon.power;
      player.setPower(newPower);
      return playerWeapon;
    }
  }

  updateArea(area, Players, player) {
    // Remove old data from the previous concerned cells

    const divs = document.querySelectorAll(".map>div");

    const xPos = player.coordinates.x;
    const yPos = player.coordinates.y;

    //Check top cell
    for (let i = 1; i <= player.mobility; i++) {
      if (yPos - i >= 0) {
        if (area[xPos][yPos - i].isAccessible) {
          const dataID = xPos + "." + (yPos - i);
          const cell = document.querySelector("[data-id|='" + dataID + "']");
          cell.classList.remove("reachable-cell");
        } else {
          break;
        }
      }
    }

    //Check left cell
    for (let i = 1; i <= player.mobility; i++) {
      if (xPos - i >= 0) {
        if (area[xPos - i][yPos].isAccessible) {
          const dataID = xPos - i + "." + yPos;
          const cell = document.querySelector("[data-id|='" + dataID + "']");
          cell.classList.remove("reachable-cell");
        } else {
          break;
        }
      }
    }

    //Check right cell
    for (let i = 1; i <= player.mobility; i++) {
      if (xPos + i < area.length) {
        if (area[xPos + i][yPos].isAccessible) {
          const dataID = xPos + i + "." + yPos;
          const cell = document.querySelector("[data-id|='" + dataID + "']");
          cell.classList.remove("reachable-cell");
        } else {
          break;
        }
      }
    }

    //Check bottom cell
    for (let i = 1; i <= player.mobility; i++) {
      if (yPos + i < area.length) {
        if (area[xPos][yPos + i].isAccessible) {
          const dataID = xPos + "." + (yPos + i);
          const cell = document.querySelector("[data-id|='" + dataID + "']");
          cell.classList.remove("reachable-cell");
        } else {
          break;
        }
      }
    }

    divs.forEach((element, index) => {
      for (let i = 0; i < divs.length; i++) {
        // Select the html cell ralated to the JS object
        const cellID = index + "." + i;
        const div = document.querySelector("[data-id|='" + cellID + "']");

        // Add class when there is a player on the cell
        if (
          area[index][i].entityOnTheCase.some(
            (entity) => entity instanceof Player
          )
        ) {
          const cssClass =
            "player" +
            area[index][i].entityOnTheCase.find(
              (entity) => entity instanceof Player
            ).id;
          div.removeAttribute("id");
          div.setAttribute("class", cssClass);
        }

        // Add class when there is a weapon on the cell
        else if (
          area[index][i].entityOnTheCase.some(
            (entity) => entity instanceof Weapon
          )
        ) {
          const cssID =
            "weapon" +
            area[index][i].entityOnTheCase.find(
              (entity) => entity instanceof Weapon
            ).weaponId;
          div.setAttribute("id", cssID);
        }

        // Remove class when the cell is accessible
        if (area[index][i].isAccessible) {
          div.classList.remove("reachable-cell");
          if (area[index][i].entityOnTheCase == 0) {
            div.removeAttribute("id");
            div.className = "";
          }
        }
      }
    });
  }
}

export default Map;
