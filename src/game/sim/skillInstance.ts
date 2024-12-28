import Data from '../data'
import {
  ECombatEffectActionType,
  ECombatEffectActorType,
  ECombatEffectConditionType,
  EInputTimingType
} from '../data/enums'
import { ActionStage, CombatEffect, StageNotify } from '../data/types'
import { ActorState } from './actor'
import { Simulation } from './sim'
import { SkillEffectStats, SkillStats, StageModifier } from './skill'

type TimingWindow = {
  skills?: number[]
  interrupt?: boolean
}
export type SkillCancels = {
  skills?: Set<number>
  interrupt: boolean
}

export class SkillInstance {
  layer: number
  combatEffects: Record<number, CombatEffect> = {}
  directional = 3

  activeStage?: ActiveSkillStage

  private timingWindows = new Set<TimingWindow>()

  constructor(
    private sim: Simulation,
    public skill: SkillStats,
    public caster: ActorState,
    public target: ActorState
  ) {
    this.layer = skill.layer
  }

  skillCancels(): SkillCancels | undefined {
    if (!this.timingWindows.size) return
    let interrupt = true
    for (const w of this.timingWindows) {
      if (!w.interrupt) interrupt = false
    }
    const skills = new Set<number>()
    for (const w of this.timingWindows) {
      if (!w.skills) return { interrupt }
      for (const id of w.skills) skills.add(id)
    }
    return { skills, interrupt }
  }

  stop() {
    if (this.activeStage) {
      this.activeStage.stop()
    }
    this.activeStage = undefined
  }

  run() {
    this.playStage(this.skill.startStage[this.layer] ?? 0)
  }

  playStage(index: number) {
    if (index < 0) {
      // stop skill
      this.caster.useSkill(undefined)
      return
    }
    if (this.activeStage) {
      this.activeStage.stop()
    }
    this.activeStage = new ActiveSkillStage(this.sim, this, index)
    const stage = this.activeStage.stage
    const notify = this.activeStage.notify

    this.activeStage.at(stage.length, () => this.playStage(stage.nextStage))

    const perfect = notify.some(
      (n) =>
        n.type === 'InputTiming' &&
        n.inputType === EInputTimingType.ITT_PERFECTZONE
    )

    let lastEffect = 0
    for (const n of notify) {
      if (n.type !== 'Effect') continue
      let time = n.time
      if (n.repeat && n.interval) {
        time += n.interval * (n.repeat - 1)
      }
      lastEffect = Math.max(lastEffect, time)
    }

    let hasStageChange = stage.nextStage >= 0
    for (const n of notify) {
      if (n.type !== 'InputTiming') continue
      if (n.inputType === EInputTimingType.ITT_PERFECTZONE) {
        this.activeStage.event({
          time: n.time,
          maxTime: n.time + n.duration,
          delay: this.sim.config.reactionTime,
          func: () => this.playStage(n.nextStage)
        })
        hasStageChange = true
      } else if (n.inputType === EInputTimingType.ITT_STAGECHANGE && !perfect) {
        hasStageChange = true
        // We assume that next stage is always correct if present
        if (stage.nextStage >= 0 && stage.nextStage !== n.nextStage) continue
        if (n.instant) {
          if (n.time > lastEffect) {
            this.activeStage.at(n.time, () => this.playStage(n.nextStage))
          }
        } else if (n.time + n.duration > lastEffect) {
          this.activeStage.event({
            time: Math.max(n.time, lastEffect),
            maxTime: n.time + n.duration,
            delay: this.sim.config.reactionTime,
            func: () => this.playStage(n.nextStage)
          })
        }
      }
    }

    if (hasStageChange) {
      lastEffect = stage.length
    }

    // now queue up skill interrupts
    for (const n of notify) {
      if (n.type !== 'InputTiming') continue
      if (n.inputType !== EInputTimingType.ITT_INPUTCANCEL) continue
      if (n.instant) {
        const w: TimingWindow = {
          skills: n.skills,
          interrupt: n.time <= lastEffect
        }
        this.activeStage.at(n.time, () => {
          this.timingWindows.add(w)
          this.caster.checkNextSkill()
          this.timingWindows.delete(w)
        })
      } else {
        if (n.time < lastEffect) {
          const w: TimingWindow = {
            skills: n.skills,
            interrupt: true
          }
          this.activeStage.event({
            time: n.time,
            maxTime: n.time + n.duration,
            delay: this.sim.config.reactionTime,
            func: () => {
              this.timingWindows.add(w)
              this.caster.checkNextSkill()
              this.activeStage?.event({
                time: lastEffect,
                maxTime: n.time + n.duration,
                delay: this.sim.config.reactionTime,
                alwaysRun: true,
                func: () => this.timingWindows.delete(w)
              })
            }
          })
        }
        if (lastEffect < n.time + n.duration) {
          const w: TimingWindow = {
            skills: n.skills,
            interrupt: false
          }
          this.activeStage.event({
            time: Math.max(n.time, lastEffect),
            maxTime: n.time + n.duration,
            delay: this.sim.config.reactionTime,
            func: () => {
              this.timingWindows.add(w)
              this.caster.checkNextSkill()
              this.activeStage?.event({
                time: n.duration,
                alwaysRun: true,
                func: () => this.timingWindows.delete(w)
              })
            }
          })
        }
      }
    }
  }

