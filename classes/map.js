import Weapon from "./weapon.js";
import Weapons from "../assets/weapons.js";

class Map {
  constructor(mapSize, nomberOfRocks, nomberOfWeapons) {
    this.area = [];
    this.size = mapSize;
    this.rocks = nomberOfRocks;
    this.rocksPos = [];
    this.weapons = nomberOfWeapons;
    this.weaponsPos = [];

    this.weapon = new Weapon(Weapons);
  }

  init = () => {
    this.createArea(this.size, this.area);
    this.addRocks(this.area, this.rocks);
    const Swords = this.weapon.createWeapons(Weapons);
    this.addWeapons(this.area, Swords);
    // this.createPlayers();
    // this.addPlayers();
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
            x : i + 1, 
            y : j + 1
          },
          entityOnTheCase : null
        });
      }
    }
  }
    
  addRocks (area, rocks) {
    for (let i = 0; i < rocks; i++) {
      const randomX = Math.floor(Math.random() * area.length) + 1; 
      const randomY = Math.floor(Math.random() * area.length) + 1;
      if (!area[randomX - 1][randomY -1].entityOnTheCase) {
        area[randomX - 1][randomY -1].isAccessible = false;
        area[randomX - 1][randomY -1].entityOnTheCase = "rock";
        this.rocksPos.push({ x : randomX - 1, y : randomY - 1});
      }
      else {
        i--;
      }
    }
  }

  addWeapons (area, weapons) {
    for (let i = 0; i < weapons.length; i++) {
      const randomX = Math.floor(Math.random() * area.length) + 1; 
      const randomY = Math.floor(Math.random() * area.length) + 1;
      if (!area[randomX - 1][randomY -1].entityOnTheCase) {
        area[randomX - 1][randomY -1].entityOnTheCase = weapons[i];
        this.weaponsPos.push({ x : randomX - 1, y : randomY - 1});
      }
      else {
        i--;
      }
    }
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
        if (area[index][i].entityOnTheCase === "rock"){
          newDiv.setAttribute("class", "rock");
        }
        else if (area[index][i].entityOnTheCase instanceof Weapon){
          const cssClass = "weapon" + area[index][i].entityOnTheCase.weaponId;
          newDiv.setAttribute("class", cssClass);
        }
        element.appendChild(newDiv);
      }
    });
  }
}

export default Map;