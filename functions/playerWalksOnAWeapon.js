/** @format */

import Weapon from "../classes/weapon.js";

function playerWalksOnAWeapon(
  area,
  player,
  direction,
  distance,
  oldCoordinates
) {
  if (direction == "west") {
    for (let i = 1; i <= distance; i++) {
      if (
        area[oldCoordinates.x - i][oldCoordinates.y].entityOnTheCase.find(
          (entity) => entity instanceof Weapon
        )
      ) {
        const newWeapon = area[oldCoordinates.x - i][
          oldCoordinates.y
        ].entityOnTheCase.find((entity) => entity instanceof Weapon);
        const oldWeapon = player.grabWeapon(newWeapon);
        area[oldCoordinates.x - i][oldCoordinates.y].entityOnTheCase.pop();
        area[oldCoordinates.x - i][oldCoordinates.y].entityOnTheCase.push(
          oldWeapon
        );
        if (oldWeapon) {
          console.log("Throw weapon", oldWeapon.weaponId);
        }
      }
    }
  } else if (direction == "east") {
    for (let i = 1; i <= distance; i++) {
      if (
        area[oldCoordinates.x + i][oldCoordinates.y].entityOnTheCase.find(
          (entity) => entity instanceof Weapon
        )
      ) {
        const newWeapon = area[oldCoordinates.x + i][
          oldCoordinates.y
        ].entityOnTheCase.find((entity) => entity instanceof Weapon);
        const oldWeapon = player.grabWeapon(newWeapon);
        area[oldCoordinates.x + i][oldCoordinates.y].entityOnTheCase.pop();
        area[oldCoordinates.x + i][oldCoordinates.y].entityOnTheCase.push(
          oldWeapon
        );
        if (oldWeapon) {
          console.log("Throw weapon", oldWeapon.weaponId);
        }
      }
    }
  } else if (direction == "north") {
    for (let i = 1; i <= distance; i++) {
      if (
        area[oldCoordinates.x][oldCoordinates.y - i].entityOnTheCase.find(
          (entity) => entity instanceof Weapon
        )
      ) {
        const newWeapon = area[oldCoordinates.x][
          oldCoordinates.y - i
        ].entityOnTheCase.find((entity) => entity instanceof Weapon);
        const oldWeapon = player.grabWeapon(newWeapon);
        area[oldCoordinates.x][oldCoordinates.y - i].entityOnTheCase.pop();
        area[oldCoordinates.x][oldCoordinates.y - i].entityOnTheCase.push(
          oldWeapon
        );
        if (oldWeapon) {
          console.log("Throw weapon", oldWeapon.weaponId);
        }
      }
    }
  } else if (direction == "south") {
    for (let i = 1; i <= distance; i++) {
      if (
        area[oldCoordinates.x][oldCoordinates.y + i].entityOnTheCase.find(
          (entity) => entity instanceof Weapon
        )
      ) {
        const newWeapon = area[oldCoordinates.x][
          oldCoordinates.y + i
        ].entityOnTheCase.find((entity) => entity instanceof Weapon);
        const oldWeapon = player.grabWeapon(newWeapon);
        area[oldCoordinates.x][oldCoordinates.y + i].entityOnTheCase.pop();
        area[oldCoordinates.x][oldCoordinates.y + i].entityOnTheCase.push(
          oldWeapon
        );
        if (oldWeapon) {
          console.log("Throw weapon", oldWeapon.weaponId);
        }
      }
    }
  }
}

export { playerWalksOnAWeapon };
