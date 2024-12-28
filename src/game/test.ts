import { CombatConfig } from './config'
import { Simulation } from './sim/sim'

const config: CombatConfig = {
  player: {
    class: 305,
    level: 70,
    attackPower: 100000,
    attackPowerBonus: 0,
    crit: 69,
    specialization: 72 + 160,
    swiftness: 70,
    additionalDamage: 0.3,
    damageMultiplier: 1,
    critMultiplier: 1,
    critChance: 0,
    critDamage: 0,
    backMultiplier: 1,
    frontMultiplier: 1,
    engravings: {},
    arkEnabled: true,
    arkPassive: {},
    arkEngravings: {},
    setBonus: undefined,
    skills: [],
    synergy: {
      moveSpeed: 0,
      attackSpeed: 0,
      critChance: 0,
      critMultiplier: 0,
      additionalDamage: 0,
      evoDamage: 0,
      attackPower: 0,
      attackPowerMultiplier: 0,
      multipliers: [],
      armorReduction: 0,
      directionalMultipliers: []
    },
    directionalFactor: 1
  },
  target: {
    grade: 4,
    level: 60,
    species: 0
  },
  reactionTime: 0.1
}

config.player.skills.push({
  id: 34590,
  level: 14,
  tripods: [],
  rune: 65101004
})

debugger
const sim = new Simulation(config)
sim.useSkill(34590)
sim.run()
