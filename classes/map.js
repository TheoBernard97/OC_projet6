import Weapon from "./weapon.js";
import Weapons from "../assets/weapons.js";
import Player from "./player.js";

class Map {
  constructor(mapSize, nomberOfRocks) {
    this.area = [];
    this.size = mapSize;
    this.rocks = nomberOfRocks;
    this.rocksPos = [];

    this.player = new Player();
    this.weapon = new Weapon(Weapons);
  }

  init = () => {
    console.log("1. Create area");
    this.createArea(this.size, this.area);
    console.log("2. Add rocks");
    this.addRocks(this.area, this.rocks);
    console.log("3. Create weapons");
    const Swords = this.weapon.createWeapons(Weapons);
    console.log("4. Add weapons");
    this.addWeapons(this.area, Swords);
    console.log("5. Create players");
    const Players = this.player.createPlayers();
    console.log("6. Add players");
    this.addPlayers(this.area, Players);
    console.log("7. Display area");
    this.displayArea(this.area);
    console.log(this.area);
  }

  createArea (size, area) {
    console.log("Create a map with " + size * size + " cases");
    for (let i = 0; i < size; i++){
      area.push([]);
      for (let j = 0; j < size; j++){
        area[i].push({
          isAccessible : true,
          coordinates : {
            x : i, 
            y : j
          },
          entityOnTheCase : []
        });
      }
    }
  }
    
  addRocks (area, rocks) {
    for (let i = 0; i < rocks; i++) {
      const randomX = Math.floor(Math.random() * area.length); 
      const randomY = Math.floor(Math.random() * area.length);
      if (area[randomX][randomY].entityOnTheCase.length == 0) {
        area[randomX][randomY].isAccessible = false;
        area[randomX][randomY].entityOnTheCase.push("rock");
        this.rocksPos.push({ x : randomX, y : randomY});
      }
      else {
        i--;
      }
    }
  }

  addWeapons (area, weapons) {
    for (let i = 0; i < weapons.length; i++) {
      const randomX = Math.floor(Math.random() * area.length); 
      const randomY = Math.floor(Math.random() * area.length);
      if (area[randomX][randomY].entityOnTheCase.length == 0) {
        area[randomX][randomY].entityOnTheCase.push(weapons[i]);
      }
      else {
        i--;
      }
    }
  }

  addPlayers(area, players) {
    for (let i = 0; i < players.length; i++) {
      const randomX = Math.floor(Math.random() * area.length); 
      const randomY = Math.floor(Math.random() * area.length);
      const randomPos = area[randomX][randomY];
      console.log("randomX: ", randomX);
      console.log("randomY: ", randomY);
      console.log("randomPos: ", randomPos);
      if (randomPos.entityOnTheCase.length == 0) {
        // const playerIsClose = checkIfPlayerIsClose(area, randomX, randomY);
        // console.log("playerIsClose: ", playerIsClose);
        // if (playerIsClose) {
        //   i--;
        // }
        // else {
          randomPos.isAccessible = false;
          randomPos.entityOnTheCase.push(players[i]);
        // }
      }
      else {
        i--;
      }
    }
  }

  // Check if the case exist then check if their is a player in the case
  checkIfPlayerIsClose (area, xPos, yPos) {
    console.log("area[randomX + 1][randomY] : ", area[xPos + 1][yPos])
    console.log("area[randomX -1 ][randomY] : ", area[xPos - 1][yPos]);
    console.log("area[randomX][randomY + 1] : ", area[xPos][yPos + 1]);
    console.log("area[randomX][randomY - 1] : ", area[xPos][yPos - 1]);
    if (area[xPos + 1][yPos]){
      if (area[xPos + 1][yPos].entityOnTheCase.some((entity) => entity instanceof Player)){
        return true;
      }
    }
    if (area[xPos - 1][yPos]) {
      if (area[xPos - 1][yPos].entityOnTheCase.some((entity) => entity instanceof Player)){
        return true;
      }
    }
    if (area[xPos][yPos - 1]) {
      if (area[xPos][yPos - 1].entityOnTheCase.some((entity) => entity instanceof Player)){
        return true;
      }
    }
    if (area[xPos][yPos + 1]) {
      if (area[xPos][yPos + 1].entityOnTheCase.some((entity) => entity instanceof Player)){
        return true;
      }
    }
    return false;
  }

  displayArea (area) {
    const map = document.querySelector(".map");

    area.forEach(element => {
      const newDiv = document.createElement("div");
      map.appendChild(newDiv);
    });

    const divs = document.querySelectorAll(".map>div");

    divs.forEach((element, index) => {
      for (let i = 0; i < divs.length ;i++) {
        const newDiv = document.createElement("div");
        const idPos = index + "." + i;
        newDiv.setAttribute("data-id", idPos);
        if (area[index][i].entityOnTheCase.some((entity) => entity === "rock")){
          newDiv.setAttribute("class", "rock");
        }
        else if (area[index][i].entityOnTheCase.some((entity) => entity instanceof Player)){
          const cssClass = "player" + area[index][i].entityOnTheCase.find((entity) => entity instanceof Player).id;
          newDiv.setAttribute("class", cssClass);
        }
        else if (area[index][i].entityOnTheCase.some((entity) => entity instanceof Weapon)){
          const cssClass = "weapon" + area[index][i].entityOnTheCase.find((entity) => entity instanceof Weapon).weaponId;
          newDiv.setAttribute("class", cssClass);
        }
        element.appendChild(newDiv);
      }
    });

    const gameboard = document.querySelector(".gameboard");
    gameboard.style.display = "block";
  }
}

export default Map;