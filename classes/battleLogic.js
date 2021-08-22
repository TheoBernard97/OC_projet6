/** @format */

class BattleLogic {
  constructor() {}

  attack(attacker, target) {
    if (attacker.defense == 2) {
      attacker.setDefense(1);
    }

    let damages = attacker.power / target.defense;

    if (attacker.weapon) {
      let criticalRoll = Math.floor(Math.random() * 100) + 1;

      if (criticalRoll < attacker.weapon.criticalRate) {
        damages = damages * 2;
      }
    }

    target.takeDamage(damages);

    if (target.health <= 0) {
      return true;
    }
  }

  defend(player) {
    player.setDefense(2);
  }
}

export default BattleLogic;
