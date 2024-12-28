export type EngravingState = {
  level: number
  stone: number
}

export type SkillConfig = {
  id: number
  level: number
  tripods: Record<number, number>
  rune?: number
  damageGem?: number
  cooldownGem?: number
  rotationNum?: number
  rotationDen?: number
  flags?: string[]
}

export type SynergyConfig = {
  moveSpeed: number
  attackSpeed: number
  critChance: number
  critMultiplier: number
  additionalDamage: number
  evoDamage: number
  attackPower: number
  attackPowerMultiplier: number
  multipliers: number[]
  armorReduction: number
  directionalMultipliers: number[]
}

export type PlayerConfig = {
  class: number
  level: number
  attackPower: number
  attackPowerBonus: number
  crit: number
  specialization: number
  swiftness: number
  additionalDamage: number
  damageMultiplier: number
  critMultiplier: number
  critChance: number
  critDamage: number
  backMultiplier: number
  frontMultiplier: number
  engravings: Record<number, number>
  arkEnabled: boolean
  arkPassive: Record<number, number>
  arkEngravings: Record<number, EngravingState>
  setBonus: string | undefined
  skills: SkillConfig[]
  synergy: SynergyConfig
  directionalFactor: number
}

export type TargetConfig = {
  level: number
  grade: number
  species: number
}

export type CombatConfig = {
  player: PlayerConfig
  target: TargetConfig
  reactionTime: number
}
