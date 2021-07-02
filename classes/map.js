import Weapon from "./weapon.js";
import Weapons from "../assets/weapons.js";
import Player from "./player.js";

class Map {
  constructor(mapSize, nomberOfRocks) {
    this.area = [];
    this.size = mapSize;
    this.rocks = nomberOfRocks;
    this.rocksPos = [];

    this.Swords = [];
    this.Player = [];

    this.player = new Player();
    this.weapon = new Weapon(Weapons);
  }

  init = () => {
    // console.log("1. Create area");
    this.createArea(this.size, this.area);
    // console.log("2. Add rocks");
    this.addRocks(this.area, this.rocks);
    // console.log("3. Create weapons");
    this.Swords = this.weapon.createWeapons(Weapons);
    // console.log("4. Add weapons");
    this.addWeapons(this.area, this.Swords);
    // console.log("5. Create players");
    this.Players = this.player.createPlayers();
    // console.log("6. Add players");
    this.addPlayers(this.area, this.Players);
    // console.log("7. Display area");
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
      if (randomPos.entityOnTheCase.length == 0) {
        const playerIsClose = this.checkIfPlayerIsClose(area, randomX, randomY);
        if (playerIsClose == true) {
          i--;
        }
        else {
          randomPos.isAccessible = false;
          randomPos.entityOnTheCase.push(players[i]);
          players[i].coordinates.x = randomX;
          players[i].coordinates.y = randomY;
        }
      }
      else {
        i--;
      }
    }
  }

  checkIfPlayerIsClose (area, xPos, yPos) {
    if (xPos - 1 >= 0){
      if (area[xPos - 1][yPos].entityOnTheCase.some((entity) => entity instanceof Player)){
        return true;
      }
    }
    if (xPos + 1 < area.length){
      if (area[xPos + 1][yPos].entityOnTheCase.some((entity) => entity instanceof Player)){
        return true;
      }
    }
    if (yPos - 1 >= 0){
      if (area[xPos][yPos - 1].entityOnTheCase.some((entity) => entity instanceof Player)){
        return true;
      }
    }
    if (yPos + 1 < area.length){
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

  displyReachableCases(area, player) {
    console.log("Player: ", player.coordinates);

    const xPos = player.coordinates.x;
    const yPos = player.coordinates.y;
    
    //Check left cell
    for(let i = 1; i <= player.mobility; i++){
      if (yPos - i >= 0){
        if (area[xPos][yPos - i].isAccessible){
          const dataID = xPos + "." + (yPos - i);
          const cell = document.querySelector("[data-id|='" + dataID + "']");
          cell.setAttribute("class", "reachable-cell");
        }
        else {
          i = player.mobility + 1;
        }
      }
    }

    //Check top cell
    for(let i = 1; i <= player.mobility; i++){
      if (xPos - i >= 0){
        if (area[xPos - i][yPos].isAccessible){
          const dataID = (xPos - i) + "." + yPos;
          const cell = document.querySelector("[data-id|='" + dataID + "']");
          cell.setAttribute("class", "reachable-cell");
        }
        else {
          i = player.mobility + 1;
        }
      }
    }
    
    //Check right cell
    for(let i = 1; i <= player.mobility; i++){
      if (xPos + i < area.length){
        if (area[xPos + i][yPos].isAccessible){
          const dataID = (xPos + i) + "." + yPos;
          const cell = document.querySelector("[data-id|='" + dataID + "']");
          cell.setAttribute("class", "reachable-cell");
        }
        else {
          i = player.mobility + 1;
        }
      }
    }

    //Check bottom cell
    for(let i = 1; i <= player.mobility; i++){
      if (yPos + i < area.length){
        if (area[xPos][yPos + i].isAccessible){
          const dataID = xPos + "." + (yPos + i);
          const cell = document.querySelector("[data-id|='" + dataID + "']");
          cell.setAttribute("class", "reachable-cell");
        }
        else {
          i = player.mobility + 1;
        }
      }
    }
  }
}

export default Map;