import { Skill } from '../../types/skills'

export const skills: Record<number, Skill> = {}

skills[34040] = {
  name: 'Double Strike',
  class: 'lancemaster',
  sort: 1,
  learn: 10,
  type: 1,
  runes: 14,
  icon: 'LM_Skill_01_5',
  category: 16,
  maxLevel: 14,
  data: (level) => ({
    damage: {
      base: [
        0, 198, 353, 452, 532.5, 595.5, 645.5, 688.5, 728.5, 759, 788.5, 788.5,
        788.5, 788.5, 788.5, 788.5, 788.5, 788.5, 788.5, 788.5, 788.5
      ][level],
      scaling: [
        0, 4.29, 4.29, 4.29, 4.29, 4.29, 4.29, 4.29, 4.29, 4.29, 4.29, 4.667,
        4.899, 5.081, 5.243, 5.503, 5.986, 6.064, 6.143, 6.683, 7.27
      ][level]
    },
    directional: 1,
    mana: [
      0, 39, 53, 65, 79, 101, 116, 143, 153, 183, 206, 206, 206, 206, 206, 206,
      206, 206, 206, 206, 206
    ][level],
    cooldown: 6
  }),
  tripods: [
    {
      name: 'Flame Slash',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_13',
      // Element is now [Fire]. On hit, Burns foe, inflicting <FONT COLOR='#00ccff'>(23522*(0/10000)+((0 + 0)/2)) * (1 + 0/100)</FONT> Damage every 1s for <FONT COLOR='#ffff99'>0/1000 + 0/1000</FONT>s.
      effect(data, level) {
        const factor = 1 + 0.33 * (level - 1)
        data.addDamage(
          [0, 8, 13.5, 16.5, 20, 22, 24.5, 25.5, 26.5, 28, 29][
            Math.min(data.skill.level, 10)
          ] *
            factor *
            5,
          [
            0.172, 0.187, 0.196, 0.199, 0.202, 0.212, 0.231, 0.234, 0.237,
            0.258, 0.281
          ][Math.max(data.skill.level, 10) - 10] *
            factor *
            5
        )
      }
    },
    {
      name: 'Frost Slash',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_14'
      // Element is now [Water]. On hit, inflict Frost. Move Speed -<FONT COLOR='#99ff99'>-3000/100 + -3000/100 * 0/100%</FONT> for <FONT COLOR='#ffff99'>5000/1000 + 0/1000</FONT>s.
    },
    {
      name: 'Earth Slash',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_15'
      // [1] 1,1: Element is now [Earth]. Damage to Challenge foes or lower +<FONT COLOR='#99ff99'>0/100 + 0/100 * 0/100%</FONT>. Inflicts [Minor] Stagger.
    },
    {
      name: 'Sharper Follow-Up',
      icon: 'Tripod_Tier_2_9'
      // [0] 1,1: Gathers power into an upward attack, knocking the foe into the air.
    },
    {
      name: 'Final Decision',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_91',
      // Consumes <FONT COLOR='#ff9999'>1</FONT> bar of the Dual Meter. Outgoing Damage +<FONT COLOR='#99ff99'>6000/100 + 6000/100 * 0/100%</FONT>. This effect does not apply if the Dual Meter is charged less than <FONT COLOR='#ff9999'>1</FONT> bar.
      effect(data, level) {
        data.increaseDamage(0.6 + 0.6 * 0.15 * (level - 1))
      }
    },
    {
      name: 'Enhanced Strike',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_0',
      // Outgoing Damage +<FONT COLOR='#99ff99'>30%</FONT>.
      effect(data, level) {
        data.increaseDamage([0.3, 0.37, 0.44, 0.52, 0.6][level - 1])
      }
    },
    {
      name: 'Airsplitter',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_88',
      // [0] 1,1: AoE Radius +<FONT COLOR='#99ff99'>20%</FONT> and leaves energy behind with the last strike to inflict +<FONT COLOR='#99ff99'>50 + 50 * 0/100%</FONT> Damage, launching airborne foes back into the air.
      effect(data, level) {
        data.increaseDamage(0.5 + 0.5 * 0.15 * (level - 1))
      }
    },
    {
      name: 'Elemental Smite',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_77',
      // [0] 1,1: Changes to Combo Mode. Use the skill again to perform a downward attack, inflicting +<FONT COLOR='#99ff99'>60 + 60 * 0/100%</FONT> Damage. Flame Slash and Frost Slash effects +<FONT COLOR='#99ff99'>100%</FONT>. With Earth Slash, Damage to Challenge foes or lower +<FONT COLOR='#99ff99'>100%</FONT>. Increases the skill's Stagger Level to [Mid].
      effect(data, level) {
        data.type = 5
        data.increaseDamage(0.6 + 0.6 * [0, 0.14, 0.28, 0.43, 0.58][level - 1])
      }
    }
  ]
}

skills[34050] = {
  name: 'Windsplitter',
  class: 'lancemaster',
  sort: 1,
  learn: 28,
  type: 1,
  runes: 14,
  icon: 'LM_Skill_01_6',
  category: 16,
  maxLevel: 20,
  data: (level) => ({
    damage: {
      base: [
        0, 329, 586.5, 751, 882, 986.5, 1069, 1140, 1206.5, 1256.5, 1305.5,
        1305.5, 1305.5, 1305.5, 1305.5, 1305.5, 1305.5, 1305.5, 1305.5, 1305.5,
        1305.5
      ][level],
      scaling: [
        0, 7.137, 7.137, 7.137, 7.137, 7.137, 7.137, 7.137, 7.137, 7.137, 7.137,
        7.764, 8.15, 8.452, 8.721, 9.155, 9.959, 10.088, 10.219, 11.117, 12.094
      ][level]
    },
    directional: 1,
    mana: [
      0, 59, 81, 97, 117, 150, 173, 213, 228, 273, 305, 305, 305, 305, 305, 305,
      305, 305, 305, 305, 305
    ][level],
    cooldown: 12
  }),
  tripods: [
    {
      name: 'Magick Control',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_34',
      effect(data, level) {
        data.add({
          manaMultiplier: 1 - [0.5, 0.53, 0.57, 0.62, 0.67][level - 1]
        })
      }
    },
    {
      name: 'Target Weak Point',
      icon: 'Tripod_Tier_1_158',
      buffs: {
        glaivier_synergy: {
          critMultiplier: 1.08
        }
      }
    },
    {
      name: 'Bind Feet',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_47'
    },
    {
      name: 'Enhanced Strike',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_0',
      effect(data, level) {
        data.increaseDamage([0.3, 0.37, 0.44, 0.52, 0.6][level - 1])
      }
    },
    {
      name: 'Weak Point Detection',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_33',
      effect(data, level) {
        data.increaseDamage(0.4 + 0.4 * [0, 0.18, 0.37, 0.56, 0.75][level - 1])
      }
    },
    {
      name: 'Final Decision',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_91',
      effect(data, level) {
        data.increaseDamage(0.6 + 0.6 * [0, 0.15, 0.3, 0.45, 0.6][level - 1])
      }
    },
    {
      name: 'Giant Wheel',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_88',
      effect(data, level) {
        data.type = 5
        data.increaseDamage(1 + [0, 0.11, 0.22, 0.33, 0.45][level - 1])
      }
    },
    {
      name: 'Down Strike',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_77',
      effect(data, level) {
        data.increaseDamage(0.5 + 1.5 * [0, 0.05, 0.1, 0.16, 0.22][level - 1])
        data.add({
          critDamage: 1
        })
      }
    }
  ]
}

