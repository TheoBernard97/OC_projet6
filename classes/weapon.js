class Weapon {
    constructor(weaponId, weaponName, weaponPower, criticalRate, effect) {
        this.weaponId = weaponId;
        this.weaponName = weaponName;
        this.power = weaponPower;
        this.criticalRate = criticalRate;
        this.effect = effect;
    }

    createWeapons (weapons) {
        const Swords = [];
        for (let i = 0; i < weapons.length; i++) {
            const Sword = new Weapon(weapons[i].weaponId, weapons[i].weaponName, weapons[i].weaponPower, weapons[i].criticalRate, weapons[i].effect);
            Swords.push(Sword);
        }
        return Swords;
    }
}

export default Weapon;