import { SkillConfig } from '../config'
import Data from '../data'
import {
  EDamageAttr,
  ESkillEffectChainActor,
  ESkillFeatureType
} from '../data/enums'
import {
  ActionStageLayer,
  AddonSkillFeature,
  ChainSkillEffect,
  CombatEffect,
  SkillFeatureEffect
} from '../data/types'
import { BuffStats } from './buff'
import { CombatModifiers } from './modifiers'
import { ActorStats } from './player'
import { CombatStats, evalScaling, modValue } from './stats'

export class StageModifier {
  speed?: number
  buffs?: number[]

  modSpeed(type: number, value: number) {
    if (type) this.speed = (this.speed ?? 1) * (1 + value / 100)
    else this.speed = (this.speed ?? 1) + value / 100
  }
  addBuff(id: number) {
    if (!this.buffs) this.buffs = []
    this.buffs.push(id)
  }

  clone() {
    const result = new StageModifier()
    result.speed = this.speed
    result.buffs = this.buffs?.slice()
    return result
  }
}

export type SkillBonus = {
  percent?: number
  manaPerHit?: number
  manaMax?: number
  cooldownPerHit?: number
  cooldownMax?: number
  gaugePerHit?: number
  gaugeMax?: number
  triggerBuff?: number
  buffActor?: ESkillEffectChainActor
  chance: number
  //hitExactly?: number
  //hitMin?: number
  //eventType?: number
}

const cloneCombatEffect = (ce: CombatEffect) => ({
  cooldown: ce.cooldown,
  actions: ce.actions.map((a) => ({ ...a, args: a.args.slice() })),
  conditions: ce.conditions.map((c) => ({ ...c }))
})

export class SkillEffectStats extends CombatStats {
  type: number
  values: number[]
  weakpoint?: number
  identityType?: number
  directional?: number
  counter?: number
  ultimateMin?: number
  ultimateMax?: number
  multiHitCount?: number
  multiHitTime?: number
  aiMin?: number
  aiMax?: number
  divisionType?: number
  damageType?: EDamageAttr

  combatEffectStats: Record<number, CombatEffect[]> = {}

  chainEffects: ChainSkillEffect[] = []
  bonuses: SkillBonus[] = []

  constructor(parent: SkillStats, public id: number) {
    super(parent.config, parent)
    const data = Data.effects[id]
    this.type = data?.type ?? 0
    this.values =
      data?.values.map((v) =>
        evalScaling(v, parent.skill.level, parent.config.player.level)
      ) ?? []
    this.weakpoint = data?.weakpoint
    this.identityType = data?.identityType
    this.directional = data?.directional
    this.counter = data?.counter
    this.ultimateMin = data?.ultimateMin
    this.ultimateMax = data?.ultimateMax
    this.multiHitCount = data?.multiHitCount
    this.multiHitTime = data?.multiHitTime
    this.divisionType = data?.divisionType
    this.aiMin = data?.aiMin
    this.aiMax = data?.aiMax

    this.chainEffects = data?.chainSkillEffects?.slice() ?? []
    if (data?.chainCombatEffect) {
      this.combatEffects[data.chainCombatEffect] =
        Data.combatEffects[data.chainCombatEffect]
    }
  }

  clone(skill: SkillStats) {
    const result = this._clone(skill)
    result.id = this.id
    result.restore(this)
    return result
  }
  restore(source: SkillEffectStats) {
    super.restore(source)
    this.type = source.type
    this.values = source.values.slice()
    this.weakpoint = source.weakpoint
    this.identityType = source.identityType
    this.directional = source.directional
    this.counter = source.counter
    this.ultimateMin = source.ultimateMin
    this.ultimateMax = source.ultimateMax
    this.multiHitCount = source.multiHitCount
    this.multiHitTime = source.multiHitTime
    this.aiMin = source.aiMin
    this.aiMax = source.aiMax
    this.divisionType = source.divisionType
    this.damageType = source.damageType

    this.combatEffectStats = {}
    for (const [id, fx] of Object.entries(source.combatEffectStats)) {
      this.combatEffectStats[id as any] = fx.map(cloneCombatEffect)
    }

    this.chainEffects = source.chainEffects.slice()
    this.bonuses = source.bonuses.slice()
  }
}