skills[34060] = {
  name: 'Stampeding Slash',
  class: 'lancemaster',
  sort: 1,
  learn: 10,
  type: 1,
  runes: 14,
  icon: 'LM_Skill_01_7',
  category: 16,
  maxLevel: 20,
  data: (level) => ({
    damage: {
      base: [
        0, 412.5, 737, 941, 1105, 1235.5, 1340.5, 1430.5, 1515, 1574, 1634.5,
        1634.5, 1634.5, 1634.5, 1634.5, 1634.5, 1634.5, 1634.5, 1634.5, 1634.5,
        1634.5
      ][level],
      scaling: [
        0, 8.969, 8.969, 8.969, 8.969, 8.969, 8.969, 8.969, 8.969, 8.969, 8.969,
        9.757, 10.241, 10.621, 10.957, 11.503, 12.515, 12.677, 12.842, 13.97,
        15.197
      ][level]
    },
    directional: 1,
    mana: [
      0, 53, 72, 88, 105, 135, 156, 192, 205, 246, 276, 276, 276, 276, 276, 276,
      276, 276, 276, 276, 276
    ][level],
    cooldown: 10
  }),
  tripods: [
    {
      name: 'Swift Fingers',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_41',
      effect(data, level) {
        data.add({
          speedMultiplier: 1 + [0.15, 0.18, 0.21, 0.24, 0.27][level - 1]
        })
      }
    },
    {
      name: 'Vital Point Hit',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_4',
      effect(data, level) {
        data.add({
          critChance: [0.15, 0.21, 0.27, 0.33, 0.4][level - 1]
        })
      }
    },
    {
      name: 'Weak Point Detection',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_33',
      effect(data, level) {
        data.increaseDamage(0.2 + 0.2 * [0, 0.31, 0.62, 0.93, 1.25][level - 1])
      }
    },
    {
      name: 'Spinning Flames',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_13',
      effect(data, level) {
        const factor = 1 + 0.24 * (level - 1)
        data.addDamage(
          [0, 4.5, 8, 10, 12, 13.5, 14.5, 15.5, 16.5, 18, 19][
            Math.min(data.skill.level, 10)
          ] *
            factor *
            25,
          [
            0.108, 0.117, 0.123, 0.125, 0.127, 0.133, 0.145, 0.147, 0.149,
            0.162, 0.176
          ][Math.max(data.skill.level, 10) - 10] *
            factor *
            25
        )
      }
    },
    {
      name: 'Spinning Frost',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_14'
    },
    {
      name: 'Enhanced Strike',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_0',
      effect(data, level) {
        data.increaseDamage([0.25, 0.31, 0.37, 0.43, 0.5][level - 1])
      }
    },
    {
      name: 'Inertia',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_40',
      effect(data, level) {
        data.type = 6
        data.increaseDamage(0.5 + 1.5 * [0, 0.05, 0.1, 0.16, 0.22][level - 1])
      }
    },
    {
      name: 'Ripping Blades',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_39',
      effect(data, level) {
        data.increaseDamage(0.8 + 1.8 * [0, 0.05, 0.1, 0.16, 0.22][level - 1])
      }
    }
  ]
}

skills[34070] = {
  name: 'Wheel of Blades',
  class: 'lancemaster',
  sort: 1,
  learn: 18,
  type: 1,
  runes: 14,
  icon: 'LM_Skill_01_8',
  category: 16,
  maxLevel: 20,
  data: (level) => ({
    damage: {
      base: [
        0, 518.5, 924.5, 1182, 1388.5, 1549.5, 1678.5, 1793, 1896, 1973.5,
        2050.5, 2050.5, 2050.5, 2050.5, 2050.5, 2050.5, 2050.5, 2050.5, 2050.5,
        2050.5, 2050.5
      ][level],
      scaling: [
        0, 11.271, 11.271, 11.271, 11.271, 11.271, 11.271, 11.271, 11.271,
        11.271, 11.271, 12.261, 12.87, 13.346, 13.77, 14.456, 15.725, 15.93,
        16.136, 17.554, 19.097
      ][level]
    },
    directional: 1,
    mana: [
      0, 65, 88, 106, 128, 164, 189, 233, 249, 298, 334, 334, 334, 334, 334,
      334, 334, 334, 334, 334, 334
    ][level],
    cooldown: 14
  }),
  tripods: [
    {
      name: 'Concussion',
      icon: 'Tripod_Tier_1_69'
    },
    {
      name: 'Slam',
      icon: 'Tripod_Tier_1_77'
    },
    {
      name: 'Excellent Mobility',
      icon: 'Tripod_Tier_1_10'
    },
    {
      name: 'Weak Point Detection',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_33',
      effect(data, level) {
        data.increaseDamage(0.3 + 0.3 * [0, 0.25, 0.5, 0.75, 1][level - 1])
      }
    },
    {
      name: 'Firepower Control',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_37'
    },
    {
      name: 'Tenacity',
      icon: 'Tripod_Tier_2_23'
    },
    {
      name: 'Ground Cleave',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_4',
      effect(data, level) {
        data.add({
          critChance: [0.5, 0.57, 0.64, 0.72, 0.8][level - 1]
        })
      }
    },
    {
      name: 'Consecutive Spin',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_39',
      effect(data, level) {
        data.type = 5
        data.increaseDamage(1 + 2 * [0, 0.05, 0.1, 0.16, 0.22][level - 1])
      }
    }
  ]
}

skills[34080] = {
  name: 'Flash Kick',
  class: 'lancemaster',
  sort: 1,
  learn: 10,
  type: 1,
  runes: 14,
  icon: 'LM_Skill_01_9',
  category: 16,
  maxLevel: 20,
  data: (level) => ({
    damage: {
      base: [
        0, 319, 570.5, 729.5, 856.5, 959.5, 1040, 1111, 1176.5, 1223, 1270,
        1270, 1270, 1270, 1270, 1270, 1270, 1270, 1270, 1270, 1270
      ][level],
      scaling: [
        0, 6.942, 6.942, 6.942, 6.942, 6.942, 6.942, 6.942, 6.942, 6.942, 6.942,
        7.551, 7.926, 8.221, 8.484, 8.905, 9.686, 9.811, 9.94, 10.813, 11.764
      ][level]
    },
    directional: 1,
    mana: [
      0, 59, 81, 97, 117, 150, 173, 213, 228, 273, 305, 305, 305, 305, 305, 305,
      305, 305, 305, 305, 305
    ][level],
    cooldown: 12
  }),
  tripods: [
    {
      name: 'Excellent Mobility',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_10'
    },
    {
      name: 'Concussion',
      icon: 'Tripod_Tier_1_69'
    },
    {
      name: 'Magick Control',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_34',
      effect(data, level) {
        data.add({
          manaMultiplier: 1 - [0.5, 0.53, 0.57, 0.62, 0.67][level - 1]
        })
      }
    },
    {
      name: 'Stun Effect',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_30',
      effect(data) {
        data.addCooldown(4)
      }
    },
    {
      name: 'Weak Point Detection',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_33',
      effect(data, level) {
        data.increaseDamage(0.3 + 0.3 * [0, 0.25, 0.5, 0.75, 1][level - 1])
      }
    },
    {
      name: 'Final Decision',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_91',
      effect(data, level) {
        data.increaseDamage(0.6 + 0.6 * [0, 0.15, 0.3, 0.45, 0.6][level - 1])
      }
    },
    {
      name: 'Corkscrew',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_88',
      effect(data, level) {
        data.increaseDamage([0.5, 0.57, 0.64, 0.72, 0.8][level - 1])
      }
    },
    {
      name: 'Air Raid',
      icon: 'Tripod_Tier_3_52',
      effect(data) {
        data.type = 2
      }
    }
  ]
}

skills[34090] = {
  name: 'Thorn Jab',
  class: 'lancemaster',
  sort: 1,
  learn: 10,
  type: 1,
  runes: 14,
  icon: 'LM_Skill_01_10',
  category: 16,
  maxLevel: 20,
  data: (level) => ({
    damage: {
      base: [
        0, 276.5, 493.5, 631, 741, 829, 898, 958, 1013.5, 1054.5, 1095.5,
        1095.5, 1095.5, 1095.5, 1095.5, 1095.5, 1095.5, 1095.5, 1095.5, 1095.5,
        1095.5
      ][level],
      scaling: [
        0, 6.006, 6.006, 6.006, 6.006, 6.006, 6.006, 6.006, 6.006, 6.006, 6.006,
        6.534, 6.859, 7.113, 7.339, 7.704, 8.381, 8.49, 8.6, 9.356, 10.178
      ][level]
    },
    directional: 1,
    mana: [
      0, 53, 72, 88, 105, 135, 156, 192, 205, 246, 276, 276, 276, 276, 276, 276,
      276, 276, 276, 276, 276
    ][level],
    cooldown: 10
  }),
  tripods: [
    {
      name: 'Quick Prep',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_56',
      effect(data, level) {
        data.addCooldown(-[2, 2.5, 3, 3.5, 4][level - 1])
      }
    },
    {
      name: 'Excellent Mobility',
      icon: 'Tripod_Tier_1_10'
    },
    {
      name: 'Firepower Control',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_37'
    },
    {
      name: 'Strong Upper Kick',
      icon: 'Tripod_Tier_2_9'
    },
    {
      name: 'Concussion',
      icon: 'Tripod_Tier_2_69'
    },
    {
      name: 'Earth Attack',
      icon: 'Tripod_Tier_2_15'
    },
    {
      name: 'Scoop',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_7',
      effect(data, level) {
        data.increaseDamage([0.5, 0.57, 0.64, 0.72, 0.8][level - 1])
      }
    },
    {
      name: 'Ground Smash',
      icon: 'Tripod_Tier_3_77'
      // ??
    }
  ]
}

