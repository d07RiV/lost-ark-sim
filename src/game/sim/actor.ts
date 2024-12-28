import { CombatConfig } from '../config'
import Data from '../data'
import {
  EAbnormalMoveGroupType,
  EAbnormalStatusType,
  ECombatEffectActionType,
  ECombatEffectActorType,
  ECombatEffectConditionType,
  EStatType
} from '../data/enums'
import { BuffInstance, BuffStats } from './buff'
import { ActorStats } from './player'
import { Simulation } from './sim'
import { SkillInstance } from './skillInstance'
import { evalStatScaling } from './stats'

export class ActorState {
  private backup!: ActorStats
  stats: ActorStats
  id = 0
  isPlayer = false
  grade = 0
  species = 0
  abnormalMove: EAbnormalMoveGroupType = 0
  abnormalStatus: EAbnormalStatusType = 0
  abnormalMoveImmune = false
  stance = 0

  get health() {
    return 1
  }
  get mana() {
    return 1
  }

  private constructor(
    private sim: Simulation,
    config: CombatConfig,
    level: number
  ) {
    this.stats = new ActorStats(config, level)
  }

  buffs: Record<number, BuffInstance> = {}

  private updateBuffStats() {
    this.stats.restore(this.backup)
    for (const buff of Object.values(this.buffs)) {
      buff.apply(this.stats)
    }
  }

  buffAdd(id: number, stats: BuffStats, stacks = 1) {
    if (this.buffs[id]) {
      this.buffs[id].refresh(stats, stacks)
    } else {
      this.buffs[id] = new BuffInstance(this.sim, id, stats, this, stacks)
    }
    this.updateBuffStats()
  }
  buffRemove(id: number) {
    this.buffs[id]?.remove()
    delete this.buffs[id]
  }

  currentSkill?: SkillInstance
  useSkill(id: number | undefined) {
    if (this.currentSkill) {
      this.currentSkill.stop()
      this.currentSkill = undefined
    }
    const skill = id ? this.stats.skill(id) : undefined
    if (skill) {
      this.currentSkill = new SkillInstance(
        this.sim,
        skill,
        this,
        this.sim.target
      )
      this.currentSkill.run()
    } else {
      this.checkNextSkill()
    }
  }

  private _reported = false

  canUseSkill(id: number, interrupt?: boolean) {
    if (!this.currentSkill) return true
    const cancels = this.currentSkill.skillCancels()
    if (!cancels) return false
    if (cancels.interrupt && !interrupt) return false
    if (cancels.skills && !cancels.skills.has(id)) return false
    return true
  }
  checkNextSkill() {
    if (this._reported) return
    if (this.canUseSkill(0)) {
      this._reported = true
      console.log(`finished at ${this.sim.time}`)
    }
  }

