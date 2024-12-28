import { BonusID } from '../bonuses'

export const statAdditiveKeys = [
  'attackPower',
  'attackPowerBonus',
  'critChance',
  'critDamage',
  'moveSpeed',
  'attackSpeed',
  'crit',
  'swiftness',
  'specialization',
  'additionalDamage',
  'evoDamage'
] as const

export const statMultiplierKeys = [
  'attackPowerMultiplier',
  'critMultiplier',
  'speedMultiplier',
  'cooldownMultiplier',
  'armorMultiplier',
  'damageMultiplier',
  'frontMultiplier',
  'backMultiplier',
  'manaMultiplier'
] as const

export const statKeys = [...statAdditiveKeys, ...statMultiplierKeys] as const

export type StatAdditiveKey = (typeof statAdditiveKeys)[number]
export type StatMultiplierKey = (typeof statMultiplierKeys)[number]
export type StatKey = (typeof statKeys)[number]

export type StatValues = {
  [key in StatKey]: number
} & {
  bonuses: { [key in BonusID]?: number }
}

export type StatSources = {
  [key in StatKey]?: Record<string, number>
} & {
  bonuses: {
    [key in BonusID]?: Record<string, number>
  }
}

export type StatValuesPerLevel = {
  [K in Exclude<keyof StatValues, 'bonuses'>]?: number[] | number
} & {
  bonuses?: {
    [key in BonusID]?: number[] | number
  }
}

function _source(src: Record<string, number>, key: string, value: number) {
  if (value) src[key] = (src[key] ?? 0) + value
  return src
}

function _source_mul(src: Record<string, number>, key: string, value: number) {
  if (value) src[key] = (1 + (src[key] ?? 0)) * (1 + value) - 1
  return src
}

export function cloneSources(src: StatSources) {
  const dst: StatSources = {
    bonuses: {}
  }
  for (const key of statKeys) {
    if (src[key]) dst[key] = { ...src[key] }
  }
  for (const [key, value] of Object.entries(src.bonuses)) {
    dst.bonuses[key as BonusID] = { ...value }
  }
  return dst
}

export class StatData {
  directionalFlag?: number

  _source?: string

  constructor(
    public values: StatValues,
    public sources: StatSources = {
      bonuses: {}
    }
  ) {}

  add(values: Partial<StatValues>, source = this._source) {
    if (!values) return
    for (const key of statAdditiveKeys) {
      if (values[key]) {
        this.values[key] += values[key]
        if (source) {
          this.sources[key] = _source(
            this.sources[key] ?? {},
            source,
            values[key]
          )
        }
      }
    }
    for (const key of statMultiplierKeys) {
      if (values[key]) {
        this.values[key] *= values[key]
        if (source) {
          this.sources[key] = _source_mul(
            this.sources[key] ?? {},
            source,
            values[key] - 1
          )
        }
      }
    }
    if (values.bonuses) {
      for (const [key, value] of Object.entries(values.bonuses) as [
        BonusID,
        number
      ][]) {
        this.values.bonuses[key] = (this.values.bonuses[key] ?? 0) + value
        if (source) {
          this.sources.bonuses[key] = _source(
            this.sources.bonuses[key] ?? {},
            source,
            value
          )
        }
      }
    }
  }

  get attackPower() {
    const { values } = this
    return (
      values.attackPower *
      (1 + values.attackPowerBonus) *
      values.attackPowerMultiplier
    )
  }

  applyStats() {
    const { crit, swiftness } = this.values
    if (crit) this.add({ critChance: crit / 2794 }, 'Crit')
    if (swiftness)
      this.add(
        {
          moveSpeed: swiftness / 5821,
          attackSpeed: swiftness / 5821,
          cooldownMultiplier: 1 - (swiftness * 1.25) / 5821
        },
        'Swiftness'
      )
  }

  get critChance() {
    const { values } = this
    const result = values.critChance + values.crit / 2794
    if (this.values.bonuses.blunt_thorn) return Math.min(result, 0.8)
    return result
  }

  get critMultiplier() {
    const { values } = this
    return (1 + values.critDamage) * this.values.critMultiplier
  }

  get moveSpeed() {
    const { values } = this
    return values.moveSpeed + values.swiftness / 5821
  }

  get attackSpeed() {
    const { values } = this
    return values.attackSpeed + values.swiftness / 5821
  }

  get cooldownMultiplier() {
    const { values } = this
    return values.cooldownMultiplier * (1 - (values.swiftness * 1.25) / 5821)
  }

  get specCoefficient() {
    return this.values.specialization / 699
  }

  get damageMultiplier() {
    const { values } = this
    let result =
      (1 + values.additionalDamage) *
      (1 + values.evoDamage) *
      values.damageMultiplier
    if (this.directionalFlag) {
      if (this.directionalFlag & 2) {
        result *= values.frontMultiplier
      } else if (this.directionalFlag & 1) {
        result *= values.backMultiplier
      }
    }
    return result
  }

  clone() {
    const result = Object.create(Object.getPrototypeOf(this)) as this
    result.directionalFlag = this.directionalFlag
    result.values = {
      ...this.values,
      bonuses: {
        ...this.values.bonuses
      }
    }
    result.sources = cloneSources(this.sources)
    return result
  }
}