  private evalCondition(
    type: ECombatEffectConditionType,
    actorType: ECombatEffectActorType,
    arg: number,
    effect: SkillEffectStats
  ) {
    const actor =
      actorType === ECombatEffectActorType.TARGET ? this.target : this.caster
    switch (type) {
      case ECombatEffectConditionType.CURRENT_SKILL:
        return arg === this.skill.skill.id
      case ECombatEffectConditionType.HP_LESS:
        return actor.health <= arg / 100
      case ECombatEffectConditionType.HP_GREATER:
        return actor.health >= arg / 100
      case ECombatEffectConditionType.MP_LESS:
        return actor.mana <= arg / 100
      case ECombatEffectConditionType.MP_GREATER:
        return actor.mana >= arg / 100
      case ECombatEffectConditionType.NPC_GRADE_LESS:
        return actor.grade <= arg
      case ECombatEffectConditionType.NPC_GRADE_GREATER:
        return actor.grade >= arg
      case ECombatEffectConditionType.NPC_GRADE_EQUAL:
        return actor.grade === arg
      case ECombatEffectConditionType.NPC_SPECIES:
        return actor.species === arg
      case ECombatEffectConditionType.ABNORMAL_MOVE:
        return actor.abnormalMove === arg
      case ECombatEffectConditionType.ABNORMAL_STATUS:
        return actor.abnormalStatus === arg
      case ECombatEffectConditionType.ABNORMAL_MOVE_IMMUNE:
        return actor.abnormalMoveImmune
      case ECombatEffectConditionType.ABNORMAL_STATUS_IMMUNE:
        return true // immune to specific type of cc - not really used
      case ECombatEffectConditionType.ABNORMAL_MOVE_ALL:
        return actor.abnormalMove !== 0
      case ECombatEffectConditionType.PC:
        return actor.isPlayer
      case ECombatEffectConditionType.SKILL_EFFECT_ID:
        return effect.id === arg
      case ECombatEffectConditionType.IDENTITY_STACK_COUNT:
        //TODO:
        // arcana: cards on target
        // destroyer: orbs on self
        return false
      case ECombatEffectConditionType.ABNORMAL_NOT_MOVE:
        return actor.abnormalMove !== arg
      case ECombatEffectConditionType.TARGET_COUNT:
        return arg === 1 // not used?
      case ECombatEffectConditionType.SKILL_IDENTITY_CATEGORY:
        return Data.skills[this.skill.skill.id]?.category === arg
      case ECombatEffectConditionType.IDENTITY_ELEMENT_VALUE:
        //TODO:
        // shadowhunter: encroachment release (PS stuff?)
        // soulfist: energy
        return false
      case ECombatEffectConditionType.IDENTITY_ELEMENT_VALUE_LESS:
        //TODO: same as above
        return false
      case ECombatEffectConditionType.DIRECTIONAL_ATTACK:
        return (arg & (effect.directional ?? 0) & this.directional) !== 0
      case ECombatEffectConditionType.CURRENT_SKILL_GROUP:
        return Data.skills[this.skill.skill.id]?.groups.includes(arg) ?? false
      case ECombatEffectConditionType.ABNORMAL_MOVE_STATUS_ALL:
        return actor.abnormalMove !== 0 || actor.abnormalStatus !== 0
      case ECombatEffectConditionType.IDENTITY_STANCE:
        return actor.stance === arg
      case ECombatEffectConditionType.PC_SKILL:
        return Boolean(Data.skills[this.skill.skill.id]?.bookType)
      case ECombatEffectConditionType.SKILL_EFFECT_GROUP_SET:
        //TODO: verify
        return effect.id === arg
      case ECombatEffectConditionType.NPC_ID:
        return actor.id === arg
      case ECombatEffectConditionType.NPC_SCALED_LEVEL_EQUAL:
        return actor.stats.level === arg
      case ECombatEffectConditionType.NPC_SCALED_LEVEL_LESS:
        return actor.stats.level <= arg
      case ECombatEffectConditionType.NPC_SCALED_LEVEL_GREATER:
        return actor.stats.level >= arg
      case ECombatEffectConditionType.NOT_SKILL_EFFECT_ID:
        return effect.id !== arg
      case ECombatEffectConditionType.ABNORMAL_MOVE_IMMUNE:
        return !actor.abnormalMoveImmune
      case ECombatEffectConditionType.DAMAGE_ATTR:
        return effect.values[4] === arg
      case ECombatEffectConditionType.STATUS_EFFECT_ON:
        return actor.buffs[arg] != null
      case ECombatEffectConditionType.IDENTITY_GAUGE0_VALUE_LESS:
        //TODO:
        return false
      case ECombatEffectConditionType.IDENTITY_GAUGE0_VALUE_GREATER:
        //TODO:
        return false
      case ECombatEffectConditionType.IDENTITY_GAUGE1_VALUE_LESS:
        //TODO:
        return false
      case ECombatEffectConditionType.DIRECTIONAL_SKILL_EFFECT:
        return ((3 - arg) & (effect.directional ?? 0) & this.directional) !== 0
      default:
        return false
    }
  }

