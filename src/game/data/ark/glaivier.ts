import { ArkPassive } from '../../types/ark'

export const glaivier_passives: Record<number, ArkPassive> = {
  2340000: {
    name: 'Control',
    icon: 'Ark_Passive_01_52',
    points: 8,
    levels: 3,
    group: 1,
    tier: 0,
    position: 1,
    exclusive: 2340000,
    class: 'lancemaster',
    // Disables Focus Stance, but Dual Meter Gain +<FONT COLOR='#99ff99'>50.0%</FONT>.
    // Disables Focus Stance, but Dual Meter Gain +<FONT COLOR='#99ff99'>75.0%</FONT>.
    // Disables Focus Stance, but Dual Meter Gain +<FONT COLOR='#99ff99'>100.0%</FONT>.
    stats: {
      bonuses: {
        glaivier_control: 1
      }
    }
  },
  2340100: {
    name: 'Pinnacle I',
    icon: 'Ark_Passive_LM_2',
    points: 8,
    levels: 3,
    group: 1,
    tier: 0,
    position: 2,
    exclusive: 2340000,
    class: 'lancemaster',
    // On switching to Flurry Stance, Move Speed +<FONT COLOR='#99ff99'>6.0%</FONT>. On switching to Focus Stance, Atk. Speed +<FONT COLOR='#99ff99'>6.0%</FONT>.
    // On switching to Flurry Stance, Move Speed +<FONT COLOR='#99ff99'>9.0%</FONT>. On switching to Focus Stance, Atk. Speed +<FONT COLOR='#99ff99'>9.0%</FONT>.
    // On switching to Flurry Stance, Move Speed +<FONT COLOR='#99ff99'>15.0%</FONT>. On switching to Focus Stance, Atk. Speed +<FONT COLOR='#99ff99'>15.0%</FONT>.
    stats: {
      bonuses: {
        glaivier_pinnacle_i: 1
      }
    }
  },
  2340200: {
    name: 'Flurry Move',
    icon: 'Ark_Passive_01_10',
    points: 24,
    levels: 1,
    group: 1,
    tier: 1,
    position: 1,
    requires: { id: 2340000, level: 3 },
    class: 'lancemaster',
    // When consuming the Dual Meter, Movement Skill cooldown -<FONT COLOR='#99ff99'>2.0s</FONT>.
    stats: {
      bonuses: {
        glaivier_flurry_move: 1
      }
    }
  },
  2340300: {
    name: 'Pinnacle II',
    icon: 'Ark_Passive_LM_3',
    points: 8,
    levels: 3,
    group: 1,
    tier: 1,
    position: 2,
    requires: { id: 2340100, level: 3 },
    class: 'lancemaster',
    // On switching to Flurry Stance, Crit Damage +<FONT COLOR='#99ff99'>20.0%</FONT>.
    // On switching to Flurry Stance, Crit Damage +<FONT COLOR='#99ff99'>40.0%</FONT>.
    // On switching to Flurry Stance, Crit Damage +<FONT COLOR='#99ff99'>60.0%</FONT>.
    stats: {
      bonuses: {
        glaivier_pinnacle_ii: 1
      }
    }
  },
  2340400: {
    name: 'Lethal Slash',
    icon: 'Ark_Passive_01_1',
    points: 2,
    levels: 5,
    group: 1,
    tier: 2,
    position: 0,
    class: 'lancemaster',
    // Flurry Skill Crit Damage +<FONT COLOR='#99ff99'>4.0%</FONT>.
    // Flurry Skill Crit Damage +<FONT COLOR='#99ff99'>8.0%</FONT>.
    // Flurry Skill Crit Damage +<FONT COLOR='#99ff99'>12.0%</FONT>.
    // Flurry Skill Crit Damage +<FONT COLOR='#99ff99'>16.0%</FONT>.
    // Flurry Skill Crit Damage +<FONT COLOR='#99ff99'>20.0%</FONT>.
    stats: {
      bonuses: {
        glaivier_lethal_slash: 1
      }
    }
  },
  2340500: {
    name: 'Flurry Enhancement',
    icon: 'Ark_Passive_LM_1',
    points: 8,
    levels: 3,
    group: 1,
    tier: 2,
    position: 1,
    requires: { id: 2340200, level: 1 },
    class: 'lancemaster',
    // Flurry Skill Damage +<FONT COLOR='#99ff99'>14.0%</FONT>.
    // Flurry Skill Damage +<FONT COLOR='#99ff99'>28.0%</FONT>.
    // Flurry Skill Damage +<FONT COLOR='#99ff99'>44.0%</FONT>.
    stats: {
      bonuses: {
        glaivier_flurry_enhancement: 1
      }
    }
  },
  2340600: {
    name: 'Pinnacle III',
    icon: 'Ark_Passive_LM_4',
    points: 8,
    levels: 3,
    group: 1,
    tier: 2,
    position: 2,
    requires: { id: 2340300, level: 3 },
    class: 'lancemaster',
    // On switching to Focus Stance, Outgoing Damage +<FONT COLOR='#99ff99'>8.0%</FONT>.
    // On switching to Focus Stance, Outgoing Damage +<FONT COLOR='#99ff99'>16.0%</FONT>.
    // On switching to Focus Stance, Outgoing Damage +<FONT COLOR='#99ff99'>25.0%</FONT>.
    stats: {
      bonuses: {
        glaivier_pinnacle_iii: 1
      }
    }
  },
  2340700: {
    name: 'Power Stab',
    icon: 'Ark_Passive_01_17',
    points: 2,
    levels: 5,
    group: 1,
    tier: 2,
    position: 3,
    class: 'lancemaster',
    // Focus Skill Damage +<FONT COLOR='#99ff99'>1.2%</FONT>.
    // Focus Skill Damage +<FONT COLOR='#99ff99'>2.4%</FONT>.
    // Focus Skill Damage +<FONT COLOR='#99ff99'>3.6%</FONT>.
    // Focus Skill Damage +<FONT COLOR='#99ff99'>4.8%</FONT>.
    // Focus Skill Damage +<FONT COLOR='#99ff99'>6.0%</FONT>.
    stats: {
      bonuses: {
        glaivier_power_stab: 1
      }
    }
  },
  2340800: {
    name: 'Yeon-Style Mark',
    icon: 'Ark_Passive_LM_5',
    points: 2,
    levels: 5,
    group: 1,
    tier: 3,
    position: 0,
    class: 'lancemaster',
    // On using Yeon-Style Encore, leave a Yeon-Style Mark that lasts <FONT COLOR='#99ff99'>16.0s</FONT> on foes hit by Yeon-Style Technique or foes within a <FONT COLOR='#ffff99'>5 meter</FONT> radius. Damage to foes with this mark +<FONT COLOR='#99ff99'>1.2%</FONT>.
    // On using Yeon-Style Encore, leave a Yeon-Style Mark that lasts <FONT COLOR='#99ff99'>16.0s</FONT> on foes hit by Yeon-Style Technique or foes within a <FONT COLOR='#ffff99'>5 meter</FONT> radius. Damage to foes with this mark +<FONT COLOR='#99ff99'>2.4%</FONT>.
    // On using Yeon-Style Encore, leave a Yeon-Style Mark that lasts <FONT COLOR='#99ff99'>16.0s</FONT> on foes hit by Yeon-Style Technique or foes within a <FONT COLOR='#ffff99'>5 meter</FONT> radius. Damage to foes with this mark +<FONT COLOR='#99ff99'>3.6%</FONT>.
    // On using Yeon-Style Encore, leave a Yeon-Style Mark that lasts <FONT COLOR='#99ff99'>16.0s</FONT> on foes hit by Yeon-Style Technique or foes within a <FONT COLOR='#ffff99'>5 meter</FONT> radius. Damage to foes with this mark +<FONT COLOR='#99ff99'>4.8%</FONT>.
    // On using Yeon-Style Encore, leave a Yeon-Style Mark that lasts <FONT COLOR='#99ff99'>16.0s</FONT> on foes hit by Yeon-Style Technique or foes within a <FONT COLOR='#ffff99'>5 meter</FONT> radius. Damage to foes with this mark +<FONT COLOR='#99ff99'>6.0%</FONT>.
    stats: {
      bonuses: {
        glaivier_yeon_style_mark: 1
      }
    }
  },
  2340900: {
    name: 'Yeon-Style Technique',
    icon: 'Ark_Passive_LM_6',
    points: 8,
    levels: 3,
    group: 1,
    tier: 3,
    position: 1,
    requires: { id: 2340500, level: 3 },
    class: 'lancemaster',
    // Press <FONT COLOR='#ffff99'>X</FONT> to use a Yeon-Style Technique to charge and slash at foes. Yeon-Style Technique Crit Rate +<FONT COLOR='#99ff99'>100%</FONT>. On hit, restores Max MP by <FONT COLOR='#99ff99'>10.0%</FONT> immediately. On using a Flurry Skill, Yeon-Style Technique Skill Cooldown -<FONT COLOR='#99ff99'>0.5s</FONT>.
    // Press <FONT COLOR='#ffff99'>X</FONT> to use a Yeon-Style Technique to charge and slash at foes. Yeon-Style Technique Crit Rate +<FONT COLOR='#99ff99'>100%</FONT>. On hit, restores Max MP by <FONT COLOR='#99ff99'>10.0%</FONT> immediately. On using a Flurry Skill, Yeon-Style Technique Skill Cooldown -<FONT COLOR='#99ff99'>0.5s</FONT>. Yeon-Style Technique Damage +<FONT COLOR='#99ff99'>100.0%</FONT>.
    // Press <FONT COLOR='#ffff99'>X</FONT> to use a Yeon-Style Technique to charge and slash at foes. Yeon-Style Technique Crit Rate +<FONT COLOR='#99ff99'>100%</FONT>. On hit, restores Max MP by <FONT COLOR='#99ff99'>10.0%</FONT> immediately. On using a Flurry Skill, Yeon-Style Technique Skill Cooldown -<FONT COLOR='#99ff99'>0.5s</FONT>. Yeon-Style Technique Damage +<FONT COLOR='#99ff99'>200.0%</FONT>.
    stats: {
      bonuses: {
        glaivier_yeon_style_technique: 1
      }
    },
    skill: 34660
  },
  2341000: {
    name: 'Yeon-Style Encore',
    icon: 'Ark_Passive_LM_7',
    points: 8,
    levels: 3,
    group: 1,
    tier: 3,
    position: 2,
    requires: { id: 2340600, level: 3 },
    class: 'lancemaster',
    // Press X to consume <FONT COLOR='#ffff99'>1</FONT> Dual Meter slot. Gather energy at the tip of your spear and unleash it during the next skill to deal <FONT COLOR='#99ff99'>23.0%</FONT> more damage. Once Yeon-Style Encore is used, it cannot be used again until you switch to another stance.
    // Press X to consume <FONT COLOR='#ffff99'>1</FONT> Dual Meter slot. Gather energy at the tip of your spear and unleash it during the next skill to deal <FONT COLOR='#99ff99'>46.0%</FONT> more damage. Once Yeon-Style Encore is used, it cannot be used again until you switch to another stance.
    // Press X to consume <FONT COLOR='#ffff99'>1</FONT> Dual Meter slot. Gather energy at the tip of your spear and unleash it during the next skill to deal <FONT COLOR='#99ff99'>70.0%</FONT> more damage. Once Yeon-Style Encore is used, it cannot be used again until you switch to another stance.
    stats: {
      bonuses: {
        glaivier_yeon_style_encore: 1
      }
    },
    skill: 34670
  },
  2341100: {
    name: 'Quick-Change Crits',
    icon: 'Ark_Passive_01_18',
    points: 2,
    levels: 5,
    group: 1,
    tier: 3,
    position: 3,
    class: 'lancemaster',
    // Flurry Skill Damage +<FONT COLOR='#99ff99'>0.7%</FONT>. On switching stances, Crit Rate +<FONT COLOR='#99ff99'>0.8%</FONT> for <FONT COLOR='#99ff99'>10.0s</FONT>.
    // Flurry Skill Damage +<FONT COLOR='#99ff99'>1.4%</FONT>. On switching stances, Crit Rate +<FONT COLOR='#99ff99'>1.6%</FONT> for <FONT COLOR='#99ff99'>10.0s</FONT>.
    // Flurry Skill Damage +<FONT COLOR='#99ff99'>2.1%</FONT>. On switching stances, Crit Rate +<FONT COLOR='#99ff99'>2.4%</FONT> for <FONT COLOR='#99ff99'>10.0s</FONT>.
    // Flurry Skill Damage +<FONT COLOR='#99ff99'>2.8%</FONT>. On switching stances, Crit Rate +<FONT COLOR='#99ff99'>3.2%</FONT> for <FONT COLOR='#99ff99'>10.0s</FONT>.
    // Flurry Skill Damage +<FONT COLOR='#99ff99'>3.5%</FONT>. On switching stances, Crit Rate +<FONT COLOR='#99ff99'>4.0%</FONT> for <FONT COLOR='#99ff99'>10.0s</FONT>.
    stats: {
      bonuses: {
        glaivier_quick_change_crits: 1
      }
    }
  },
  2345000: {
    name: 'Transcendent Power',
    icon: 'Ark_Passive_02_3',
    points: 4,
    levels: 5,
    group: 2,
    tier: 0,
    position: 0,
    class: 'lancemaster',
    // Hyper Awakening Skill Damage +<FONT COLOR='#99ff99'>0.0%</FONT>.
    // Hyper Awakening Skill Damage +<FONT COLOR='#99ff99'>0.0%</FONT>.
    // Hyper Awakening Skill Damage +<FONT COLOR='#99ff99'>0.0%</FONT>.
    // Hyper Awakening Skill Damage +<FONT COLOR='#99ff99'>0.0%</FONT>.
    // Hyper Awakening Skill Damage +<FONT COLOR='#99ff99'>0.0%</FONT>.
    stats: {
      bonuses: {
        ark_transcendent_power: 1
      }
    }
  },
  2345100: {
    name: 'Charged Fury',
    icon: 'Ark_Passive_02_1',
    points: 4,
    levels: 5,
    group: 2,
    tier: 0,
    position: 1,
    class: 'lancemaster',
    // When Hyper Awakening Skill Meter is full, Awakening Skill's remaining cooldown -<FONT COLOR='#99ff99'>10.0%</FONT>.
    // When Hyper Awakening Skill Meter is full, Awakening Skill's remaining cooldown -<FONT COLOR='#99ff99'>20.0%</FONT>.
    // When Hyper Awakening Skill Meter is full, Awakening Skill's remaining cooldown -<FONT COLOR='#99ff99'>30.0%</FONT>.
    // When Hyper Awakening Skill Meter is full, Awakening Skill's remaining cooldown -<FONT COLOR='#99ff99'>40.0%</FONT>.
    // When Hyper Awakening Skill Meter is full, Awakening Skill's remaining cooldown -<FONT COLOR='#99ff99'>50.0%</FONT>.
    stats: {
      bonuses: {
        ark_charged_fury: 1
      }
    }
  },
  2345200: {
    name: 'Awakening Amplifier',
    icon: 'Ark_Passive_01_54',
    points: 2,
    levels: 3,
    group: 2,
    tier: 0,
    position: 2,
    class: 'lancemaster',
    // Chance to use Awakening Skills +<FONT COLOR='#99ff99'>1</FONT>.
    // Chance to use Awakening Skills +<FONT COLOR='#99ff99'>2</FONT>.
    // Chance to use Awakening Skills +<FONT COLOR='#99ff99'>3</FONT>.
    stats: {
      bonuses: {
        ark_awakening_amplifier: 1
      }
    }
  },
  2345300: {
    name: 'Unleashed Power',
    icon: 'Ark_Passive_02_2',
    points: 4,
    levels: 5,
    group: 2,
    tier: 0,
    position: 3,
    class: 'lancemaster',
    // Hyper Awakening Technique Damage +<FONT COLOR='#99ff99'>3.0%</FONT>.
    // Hyper Awakening Technique Damage +<FONT COLOR='#99ff99'>6.0%</FONT>.
    // Hyper Awakening Technique Damage +<FONT COLOR='#99ff99'>9.0%</FONT>.
    // Hyper Awakening Technique Damage +<FONT COLOR='#99ff99'>12.0%</FONT>.
    // Hyper Awakening Technique Damage +<FONT COLOR='#99ff99'>15.0%</FONT>.
    stats: {
      bonuses: {
        ark_unleashed_power: 1
      }
    }
  },
  2345400: {
    name: 'Release Potential',
    icon: 'Ark_Passive_01_10',
    points: 4,
    levels: 5,
    group: 2,
    tier: 0,
    position: 4,
    class: 'lancemaster',
    // Hyper Awakening Technique Cooldown -<FONT COLOR='#99ff99'>0.0%</FONT>.
    // Hyper Awakening Technique Cooldown -<FONT COLOR='#99ff99'>0.0%</FONT>.
    // Hyper Awakening Technique Cooldown -<FONT COLOR='#99ff99'>0.0%</FONT>.
    // Hyper Awakening Technique Cooldown -<FONT COLOR='#99ff99'>0.0%</FONT>.
    // Hyper Awakening Technique Cooldown -<FONT COLOR='#99ff99'>0.0%</FONT>.
    stats: {
      bonuses: {
        ark_release_potential: 1
      }
    }
  },
  2345500: {
    name: 'Instant Spell',
    icon: 'Ark_Passive_02_5',
    points: 2,
    levels: 3,
    group: 2,
    tier: 0,
    position: 5,
    class: 'lancemaster',
    // Hyper Awakening Technique Casting Speed +<FONT COLOR='#99ff99'>4%</FONT>. MP Cost -<FONT COLOR='#99ff99'>30%</FONT>.
    // Hyper Awakening Technique Casting Speed +<FONT COLOR='#99ff99'>8%</FONT>. MP Cost -<FONT COLOR='#99ff99'>60%</FONT>.
    // Hyper Awakening Technique Casting Speed +<FONT COLOR='#99ff99'>12%</FONT>. MP Cost -<FONT COLOR='#99ff99'>90%</FONT>.
    stats: {
      bonuses: {
        ark_instant_spell: 1
      }
    }
  },
  2345600: {
    name: 'Powerful Strike',
    icon: 'Ark_Passive_LM_9',
    points: 10,
    levels: 3,
    group: 2,
    tier: 1,
    position: 0,
    exclusive: 2345600,
    class: 'lancemaster',
    // Grants Push Immunity upon using Dragon's Rampage. Swing attack (excluding the last attack) pulls foes toward the character. Outgoing Damage from the last attack +<FONT COLOR='#99ff99'>0.0%</FONT>.
    // Grants Push Immunity upon using Dragon's Rampage. Swing attack (excluding the last attack) pulls foes toward the character. Outgoing Damage from the last attack +<FONT COLOR='#99ff99'>0.0%</FONT>.
    // Grants Push Immunity upon using Dragon's Rampage. Swing attack (excluding the last attack) pulls foes toward the character. Outgoing Damage from the last attack +<FONT COLOR='#99ff99'>0.0%</FONT>.
    stats: {
      bonuses: {
        glaivier_powerful_strike: 1
      }
    }
  },
  2345700: {
    name: 'Final Decision',
    icon: 'Ark_Passive_LM_10',
    points: 10,
    levels: 3,
    group: 2,
    tier: 1,
    position: 1,
    exclusive: 2345600,
    class: 'lancemaster',
    // Upon using Dragon's Rampage, Outgoing Damage +<FONT COLOR='#99ff99'>30.0%</FONT> by consuming <FONT COLOR='#ffff99'>1</FONT> Dual Meter slot. No effect if Dual Meter is below <FONT COLOR='#ffff99'>1</FONT> slot.
    // Upon using Dragon's Rampage, Outgoing Damage +<FONT COLOR='#99ff99'>60.0%</FONT> by consuming <FONT COLOR='#ffff99'>1</FONT> Dual Meter slot. No effect if Dual Meter is below <FONT COLOR='#ffff99'>1</FONT> slot.
    // Upon using Dragon's Rampage, Outgoing Damage +<FONT COLOR='#99ff99'>90.0%</FONT> by consuming <FONT COLOR='#ffff99'>1</FONT> Dual Meter slot. No effect if Dual Meter is below <FONT COLOR='#ffff99'>1</FONT> slot.
    stats: {
      bonuses: {
        glaivier_final_decision: 1
      }
    }
  },
  2345800: {
    name: 'Piercing Fatal Blow',
    icon: 'Ark_Passive_LM_11',
    points: 10,
    levels: 3,
    group: 2,
    tier: 1,
    position: 2,
    exclusive: 2345600,
    class: 'lancemaster',
    // Dash Attack Range of Deadly Red Dragon +<FONT COLOR='#99ff99'>4 meters</FONT>, and Crit Rate +<FONT COLOR='#99ff99'>100%</FONT>.
    // Dash Attack Range of Deadly Red Dragon +<FONT COLOR='#99ff99'>4 meters</FONT>, and Crit Rate +<FONT COLOR='#99ff99'>100%</FONT>. Outgoing Damage +<FONT COLOR='#99ff99'>15.0%</FONT>.
    // Dash Attack Range of Deadly Red Dragon +<FONT COLOR='#99ff99'>4 meters</FONT>, and Crit Rate +<FONT COLOR='#99ff99'>100%</FONT>. Outgoing Damage +<FONT COLOR='#99ff99'>30.0%</FONT>.
    stats: {
      bonuses: {
        glaivier_fatal_blow: 1
      }
    }
  },
  2345900: {
    name: 'Draconic Shout',
    icon: 'Ark_Passive_LM_12',
    points: 10,
    levels: 3,
    group: 2,
    tier: 1,
    position: 3,
    exclusive: 2345600,
    class: 'lancemaster',
    // Using Deadly Red Dragon unleashes the dragon╬ô├ç├ûs energy to quickly strike enemies with the spear <FONT COLOR='#ffff99'>2</FONT> times while in place, then immediately launches into a Dash Attack. Dash Attack no longer pierces foes, but total Damage +<FONT COLOR='#99ff99'>25.0%</FONT>.
    // Using Deadly Red Dragon unleashes the dragon╬ô├ç├ûs energy to quickly strike enemies with the spear <FONT COLOR='#ffff99'>2</FONT> times while in place, then immediately launches into a Dash Attack. Dash Attack no longer pierces foes, but total Damage +<FONT COLOR='#99ff99'>50.0%</FONT>.
    // Using Deadly Red Dragon unleashes the dragon╬ô├ç├ûs energy to quickly strike enemies with the spear <FONT COLOR='#ffff99'>2</FONT> times while in place, then immediately launches into a Dash Attack. Dash Attack no longer pierces foes, but total Damage +<FONT COLOR='#99ff99'>75.0%</FONT>.
    stats: {
      bonuses: {
        glaivier_draconic_shout: 1
      }
    }
  }
}
