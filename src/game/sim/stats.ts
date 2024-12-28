import { CombatConfig } from '../config'
import Data from '../data'
import { EAddonType, EStatType } from '../data/enums'
import {
  AddonSkillFeature,
  CombatEffect,
  ScalingValue,
  StatValue
} from '../data/types'
import { CombatModifierFuncs, CombatModifiers } from './modifiers'

export function evalScaling(value: ScalingValue, level: number, cLvl = 70) {
  if (typeof value === 'number') return value
  if (value.clvl) level = cLvl
  if (value[level] != null) return value[level]
  let result = 0
  for (const [k, v] of Object.entries(value)) {
    if (k === 'clvl') continue
    if (Number(k) > level) break
    result = v
  }
  return result
}

export function evalStatScaling(
  value: StatValue<ScalingValue>,
  level: number,
  cLvl = 70
): StatValue {
  return {
    type: value.type,
    stat: value.stat,
    index: evalScaling(value.index, level, cLvl),
    value: evalScaling(value.value, level, cLvl)
  }
}

export function modValue(
  value: number,
  type: number | undefined,
  mod: number,
  divisor = 100
) {
  if (type) return value * (1 + mod / divisor)
  else return value + mod
}

export type StatValues = {
  [key in EStatType]?: number
}

function addStat(values: StatValues, stat: EStatType, value: number) {
  values[stat] = (values[stat] ?? 0) + value
}

export class CombatStats {
  private statValues: StatValues = {}
  private _abilityFeatures?: Record<number, number>
  modifiers: CombatModifiers
  combatEffects: Record<number, CombatEffect[]> = {}

  private statConv: Record<
    number,
    {
      stat: EStatType
      coeff: number
    }
  >

  convertStat(src: EStatType, dst: EStatType, coeff: number) {
    this.statConv[dst] = { stat: src, coeff }
  }

  constructor(
    public config: CombatConfig,
    private parent?: CombatStats,
    modifiers?: CombatModifiers[]
  ) {
    if (parent) {
      Object.setPrototypeOf(this.combatEffects, parent.combatEffects)
    }
    this.modifiers = new CombatModifiers(parent?.modifiers, modifiers)

    this.statConv = parent?.statConv ?? {}
    const conv = {
      ...Data.statConversion[0],
      ...Data.statConversion[config.player.class]
    }
    const scaling =
      Data.statLevelScaling[config.player.level] ?? Data.statLevelScaling[70]
    for (const [id, def] of Object.entries(conv)) {
      this.statConv[id as any] = {
        stat: def.stat,
        coeff: def.coeff / (scaling[def.stat] ?? 1)
      }
    }
  }

  protected _clone(parent?: CombatStats, modifiers?: CombatModifiers[]): this {
    const result = Object.create(Object.getPrototypeOf(this)) as this
    result.config = this.config
    result.parent = parent
    result.modifiers = new CombatModifiers(parent?.modifiers, modifiers)
    result.combatEffects = {}
    result.statConv = this.statConv
    return result
  }
  restore(source: CombatStats) {
    this.statValues = { ...source.statValues }
    this._abilityFeatures = source._abilityFeatures
      ? { ...source._abilityFeatures }
      : undefined
    Object.assign(this.modifiers, source.modifiers)
    // we can't reassign the object since its referenced by children
    for (const key of Object.keys(this.combatEffects)) {
      delete this.combatEffects[key as any]
    }
    Object.assign(this.combatEffects, source.combatEffects)
  }

  private _stat(id: EStatType): number {
    return (this.statValues[id] ?? 0) + (this.parent?._stat(id) ?? 0)
  }
  stat(id: EStatType) {
    let value = this._stat(id)
    const conv = this.statConv[id]
    if (conv) value += Math.floor(conv.coeff * this._stat(conv.stat))
    return value
  }

  add(stat: EStatType, value: number) {
    addStat(this.statValues, stat, value)
  }

  get abilityFeatures(): Record<number, number> {
    if (!this._abilityFeatures) {
      return this.parent?._abilityFeatures ?? []
    } else if (!this.parent) {
      return this.abilityFeatures
    } else {
      const result = { ...this.parent.abilityFeatures }
      for (const [id, value] of Object.entries(this._abilityFeatures)) {
        result[id as any] = Math.max(result[id as any] ?? 0, value)
      }
      return result
    }
  }

