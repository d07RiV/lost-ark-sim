import { bonus_map, BonusID } from './bonuses'
import { PlayerConfig, SkillConfig } from './config'
import { ark_passives } from './data/ark'
import { engravings } from './data/engraving'
import { cooldown_gems, damage_gems } from './data/gems'
import { skills } from './data/skills'
import { PlayerData } from './types/player'
import { SkillData } from './types/skills'
import { statAdditiveKeys, StatValues, StatValuesPerLevel } from './types/stats'

export type BuffInfo = {
  icon: string
  name: string
  stats: Partial<StatValues>
}

export type SkillInfo = {
  index: number
  config: SkillConfig
  data?: SkillData
  damage?: number
}

export type Summary = {
  duration: number
  damage: number
  mana: number
  dps: number
}

function scaleValues(stats: Partial<StatValues>, factor: number) {
  const result: Partial<StatValues> = {}
  for (const key of statAdditiveKeys) {
    if (stats[key]) result[key] = stats[key] * factor
  }
  if (stats.bonuses) {
    const bonuses: StatValues['bonuses'] = {}
    for (const [id, value] of Object.entries(stats.bonuses)) {
      bonuses[id as BonusID] = value * factor
    }
    result.bonuses = bonuses
  }
  return result
}

function selectValues(stats: StatValuesPerLevel, index: number) {
  const result: Partial<StatValues> = {}
  for (const [key, value] of Object.entries(stats)) {
    if (key === 'bonuses') {
      const bonuses: StatValues['bonuses'] = {}
      for (const [id, level] of Object.entries(value)) {
        bonuses[id as BonusID] = Array.isArray(level) ? level[index] : level
      }
      result.bonuses = bonuses
    } else {
      result[key as Exclude<keyof StatValues, 'bonuses'>] = Array.isArray(value)
        ? value[index]
        : (value as number)
    }
  }
  return result
}

function applyBonuses(data: SkillData) {
  if (data.directionalFlag) {
    if (data.directionalFlag & 2) {
      data.add(
        {
          damageMultiplier: 1.2
        },
        'Front Attack'
      )
    } else if (data.directionalFlag & 1) {
      data.add(
        {
          damageMultiplier: 1.05,
          critChance: 0.1
        },
        'Back Attack'
      )
    }
  }
  for (const [id, func] of Object.entries(bonus_map)) {
    const value = data.values.bonuses[id as BonusID]
    if (value) {
      const sources = Object.keys(data.sources.bonuses[id as BonusID] ?? {})
      data._source = sources.length === 1 ? sources[0] : 'Multiple Sources'
      func(data, value)
      data._source = undefined
    }
  }
}

function armorReduction(mult: number) {
  const armorFactor = (def: number) => def / (def + 1.11)
  return ((1 - armorFactor(mult)) / (1 - armorFactor(1))) * 0.4002
}

function skillDamage(data: SkillData) {
  const { base } = data
  if (!base.damage) return 0
  return (
    (base.damage.base + base.damage.scaling * data.attackPower) *
    (1 + Math.min(1, data.critChance) * (data.critMultiplier - 1)) *
    data.damageMultiplier *
    armorReduction(data.values.armorMultiplier)
  )
}