skills[34100] = {
  name: "Blue Dragon's Claw",
  class: 'lancemaster',
  sort: 1,
  learn: 24,
  type: 1,
  runes: 14,
  icon: 'LM_Skill_01_11',
  category: 16,
  maxLevel: 20,
  data: (level) => ({
    damage: {
      base: [
        0, 781.5, 1392, 1785.5, 2099.5, 2348, 2538.5, 2710.5, 2865, 2979,
        3095.5, 3095.5, 3095.5, 3095.5, 3095.5, 3095.5, 3095.5, 3095.5, 3095.5,
        3095.5, 3095.5
      ][level],
      scaling: [
        0, 16.987, 16.987, 16.987, 16.987, 16.987, 16.987, 16.987, 16.987,
        16.987, 16.987, 18.478, 19.396, 20.116, 20.758, 21.794, 23.706, 24.015,
        24.324, 26.46, 28.783
      ][level]
    },
    directional: 1,
    mana: [
      0, 80, 108, 130, 157, 201, 232, 285, 305, 367, 410, 410, 410, 410, 410,
      410, 410, 410, 410, 410, 410
    ][level],
    cooldown: 20
  }),
  tripods: [
    {
      name: 'Quick Prep',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_56',
      effect(data, level) {
        data.addCooldown(-[4, 4.7, 5.4, 6.2, 7][level - 1])
      }
    },
    {
      name: 'Vital Point Hit',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_4',
      effect(data, level) {
        data.add({
          critChance: [0.15, 0.21, 0.27, 0.33, 0.4][level - 1]
        })
      }
    },
    {
      name: 'Defenseless Target',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_29',
      effect(data, level) {
        data.increaseDamage(0.3 + 0.3 * [0, 0.25, 0.5, 0.75, 1][level - 1])
      }
    },
    {
      name: 'Spinning Lightning',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_39',
      effect(data, level) {
        data.type = 4
        data.increaseDamage([0.6, 0.68, 0.77, 0.86, 0.95][level - 1])
      }
    },
    {
      name: 'Illusory Double',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_40',
      effect(data, level) {
        data.increaseDamage([0.25, 0.31, 0.37, 0.43, 0.5][level - 1])
      }
    },
    {
      name: 'Enhanced Strike',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_0',
      effect(data, level) {
        data.increaseDamage([0.3, 0.37, 0.44, 0.52, 0.6][level - 1])
      }
    },
    {
      name: 'Wall of Spears',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_23'
    },
    {
      name: 'Final Decision',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_91',
      effect(data, level) {
        data.increaseDamage(0.7 + 0.7 * [0, 0.12, 0.24, 0.37, 0.5][level - 1])
      }
    }
  ]
}

skills[34110] = {
  name: 'Half Moon Slash',
  class: 'lancemaster',
  sort: 1,
  learn: 12,
  type: 1,
  runes: 14,
  icon: 'LM_Skill_01_12',
  category: 16,
  maxLevel: 20,
  data: (level) => ({
    damage: {
      base: [
        0, 751, 1339, 1713.5, 2013, 2249.5, 2435.5, 2600.5, 2752, 2865.5,
        2977.5, 2977.5, 2977.5, 2977.5, 2977.5, 2977.5, 2977.5, 2977.5, 2977.5,
        2977.5, 2977.5
      ][level],
      scaling: [
        0, 16.282, 16.282, 16.282, 16.282, 16.282, 16.282, 16.282, 16.282,
        16.282, 16.282, 17.712, 18.594, 19.284, 19.897, 20.887, 22.722, 23.018,
        23.317, 25.367, 27.596
      ][level]
    },
    directional: 1,
    mana: [
      0, 74, 102, 123, 148, 189, 218, 269, 288, 345, 386, 386, 386, 386, 386,
      386, 386, 386, 386, 386, 386
    ][level],
    cooldown: 18
  }),
  tripods: [
    {
      name: 'Weak Point Detection',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_33',
      effect(data, level) {
        data.increaseDamage(0.2 + 0.2 * [0, 0.31, 0.62, 0.93, 1.25][level - 1])
      }
    },
    {
      name: 'Stretch',
      icon: 'Tripod_Tier_1_7'
    },
    {
      name: 'Spin Upper Slash',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_88',
      effect(data, level) {
        data.increaseDamage(0.2 + 1.2 * [0, 0.05, 0.1, 0.16, 0.22][level - 1])
      }
    },
    {
      name: 'Vital Point Hit',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_4',
      effect(data, level) {
        data.add({
          critChance: [0.3, 0.37, 0.44, 0.52, 0.6][level - 1]
        })
      }
    },
    {
      name: 'Double Upper Slash',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_9',
      effect(data, level) {
        data.increaseDamage(0.5 + 0.5 * [0, 0.15, 0.3, 0.45, 0.6][level - 1])
      }
    },
    {
      name: 'Final Decision',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_91',
      effect(data, level) {
        data.increaseDamage(0.6 + 0.6 * [0, 0.15, 0.3, 0.45, 0.6][level - 1])
      }
    },
    {
      name: 'Chasing Slash',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_42',
      effect(data, level) {
        data.type = 4
        data.increaseDamage(0.8 + 0.8 * [0, 0.12, 0.24, 0.37, 0.5][level - 1])
      }
    },
    {
      name: 'Blade of Tornado',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_39',
      effect(data, level) {
        data.increaseDamage(0.5 + 0.5 * [0, 0.15, 0.3, 0.45, 0.6][level - 1])
      }
    }
  ]
}

skills[34120] = {
  name: 'Chain Slash',
  class: 'lancemaster',
  sort: 1,
  learn: 10,
  type: 1,
  runes: 14,
  icon: 'LM_Skill_01_13',
  category: 16,
  maxLevel: 20,
  data: (level) => ({
    damage: {
      base: [
        0, 382, 681, 872.5, 1023.5, 1144.5, 1239.5, 1323.5, 1400, 1458, 1514.5,
        1514.5, 1514.5, 1514.5, 1514.5, 1514.5, 1514.5, 1514.5, 1514.5, 1514.5,
        1514.5
      ][level],
      scaling: [
        0, 8.288, 8.288, 8.288, 8.288, 8.288, 8.288, 8.288, 8.288, 8.288, 8.288,
        9.016, 9.465, 9.816, 10.128, 10.632, 11.567, 11.718, 11.87, 12.914,
        14.049
      ][level]
    },
    directional: 1,
    mana: [
      0, 53, 72, 88, 105, 135, 156, 192, 205, 246, 276, 276, 276, 276, 276, 276,
      276, 276, 276, 276, 276
    ][level],
    cooldown: 10
  }),
  tripods: [
    {
      name: 'Triple Threat',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_38',
      effect(data, level) {
        data.type = 5
        data.increaseDamage(0.2 + 1.2 * [0, 0.05, 0.1, 0.16, 0.22][level - 1])
      }
    },
    {
      name: 'Swoop',
      icon: 'Tripod_Tier_1_10'
    },
    {
      name: 'Fatal Strike',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_39',
      effect(data, level) {
        data.increaseDamage(0.15 + 1.15 * [0, 0.05, 0.1, 0.16, 0.22][level - 1])
      }
    },
    {
      name: 'Final Decision',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_91',
      effect(data, level) {
        data.increaseDamage(0.6 + 0.6 * [0, 0.15, 0.3, 0.45, 0.6][level - 1])
      }
    },
    {
      name: 'Concussion',
      icon: 'Tripod_Tier_2_69'
    },
    {
      name: 'Captive Target',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_29',
      effect(data, level) {
        data.increaseDamage(0.4 + 0.4 * [0, 0.18, 0.37, 0.56, 0.75][level - 1])
      }
    },
    {
      name: 'Weak Point Detection',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_33',
      effect(data, level) {
        data.increaseDamage(0.6 + 0.6 * [0, 0.15, 0.3, 0.45, 0.6][level - 1])
      }
    },
    {
      name: 'Brilliant Spear',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_88',
      effect(data, level) {
        data.increaseDamage(0.6 + 1.6 * [0, 0.05, 0.1, 0.16, 0.22][level - 1])
      }
    }
  ]
}

