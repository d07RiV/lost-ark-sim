import { SkillConfig } from '../config'
import { skills } from '../data/skills'
import { PlayerData } from './player'
import { cloneSources, StatData, StatValues } from './stats'

export type DamageData = {
  base: number
  scaling: number
}

export interface SkillInfo {
  directional?: number
  damage?: DamageData
  multiplier?: number
  mana?: number
  manaReduction?: number
  critChance?: number
  critDamage?: number
  cooldown?: number
}

export class SkillData extends StatData {
  directional: number
  type: number

  base: {
    damage?: DamageData
    mana: number
    cooldown: number
  }

  constructor(
    public skill: SkillConfig,
    public player: PlayerData,
    info: SkillInfo
  ) {
    super(
      {
        ...player.values,
        bonuses: {
          ...player.values.bonuses
        }
      },
      cloneSources(player.sources)
    )

    this.add(
      {
        damageMultiplier: info.multiplier ?? 1,
        manaMultiplier: 1 - (info.manaReduction ?? 0),
        critChance: info.critChance,
        critDamage: info.critDamage
      },
      'Skill'
    )

    this.directional = info.directional ?? 0
    this.type = skills[skill.id].type
    this.base = {
      damage: info.damage,
      mana: info.mana ?? 0,
      cooldown: info.cooldown ?? 0
    }
  }

  clone() {
    const result = super.clone()
    result.directional = this.directional
    result.base = {
      ...this.base,
      damage: this.base.damage ? { ...this.base.damage } : undefined
    }
    return result
  }

  addDamage(base: number, scaling: number) {
    if (!this.base.damage) this.base.damage = { base: 0, scaling: 0 }
    this.base.damage.base += base
    this.base.damage.scaling += scaling
  }
  increaseDamage(bonus: number) {
    this.add({
      damageMultiplier: 1 + bonus
    })
  }

  addCooldown(value: number) {
    this.base.cooldown = Math.max(0, this.base.cooldown + value)
  }

  get manaCost() {
    return this.base.mana * this.values.manaMultiplier
  }

  get cooldown() {
    return this.base.cooldown * this.cooldownMultiplier
  }
}

export type Skill = {
  name: string
  icon: string
  type: number
  runes: number
  sort: number
  learn: number
  class?: string
  awakening?: boolean
  movement?: boolean
  technique?: boolean
  hidden?: boolean
  category?: number
  maxLevel: number
  data?: (level: number, playerLevel: number) => SkillInfo
  buffs?: Record<
    string,
    Partial<StatValues> | ((level: number) => Partial<StatValues>)
  >
  tripods?: {
    name: string
    icon: string
    maxLevel?: number
    effect?: (data: SkillData, level: number) => unknown
    buffs?: Record<string, Partial<StatValues>>
  }[]
}