  protected skillModifier(_id: number): CombatModifierFuncs | undefined {
    return
  }
  protected groupModifier(
    _id: number,
    _separate?: boolean
  ): CombatModifierFuncs | undefined {
    return
  }
  addonSkillFeature(_feature: AddonSkillFeature) {}

  addon(value: StatValue) {
    switch (value.type) {
      case EAddonType.STAT:
        this.add(value.stat, value.value)
        break
      case EAddonType.COMBAT_EFFECT:
        this.combatEffects[value.index] = Data.combatEffects[value.index]
        break
      case EAddonType.SKILL_DAMAGE:
        this.skillModifier(value.index)?.modDamage(value.value / 10000)
        break
      case EAddonType.SKILL_CRITICAL_RATIO:
        this.skillModifier(value.index)?.modCritChance(value.value / 10000)
        throw Error(`verify this`)
        break
      case EAddonType.SKILL_CRITICAL_DAMAGE:
        this.skillModifier(value.index)?.modCritDamage(value.value / 10000)
        throw Error(`verify this`)
        break
      case EAddonType.SKILL_PENETRATION:
        this.skillModifier(value.index)?.modPenetration(value.value / 10000)
        throw Error(`verify this`)
        break
      case EAddonType.NPC_GRADE_LESS_DAMAGE:
        if (this.config.target.grade < value.index) {
          this.modifiers.modDamage(value.value / 10000)
        }
        throw Error(`verify this`)
        break
      case EAddonType.NPC_GRADE_LESS_CRITICAL_RATIO:
        if (this.config.target.grade < value.index) {
          this.modifiers.modCritChance(value.value / 10000)
        }
        throw Error(`verify this`)
        break
      case EAddonType.NPC_GRADE_LESS_CRITICAL_DAMAGE:
        if (this.config.target.grade < value.index) {
          this.modifiers.modCritDamage(value.value / 10000)
        }
        throw Error(`verify this`)
        break
      case EAddonType.NPC_GRADE_LESS_PENETRATION:
        if (this.config.target.grade < value.index) {
          this.modifiers.modPenetration(value.value / 10000)
        }
        throw Error(`verify this`)
        break
      case EAddonType.NPC_GRADE_GREATER_DAMAGE:
        if (this.config.target.grade > value.index) {
          this.modifiers.modDamage(value.value / 10000)
        }
        throw Error(`verify this`)
        break
      case EAddonType.NPC_GRADE_GREATER_CRITICAL_RATIO:
        if (this.config.target.grade > value.index) {
          this.modifiers.modCritChance(value.value / 10000)
        }
        throw Error(`verify this`)
        break
      case EAddonType.NPC_GRADE_GREATER_CRITICAL_DAMAGE:
        if (this.config.target.grade > value.index) {
          this.modifiers.modCritDamage(value.value / 10000)
        }
        throw Error(`verify this`)
        break
      case EAddonType.NPC_GRADE_GREATER_PENETRATION:
        if (this.config.target.grade > value.index) {
          this.modifiers.modPenetration(value.value / 10000)
        }
        throw Error(`verify this`)
        break
      case EAddonType.NPC_SPECIES_DAMAGE:
        if (this.config.target.species === value.index) {
          this.modifiers.modDamage(value.value / 10000)
        }
        throw Error(`verify this`)
        break
      case EAddonType.NPC_SPECIES_CRITICAL_RATIO:
        if (this.config.target.species === value.index) {
          this.modifiers.modCritChance(value.value / 10000)
        }
        throw Error(`verify this`)
        break
      case EAddonType.NPC_SPECIES_CRITICAL_DAMAGE:
        if (this.config.target.species === value.index) {
          this.modifiers.modCritDamage(value.value / 10000)
        }
        throw Error(`verify this`)
        break
      case EAddonType.NPC_SPECIES_PENETRATION:
        if (this.config.target.species === value.index) {
          this.modifiers.modPenetration(value.value / 10000)
        }
        throw Error(`verify this`)
        break
      case EAddonType.MANA_REDUCTION:
        this.modifiers.modManaReduction(value.value / 10000)
        break
      case EAddonType.SKILL_MANA_REDUCTION:
        this.skillModifier(value.index)?.modManaReduction(value.value / 10000)
        break
      case EAddonType.SKILL_COOLDOWN_REDUCTION:
        this.skillModifier(value.index)?.modCooldownReduction(
          value.value / 10000
        )
        break
      case EAddonType.ABILITY_FEATURE:
        if (!this._abilityFeatures) this._abilityFeatures = {}
        this._abilityFeatures[value.index] = Math.max(
          this._abilityFeatures[value.index] ?? 0,
          value.value
        )
        break
      case EAddonType.SKILL_FEATURE:
        if (Data.skillFeatures[value.index]) {
          for (const fx of Data.skillFeatures[value.index]) {
            this.addonSkillFeature(fx)
          }
        }
        break
      case EAddonType.SKILL_GROUP_DAMAGE:
        this.groupModifier(value.index)?.modDamage(value.value / 10000)
        break
      case EAddonType.SKILL_GROUP_COOLDOWN_REDUCTION:
        this.groupModifier(value.index, true)?.modCooldownReduction(
          value.value / 10000
        )
        break
      case EAddonType.PARTY_HEAL:
        this.modifiers.modPartyHeal(value.value / 10000)
        break
      case EAddonType.PARTY_SHIELD:
        this.modifiers.modPartyShield(value.value / 10000)
        break
      case EAddonType.ATTACK_POWER_AMPLIFY_ADDEND:
        this.modifiers.modAtkPowerAddend(value.value / 10000)
        throw Error(`verify this`)
        break
      case EAddonType.ATTACK_POWER_AMPLIFY_MULTIPLIER:
        this.modifiers.modAtkPowerMultiplier(value.value / 10000)
        throw Error(`verify this`)
        break
      case EAddonType.NOT_IN_PARTY_DAMAGE:
        // do nothing
        break
      case EAddonType.SKILL_EFFECT_GROUP_SET_DAMAGE:
        //TODO: is this only explosive expert?
        throw Error(`verify this`)
        break
      case EAddonType.SKILL_PARTY_SHIELD:
        this.skillModifier(value.index)?.modPartyShield(value.value / 10000)
        break
      case EAddonType.SKILL_GROUP_PARTY_SHIELD:
        this.groupModifier(value.index)?.modPartyShield(value.value / 10000)
        break
      case EAddonType.SKILL_PARTY_HEAL:
        this.skillModifier(value.index)?.modPartyHeal(value.value / 10000)
        break
      case EAddonType.SKILL_GROUP_PARTY_HEAL:
        this.groupModifier(value.index)?.modPartyHeal(value.value / 10000)
        break
      case EAddonType.SKILL_ATTACK_POWER_AMPLIFY_MULTIPLIER:
        this.skillModifier(value.index)?.modAtkPowerMultiplier(
          value.value / 10000
        )
        throw Error(`verify this`)
        break
      case EAddonType.SKILL_GROUP_ATTACK_POWER_AMPLIFY_MULTIPLIER:
        this.groupModifier(value.index)?.modAtkPowerMultiplier(
          value.value / 10000
        )
        throw Error(`verify this`)
        break
      default:
        throw Error(`addon type ${value.type} not implemented`)
    }
  }