skills[34130] = {
  name: 'Cutting Wind',
  class: 'lancemaster',
  sort: 1,
  learn: 36,
  type: 1,
  runes: 14,
  icon: 'LM_Skill_01_14',
  category: 16,
  maxLevel: 20,
  data: (level) => ({
    damage: {
      base: [
        0, 909.5, 1625, 2078, 2440.5, 2726.5, 2952, 3148.5, 3328.5, 3467.5,
        3601.5, 3601.5, 3601.5, 3601.5, 3601.5, 3601.5, 3601.5, 3601.5, 3601.5,
        3601.5, 3601.5
      ][level],
      scaling: [
        0, 19.714, 19.714, 19.714, 19.714, 19.714, 19.714, 19.714, 19.714,
        19.714, 19.714, 21.446, 22.513, 23.349, 24.091, 25.291, 27.512, 27.868,
        28.229, 30.711, 33.408
      ][level]
    },
    mana: [
      0, 80, 108, 130, 157, 201, 232, 285, 305, 367, 410, 410, 410, 410, 410,
      410, 410, 410, 410, 410, 410
    ][level],
    cooldown: 20
  }),
  tripods: [
    {
      name: 'Quick Prep',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_56',
      effect(data, level) {
        data.addCooldown(-[4, 4.7, 5.4, 6.2, 7][level - 1])
      }
    },
    {
      name: 'Vital Point Hit',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_4',
      effect(data, level) {
        data.add({
          critChance: [0.15, 0.21, 0.27, 0.33, 0.4][level - 1]
        })
      }
    },
    {
      name: 'Sturdy Armor',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_25'
    },
    {
      name: 'Company of War',
      icon: 'Tripod_Tier_2_40'
    },
    {
      name: 'Valor',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_42',
      effect(data, level) {
        data.type = 4
        data.increaseDamage(0.5 + 1.5 * [0, 0.05, 0.1, 0.16, 0.22][level - 1])
      }
    },
    {
      name: 'Alacrity',
      icon: 'Tripod_Tier_2_41'
    },
    {
      name: 'Enhanced Strike',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_50',
      effect(data, level) {
        data.increaseDamage([0.3, 0.37, 0.44, 0.52, 0.6][level - 1])
      }
    },
    {
      name: 'Weak Point Detection',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_33',
      effect(data, level) {
        data.increaseDamage(0.6 + 0.6 * [0, 0.15, 0.3, 0.45, 0.6][level - 1])
      }
    }
  ]
}

skills[34140] = {
  name: 'Soul Cutter',
  class: 'lancemaster',
  sort: 1,
  learn: 10,
  type: 5,
  runes: 14,
  icon: 'LM_Skill_01_16',
  category: 16,
  maxLevel: 20,
  data: (level) => ({
    damage: {
      base: [
        0, 771.5, 1375, 1759, 2068, 2310, 2504, 2672.5, 2826.5, 2943, 3057,
        3057, 3057, 3057, 3057, 3057, 3057, 3057, 3057, 3057, 3057
      ][level],
      scaling: [
        0, 16.712, 16.712, 16.712, 16.712, 16.712, 16.712, 16.712, 16.712,
        16.712, 16.712, 18.182, 19.087, 19.796, 20.426, 21.442, 23.327, 23.631,
        23.936, 26.04, 28.328
      ][level]
    },
    directional: 1,
    mana: [
      0, 67, 91, 110, 133, 171, 197, 242, 259, 311, 347, 347, 347, 347, 347,
      347, 347, 347, 347, 347, 347
    ][level],
    cooldown: 15
  }),
  tripods: [
    {
      name: 'Quick Prep',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_56',
      effect(data, level) {
        data.addCooldown(-[3, 3.5, 4, 4.5, 5][level - 1])
      }
    },
    {
      name: 'Firepower Control',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_37'
    },
    {
      name: 'Magick Control',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_34',
      effect(data, level) {
        data.add({
          manaMultiplier: 1 - [0.5, 0.53, 0.57, 0.62, 0.67][level - 1]
        })
      }
    },
    {
      name: 'Bond of Trust',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_40',
      effect(data, level) {
        data.type = 1
        data.increaseDamage([0.1, 0.16, 0.22, 0.28, 0.35][level - 1])
      }
    },
    {
      name: 'Quick Step',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_10',
      effect(data, level) {
        data.type = 1
        data.increaseDamage(0.2 + 1.2 * [0, 0.05, 0.1, 0.16, 0.22][level - 1])
      }
    },
    {
      name: 'Brilliant Spear',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_88',
      effect(data, level) {
        data.increaseDamage(0.15 + 1.15 * [0, 0.05, 0.1, 0.16, 0.22][level - 1])
      }
    },
    {
      name: 'Concentration',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_2',
      effect(data, level) {
        data.add({
          speedMultiplier: 1.2,
          armorMultiplier: 1 - 0.6 - 0.6 * [0, 0.1, 0.2, 0.3, 0.4][level - 1]
        })
      }
    },
    {
      name: 'Enhanced Concussion',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_69',
      effect(data, level) {
        data.increaseDamage([0.6, 0.68, 0.77, 0.86, 0.95][level - 1])
      }
    }
  ]
}

skills[34150] = {
  name: 'Raging Dragon Slash',
  class: 'lancemaster',
  sort: 1,
  learn: 14,
  type: 1,
  runes: 14,
  icon: 'LM_Skill_01_15',
  category: 16,
  maxLevel: 20,
  data: (level) => ({
    damage: {
      base: [
        0, 865.5, 1543.5, 1975.5, 2321, 2595.5, 2811, 3000, 3174.5, 3304.5,
        3433.5, 3433.5, 3433.5, 3433.5, 3433.5, 3433.5, 3433.5, 3433.5, 3433.5,
        3433.5, 3433.5
      ][level],
      scaling: [
        0, 18.74, 18.74, 18.74, 18.74, 18.74, 18.74, 18.74, 18.74, 18.74, 18.74,
        20.386, 21.401, 22.195, 22.901, 24.04, 26.152, 26.492, 26.836, 29.195,
        31.76
      ][level]
    },
    directional: 1,
    mana: [
      0, 88, 119, 144, 174, 223, 257, 318, 340, 407, 456, 456, 456, 456, 456,
      456, 456, 456, 456, 456, 456
    ][level],
    cooldown: 24
  }),
  tripods: [
    {
      name: 'Vital Point Hit',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_4',
      effect(data, level) {
        data.add({
          critChance: [0.15, 0.21, 0.27, 0.33, 0.4][level - 1]
        })
      }
    },
    {
      name: 'Frost Slash',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_14'
    },
    {
      name: 'Quick Prep',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_56',
      effect(data, level) {
        data.addCooldown(-[5, 5.7, 6.4, 7.2, 8][level - 1])
      }
    },
    {
      name: 'Additional Slash',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_38',
      effect(data, level) {
        data.type = 5
        data.increaseDamage(0.4 + 1.4 * [0, 0.05, 0.1, 0.16, 0.22][level - 1])
      }
    },
    {
      name: 'Quick Slash',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_41',
      effect(data, level) {
        data.increaseDamage(0.2 + 1.2 * [0, 0.05, 0.1, 0.16, 0.22][level - 1])
      }
    },
    {
      name: 'Precise Slash',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_39',
      effect(data, level) {
        data.increaseDamage([0.8, 0.9, 1, 1.1, 1.2][level - 1])
      }
    },
    {
      name: 'Unyielding Spirit',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_23'
    },
    {
      name: 'Awakening',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_40',
      effect(data, level) {
        data.add({
          critChance: 0.25
        })
        data.increaseDamage(0.5 + 1.5 * [0, 0.05, 0.1, 0.16, 0.22][level - 1])
      }
    }
  ]
}