export class SkillStats extends CombatStats {
  layers: ActionStageLayer[]
  layer = 0
  startStage: number[]
  enableNotify: Record<string, number> = {}
  enableNotifyGroup: Record<string, number> = {}

  stageMods: StageModifier[][] = []

  manaCost: number
  gaugeCost: number[]
  cooldown: number
  stackCooldown: number
  stackLimit: number
  bookType: number
  bookTypeValue: number
  category: number

  bonuses: SkillBonus[] = []

  private _effectStats: Record<number, SkillEffectStats> = {}
  private _effectMods: ((effect: SkillEffectStats) => void)[] = []

  effect(id: number) {
    if (!this._effectStats[id]) {
      const fx = new SkillEffectStats(this, id)
      for (const mod of this._effectMods) {
        mod(fx)
      }
      this.actor.addEffect(id, fx)
      this._effectStats[id] = fx
    }
    return this._effectStats[id]
  }

  private modEffectStats(id: number) {
    return id ? this.effect(id) : this
  }
  private modEffect(
    id: number | undefined,
    func: (effect: SkillEffectStats) => void
  ) {
    if (id) {
      this.actor.modEffect(id, func)
    } else {
      for (const effect of Object.values(this._effectStats)) {
        func(effect)
      }
      this._effectMods.push(func)
    }
  }

  private _buffStats: Record<number, BuffStats> = {}
  buffStats(id: number) {
    if (!this._buffStats[id]) {
      if (!Data.buffs[id]) return
      this._buffStats[id] = new BuffStats(Data.buffs[id], this.skill.level)
    }
    return this._buffStats[id]
  }

  effectOnUse?: SkillFeatureEffect[]

  constructor(
    public actor: ActorStats,
    public skill: SkillConfig,
    groupModifiers: CombatModifiers[]
  ) {
    super(actor.config, actor, groupModifiers)
    const data = Data.skills[skill.id]
    this.manaCost = evalScaling(data.mana ?? 0, skill.level)
    this.gaugeCost = [
      evalScaling(data.gauge0 ?? 0, skill.level),
      evalScaling(data.gauge1 ?? 0, skill.level)
    ]
    this.cooldown = evalScaling(data.cooltime ?? 0, skill.level)
    this.stackCooldown = evalScaling(data.stackTime ?? 0, skill.level)
    this.stackLimit = data.stackLimit ?? 0
    this.bookType = data.bookType
    this.bookTypeValue = data.bookTypeValue ?? 0
    this.category = data.category
    this.layers = Data.skills[this.skill.id]?.layers ?? [{ stages: [] }]
    this.startStage = this.layers.map(() => 0)

    for (const [index, level] of Object.entries(skill.tripods)) {
      const tripod = data.tripods?.[Number(index)]
      if (!tripod) continue
      for (const fx of tripod.effects) {
        if (fx.level && fx.level !== level) continue
        if (fx.includeTier && !fx.includeTier.some((i) => skill.tripods[i - 1]))
          continue
        if (fx.excludeTier && fx.excludeTier.some((i) => skill.tripods[i - 1]))
          continue
        this.skillFeature(fx)
      }
    }

    if (skill.rune) {
      const rune = Data.runes[skill.rune]
      if (rune) this.addon(rune.effect)
    }
  }

