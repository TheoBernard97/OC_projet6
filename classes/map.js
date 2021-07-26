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
          const newCoordinates = randomX + "." + randomY;
          this.player.setCoordinates(newCoordinates);
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
          const cssID = "weapon" + area[index][i].entityOnTheCase.find((entity) => entity instanceof Weapon).weaponId;
          newDiv.setAttribute("id", cssID);
        }
        element.appendChild(newDiv);
      }
    });

    const gameboard = document.querySelector(".gameboard");
    gameboard.style.display = "block";
  }

  displyReachableCases(area, player) {
    const xPos = player.coordinates.x;
    const yPos = player.coordinates.y;
    
    //Check top cell
    for(let i = 1; i <= player.mobility; i++){
      if (yPos - i >= 0){
        if (area[xPos][yPos - i].isAccessible){
          const dataID = xPos + "." + (yPos - i);
          const cell = document.querySelector("[data-id|='" + dataID + "']");
          cell.setAttribute("class", "reachable-cell");
        }
        else {
          break;
        }
      }
    }

    //Check left cell
    for(let i = 1; i <= player.mobility; i++){
      if (xPos - i >= 0){
        if (area[xPos - i][yPos].isAccessible){
          const dataID = (xPos - i) + "." + yPos;
          const cell = document.querySelector("[data-id|='" + dataID + "']");
          cell.setAttribute("class", "reachable-cell");
        }
        else {
          break;
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
          break;
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
          break;
        }
      }
    }
  }

  updatePlayerCoordinates(newCoordinates){
    const player = this.Players[this.game.playerTurn - 1];
    const oldCoordinates = player.getCoordinates();

    // Remove player from oldCoordinates
    this.area[oldCoordinates.x][oldCoordinates.y].entityOnTheCase.pop();

    // Update map cells 
    // this.updateArea(this.area, this.Players, this.game.playerTurn)

    // Set player newCoordinates
    player.setCoordinates(newCoordinates);
    const coordinates = player.getCoordinates();
    
    // Add player to newCoordinates
    this.area[coordinates.x][coordinates.y].entityOnTheCase.push(player);

    // Update map cells 
    this.updateArea(this.area, this.Players, this.game.playerTurn); //TODO passer directement le joueur déjà récup igne 228
  }

  updateArea (area, Players, playerTurn){
    // Remove old data from the previous concerned cells

    const divs = document.querySelectorAll(".map>div");

    const player = Players[playerTurn - 1];

    const xPos = player.coordinates.x
    const yPos = player.coordinates.y
    
    //Check top cell
    for(let i = 1; i <= player.mobility; i++){
      if (yPos - i >= 0){
        if (area[xPos][yPos - i].isAccessible){
          const dataID = xPos + "." + (yPos - i);
          const cell = document.querySelector("[data-id|='" + dataID + "']");
          cell.classList.remove("reachable-cell");
        }
        else {
          break;
        }
      }
    }

    //Check left cell
    for(let i = 1; i <= player.mobility; i++){
      if (xPos - i >= 0){
        if (area[xPos - i][yPos].isAccessible){
          const dataID = (xPos - i) + "." + yPos;
          const cell = document.querySelector("[data-id|='" + dataID + "']");
          cell.classList.remove("reachable-cell");
        }
        else {
          break;
        }
      }
    }
    
    //Check right cell
    for(let i = 1; i <= player.mobility; i++){
      if (xPos + i < area.length){
        if (area[xPos + i][yPos].isAccessible){
          const dataID = (xPos + i) + "." + yPos;
          const cell = document.querySelector("[data-id|='" + dataID + "']");
          cell.classList.remove("reachable-cell");
        }
        else {
          break;
        }
      }
    }

    //Check bottom cell
    for(let i = 1; i <= player.mobility; i++){
      if (yPos + i < area.length){
        if (area[xPos][yPos + i].isAccessible){
          const dataID = xPos + "." + (yPos + i);
          const cell = document.querySelector("[data-id|='" + dataID + "']");
          cell.classList.remove("reachable-cell");
        }
        else {
          break;
        }
      }
    }

    divs.forEach((element, index) => {
      for (let i = 0; i < divs.length ;i++) {

        // Select the html cell ralated to the JS object
        const cellID = index + "." + i;
        const div = document.querySelector("[data-id|='" + cellID + "']");

        // Add class when there is a player on the cell
        if (area[index][i].entityOnTheCase.some((entity) => entity instanceof Player)){
          const cssClass = "player" + area[index][i].entityOnTheCase.find((entity) => entity instanceof Player).id;
          div.setAttribute("class", cssClass);
        }

        // Add class when there is a weapon on the cell
        if (area[index][i].entityOnTheCase.some((entity) => entity instanceof Weapon)){
          const cssID = "weapon" + area[index][i].entityOnTheCase.find((entity) => entity instanceof Weapon).weaponId;
          div.setAttribute("id", cssID);
        }

        // Remove clas when there is nothing on the cell
        if (area[index][i].entityOnTheCase.length == 0){
          div.className = "";
        }
      }
    });
  }
}

export default Map;