skills[34160] = {
  name: 'Spear Dive',
  class: 'lancemaster',
  sort: 1,
  learn: 20,
  type: 5,
  runes: 14,
  icon: 'LM_Skill_01_17',
  category: 16,
  maxLevel: 20,
  data: (level) => ({
    damage: {
      base:
        [
          0, 426, 760, 972, 1143, 1275, 1383, 1475, 1561, 1621, 1684, 1684,
          1684, 1684, 1684, 1684, 1684, 1684, 1684, 1684, 1684
        ][level] +
        ([
          0,
          55 + 67,
          98 + 120,
          125 + 153,
          147 + 180,
          164 + 200,
          178 + 218,
          190 + 232,
          201 + 246,
          209 + 255,
          217 + 265,
          217 + 265,
          217 + 265,
          217 + 265,
          217 + 265,
          217 + 265,
          217 + 265,
          217 + 265,
          217 + 265,
          217 + 265,
          217 + 265
        ][level] /
          2) *
          3,
      scaling:
        [
          0, 9.212, 9.212, 9.212, 9.212, 9.212, 9.212, 9.212, 9.212, 9.212,
          9.212, 10.022, 10.52, 10.912, 11.26, 11.82, 12.856, 13.024, 13.192,
          14.352, 15.612
        ][level] +
        [
          0, 1.316, 1.316, 1.316, 1.316, 1.316, 1.316, 1.316, 1.316, 1.316,
          1.316, 1.432, 1.503, 1.559, 1.609, 1.689, 1.837, 1.861, 1.885, 2.051,
          2.231
        ][level] *
          3
    },
    directional: 1,
    mana: [
      0, 70, 95, 115, 138, 177, 204, 251, 269, 322, 361, 361, 361, 361, 361,
      361, 361, 361, 361, 361, 361
    ][level],
    cooldown: 16
  }),
  tripods: [
    {
      name: 'Magick Control',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_34',
      effect(data, level) {
        data.add({
          manaMultiplier: 1 - [0.5, 0.53, 0.57, 0.62, 0.67][level - 1]
        })
      }
    },
    {
      name: 'Raid',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_47'
    },
    {
      name: 'Excellent Mobility',
      icon: 'Tripod_Tier_1_10'
    },
    {
      name: 'Wide Hit',
      icon: 'Tripod_Tier_2_7'
    },
    {
      name: 'Sturdy Armor',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_25'
    },
    {
      name: 'Perfect Landing',
      icon: 'Tripod_Tier_2_39'
    },
    {
      name: 'Swift Response',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_40',
      effect(data, level) {
        data.addCooldown(-[3, 3.7, 4.4, 5.2, 6][level - 1])
      }
    },
    {
      name: 'Sharp Dive',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_41',
      effect(data, level) {
        data.increaseDamage([0.2, 0.26, 0.32, 0.38, 0.45][level - 1])
      }
    }
  ]
}

skills[34170] = {
  name: 'Shackling Blue Dragon',
  class: 'lancemaster',
  sort: 1,
  learn: 50,
  type: 1,
  runes: 14,
  icon: 'LM_Skill_01_18',
  category: 16,
  maxLevel: 20,
  data: (level) => ({
    damage: {
      base: [
        0, 712, 1270, 1625.5, 1910, 2135.5, 2313.5, 2468, 2611, 2718, 2823.5,
        2823.5, 2823.5, 2823.5, 2823.5, 2823.5, 2823.5, 2823.5, 2823.5, 2823.5,
        2823.5
      ][level],
      scaling: [
        0, 15.425, 15.425, 15.425, 15.425, 15.425, 15.425, 15.425, 15.425,
        15.425, 15.425, 16.78, 17.615, 18.269, 18.85, 19.788, 21.527, 21.807,
        22.09, 24.031, 26.142
      ][level]
    },
    mana: [
      0, 100, 136, 165, 199, 254, 293, 361, 386, 463, 518, 518, 518, 518, 518,
      518, 518, 518, 518, 518, 518
    ][level],
    cooldown: 30
  }),
  buffs: {
    glaivier_crit: (level) => ({
      critChance: Math.min(0.2, 0.02 * level)
    })
  },
  tripods: [
    {
      name: 'Weak Point Enhancement',
      icon: 'Tripod_Tier_1_20'
    },
    {
      name: 'Concussion',
      icon: 'Tripod_Tier_1_69'
    },
    {
      name: 'Target Weak Point',
      icon: 'Tripod_Tier_1_158',
      buffs: {
        glaivier_synergy: {
          critMultiplier: 1.08
        }
      }
    },
    {
      name: 'Blitz',
      icon: 'Tripod_Tier_2_41'
    },
    {
      name: 'Ground-Breaker',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_15'
    },
    {
      name: 'Falling Spear',
      icon: 'Tripod_Tier_2_52'
    },
    {
      name: 'Quick Prep',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_56',
      effect(data, level) {
        data.addCooldown(-[6, 7.2, 8.4, 9.7, 11][level - 1])
      }
    },
    {
      name: 'Final Decision',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_91',
      effect(data, level) {
        data.increaseDamage(1.4 + 1.4 * [0, 0.09, 0.18, 0.27, 0.36][level - 1])
      }
    }
  ]
}

skills[34540] = {
  name: 'Spiraling Spear',
  class: 'lancemaster',
  sort: 1,
  learn: 10,
  type: 1,
  runes: 14,
  icon: 'LM_Skill_01_20',
  category: 17,
  maxLevel: 20,
  data: (level) => ({
    damage: {
      base: [
        0, 104.5, 186.5, 239, 281, 314.5, 340, 363.5, 384.5, 400, 415.5, 415.5,
        415.5, 415.5, 415.5, 415.5, 415.5, 415.5, 415.5, 415.5, 415.5
      ][level],
      scaling: [
        0, 2.243, 2.243, 2.243, 2.243, 2.243, 2.243, 2.243, 2.243, 2.243, 2.243,
        2.44, 2.561, 2.656, 2.74, 2.876, 3.129, 3.17, 3.211, 3.493, 3.8
      ][level]
    },
    directional: 1,
    mana: [
      0, 36, 48, 59, 71, 90, 104, 129, 137, 165, 185, 185, 185, 185, 185, 185,
      185, 185, 185, 185, 185
    ][level],
    cooldown: 5
  }),
  tripods: [
    {
      name: 'Target Weak Point',
      icon: 'Tripod_Tier_1_158',
      buffs: {
        glaivier_synergy: {
          critMultiplier: 1.08
        }
      }
    },
    {
      name: 'Vital Point Hit',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_4',
      effect(data, level) {
        data.add({
          critChance: [0.15, 0.21, 0.27, 0.33, 0.4][level - 1]
        })
      }
    },
    {
      name: 'Shoulder Slam',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_60',
      effect(data, level) {
        data.type = 5
        data.increaseDamage(0.2 + 0.2 * [0, 0.31, 0.62, 0.93, 1.25][level - 1])
      }
    },
    {
      name: 'Multiple Thrust',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_39',
      effect(data, level) {
        data.increaseDamage(0.4 + 1.4 * [0, 0.05, 0.1, 0.16, 0.22][level - 1])
      }
    },
    {
      name: 'Spiral Thrust',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_41',
      effect(data, level) {
        data.increaseDamage([0.3, 0.37, 0.44, 0.52, 0.6][level - 1])
      }
    },
    {
      name: 'Charged Thrust',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_50',
      effect(data, level) {
        data.increaseDamage([0.2, 0.26, 0.32, 0.38, 0.45][level - 1])
      }
    },
    {
      name: 'Blasting Thrust',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_78',
      effect(data, level) {
        data.increaseDamage(0.4 + 0.4 * [0, 0.18, 0.37, 0.56, 0.75][level - 1])
      }
    },
    {
      name: 'Piercing Thrust',
      icon: 'Tripod_Tier_3_7'
    }
  ]
}