  clone(stats: CombatStats, groupModifiers: CombatModifiers[]) {
    const result = this._clone(stats, groupModifiers)
    result.skill = this.skill
    result.layers = this.layers
    result._effectStats = {}
    result._buffStats = {}
    result.restore(this)
    for (const [id, stats] of Object.entries(this._effectStats)) {
      result._effectStats[id as any] = stats.clone(result)
    }
    for (const [id, stats] of Object.entries(this._buffStats)) {
      result._buffStats[id as any] = stats.clone()
    }
    return result
  }
  restore(source: SkillStats) {
    super.restore(source)
    this.layer = source.layer
    this.startStage = source.startStage.slice()
    this.enableNotify = { ...source.enableNotify }
    this.enableNotifyGroup = { ...source.enableNotifyGroup }
    this.stageMods = source.stageMods.map((mods) =>
      mods.map((mod) => mod.clone())
    )
    this.manaCost = source.manaCost
    this.gaugeCost = source.gaugeCost.slice()
    this.cooldown = source.cooldown
    this.stackCooldown = source.stackCooldown
    this.stackLimit = source.stackLimit
    this.bookType = source.bookType
    this.bookTypeValue = source.bookTypeValue
    this.category = source.category
    this.bonuses = source.bonuses.slice()
    this.effectOnUse = source.effectOnUse?.slice()

    this._effectMods = source._effectMods.slice()
    for (const [id, stats] of Object.entries(this._effectStats)) {
      stats.restore(source.effect(Number(id)))
    }

    for (const [id, stats] of Object.entries(this._buffStats)) {
      stats.restore(source.buffStats(Number(id))!)
    }
  }

  protected override skillModifier(id: number) {
    if (this.skill.id === id) return this.modifiers
  }
  protected groupModifier(id: number) {
    if (Data.skills[this.skill.id]?.groups.includes(id)) return this.modifiers
  }
  addonSkillFeature(feature: AddonSkillFeature) {
    if (feature.skill) {
      if (this.skill.id !== feature.skill) return
      if (feature.skillGroup && !this.skill.tripods[feature.skillGroup - 1])
        return
      this.skillFeature(feature)
    } else if (feature.skillGroup) {
      if (Data.skills[this.skill.id]?.groups.includes(feature.skillGroup)) {
        this.skillFeature(feature)
      }
    } else {
      this.skillFeature(feature)
    }
  }

  private addUseEffect(fx: SkillFeatureEffect) {
    this.effectOnUse = this.effectOnUse ?? []
    this.effectOnUse.push(fx)
  }

  private stageMod(layer: number, stage: number) {
    const layers = this.stageMods
    if (!layers[layer]) layers[layer] = []
    const stages = layers[layer]
    if (!stages[stage]) stages[stage] = new StageModifier()
    return stages[stage]
  }