export function playerState(config: PlayerConfig) {
  const player = new PlayerData(config)
  const hiddenSkills: number[] = []
  if (config.arkEnabled) {
    for (const [id, value] of Object.entries(config.arkPassive)) {
      const node = ark_passives[Number(id)]
      if (!node) continue
      if (node.stats) {
        if (typeof node.stats === 'function') {
          player.add(node.stats(value), node.name)
        } else if (Array.isArray(node.stats)) {
          player.add(node.stats[value - 1], node.name)
        } else {
          player.add(scaleValues(node.stats, value), node.name)
        }
      }
      if (node.skill) hiddenSkills.push(node.skill)
    }

    for (const [id, pts] of Object.entries(config.arkEngravings)) {
      if (!pts) continue
      const info = engravings[Number(id)]
      if (!info || !info.values || !info.stats) continue
      const values = info.values.map((v) => {
        let value = v.base
        if (v.epic && pts.level >= 1)
          value += v.epic[Math.min(3, pts.level - 1)]
        if (v.legendary && pts.level >= 5)
          value += v.legendary[Math.min(3, pts.level - 5)]
        if (v.relic && pts.level >= 9)
          value += v.relic[Math.min(3, pts.level - 9)]
        if (v.stone && pts.stone >= 1)
          value += v.stone[Math.min(3, pts.stone - 1)]
        return value
      })
      player.add(info.stats(values), info.name)
    }
  }

  const buffs: Record<string, BuffInfo> = {}
  const skillList: SkillConfig[] = [
    ...config.skills,
    ...hiddenSkills.map((id) => ({
      id,
      level: 1,
      tripods: {}
    }))
  ]
  for (const skill of skillList) {
    const data = skills[skill.id]
    if (data.buffs) {
      for (const [id, stats] of Object.entries(data.buffs)) {
        buffs[id] = {
          name: data.name,
          icon: data.icon,
          stats: typeof stats === 'function' ? stats(skill.level) : stats
        }
      }
    }
    for (const index of Object.keys(skill.tripods)) {
      const tripod = data.tripods?.[Number(index)]
      if (tripod?.buffs) {
        for (const [id, stats] of Object.entries(tripod.buffs)) {
          buffs[id] = {
            name: tripod.name,
            icon: tripod.icon,
            stats
          }
        }
      }
    }
  }

  const skillData: SkillInfo[] = []

  const summary: Summary = {
    damage: 0,
    duration: 0,
    mana: 0,
    dps: 0
  }

  const cooldown: Record<number, number> = {}

  config.skills.forEach((skill, index) => {
    const gameSkill = skills[skill.id]

    const info: SkillInfo = {
      index,
      config: skill
    }

    if (gameSkill.data) {
      const data = new SkillData(
        skill,
        player,
        gameSkill.data(skill.level, player.level)
      )
      if (data.directional && config.directionalFactor)
        data.directionalFlag = data.directional & 2 ? 2 : 1
      for (const [index, level] of Object.entries(skill.tripods)) {
        const tripod = gameSkill.tripods?.[Number(index)]
        if (tripod?.effect) {
          data._source = tripod.name
          tripod.effect(data, level)
          data._source = undefined
        }
      }
      if (skill.damageGem)
        data.add(
          {
            damageMultiplier: 1 + (damage_gems[skill.damageGem]?.effect ?? 0)
          },
          'Gem'
        )
      if (skill.cooldownGem)
        data.add(
          {
            cooldownMultiplier:
              1 - (cooldown_gems[skill.cooldownGem]?.effect ?? 0)
          },
          'Gem'
        )
      if (skill.flags) {
        for (const flag of skill.flags) {
          if (buffs[flag]) {
            data.add(buffs[flag].stats, buffs[flag].name)
          }
        }
      }
      const nonDir =
        data.directional && config.directionalFactor !== 1
          ? data.clone()
          : undefined
      applyBonuses(data)

      let damage = skillDamage(data)
      if (nonDir) {
        nonDir.directionalFlag = 0
        applyBonuses(nonDir)
        damage =
          (1 - config.directionalFactor) * skillDamage(nonDir) +
          config.directionalFactor * damage
      }

      info.data = data
      info.damage = damage

      if (skill.rotationNum) {
        if (skill.rotationDen !== 0) {
          const factor = skill.rotationNum / (skill.rotationDen ?? 1)
          cooldown[skill.id] =
            (cooldown[skill.id] ?? 0) + data.cooldown * factor
          summary.damage += damage * factor
          summary.mana += data.manaCost * factor
        } else if (data.cooldown) {
          summary.dps += damage / data.cooldown
        }
      }
    }

    skillData.push(info)
  })

  for (const value of Object.values(cooldown)) {
    summary.duration = Math.max(summary.duration, value)
  }
  if (summary.duration) {
    summary.dps += summary.damage / summary.duration
  }

  return {
    player,
    buffs,
    hiddenSkills,
    skills: skillData,
    summary
  }
}

export type PlayerCalc = ReturnType<typeof playerState>