skills[34550] = {
  name: '4-Headed Dragon',
  class: 'lancemaster',
  sort: 1,
  learn: 10,
  type: 1,
  runes: 14,
  icon: 'LM_Skill_01_21',
  category: 17,
  maxLevel: 20,
  data: (level) => ({
    damage: {
      base:
        ([
          0,
          71 + 87,
          127 + 155,
          163 + 199,
          192 + 235,
          215 + 263,
          233 + 285,
          249 + 304,
          263 + 321,
          274 + 335,
          285 + 348,
          285 + 348,
          285 + 348,
          285 + 348,
          285 + 348,
          285 + 348,
          285 + 348,
          285 + 348,
          285 + 348,
          285 + 348,
          285 + 348
        ][level] *
          8 +
          [
            0,
            122 + 149,
            218 + 266,
            279 + 341,
            328 + 401,
            367 + 449,
            397 + 485,
            424 + 518,
            449 + 549,
            467 + 571,
            485 + 593,
            485 + 593,
            485 + 593,
            485 + 593,
            485 + 593,
            485 + 593,
            485 + 593,
            485 + 593,
            485 + 593,
            485 + 593,
            485 + 593
          ][level]) /
        2,
      scaling:
        [
          0, 1.706, 1.706, 1.706, 1.706, 1.706, 1.706, 1.706, 1.706, 1.706,
          1.706, 1.856, 1.948, 2.02, 2.084, 2.188, 2.38, 2.411, 2.442, 2.657,
          2.89
        ][level] *
          8 +
        [
          0, 2.925, 2.925, 2.925, 2.925, 2.925, 2.925, 2.925, 2.925, 2.925,
          2.925, 3.182, 3.34, 3.464, 3.574, 3.752, 4.082, 4.135, 4.189, 4.557,
          4.957
        ][level]
    },
    directional: 1,
    mana: [
      0, 70, 95, 115, 138, 177, 204, 251, 269, 322, 361, 361, 361, 361, 361,
      361, 361, 361, 361, 361, 361
    ][level],
    cooldown: 16
  }),
  tripods: [
    {
      name: 'Firepower Control',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_37'
    },
    {
      name: 'Swift Fingers',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_41',
      effect(data, level) {
        data.add({
          speedMultiplier: 1 + [0.15, 0.18, 0.21, 0.24, 0.27][level - 1]
        })
      }
    },
    {
      name: 'Vital Point Hit',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_4',
      effect(data, level) {
        data.add({
          critChance: [0.15, 0.21, 0.27, 0.33, 0.4][level - 1]
        })
      }
    },
    {
      name: 'Violent Thrust',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_42',
      effect(data, level) {
        data.type = 4
        data.increaseDamage([0.5, 0.57, 0.64, 0.72, 0.8][level - 1])
      }
    },
    {
      name: 'The Last Spear',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_39',
      effect(data, level) {
        const factor = [1, 1.25, 1.5, 1.75, 2][level - 1]
        data.addDamage(
          ([
            0,
            122 + 149,
            218 + 266,
            279 + 341,
            328 + 401,
            367 + 449,
            397 + 485,
            424 + 518,
            449 + 549,
            467 + 571,
            485 + 593,
            485 + 593,
            485 + 593,
            485 + 593,
            485 + 593,
            485 + 593,
            485 + 593,
            485 + 593,
            485 + 593,
            485 + 593,
            485 + 593
          ][data.skill.level] /
            2) *
            factor,
          [
            0, 2.925, 2.925, 2.925, 2.925, 2.925, 2.925, 2.925, 2.925, 2.925,
            2.925, 3.182, 3.34, 3.464, 3.574, 3.752, 4.082, 4.135, 4.189, 4.557,
            4.957
          ][data.skill.level] * factor
        )
      }
    },
    {
      name: 'Shadow Thrust',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_88',
      effect(data, level) {
        data.add({
          critChance: [0.3, 0.37, 0.44, 0.52, 0.6][level - 1]
        })
      }
    },
    {
      name: 'Undefeated',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_61'
    },
    {
      name: 'Weak Point Detection',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_33',
      effect(data, level) {
        data.increaseDamage(0.6 + 0.6 * [0, 0.14, 0.28, 0.43, 0.58][level - 1])
      }
    }
  ]
}

skills[34560] = {
  name: 'Thrust of Destruction',
  class: 'lancemaster',
  sort: 1,
  learn: 16,
  type: 1,
  runes: 14,
  icon: 'LM_Skill_01_22',
  category: 17,
  maxLevel: 20,
  data: (level) => ({
    damage: {
      base: [
        0, 921, 1641.5, 2101, 2468, 2760, 2988.5, 3189, 3373.5, 3511, 3649.5,
        3649.5, 3649.5, 3649.5, 3649.5, 3649.5, 3649.5, 3649.5, 3649.5, 3649.5,
        3649.5
      ][level],
      scaling: [
        0, 19.966, 19.966, 19.966, 19.966, 19.966, 19.966, 19.966, 19.966,
        19.966, 19.966, 21.721, 22.801, 23.646, 24.399, 25.614, 27.867, 28.228,
        28.593, 31.105, 33.838
      ][level]
    },
    directional: 1,
    mana: [
      0, 88, 119, 144, 174, 223, 257, 318, 340, 407, 456, 456, 456, 456, 456,
      456, 456, 456, 456, 456, 456
    ][level],
    cooldown: 24
  }),
  tripods: [
    {
      name: 'Firepower Control',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_37'
    },
    {
      name: 'Shield',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_75'
    },
    {
      name: 'Swift Fingers',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_41',
      effect(data, level) {
        data.add({
          speedMultiplier: 1 + [0.2, 0.24, 0.28, 0.32, 0.36][level - 1]
        })
      }
    },
    {
      name: 'Spear of Destruction',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_4',
      effect(data, level) {
        data.add({
          critChance: 0.6,
          critDamage: [0.1, 0.22, 0.34, 0.46, 0.6][level - 1]
        })
      }
    },
    {
      name: 'Weak Point Detection',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_33',
      effect(data, level) {
        data.increaseDamage(0.25 + 0.25 * [0, 0.25, 0.5, 0.75, 1][level - 1])
      }
    },
    {
      name: 'Weak Point Enhancement',
      icon: 'Tripod_Tier_2_21'
    },
    {
      name: 'Air-Ripping Thrust',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_42',
      effect(data, level) {
        data.type = 3
        data.add({
          critChance: 0.4
        })
        data.increaseDamage(0.5 + 1.5 * [0, 0.05, 0.1, 0.16, 0.22][level - 1])
      }
    },
    {
      name: 'Air-Splitting Slash',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_39',
      effect(data, level) {
        data.increaseDamage(0.3 + 0.3 * [0, 0.25, 0.5, 0.75, 1][level - 1])
      }
    }
  ]
}

skills[34570] = {
  name: 'Starfall Pounce',
  class: 'lancemaster',
  sort: 1,
  learn: 20,
  type: 2,
  runes: 14,
  icon: 'LM_Skill_01_23',
  category: 17,
  maxLevel: 20,
  data: (level) => ({
    damage: {
      base: [
        0, 906.5, 1616.5, 2069, 2431, 2718, 2943.5, 3140, 3322, 3459, 3593.5,
        3593.5, 3593.5, 3593.5, 3593.5, 3593.5, 3593.5, 3593.5, 3593.5, 3593.5,
        3593.5
      ][level],
      scaling: [
        0, 19.656, 19.656, 19.656, 19.656, 19.656, 19.656, 19.656, 19.656,
        19.656, 19.656, 21.383, 22.447, 23.28, 24.02, 25.215, 27.43, 27.786,
        28.147, 30.621, 33.311
      ][level]
    },
    directional: 1,
    mana: [
      0, 88, 119, 144, 174, 223, 257, 318, 340, 407, 456, 456, 456, 456, 456,
      456, 456, 456, 456, 456, 456
    ][level],
    cooldown: 24
  }),
  tripods: [
    {
      name: 'Weak Point Detection',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_33',
      effect(data, level) {
        data.increaseDamage(0.2 + 0.2 * [0, 0.31, 0.62, 0.93, 1.25][level - 1])
      }
    },
    {
      name: 'Wide-Angle Attack',
      icon: 'Tripod_Tier_1_7'
    },
    {
      name: 'Weak Point Enhancement',
      icon: 'Tripod_Tier_1_21'
    },
    {
      name: 'Concussion',
      icon: 'Tripod_Tier_2_69'
    },
    {
      name: 'Firepower Control',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_37'
    },
    {
      name: 'Corral',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_71'
    },
    {
      name: 'Powerful Finish',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_0',
      effect(data, level) {
        data.add({
          critChance: 1,
          critDamage: [0.1, 0.22, 0.34, 0.46, 0.6][level - 1]
        })
      }
    },
    {
      name: 'Ground Explosion',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_78',
      effect(data, level) {
        data.increaseDamage(0.65 + 0.65 * [0, 0.13, 0.26, 0.4, 1.54][level - 1])
      }
    }
  ]
}