  skillFeature(fx: SkillFeatureEffect) {
    switch (fx.type) {
      case ESkillFeatureType.ENABLE_NOTIFY:
        if (fx.paramName0) {
          this.enableNotify[fx.paramName0] = fx.values[0] ?? 0
        }
        if (fx.paramName1) {
          this.enableNotifyGroup[fx.paramName1] = fx.values[0] ?? 0
        }
        break
      case ESkillFeatureType.CHANGE_LAYER:
        this.layer = fx.values[0] ?? 0
        break
      case ESkillFeatureType.CHANGE_STAGE_SPEED:
        this.stageMod(fx.values[0] ?? 0, fx.values[1] ?? 0).modSpeed(
          fx.paramType ?? 0,
          fx.values[2] ?? 0
        )
        break
      case ESkillFeatureType.CHANGE_COST:
        if (!fx.values[3] || fx.values[3] === 100) {
          this.manaCost = modValue(
            this.manaCost,
            fx.paramType,
            fx.values[0] ?? 0
          )
          this.gaugeCost[0] = modValue(
            this.gaugeCost[0],
            fx.paramType,
            fx.values[1] ?? 0
          )
          this.gaugeCost[1] = modValue(
            this.gaugeCost[1],
            fx.paramType,
            fx.values[2] ?? 0
          )
        } else {
          this.addUseEffect(fx)
        }
        break
      case ESkillFeatureType.RECOVER_USED_COST:
        // this is only used for striker LTS tripod
        this.addUseEffect(fx)
        break
      case ESkillFeatureType.REDUCE_DEFAULT_COOLDOWN:
        if (!fx.values[1] || fx.values[1] === 100) {
          this.cooldown = modValue(
            this.cooldown,
            fx.paramType,
            fx.values[0] ?? 0
          )
        } else {
          this.addUseEffect(fx)
        }
        break
      case ESkillFeatureType.REDUCE_ACTIVE_COOLDOWN:
        this.addUseEffect(fx)
        break
      case ESkillFeatureType.ENABLE_STAGE_BUFF:
      case ESkillFeatureType.ADD_STAGE_BUFF:
        // what's the difference?
        this.stageMod(fx.values[0] ?? 0, fx.values[1] ?? 0).addBuff(
          fx.values[2] ?? 0
        )
        break
      case ESkillFeatureType.CHANGE_BUFF_DURATION:
        // <> <buff> <value>
        this.buffStats(fx.values[1] ?? 0)?.modDuration(
          fx.paramType,
          fx.values[2] ?? 0
        )
        break
      case ESkillFeatureType.CHANGE_BUFF_STAT: {
        // <> <buff> <stat> <value> <stat> <value> <stat> <value>
        const stats = this.buffStats(fx.values[1] ?? 0)
        if (fx.values[2])
          stats?.modStat(fx.values[2], fx.paramType, fx.values[3] ?? 0)
        if (fx.values[4])
          stats?.modStat(fx.values[4], fx.paramType, fx.values[5] ?? 0)
        if (fx.values[6])
          stats?.modStat(fx.values[6], fx.paramType, fx.values[7] ?? 0)
        break
      }
      case ESkillFeatureType.CHANGE_BUFF_PARAM: {
        // <> <buff> <1=change 0=replace> <...values>
        const stats = this.buffStats(fx.values[1] ?? 0)
        if (stats) {
          if (fx.values[2]) {
            stats.modParams(fx.paramType, fx.values.slice(3) as number[])
          } else {
            stats.values = fx.values.slice(3) as number[]
          }
        }
        break
      }
      case ESkillFeatureType.CHANGE_DAM_ATTR:
        // <effect> <type>
        this.modEffect(fx.values[0] ?? 0, (effect) => {
          effect.damageType = fx.values[1] ?? 0
        })
        break
      case ESkillFeatureType.CHANGE_DAM_VALUE:
        // <effect> <damage%> <min hit> <max hit>
        if (fx.values[2] && fx.values[2] > 1) break
        this.modEffectStats(fx.values[0] ?? 0).modifiers.modDamage(
          (fx.values[1] ?? 0) / 100
        )
        break
      case ESkillFeatureType.CHANGE_DAM_CRITICAL:
        this.modEffectStats(fx.values[0] ?? 0).modifiers.modCritDamage(
          (fx.values[1] ?? 0) / 10000
        )
        break
      case ESkillFeatureType.CHANGE_DAM_CRITICAL_RATE:
        this.modEffectStats(fx.values[0] ?? 0).modifiers.modCritChance(
          (fx.values[1] ?? 0) / 10000
        )
        break
      case ESkillFeatureType.CHANGE_ATTACK_STAGE_SPEED:
        this.layers.forEach((layer, layerIndex) =>
          layer.stages.forEach((stage, stageIndex) => {
            if (stage.attackSpeed)
              this.stageMod(layerIndex, stageIndex).modSpeed(
                fx.paramType ?? 0,
                fx.values[0] ?? 0
              )
          })
        )
        break
      case ESkillFeatureType.CHANGE_STACK_CHARGE_TIME:
        this.stackCooldown += fx.values[0] ?? 0
        break
      case ESkillFeatureType.CHANGE_STACK_MAX_COUNT:
        this.stackLimit += fx.values[0] ?? 0
        break
      case ESkillFeatureType.CHANGE_SKILL_CHAIN_INFO:
        //TODO: implement chain skills
        break
      case ESkillFeatureType.ADD_BUFF_STAT:
        // <> <buff> <stat> <value>
        this.buffStats(fx.values[1] ?? 0)?.addStat(
          fx.values[2] ?? 0,
          fx.values[3] ?? 0
        )
        break
      case ESkillFeatureType.ADD_CHAIN_SKILL_EFFECT: {
        // <add to> <type> <actor> <add fx> <chance>
        const cfx: ChainSkillEffect = {
          type: fx.values[1] ?? 0,
          actor: fx.values[2] ?? 0,
          id: fx.values[3] ?? 0,
          chance: fx.values[4] ?? 0
        }
        this.modEffect(fx.values[0], (effect) => {
          effect.chainEffects.push(cfx)
        })
        break
      }
      case ESkillFeatureType.REMOVE_CHAIN_SKILL_EFFECT:
        // <remove from>
        this.modEffect(fx.values[0], (effect) => {
          effect.chainEffects.length = 0
        })
        break
      case ESkillFeatureType.ADD_CHAIN_COMBAT_EFFECT:
        if (fx.values[1]) {
          // <add to> <fx id>
          const cfx = Data.combatEffects[fx.values[1]]
          this.modEffect(fx.values[0], (effect) => {
            effect.combatEffects[fx.values[1]!] = cfx
          })
        }
        break
      case ESkillFeatureType.REMOVE_CHAIN_COMBAT_EFFECT:
        // <remove from>
        this.modEffect(fx.values[0], (effect) => {
          for (const key of Object.keys(effect.combatEffects)) {
            delete effect.combatEffects[key as any]
          }
        })
        break
      case ESkillFeatureType.CHANGE_SKILL_EFFECT_BONUS: {
        // hit exactly
        if (fx.values[12] && fx.values[12] !== 1) break
        // hit min
        if (fx.values[13] && fx.values[13] > 1) break
        // event type (2 = kill)
        if (fx.values[14]) break
        const bonus: SkillBonus = {
          percent: fx.paramType,
          manaPerHit: fx.values[3],
          manaMax: fx.values[4],
          cooldownPerHit: fx.values[5],
          cooldownMax: fx.values[6],
          gaugePerHit: fx.values[7],
          gaugeMax: fx.values[8],
          triggerBuff: fx.values[9],
          buffActor: fx.values[10],
          chance: fx.values[11] ?? 0
        }
        this.modEffect(fx.values[0], (effect) => {
          effect.bonuses.push(bonus)
        })
        break
      }
      case ESkillFeatureType.CHANGE_SKILL_EFFECT_AI_POINT:
        this.modEffect(fx.values[0], (effect) => {
          effect.aiMin = modValue(
            effect.aiMin ?? 0,
            fx.paramType,
            fx.values[1] ?? 0
          )
          effect.aiMax = modValue(
            effect.aiMax ?? 0,
            fx.paramType,
            fx.values[2] ?? 0
          )
        })
        break
      case ESkillFeatureType.CHANGE_DAM_ADDEND:
        // <effect> <damage%>
        this.modEffectStats(fx.values[0] ?? 0).modifiers.modDamage(
          (fx.values[1] ?? 0) / 100
        )
        break
      case ESkillFeatureType.CHANGE_HITTED:
        // no idea?
        break
      case ESkillFeatureType.ADD_SKILL_BUFF:
        // <buff>
        this.layers.forEach((layer, layerIndex) =>
          layer.stages.forEach((_stage, stageIndex) =>
            this.stageMod(layerIndex, stageIndex).addBuff(fx.values[0] ?? 0)
          )
        )
        break
      case ESkillFeatureType.CHANGE_SKILL_BONUS:
        // hit exactly
        if (fx.values[11] && fx.values[11] !== 1) break
        // hit min
        if (fx.values[12] && fx.values[12] > 1) break
        // event type (2 = kill)
        if (fx.values[13]) break
        this.bonuses.push({
          percent: fx.paramType,
          manaPerHit: fx.values[2],
          manaMax: fx.values[3],
          cooldownPerHit: fx.values[4],
          cooldownMax: fx.values[5],
          gaugePerHit: fx.values[6],
          gaugeMax: fx.values[7],
          triggerBuff: fx.values[8],
          buffActor: fx.values[9],
          chance: fx.values[10] ?? 0
        })
        break
      case ESkillFeatureType.CHANGE_SKILL_CONSTRAINT:
        // do what?
        break
      case ESkillFeatureType.CHANGE_SKILL_BOOK_TYPE:
        if (fx.values[0]) this.bookType = fx.values[0]
        if (fx.values[1]) this.bookTypeValue = fx.values[1]
        break
      case ESkillFeatureType.CHANGE_FORCED_CRITICAL:
        // this is just 100% crit?
        this.modifiers.modCritChance(1)
        break
      case ESkillFeatureType.CHANGE_INSTANCE_SKILL_EFFECT_INFO:
        // do what?
        break
      case ESkillFeatureType.CHANGE_SKILL_START_STAGE:
        this.startStage[fx.values[0] ?? 0] = fx.values[1] ?? 0
        break
      case ESkillFeatureType.ENABLE_IDENTITY_EVENT:
        // some destroyer/breaker stuff
        break
      case ESkillFeatureType.CHANGE_IDENTITY_PROC_VALUE:
        // add identity generation
        break
      case ESkillFeatureType.CHANGE_SKILL_EFFECT_IDENTITY_PROC_INFO:
        // mod identity generation
        break
      case ESkillFeatureType.CHANGE_SKILL_EFFECT_IDENTITY_PROC_REPLACE_INFO:
        // replace identity generation
        break
      case ESkillFeatureType.SWAP_CHAIN_SKILL_EFFECT:
        // probably unused now?
        break
      case ESkillFeatureType.CHANGE_CHARGE_SCALE:
        // holding skill damage buff (only used for paladin)
        break
      case ESkillFeatureType.CHANGE_SUMMON_NPC_LIFE_TIME:
        // summon lifetime
        break
      case ESkillFeatureType.CHANGE_SUMMON_NPC_SKILL_ID:
        // summon skill
        break
      case ESkillFeatureType.CHANGE_SUMMON_NPC_SPAWN_BUFF_ID:
        // summon buff
        break
      case ESkillFeatureType.CHANGE_SUMMON_NPC_SKILL_USABLE_TICK:
        // summon skill delay
        break
      case ESkillFeatureType.CHANGE_SUMMON_NPC_SKILL_USE_ORDER:
        // summon skill order
        break
      case ESkillFeatureType.CHANGE_COMBAT_EFFECT_ARG:
        if (!fx.values[1] || !Data.combatEffects[fx.values[1]]) break
        this.modEffect(fx.values[0], (effect) => {
          if (!effect.combatEffectStats[fx.values[1]!]) {
            effect.combatEffectStats[fx.values[1]!] =
              Data.combatEffects[fx.values[1]!].map(cloneCombatEffect)
          }
          for (const ce of effect.combatEffectStats[fx.values[1]!]) {
            if (fx.values[2] && ce.actions[0]) {
              ce.actions[0].args[0] = modValue(
                ce.actions[0].args[0] ?? 0,
                fx.paramType,
                fx.values[2]
              )
            }
            if (fx.values[5] && ce.actions[1]) {
              ce.actions[1].args[0] = modValue(
                ce.actions[1].args[0] ?? 0,
                fx.paramType,
                fx.values[5]
              )
            }
          }
        })
        break
      case ESkillFeatureType.CHANGE_ACCUMULATE_DAM_RATE:
        // damage accumulation tripods
        break
      case ESkillFeatureType.CHANGE_PROJECTILE_BANK_DATA_ADDEND:
        // when we implement projectile bank data for skills with damage ramp up
        break
      case ESkillFeatureType.CHANGE_IDENTITY_CATEGORY:
        this.category = fx.values[0] ?? 0
        break
      case ESkillFeatureType.CHANGE_ATTACK_MASK:
        // values are always 0...
        this.modEffect(fx.values[0], (effect) => {
          effect.directional = fx.values[1]
        })
        break
      case ESkillFeatureType.CHANGE_AWAKENING_DAM_VALUE:
        // hyper awakening damage
        break
    }
  }
}