  get baseAttackPower() {
    let ap = this.config.player.attackPower
    ap *= 1 + this.stat(EStatType.BASE_DAMAGE_RATE) / 10000
    return ap
  }

  get attackPower() {
    let ap = this.baseAttackPower
    ap +=
      this.stat(EStatType.ATTACK_POWER_ADDEND) +
      this.stat(EStatType.ATTACK_POWER_ADDEND_2)
    ap *= 1 + this.stat(EStatType.ATTACK_POWER_RATE) / 10000
    ap *= 1 + this.stat(EStatType.ATTACK_POWER_RATE_X) / 10000
    ap *= 1 + this.stat(EStatType.ATTACK_POWER_SUB_RATE_1) / 10000
    ap *= 1 + this.stat(EStatType.ATTACK_POWER_SUB_RATE_2) / 10000
    ap *= 1 + this.modifiers.atkPowerAddend
    ap *= this.modifiers.atkPowerMultiplier
    return ap
  }

  get critChance() {
    return (
      this.stat(EStatType.CRITICAL_HIT_RATE) / 10000 + this.modifiers.critChance
    )
  }

  get critDamage() {
    return (
      this.stat(EStatType.CRITICAL_DAM_RATE) / 10000 + this.modifiers.critDamage
    )
  }

  get attackSpeed() {
    return 1 + Math.min(this.stat(EStatType.ATTACK_SPEED_RATE) / 10000, 0.4)
  }
}