skills[34580] = {
  name: 'Dragonscale Defense',
  class: 'lancemaster',
  sort: 1,
  learn: 32,
  type: 1,
  runes: 14,
  icon: 'LM_Skill_01_24',
  category: 17,
  maxLevel: 20,
  data: (level) => ({
    damage: {
      base: [
        0, 993, 1771, 2267, 2664, 2978, 3224, 3440, 3640, 3789, 3936, 3936,
        3936, 3936, 3936, 3936, 3936, 3936, 3936, 3936, 3936
      ][level],
      scaling: [
        0, 21.528, 21.528, 21.528, 21.528, 21.528, 21.528, 21.528, 21.528,
        21.528, 21.528, 23.42, 24.586, 25.498, 26.308, 27.618, 30.044, 30.434,
        30.83, 33.54, 36.486
      ][level]
    },
    directional: 2,
    mana: [
      0, 80, 108, 130, 157, 201, 232, 285, 305, 367, 410, 410, 410, 410, 410,
      410, 410, 410, 410, 410, 410
    ][level],
    cooldown: 20
  }),
  tripods: [
    {
      name: 'Magick Control',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_34',
      effect(data, level) {
        data.add({
          manaMultiplier: 1 - [0.5, 0.53, 0.57, 0.62, 0.67][level - 1]
        })
      }
    },
    {
      name: 'Firm Belief',
      icon: 'Tripod_Tier_1_25'
    },
    {
      name: 'Firepower Control',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_37'
    },
    {
      name: 'Mind Destruction',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_44'
    },
    {
      name: 'Vital Point Attack',
      icon: 'Tripod_Tier_2_4',
      effect(data) {
        data.add({
          critChance: 1
        })
      }
    },
    {
      name: 'Absolute Defense',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_0',
      effect(data, level) {
        data.increaseDamage([0.2, 0.26, 0.32, 0.38, 0.45][level - 1])
      }
    },
    {
      name: 'Enhanced Technique',
      icon: 'Tripod_Tier_3_7'
    },
    {
      name: 'Attack Precision',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_39',
      effect(data, level) {
        data.increaseDamage(0.5 + 1.5 * [0, 0.05, 0.1, 0.16, 0.22][level - 1])
      }
    }
  ]
}

skills[34590] = {
  name: "Red Dragon's Horn",
  class: 'lancemaster',
  sort: 1,
  learn: 40,
  type: 4,
  runes: 14,
  icon: 'LM_Skill_01_25',
  category: 17,
  maxLevel: 20,
  data: (level) => ({
    damage: {
      base:
        [
          0,
          1016 + 1242,
          1812 + 2215,
          2319 + 2834,
          2725 + 3331,
          3047 + 3724,
          3300 + 4033,
          3521 + 4303,
          3725 + 4553,
          3878 + 4740,
          4029 + 4924,
          4029 + 4924,
          4029 + 4924,
          4029 + 4924,
          4029 + 4924,
          4029 + 4924,
          4029 + 4924,
          4029 + 4924,
          4029 + 4924,
          4029 + 4924,
          4029 + 4924
        ][level] / 2,
      scaling: [
        0, 24.453, 24.453, 24.453, 24.453, 24.453, 24.453, 24.453, 24.453,
        24.453, 24.453, 26.601, 27.925, 28.961, 29.882, 31.369, 34.125, 34.568,
        35.017, 38.095, 41.441
      ][level]
    },
    directional: 1,
    mana: [
      0, 88, 119, 144, 174, 223, 257, 318, 340, 407, 456, 456, 456, 456, 456,
      456, 456, 456, 456, 456, 456
    ][level],
    cooldown: 24
  }),
  tripods: [
    {
      name: 'Reaction Speed',
      icon: 'Tripod_Tier_1_6',
      effect(data) {
        data.add({
          speedMultiplier: 1.3
        })
      }
    },
    {
      name: 'Firepower Control',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_37'
    },
    {
      name: 'Sturdy Armor',
      maxLevel: 5,
      icon: 'Tripod_Tier_1_25'
    },
    {
      name: 'Determination',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_1',
      effect(data, level) {
        data.increaseDamage([0.4, 0.47, 0.54, 0.62, 0.7][level - 1])
      }
    },
    {
      name: 'Evolving Technique',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_42',
      effect(data, level) {
        data.type = 3
        data.increaseDamage(0.5 + 1.5 * [0, 0.05, 0.1, 0.16, 0.22][level - 1])
      }
    },
    {
      name: 'Spear of Destruction',
      maxLevel: 5,
      icon: 'Tripod_Tier_2_4',
      effect(data, level) {
        data.add({
          critChance: 1,
          critDamage: [0.1, 0.22, 0.34, 0.46, 0.6][level - 1]
        })
      }
    },
    {
      name: 'Weak Point Detection',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_33',
      effect(data, level) {
        data.increaseDamage(0.6 + 0.6 * [0, 0.15, 0.3, 0.45, 0.6][level - 1])
      }
    },
    {
      name: 'Fatal Aim',
      maxLevel: 5,
      icon: 'Tripod_Tier_3_89',
      effect(data, level) {
        data.add({
          critDamage: [1, 1.15, 1.3, 1.45, 1.6][level - 1]
        })
      }
    }
  ]
}

skills[34600] = {
  name: 'Yeon-style Spear Technique: Spear Meteor',
  class: 'lancemaster',
  sort: 1,
  learn: 50,
  type: 2,
  runes: 6,
  icon: 'LM_Skill_01_26',
  awakening: true,
  maxLevel: 1,
  category: 0,
  data: (_level, playerLevel) => ({
    damage: {
      base: [
        0, 13290, 13290, 13290, 13290, 13290, 13290, 13290, 13290, 13290, 13290,
        13290, 13290, 13290, 13290, 13290, 13290, 13290, 13290, 13290, 13290,
        13290, 23699, 23699, 23699, 23699, 23699, 23699, 30341.5, 30341.5,
        30341.5, 30341.5, 30341.5, 35656.5, 35656.5, 35656.5, 35656.5, 39863.5,
        39863.5, 39863.5, 43188, 43188, 43188, 46066.5, 46066.5, 46066.5, 48723,
        48723, 50716, 50716, 52708, 52708, 52708, 52708, 52708, 52708, 52708,
        52708, 52708, 52708, 52708, 52708, 52708, 52708, 52708, 52708, 52708,
        52708, 52708, 52708, 52708
      ][playerLevel],
      scaling: [
        0, 287.9, 287.9, 287.9, 287.9, 287.9, 287.9, 287.9, 287.9, 287.9, 287.9,
        287.9, 287.9, 287.9, 287.9, 287.9, 287.9, 287.9, 287.9, 287.9, 287.9,
        287.9, 316.115, 316.115, 316.115, 316.115, 316.115, 316.115, 331.086,
        331.086, 331.086, 331.086, 331.086, 341.795, 341.795, 341.795, 341.795,
        350.059, 350.059, 350.059, 356.71, 356.71, 356.71, 362.21, 362.21,
        362.21, 366.846, 366.846, 370.819, 370.819, 446.134, 446.134, 446.134,
        446.134, 446.134, 526.094, 526.094, 526.094, 526.094, 526.094, 611.929,
        611.929, 611.929, 611.929, 611.929, 660.335, 660.335, 660.335, 660.335,
        660.335, 708.928
      ][playerLevel]
    },
    cooldown: 300
  })
}