  getCombatEffects(
    effect: SkillEffectStats,
    func: (
      type: ECombatEffectActionType,
      actor: ECombatEffectActorType,
      args: number[]
    ) => void
  ) {
    const done = new Set<number>()
    const process = (id: number) => {
      if (done.has(id)) return
      done.add(id)
      const stats = effect.combatEffectStats[id] ?? Data.combatEffects[id]
      for (const fx of stats) {
        if (
          fx.conditions.some(
            (c) => !this.evalCondition(c.type, c.actor, c.arg, effect)
          )
        )
          continue
        for (const action of fx.actions) {
          func(action.type, action.actor, action.args)
        }
      }
    }
    for (const id in this.combatEffects) {
      process(Number(id))
    }
    for (const id in effect.combatEffects) {
      process(Number(id))
    }
  }
}

type StageEvent = {
  time: number
  delay?: number
  maxTime?: number
  func: () => void
  alwaysRun?: boolean
}

export class ActiveSkillStage {
  skill: SkillStats
  stage: ActionStage
  notify: StageNotify[]
  speed = 1

  private events = new Set<StageEvent>()

  private startTime: number
  private startPos = 0
  private stageEvents: (() => void)[] = []
  private otherEvents: (() => void)[] = []

  private get stageMod(): StageModifier | undefined {
    return this.skill.stageMods[this.instance.layer]?.[this.index]
  }

  get baseTime() {
    return this.startTime - this.startPos / this.speed
  }

  constructor(
    private sim: Simulation,
    public instance: SkillInstance,
    public index: number
  ) {
    this.skill = instance.skill
    const data = Data.skills[this.skill.skill.id]
    this.stage = data.layers[instance.layer].stages[index]
    this.startTime = sim.time

    this.update()

    this.notify = this.stage.notify
      .filter((n) => {
        const disabled =
          (n.name ? this.skill.enableNotify[n.name] : undefined) ??
          (n.group ? this.skill.enableNotifyGroup[n.group] : undefined) ??
          !n.disabled
        return disabled
      })
      .sort((a, b) => a.time - b.time)
    for (const n of this.notify) {
      this.at(n.time, () => this.onNotify(n))
    }

    const buffs = this.stageMod?.buffs
    if (buffs) {
      for (const id of buffs) {
        const buff = this.skill.buffStats(id)
        if (buff) {
          instance.caster.buffAdd(id, buff)
          this.otherEvents.push(() => instance.caster.buffRemove(id))
        }
      }
    }
    if (this.stage.buffEnable && this.stage.buff) {
      const buff = this.skill.buffStats(this.stage.buff)
      if (buff) {
        const id = this.stage.buff
        instance.caster.buffAdd(id, buff)
        this.otherEvents.push(() => instance.caster.buffRemove(id))
      }
    }
  }

  private resetEvents() {
    for (const e of this.stageEvents) e()
    this.stageEvents.length = 0
  }

  private queueEvent(e: StageEvent) {
    let time = e.time
    if (e.delay) {
      time += e.delay * this.speed
      if (e.maxTime != null && time >= e.maxTime) {
        if (e.alwaysRun) time = e.maxTime
        else return
      }
    }
    this.stageEvents.push(
      this.sim.at(this.baseTime + time / this.speed, () => {
        this.events.delete(e)
        e.func()
      })
    )
  }

  event(e: StageEvent) {
    this.events.add(e)
    this.queueEvent(e)
  }

  at(time: number, func: () => void) {
    this.event({ time, func })
  }

  stop() {
    this.resetEvents()
    for (const e of this.events) {
      if (e.alwaysRun) e.func()
    }
    this.events.clear()
    for (const e of this.otherEvents) e()
    this.otherEvents.length = 0
  }

  private onNotify(n: StageNotify) {
    if (n.type === 'InputTiming') {
      // process input timing
    } else if (n.type === 'Effect') {
      const apply = () => {
        for (const fx of n.effects) {
          this.sim.effect(fx.id, this.instance)
        }
      }
      apply()
      if (n.repeat) {
        for (let i = 1; i < n.repeat; ++i) {
          this.otherEvents.push(
            this.sim.after(((n.interval ?? 0) * i) / this.speed, apply)
          )
        }
      }
    }
  }

  update() {
    const { sim, skill } = this

    this.startPos = (sim.time - this.startTime) * this.speed + this.startPos
    this.startTime = sim.time

    this.resetEvents()

    this.speed = (this.stageMod?.speed ?? 1) * this.stage.playRate
    if (this.stage.attackSpeed) {
      this.speed *= skill.attackSpeed
    }

    for (const e of this.events) {
      this.queueEvent(e)
    }
  }
}