  static player(sim: Simulation, config: CombatConfig) {
    const state = new ActorState(sim, config, config.player.level)
    state.isPlayer = true
    const stats = state.stats
    stats.add(
      EStatType.ATTACK_POWER_RATE,
      Math.round(config.player.attackPowerBonus * 10000)
    )
    stats.add(EStatType.CRITICALHIT, config.player.crit)
    stats.add(EStatType.SPECIALTY, config.player.specialization)
    stats.add(EStatType.RAPIDITY, config.player.swiftness)
    stats.add(
      EStatType.SKILL_DAMAGE_RATE,
      Math.round(config.player.additionalDamage * 10000)
    )
    stats.modifiers.modDamage(config.player.damageMultiplier - 1)
    stats.modifiers.modCritChance(config.player.critChance)
    stats.modifiers.modCritDamage(config.player.critDamage)

    for (const skill of config.player.skills) {
      stats.skill(skill.id, skill)
    }

    if (config.player.critMultiplier !== 1) {
      stats.combatEffects[9000000001] = [
        {
          conditions: [],
          actions: [
            {
              type: ECombatEffectActionType.MODIFY_DAMAGE_WHEN_CRITICAL,
              actor: ECombatEffectActorType.TARGET,
              args: [Math.round((config.player.critMultiplier - 1) * 10000)]
            }
          ]
        }
      ]
    }
    if (config.player.backMultiplier !== 1) {
      stats.combatEffects[9000000002] = [
        {
          conditions: [
            {
              type: ECombatEffectConditionType.DIRECTIONAL_ATTACK,
              actor: ECombatEffectActorType.TARGET,
              arg: 1
            }
          ],
          actions: [
            {
              type: ECombatEffectActionType.MODIFY_DAMAGE,
              actor: ECombatEffectActorType.TARGET,
              args: [Math.round((config.player.backMultiplier - 1) * 10000)]
            }
          ]
        }
      ]
    }
    if (config.player.frontMultiplier !== 1) {
      stats.combatEffects[9000000002] = [
        {
          conditions: [
            {
              type: ECombatEffectConditionType.DIRECTIONAL_ATTACK,
              actor: ECombatEffectActorType.TARGET,
              arg: 2
            }
          ],
          actions: [
            {
              type: ECombatEffectActionType.MODIFY_DAMAGE,
              actor: ECombatEffectActorType.TARGET,
              args: [Math.round((config.player.frontMultiplier - 1) * 10000)]
            }
          ]
        }
      ]
    }
    if (config.player.arkEnabled) {
      for (const [id, state] of Object.entries(config.player.arkEngravings)) {
        const engraving =
          Data.engravings[Number(id) + 1000] ?? Data.engravings[Number(id)]
        if (!engraving) continue
        const level = state.stone * 20 + state.level + 1
        for (const stat of engraving.stats) {
          stats.addon(evalStatScaling(stat, level))
        }
      }
      for (const [id, level] of Object.entries(config.player.arkPassive)) {
        const passive = Data.arkPassive[Number(id)]
        if (!passive || !level) continue
        for (const stat of passive.stats) {
          stats.addon(evalStatScaling(stat, level))
        }
      }
    } else {
      // engravings: Record<number, number>
      // setBonus: string | undefined
    }

    const synergy = config.player.synergy
    stats.add(EStatType.MOVE_SPEED_RATE, Math.round(synergy.moveSpeed * 10000))
    stats.add(
      EStatType.ATTACK_SPEED_RATE,
      Math.round(synergy.attackSpeed * 10000)
    )
    stats.add(
      EStatType.CRITICAL_HIT_RATE,
      Math.round(synergy.critChance * 10000)
    )
    stats.add(
      EStatType.SKILL_DAMAGE_RATE,
      Math.round(synergy.additionalDamage * 10000)
    )
    stats.add(
      EStatType.EVOLUTION_DAM_RATE,
      Math.round(synergy.evoDamage * 10000)
    )
    stats.add(
      EStatType.ATTACK_POWER_ADDEND,
      Math.round(synergy.attackPower * 10000)
    )
    stats.modifiers.modAtkPowerMultiplier(synergy.attackPowerMultiplier)
    // this should be in target state
    stats.modifiers.modDefReduction(synergy.armorReduction)
    for (const m of synergy.multipliers) {
      stats.modifiers.modDamage(m)
    }
    if (synergy.critMultiplier) {
      stats.combatEffects[9100000001] = [
        {
          conditions: [],
          actions: [
            {
              type: ECombatEffectActionType.MODIFY_DAMAGE_WHEN_CRITICAL,
              actor: ECombatEffectActorType.TARGET,
              args: [Math.round(synergy.critMultiplier * 10000)]
            }
          ]
        }
      ]
    }
    if (synergy.directionalMultipliers.length) {
      const mult = synergy.directionalMultipliers.reduce(
        (m, v) => m * (1 + v),
        1
      )
      stats.combatEffects[9100000002] = [
        {
          conditions: [
            {
              type: ECombatEffectConditionType.DIRECTIONAL_ATTACK,
              actor: ECombatEffectActorType.TARGET,
              arg: 3
            }
          ],
          actions: [
            {
              type: ECombatEffectActionType.MODIFY_DAMAGE,
              actor: ECombatEffectActorType.TARGET,
              args: [Math.round((mult - 1) * 10000)]
            }
          ]
        }
      ]
    }

    state.backup = state.stats.clone()
    return state
  }

  static target(sim: Simulation, config: CombatConfig) {
    const state = new ActorState(sim, config, config.target.level)
    state.grade = config.target.grade
    state.species = config.target.species
    state.backup = state.stats.clone()
    state.abnormalMoveImmune = true
    return state
  }
}
