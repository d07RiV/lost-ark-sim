import { skills } from './data/skills'
import { SkillData } from './types/skills'

export type BonusEffect = (skill: SkillData, value: number) => void

const make_map = <K extends string>(src: Record<K, BonusEffect>) => src

export const bonus_map = make_map({
  // Ark passive common stats

  skill_cdr(skill, value) {
    const info = skills[skill.skill.id]
    if (!info.awakening && !info.movement) {
      skill.add({
        cooldownMultiplier: 1 - value
      })
    }
  },
  mp_skill_cdr(skill, value) {
    if (skill.manaCost) {
      skill.add({
        cooldownMultiplier: 1 - value
      })
    }
  },
  mp_evo_damage(skill, value) {
    if (skill.manaCost) {
      skill.add({
        evoDamage: value
      })
    }
  },
  mp_reduction(skill, value) {
    skill.add({
      manaMultiplier: 1 - value
    })
  },
  directional_crit_damage(skill, value) {
    if (skill.directional && skill.directionalFlag) {
      skill.add({
        critDamage: value
      })
    }
  },
  mp_furnace(skill, value) {
    skill.add({
      evoDamage:
        Math.min(0.12, Math.floor(skill.base.mana / 10) * 0.0025) * value
    })
  },

  // Engraving stuff

  super_charge_speed(skill, value) {
    if (skill.type === 3) {
      skill.add({ speedMultiplier: 1 + value })
    }
  },

  super_charge_damage(skill, value) {
    if (skill.type === 3) {
      skill.add({ damageMultiplier: 1 + value })
    }
  },

  all_out_attack_speed(skill, value) {
    if (skill.type === 4 || skill.type === 11) {
      skill.add({ speedMultiplier: 1 + value })
    }
  },

  all_out_attack_damage(skill, value) {
    if (skill.type === 4 || skill.type === 11) {
      skill.add({ damageMultiplier: 1 + value })
    }
  },

  keen_blunt_weapon(skill) {
    skill.add({
      damageMultiplier: 0.98
    })
  },

  mp_skill_damage(skill, value) {
    if (skill.manaCost) {
      skill.add({
        damageMultiplier: 1 + value
      })
    }
  },

  awakening_cooldown(skill, value) {
    const info = skills[skill.skill.id]
    if (info.awakening) {
      skill.add({
        cooldownMultiplier: 1 - value
      })
    }
  },

  propulsion() {
    // should be implemented with buffs
  },

  hit_master(skill, value) {
    if (!skill.directional) {
      skill.increaseDamage(value)
    }
  },

  sight_focus() {
    // should be implemented with buffs
  },

  // Ark Leap common nodes

  ark_transcendent_power() {
    // H.A. not implemented yet
  },

  ark_charged_fury() {
    // Awakening CDR when H.A. is charged
  },

  ark_awakening_amplifier() {
    // Extra awakening uses
  },

  ark_unleashed_power(skill, level) {
    const info = skills[skill.skill.id]
    if (info.technique) {
      skill.add({
        damageMultiplier: 1 + 0.03 * level
      })
    }
  },

  ark_release_potential(skill, level) {
    const info = skills[skill.skill.id]
    if (info.technique) {
      skill.add({
        cooldownMultiplier: 1 - 0.02 * level
      })
    }
  },

  ark_instant_spell(skill, level) {
    const info = skills[skill.skill.id]
    if (info.technique) {
      skill.add({
        speedMultiplier: 1 + 0.04 * level,
        manaMultiplier: 1 - 0.3 * level
      })
    }
  },

  // Glaivier

  class_lancemaster(skill) {
    const info = skills[skill.skill.id]
    if (
      !skill.values.bonuses.glaivier_control &&
      !skill.values.bonuses.engraving_glaivier_control
    ) {
      if (info.category === 16 || info.awakening) {
        // assume awakening is used in blue stance
        skill.add(
          {
            attackSpeed: 0.15,
            damageMultiplier: 1.25
          },
          'Flurry Stance'
        )
      }
      if (info.category === 17) {
        skill.add(
          {
            moveSpeed: 0.15,
            critDamage: 0.6
          },
          'Focus Stance'
        )
      }
    }
    if (info.category === 17) {
      skill.add(
        {
          damageMultiplier: 1 + 0.42 * skill.specCoefficient
        },
        'Specialization'
      )
    }
  },

  engraving_glaivier_pinnacle(skill, level) {
    const info = skills[skill.skill.id]
    if (
      !skill.values.bonuses.glaivier_control &&
      !skill.values.bonuses.engraving_glaivier_control
    ) {
      const factor = [0.4, 0.6, 1][level - 1]
      if (info.category === 16 || info.awakening) {
        // assume awakening is used in blue stance
        skill.add(
          {
            moveSpeed: 0.15 * factor,
            critDamage: 0.6 * factor
          },
          'Flurry Stance'
        )
      }
      if (info.category === 17) {
        skill.add(
          {
            attackSpeed: 0.15 * factor,
            damageMultiplier: 1.25 * factor
          },
          'Focus Stance'
        )
      }
    }
  },

  engraving_glaivier_control(skill, level) {
    const info = skills[skill.skill.id]
    if (info.category === 16) {
      skill.add({
        damageMultiplier: 1 + [0.22, 0.33, 0.44][level - 1]
      })
    }
  },

  glaivier_control() {
    // Disables Focus Stance, but Dual Meter Gain +50/75/100%.
  },

  glaivier_pinnacle_i(skill, level) {
    const info = skills[skill.skill.id]
    if (info.category === 16 || info.awakening) {
      skill.add(
        {
          moveSpeed: [0.06, 0.09, 0.15][level - 1]
        },
        'Flurry Stance'
      )
    } else if (info.category === 17) {
      skill.add(
        {
          attackSpeed: [0.06, 0.09, 0.15][level - 1]
        },
        'Focus Stance'
      )
    }
  },

  glaivier_flurry_move() {
    // When consuming the Dual Meter, Movement Skill cooldown -2.0s.
  },

  glaivier_pinnacle_ii(skill, level) {
    const info = skills[skill.skill.id]
    if (info.category === 16 || info.awakening) {
      skill.add(
        {
          critDamage: [0.2, 0.4, 0.6][level - 1]
        },
        'Flurry Stance'
      )
    }
  },

  glaivier_lethal_slash(skill, level) {
    const info = skills[skill.skill.id]
    if (info.category === 16) {
      skill.add({
        critDamage: 0.04 * level
      })
    }
  },

  glaivier_flurry_enhancement(skill, level) {
    const info = skills[skill.skill.id]
    if (info.category === 16) {
      skill.add({
        damageMultiplier: 1 + [0.14, 0.28, 0.44][level - 1]
      })
    }
  },

  glaivier_pinnacle_iii(skill, level) {
    const info = skills[skill.skill.id]
    if (info.category === 17) {
      skill.add(
        {
          damageMultiplier: 1 + [0.08, 0.16, 0.25][level - 1]
        },
        'Focus Stance'
      )
    }
  },

  glaivier_power_stab(skill, level) {
    const info = skills[skill.skill.id]
    if (info.category === 17) {
      skill.add({
        damageMultiplier: 1 + 0.012 * level
      })
    }
  },

  glaivier_yeon_style_mark(skill, level) {
    skill.add({
      damageMultiplier: 1 + 0.012 * level
    })
  },

  glaivier_yeon_style_technique(skill, level) {
    if (skill.skill.id === 34660) {
      skill.add({
        critChance: 1,
        damageMultiplier: level
      })
    }
  },

  glaivier_yeon_style_encore() {
    // Implemented in yeon_style_encore_active
  },

  yeon_style_encore_active(skill) {
    const level = skill.values.bonuses.glaivier_yeon_style_encore
    if (level) {
      skill.add({
        damageMultiplier: 1 + [0.23, 0.46, 0.7][level - 1]
      })
    }
  },

  glaivier_quick_change_crits(skill, level) {
    const info = skills[skill.skill.id]
    if (info.category === 16) {
      skill.add({
        damageMultiplier: 1 + 0.007 * level
      })
    }
    skill.add({
      critChance: 0.008 * level
    })
  },

  glaivier_powerful_strike(skill, level) {
    if (skill.skill.id === 34640) {
      const index = [
        1,
        22,
        28,
        33,
        37,
        40,
        43,
        46,
        48,
        50,
        55,
        60,
        65,
        70,
        Infinity
      ].findIndex((v) => v > level)
      const factor = 0.5 * level
      skill.addDamage(
        ([
          0,
          3604 + 4405,
          6427 + 7855,
          8229 + 10058,
          9671 + 11820,
          10812 + 13215,
          11713 + 14316,
          12494 + 15270,
          13215 + 16152,
          13756 + 16813,
          14297 + 17474,
          14297 + 17474,
          14297 + 17474,
          14297 + 17474,
          14297 + 17474
        ][index] /
          2) *
          factor,
        [
          0, 86.756, 95.258, 99.769, 102.996, 105.486, 107.49, 109.147, 110.544,
          111.741, 112.782, 122.689, 128.797, 133.575, 137.823
        ][index] * factor
      )
    }
  },

  glaivier_final_decision(skill, level) {
    if (skill.skill.id === 34640) {
      skill.increaseDamage(0.3 * level)
    }
  },

  glaivier_fatal_blow(skill, level) {
    if (skill.skill.id === 34650) {
      skill.add({
        critChance: 1,
        damageMultiplier: 1 + [0, 0.15, 0.3][level - 1]
      })
    }
  },

  glaivier_draconic_shout(skill, level) {
    if (skill.skill.id === 34650) {
      skill.increaseDamage(0.25 * level)
    }
  },

  // These have to be in the end

  blunt_thorn(skill, value) {
    skill.values.bonuses.blunt_thorn = 0
    const crit = skill.critChance
    const critFactor = value > 1 ? 1.4 : 1.2
    const bonusCap = value > 1 ? 0.7 - 0.15 : 0.5 - 0.075
    if (crit > 0.8) {
      skill.add({
        evoDamage: Math.min(bonusCap, (crit - 0.8) * critFactor)
      })
    }
    skill.values.bonuses.blunt_thorn = value
  },
  supersonic_breakthrough(skill, value) {
    const attackSpeed = skill.attackSpeed
    const moveSpeed = skill.moveSpeed
    let bonus = 0.05 * (Math.min(attackSpeed, 0.4) + Math.min(moveSpeed, 0.4))
    if (attackSpeed >= 0.4 && moveSpeed >= 0.4) {
      bonus += 0.04
      bonus += 0.1 * (attackSpeed - 0.4 + moveSpeed - 0.4)
    }
    skill.add({
      evoDamage: Math.min(bonus, 0.12) * value
    })
  },
  raid_captain(skill, value) {
    const moveSpeed = skill.moveSpeed
    skill.increaseDamage(Math.min(moveSpeed, 0.4) * value)
  }
})

export type BonusID = keyof typeof bonus_map