skills[34610] = {
  name: 'Yeon-style Spear Technique: Storming Red Dragon',
  class: 'lancemaster',
  sort: 1,
  learn: 50,
  type: 4,
  runes: 6,
  icon: 'LM_Skill_01_27',
  awakening: true,
  maxLevel: 1,
  category: 0,
  data: (_level, playerLevel) => ({
    damage: {
      base: [
        0, 13924.5, 13924.5, 13924.5, 13924.5, 13924.5, 13924.5, 13924.5,
        13924.5, 13924.5, 13924.5, 13924.5, 13924.5, 13924.5, 13924.5, 13924.5,
        13924.5, 13924.5, 13924.5, 13924.5, 13924.5, 13924.5, 24831, 24831,
        24831, 24831, 24831, 24831, 31790, 31790, 31790, 31790, 31790, 37366.5,
        37366.5, 37366.5, 37366.5, 41768, 41768, 41768, 45255.5, 45255.5,
        45255.5, 48273, 48273, 48273, 51051.5, 51051.5, 53140.5, 53140.5, 55222,
        55222, 55222, 55222, 55222, 55222, 55222, 55222, 55222, 55222, 55222,
        55222, 55222, 55222, 55222, 55222, 55222, 55222, 55222, 55222, 55222
      ][playerLevel],
      scaling: [
        0, 301.662, 301.662, 301.662, 301.662, 301.662, 301.662, 301.662,
        301.662, 301.662, 301.662, 301.662, 301.662, 301.662, 301.662, 301.662,
        301.662, 301.662, 301.662, 301.662, 301.662, 301.662, 331.223, 331.223,
        331.223, 331.223, 331.223, 331.223, 346.907, 346.907, 346.907, 346.907,
        346.907, 358.129, 358.129, 358.129, 358.129, 366.79, 366.79, 366.79,
        373.752, 373.752, 373.752, 379.513, 379.513, 379.513, 384.374, 384.374,
        388.535, 388.535, 467.452, 467.452, 467.452, 467.452, 467.452, 551.23,
        551.23, 551.23, 551.23, 551.23, 641.169, 641.169, 641.169, 641.169,
        641.169, 691.886, 691.886, 691.886, 691.886, 691.886, 742.803
      ][playerLevel]
    },
    cooldown: 300
  })
}

skills[34640] = {
  name: "Dragon's Rampage",
  class: 'lancemaster',
  sort: 1,
  learn: 50,
  type: 1,
  runes: 0,
  icon: 'LM_Skill_01_28',
  technique: true,
  maxLevel: 1,
  category: 16,
  data: (_level, playerLevel) => ({
    damage: {
      base: [
        0, 8007.5, 8007.5, 8007.5, 8007.5, 8007.5, 8007.5, 8007.5, 8007.5,
        8007.5, 8007.5, 8007.5, 8007.5, 8007.5, 8007.5, 8007.5, 8007.5, 8007.5,
        8007.5, 8007.5, 8007.5, 8007.5, 14281, 14281, 14281, 14281, 14281,
        14281, 18285.5, 18285.5, 18285.5, 18285.5, 18285.5, 21490, 21490, 21490,
        21490, 24026, 24026, 24026, 26028, 26028, 26028, 27763, 27763, 27763,
        29365.5, 29365.5, 30566.5, 30566.5, 31767.5, 31767.5, 31767.5, 31767.5,
        31767.5, 31767.5, 31767.5, 31767.5, 31767.5, 31767.5, 31767.5, 31767.5,
        31767.5, 31767.5, 31767.5, 31767.5, 31767.5, 31767.5, 31767.5, 31767.5,
        31767.5
      ][playerLevel],
      scaling: [
        0, 173.511, 173.511, 173.511, 173.511, 173.511, 173.511, 173.511,
        173.511, 173.511, 173.511, 173.511, 173.511, 173.511, 173.511, 173.511,
        173.511, 173.511, 173.511, 173.511, 173.511, 173.511, 190.515, 190.515,
        190.515, 190.515, 190.515, 190.515, 199.538, 199.538, 199.538, 199.538,
        199.538, 205.992, 205.992, 205.992, 205.992, 210.972, 210.972, 210.972,
        214.98, 214.98, 214.98, 218.294, 218.294, 218.294, 221.088, 221.088,
        223.482, 223.482, 225.564, 225.564, 225.564, 225.564, 225.564, 245.378,
        245.378, 245.378, 245.378, 245.378, 257.593, 257.593, 257.593, 257.593,
        257.593, 267.149, 267.149, 267.149, 267.149, 267.149, 275.645
      ][playerLevel]
    },
    directional: 1,
    mana: 695,
    cooldown: 50
  })
}

skills[34650] = {
  name: 'Deadly Red Dragon',
  class: 'lancemaster',
  sort: 1,
  learn: 50,
  type: 1,
  runes: 0,
  icon: 'LM_Skill_01_29',
  technique: true,
  maxLevel: 1,
  category: 17,
  data: (_level, playerLevel) => ({
    damage: {
      base: [
        0, 4752, 4752, 4752, 4752, 4752, 4752, 4752, 4752, 4752, 4752, 4752,
        4752, 4752, 4752, 4752, 4752, 4752, 4752, 4752, 4752, 4752, 8472, 8472,
        8472, 8472, 8472, 8472, 10844, 10844, 10844, 10844, 10844, 12742, 12742,
        12742, 12742, 14244, 14244, 14244, 15432, 15432, 15432, 16458, 16458,
        16458, 17408, 17408, 18120, 18120, 18832, 18832, 18832, 18832, 18832,
        18832, 18832, 18832, 18832, 18832, 18832, 18832, 18832, 18832, 18832,
        18832, 18832, 18832, 18832, 18832, 18832
      ][playerLevel],
      scaling: [
        0, 102.98, 102.98, 102.98, 102.98, 102.98, 102.98, 102.98, 102.98,
        102.98, 102.98, 102.98, 102.98, 102.98, 102.98, 102.98, 102.98, 102.98,
        102.98, 102.98, 102.98, 102.98, 113.072, 113.072, 113.072, 113.072,
        113.072, 113.072, 118.428, 118.428, 118.428, 118.428, 118.428, 122.26,
        122.26, 122.26, 122.26, 125.216, 125.216, 125.216, 127.596, 127.596,
        127.596, 129.564, 129.564, 129.564, 131.224, 131.224, 132.644, 132.644,
        133.88, 133.88, 133.88, 133.88, 133.88, 145.64, 145.64, 145.64, 145.64,
        145.64, 152.892, 152.892, 152.892, 152.892, 152.892, 158.564, 158.564,
        158.564, 158.564, 158.564, 163.608
      ][playerLevel]
    },
    directional: 1,
    mana: 734,
    cooldown: 55
  })
}

skills[34660] = {
  name: 'Yeon-Style Technique',
  class: 'lancemaster',
  sort: 0,
  learn: 10,
  type: 1,
  runes: 0,
  icon: 'Ark_Passive_LM_6',
  hidden: true,
  maxLevel: 1,
  category: 16,
  data: (_level, playerLevel) => ({
    damage: {
      base: [
        0, 1300, 1300, 1300, 1300, 1300, 1300, 1300, 1300, 1300, 1300, 1300,
        1300, 1300, 1300, 1300, 1300, 1300, 1300, 1300, 1300, 1300, 2319, 2319,
        2319, 2319, 2319, 2319, 2969, 2969, 2969, 2969, 2969, 3489, 3489, 3489,
        3489, 3901, 3901, 3901, 4226.5, 4226.5, 4226.5, 4509, 4509, 4509, 4769,
        4769, 4964.5, 4964.5, 5160, 5160, 5160, 5160, 5160, 5160, 5160, 5160,
        5160, 5160, 5160, 5160, 5160, 5160, 5160, 5160, 5160, 5160, 5160, 5160,
        5160
      ][playerLevel],
      scaling: [
        0, 28.158, 28.158, 28.158, 28.158, 28.158, 28.158, 28.158, 28.158,
        28.158, 28.158, 28.158, 28.158, 28.158, 28.158, 28.158, 28.158, 28.158,
        28.158, 28.158, 28.158, 28.158, 30.917, 30.917, 30.917, 30.917, 30.917,
        30.917, 32.381, 32.381, 32.381, 32.381, 32.381, 33.428, 33.428, 33.428,
        33.428, 34.236, 34.236, 34.236, 34.886, 34.886, 34.886, 35.424, 35.424,
        35.424, 35.877, 35.877, 36.266, 36.266, 43.632, 43.632, 43.632, 43.632,
        43.632, 51.452, 51.452, 51.452, 51.452, 51.452, 59.847, 59.847, 59.847,
        59.847, 59.847, 64.581, 64.581, 64.581, 64.581, 64.581, 69.333
      ][playerLevel]
    },
    directional: 1,
    cooldown: 22
  })
}

skills[34670] = {
  name: 'Yeon-Style Encore',
  class: 'lancemaster',
  sort: 0,
  learn: 10,
  type: 1,
  runes: 0,
  icon: 'Ark_Passive_LM_7',
  hidden: true,
  maxLevel: 1,
  category: 0,
  buffs: {
    yeon_style_encore: {
      bonuses: {
        yeon_style_encore_active: 1
      }
    }
  }
}
