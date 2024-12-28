import { PlayerConfig } from '../config'
import { StatData } from './stats'

export class PlayerData extends StatData {
  constructor(public config: PlayerConfig) {
    super({
      attackPower: config.attackPower,
      attackPowerBonus: config.attackPowerBonus,
      attackPowerMultiplier: 1,
      critChance: config.critChance,
      critDamage: 1 + config.critDamage,
      critMultiplier: config.critMultiplier,
      moveSpeed: 0,
      attackSpeed: 0,
      speedMultiplier: 1,
      cooldownMultiplier: 1,
      armorMultiplier: 1,
      crit: config.crit,
      swiftness: config.swiftness,
      specialization: config.specialization,
      additionalDamage: config.additionalDamage,
      evoDamage: 0,
      manaMultiplier: 1,
      damageMultiplier: config.damageMultiplier,
      frontMultiplier: config.frontMultiplier,
      backMultiplier: config.backMultiplier,
      bonuses: {}
    })
    this.add(
      {
        bonuses: {
          [`class_${config.class}`]: 1
        }
      },
      'Class Mechanic'
    )
    this.add(
      {
        attackPower: config.synergy.attackPower,
        attackPowerMultiplier: 1 + config.synergy.attackPowerMultiplier,
        critChance: config.synergy.critChance,
        critMultiplier: 1 + config.synergy.critMultiplier,
        moveSpeed: config.synergy.moveSpeed,
        attackSpeed: config.synergy.attackSpeed,
        armorMultiplier: 1 - config.synergy.armorReduction,
        additionalDamage: config.synergy.additionalDamage,
        evoDamage: config.synergy.evoDamage,
        damageMultiplier: config.synergy.multipliers.reduce(
          (p, v) => p * (1 + v),
          1
        ),
        frontMultiplier: config.synergy.directionalMultipliers.reduce(
          (p, v) => p * (1 + v),
          1
        ),
        backMultiplier: config.synergy.directionalMultipliers.reduce(
          (p, v) => p * (1 + v),
          1
        )
      },
      'Synergies'
    )
  }

  get level() {
    return this.config.level
  }
}
