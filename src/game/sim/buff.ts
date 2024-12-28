import { EAddonType, EStatusEffectType } from '../data/enums'
import { SkillBuff, StatValue } from '../data/types'
import { ActorState } from './actor'
import { Simulation } from './sim'
import { CombatStats, evalScaling, modValue } from './stats'

export class BuffStats {
  duration: number
  type: EStatusEffectType
  values: number[]
  interval?: number
  firstInterval?: number
  expire?: {
    type: number
    effect: number
  }[]
  passive?: StatValue[]
  effect?: number
  ultimateMin?: number
  ultimateMax?: number
  unique?: number
  stacks?: number
  stackEffect?: {
    count: number
    effect: number
  }

  constructor(buff: SkillBuff, level: number) {
    this.duration = evalScaling(buff.duration, level)
    this.type = buff.type
    this.values = buff.values.map((v) => evalScaling(v, level))
    this.interval = buff.interval
    this.firstInterval = buff.firstInterval
    this.expire = buff.expire
    this.passive = buff.passive?.map((p) => ({
      type: p.type,
      stat: p.stat,
      index: evalScaling(p.index, level),
      value: evalScaling(p.value, level)
    }))
    this.effect = buff.effect
    this.ultimateMin = buff.ultimateMin
    this.ultimateMax = buff.ultimateMax
    this.unique = buff.unique
    this.stacks = buff.stacks
    this.stackEffect = buff.stackEffect
  }

  clone() {
    const result = Object.create(Object.getPrototypeOf(this)) as this
    result.restore(this)
    return result
  }
  restore(source: BuffStats) {
    Object.assign(this, source)
    this.values = source.values.slice()
    this.passive = source.passive?.slice()
  }

  modDuration(type: number | undefined, value: number) {
    this.duration = modValue(this.duration, type, value) | 0
  }

  modStat(id: number, type: number | undefined, value: number) {
    const stat = this.passive?.find(
      (p) => p.type === EAddonType.STAT && p.stat === id
    )
    if (stat) {
      stat.value = modValue(stat.value, type, value) | 0
    }
  }

  addStat(id: number, value: number) {
    this.passive = this.passive ?? []
    this.passive.push({
      type: EAddonType.STAT,
      stat: id,
      index: 0,
      value
    })
  }

  modParams(type: number | undefined, value: number[]) {
    for (let i = 0; i < value.length; ++i) {
      this.values[i] = modValue(this.values[i] ?? 0, type, value[i]) | 0
    }
  }
}

export class BuffInstance {
  private end?: number
  private expireEvent?: () => void

  constructor(
    private sim: Simulation,
    public id: number,
    public stats: BuffStats,
    public target: ActorState,
    public stacks = 1
  ) {
    if (stats.duration >= 0) {
      this.end = sim.time + stats.duration
      this.expireEvent = sim.at(this.end, () => this.target.buffRemove(this.id))
    }
    // process apply effect
  }

  refresh(stats: BuffStats, stacks = 1) {
    if (stats.duration >= 0) {
      if (this.end === undefined || this.sim.time + stats.duration < this.end) {
        return
      }
      this.expireEvent?.()
      this.end = this.sim.time + stats.duration
      this.expireEvent = this.sim.at(this.end, () =>
        this.target.buffRemove(this.id)
      )
    } else {
      this.expireEvent?.()
      this.expireEvent = undefined
      this.end = undefined
    }
    this.stats = stats
    this.stacks = Math.max(this.stacks + stacks, stats.stacks ?? 1)
    // process stack effects
  }

  remove() {
    // process remove effects
  }

  apply(dst: CombatStats) {
    if (this.stats.passive) {
      for (const p of this.stats.passive) {
        dst.addon(p)
      }
    }
  }
}
