import { CombatConfig, SkillConfig } from '../config'
import Data from '../data'
import { AddonSkillFeature } from '../data/types'
import { CombatModifierFuncs, CombatModifiers } from './modifiers'
import { SkillEffectStats, SkillStats } from './skill'
import { CombatStats } from './stats'

class SkillGroupModifiers implements CombatModifierFuncs {
  constructor(
    private modify: (func: (mod: CombatModifierFuncs) => void) => void
  ) {}

  modDamage(value: number) {
    this.modify((m) => m.modDamage(value))
  }
  modCritChance(value: number) {
    this.modify((m) => m.modCritChance(value))
  }
  modCritDamage(value: number) {
    this.modify((m) => m.modCritDamage(value))
  }
  modPenetration(value: number) {
    this.modify((m) => m.modPenetration(value))
  }
  modManaReduction(value: number) {
    this.modify((m) => m.modManaReduction(value))
  }
  modCooldownReduction(value: number) {
    this.modify((m) => m.modCooldownReduction(value))
  }
  modPartyHeal(value: number) {
    this.modify((m) => m.modPartyHeal(value))
  }
  modPartyShield(value: number) {
    this.modify((m) => m.modPartyShield(value))
  }
  modAtkPowerAddend(value: number) {
    this.modify((m) => m.modAtkPowerAddend(value))
  }
  modAtkPowerMultiplier(value: number) {
    this.modify((m) => m.modAtkPowerMultiplier(value))
  }
}

export class ActorStats extends CombatStats {
  private skills: Record<number, SkillStats> = {}
  private _skillMods: ((skill: SkillStats) => void)[] = []
  private modSkills(func: (effect: SkillStats) => void) {
    for (const skill of Object.values(this.skills)) {
      func(skill)
    }
    this._skillMods.push(func)
  }

  private _effectList: Record<number, SkillEffectStats[]> = {}
  private _effectMods: Record<number, ((effect: SkillEffectStats) => void)[]> =
    {}
  addEffect(id: number, stats: SkillEffectStats) {
    if (!this._effectList[id]) this._effectList[id] = []
    this._effectList[id].push(stats)
    if (this._effectMods[id]) {
      for (const mod of this._effectMods[id]) {
        mod(stats)
      }
    }
  }
  modEffect(id: number, mod: (effect: SkillEffectStats) => void) {
    if (!this._effectMods[id]) this._effectMods[id] = []
    this._effectMods[id].push(mod)
    if (this._effectList[id]) {
      for (const stats of this._effectList[id]) {
        mod(stats)
      }
    }
  }

  skill(id: number, config?: SkillConfig) {
    if (this.skills[id]) return this.skills[id]
    const data = Data.skills[id]
    if (!data) return
    this.skills[id] = new SkillStats(
      this,
      config ?? {
        id,
        level: 1,
        tripods: []
      },
      data.groups.map((id) => this._groupModifier(id))
    )
    for (const mod of this._skillMods) {
      mod(this.skills[id])
    }
    return this.skills[id]
  }

  private groupModifiers: Record<number, CombatModifiers> = {}

  protected override skillModifier(id: number) {
    if (this.skills[id]) return this.skills[id].modifiers
  }
  private _groupModifier(id: number) {
    if (!this.groupModifiers[id]) {
      this.groupModifiers[id] = new CombatModifiers()
    }
    return this.groupModifiers[id]
  }
  protected override groupModifier(id: number, separate?: boolean) {
    if (separate) return this._groupModifier(id)
    const modify = (func: (mod: CombatModifierFuncs) => void) => {
      this.modSkills((skill) => {
        if (!Data.skills[skill.skill.id]?.groups.includes(id)) return
        func(skill.modifiers)
      })
    }
    return new SkillGroupModifiers(modify)
  }
  override addonSkillFeature(feature: AddonSkillFeature) {
    if (feature.skill) {
      this.skill(feature.skill)?.addonSkillFeature(feature)
    } else {
      this.modSkills((skill) => skill.addonSkillFeature(feature))
    }
  }

  clone() {
    const result = this._clone()
    result.skills = {}
    result.groupModifiers = {}
    for (const id of Object.keys(this.groupModifiers)) {
      result.groupModifiers[id as any] = new CombatModifiers()
    }
    result.restore(this)
    for (const [id, skill] of Object.entries(this.skills)) {
      const data = Data.skills[id as any]
      result.skills[id as any] = skill.clone(
        result,
        data.groups.map((id) => result._groupModifier(id))
      )
    }
    return result
  }
  restore(source: ActorStats) {
    super.restore(source)
    this.level = source.level
    this._skillMods = source._skillMods.slice()
    this._effectMods = {}
    for (const [id, mods] of Object.entries(source._effectMods)) {
      this._effectMods[id as any] = mods.slice()
    }
    for (const [id, mod] of Object.entries(this.groupModifiers)) {
      Object.assign(mod, source.groupModifier(Number(id)))
    }
    for (const [id, skill] of Object.entries(this.skills)) {
      skill.restore(source.skill(Number(id))!)
    }
  }

  constructor(config: CombatConfig, public level: number) {
    super(config)

    // attackPower: number
    // directionalFactor: number
  }
}
