import { Engraving } from '../types/engraving'

export const engravings: Record<number, Engraving> = {
  107: {
    name: 'Disrespect',
    icon: 'achieve_04_30',
    // Damage +<FONT COLOR='#99ff99'>9%</FONT> to foes with <FONT COLOR='#ffff99'>30%</FONT> or lower HP.
    // Damage +<FONT COLOR='#99ff99'>22%</FONT> to foes with <FONT COLOR='#ffff99'>30%</FONT> or lower HP.
    // Damage +<FONT COLOR='#99ff99'>36%</FONT> to foes with <FONT COLOR='#ffff99'>30%</FONT> or lower HP.
    legacyStats: {},
    values: [
      {
        base: 30,
        relic: [2.5, 5, 7.5, 10]
      },
      {
        base: 21,
        epic: [1.5, 3, 4.5, 6],
        legendary: [1.5, 3, 4.5, 6],
        stone: [6, 7.5, 10.5, 12]
      }
    ]
    // Damage +<FONT COLOR='#99ff99'>22.50%</FONT> to foes with <FONT COLOR='#ffff99'>30.00%</FONT> or lower HP.
  },
  109: {
    name: 'Spirit Absorption',
    icon: 'Buff_65',
    // Atk./Move Speed +<FONT COLOR='#99ff99'>3%</FONT>.
    // Atk./Move Speed +<FONT COLOR='#99ff99'>8%</FONT>.
    // Atk./Move Speed +<FONT COLOR='#99ff99'>15%</FONT>.
    legacyStats: {
      attackSpeed: [0.03, 0.08, 0.15],
      moveSpeed: [0.03, 0.08, 0.15]
    },
    values: [
      {
        base: 7,
        epic: [0.75, 1.5, 2.25, 3],
        legendary: [0.75, 1.5, 2.25, 3],
        relic: [0.75, 1.5, 2.25, 3],
        stone: [3, 3.75, 5.25, 6]
      },
      {
        base: 7,
        epic: [0.75, 1.5, 2.25, 3],
        legendary: [0.75, 1.5, 2.25, 3],
        relic: [0.75, 1.5, 2.25, 3],
        stone: [3, 3.75, 5.25, 6]
      }
    ],
    // Atk./Move Speed +<FONT COLOR='#99ff99'>7.75%</FONT>.
    stats: (values) => ({
      attackSpeed: values[0] / 100,
      moveSpeed: values[0] / 100
    })
  },
  110: {
    name: 'Ether Predator',
    icon: 'Buff_74',
    // Attacking a foe creates an Ether that only you can collect. On collecting the Ether, Atk. Power +<FONT COLOR='#99ff99'>0.2%</FONT> for <FONT COLOR='#ffff99'>90s</FONT> and All Defense +<FONT COLOR='#99ff99'>0.3%</FONT>. Stacks up to <FONT COLOR='#ffff99'>30</FONT> times. Chance on Ether collection to increase the stack by <FONT COLOR='#ffff99'>3</FONT>. (Cooldown: <FONT COLOR='#ffff99'>10s</FONT>)
    // Attacking a foe creates an Ether that only you can collect. On collecting the Ether, Atk. Power +<FONT COLOR='#99ff99'>0.3%</FONT> for <FONT COLOR='#ffff99'>90s</FONT> and All Defense +<FONT COLOR='#99ff99'>0.6%</FONT>. Stacks up to <FONT COLOR='#ffff99'>30</FONT> times. Chance on Ether collection to increase the stack by <FONT COLOR='#ffff99'>3</FONT>. (Cooldown: <FONT COLOR='#ffff99'>10s</FONT>)
    // Attacking a foe creates an Ether that only you can collect. On collecting the Ether, Atk. Power +<FONT COLOR='#99ff99'>0.5%</FONT> for <FONT COLOR='#ffff99'>90s</FONT> and All Defense +<FONT COLOR='#99ff99'>1%</FONT>. Stacks up to <FONT COLOR='#ffff99'>30</FONT> times. Chance on Ether collection to increases the stack by <FONT COLOR='#ffff99'>3</FONT>. (Cooldown: <FONT COLOR='#ffff99'>10s</FONT>)
    legacyStats: {
      attackPowerBonus: [0.002 * 30, 0.003 * 30, 0.005 * 30]
    },
    values: [
      {
        base: 0.42,
        relic: [0.03, 0.06, 0.09, 0.12],
        stone: [0.1, 0.13, 0.18, 0.2]
      },
      {
        base: 0.4,
        epic: [0.15, 0.3, 0.45, 0.6]
      },
      {
        base: 10,
        legendary: [-1.5, -3, -4.5, -6]
      }
    ],
    // Attacking a foe creates an Ether that only you can collect. On collecting the Ether, Atk. Power +<FONT COLOR='#99ff99'>0.42%</FONT> for <FONT COLOR='#ffff99'>90</FONT>s and All Defense +<FONT COLOR='#99ff99'>0.55%</FONT>. Stacks up to <FONT COLOR='#ffff99'>30</FONT> times. Chance on Ether collection to increase the stack by <FONT COLOR='#ffff99'>3</FONT>. (Cooldown: <FONT COLOR='#ffff99'>10.0</FONT>s)
    stats: (values) => ({
      attackPowerBonus: (values[0] * 30) / 100
    })
  },
  111: {
    name: 'Stabilized Status',
    icon: 'Buff_105',
    // Damage +<FONT COLOR='#99ff99'>3%</FONT> when your HP is above <FONT COLOR='#ffff99'>65%</FONT>.
    // Damage +<FONT COLOR='#99ff99'>8%</FONT> when your HP is <FONT COLOR='#ffff99'>65%</FONT> or above.
    // Damage +<FONT COLOR='#99ff99'>16%</FONT> when your HP is above <FONT COLOR='#ffff99'>65%</FONT>.
    legacyStats: {
      damageMultiplier: [1.03, 1.08, 1.16]
    },
    values: [
      {
        base: 8,
        epic: [0.75, 1.5, 2.25, 3],
        legendary: [0.75, 1.5, 2.25, 3],
        relic: [0.75, 1.5, 2.25, 3],
        stone: [3, 3.75, 5.25, 6]
      }
    ],
    // Damage +<FONT COLOR='#99ff99'>8.75%</FONT> when your HP is <FONT COLOR='#ffff99'>65%</FONT> or above.
    stats: (values) => ({
      damageMultiplier: 1 + values[0] / 100
    })
  },
  118: {
    name: 'Grudge',
    icon: 'Buff_71',
    // Damage +<FONT COLOR='#99ff99'>4%</FONT> to Boss or above monsters. Incoming Damage +<FONT COLOR='#ff9999'>20%</FONT>.
    // Damage +<FONT COLOR='#99ff99'>10%</FONT> to Boss or above monsters. Incoming Damage +<FONT COLOR='#ff9999'>20%</FONT>.
    // Damage +<FONT COLOR='#99ff99'>20%</FONT> to Boss or above monsters. Incoming Damage +<FONT COLOR='#ff9999'>20%</FONT>.
    legacyStats: {
      damageMultiplier: [1.04, 1.1, 1.2]
    },
    values: [
      {
        base: 12,
        epic: [0.75, 1.5, 2.25, 3],
        legendary: [0.75, 1.5, 2.25, 3],
        relic: [0.75, 1.5, 2.25, 3],
        stone: [3, 3.75, 5.25, 6]
      }
    ],
    // Damage +<FONT COLOR='#99ff99'>12.75%</FONT> to Boss or Raid monsters. Incoming Damage +<FONT COLOR='#ff9999'>20%</FONT>.
    stats: (values) => ({
      damageMultiplier: 1 + values[0] / 100
    })
  },
  121: {
    name: 'Super Charge',
    icon: 'achieve_06_14',
    // Charge Skills Charging Speed +<FONT COLOR='#99ff99'>8%</FONT>. Damage +<FONT COLOR='#99ff99'>4%</FONT>.
    // Charge Skills Charging Speed +<FONT COLOR='#99ff99'>20%</FONT>. Damage +<FONT COLOR='#99ff99'>10%</FONT>.
    // Charge Skills Charging Speed +<FONT COLOR='#99ff99'>40%</FONT>. Damage +<FONT COLOR='#99ff99'>20%</FONT>.
    legacyStats: {
      bonuses: {
        super_charge_speed: [0.08, 0.2, 0.4],
        super_charge_damage: [0.04, 0.1, 0.2]
      }
    },
    values: [
      {
        base: 24,
        epic: [2, 4, 6, 8],
        legendary: [2, 4, 6, 8]
      },
      {
        base: 14,
        epic: [0.5, 1, 1.5, 2],
        legendary: [0.5, 1, 1.5, 2],
        relic: [0.75, 1.5, 2.25, 3],
        stone: [3, 3.75, 5.25, 6]
      }
    ],
    // Charging speed of Charge Skills +<FONT COLOR='#99ff99'>26.00%</FONT>. Damage +<FONT COLOR='#99ff99'>14.50%</FONT>.
    stats: (values) => ({
      bonuses: {
        super_charge_speed: values[0] / 100,
        super_charge_damage: values[1] / 100
      }
    })
  },
  123: {
    name: 'Strong Will',
    icon: 'Buff_44',
    // Incoming Damage -<FONT COLOR='#99ff99'>5%</FONT> while Pushed.
    // Incoming Damage -<FONT COLOR='#99ff99'>15%</FONT> while Pushed.
    // Incoming Damage -<FONT COLOR='#99ff99'>30%</FONT> while Pushed.
    legacyStats: {},
    values: [
      {
        base: 20,
        epic: [1, 2, 3, 4],
        legendary: [1, 2, 3, 4],
        relic: [1, 2, 3, 4],
        stone: [4, 5, 7, 8]
      }
    ]
    // Incoming Damage -<FONT COLOR='#99ff99'>21.00%</FONT> while Pushed.
  },
  134: {
    name: 'Drops of Ether',
    icon: 'Buff_18',
    // Attacks have a chance to create an Ether within <FONT COLOR='#ffff99'>8 meters</FONT>. (Cooldown: <FONT COLOR='#ffff99'>60s</FONT>)
    // Attacks have a chance to create an Ether within <FONT COLOR='#ffff99'>8 meters</FONT>. (Cooldown: <FONT COLOR='#ffff99'>30s</FONT>)
    // Attacks have a chance to create an Ether within <FONT COLOR='#ffff99'>8 meters</FONT>. (Cooldown: <FONT COLOR='#ffff99'>10s</FONT>)
    legacyStats: {},
    values: [
      {
        base: 22,
        epic: [-1.5, -3, -4.5, -6],
        legendary: [-1.5, -3, -4.5, -6]
      },
      {
        base: 0,
        relic: [4, 8, 12, 16],
        stone: [12, 15, 21, 24]
      }
    ]
    // Attacks have a chance to create an Ether within <FONT COLOR='#ffff99'>8 meters</FONT>. (Cooldown: <FONT COLOR='#ffff99'>20.5</FONT>s)
  },
  140: {
    name: 'Crisis Evasion',
    icon: 'Buff_162',
    // When receiving fatal Damage, become invincible for <FONT COLOR='#ffff99'>3s</FONT>, recovering <FONT COLOR='#99ff99'>50%</FONT> of the Damage taken during invincibility as HP. Resets Movement Skill cooldown. (Cooldown: <FONT COLOR='#ffff99'>15m</FONT>)
    // When receiving fatal Damage, become invincible for <FONT COLOR='#ffff99'>3s</FONT>, recovering <FONT COLOR='#99ff99'>50%</FONT> of the Damage taken during invincibility as HP. Resets Movement Skill cooldown. (Cooldown: <FONT COLOR='#ffff99'>12m</FONT>)
    // When receiving fatal Damage, become invincible for <FONT COLOR='#ffff99'>3s</FONT>, recovering <FONT COLOR='#99ff99'>50%</FONT> of the Damage taken during invincibility as HP. Resets Movement Skill cooldown. (Cooldown: <FONT COLOR='#ffff99'>9m</FONT>)
    legacyStats: {},
    values: [
      {
        base: 40,
        stone: [30, 37.5, 52.5, 60]
      },
      {
        base: 720,
        epic: [-20, -40, -60, -80],
        legendary: [-20, -40, -60, -80],
        relic: [-20, -40, -60, -80]
      }
    ]
    // When receiving fatal Damage, become invincible for <FONT COLOR='#ffff99'>3s</FONT>, recovering <FONT COLOR='#99ff99'>40.00%</FONT> of the Damage taken during invincibility as HP. (Cooldown: <FONT COLOR='#ffff99'>700s</FONT>)
  },
  141: {
    name: 'Keen Blunt Weapon',
    icon: 'achieve_03_40',
    // +<FONT COLOR='#99ff99'>10%</FONT> Crit Damage but your attacks have a chance to deal -<FONT COLOR='#ff9999'>20%</FONT> Damage.
    // +<FONT COLOR='#99ff99'>25%</FONT> Crit Damage but your attacks have a chance to deal -<FONT COLOR='#ff9999'>20%</FONT> Damage.
    // +<FONT COLOR='#99ff99'>50%</FONT> Crit Damage but your attacks have a chance to deal -<FONT COLOR='#ff9999'>20%</FONT> Damage.
    legacyStats: {
      critDamage: [0.1, 0.25, 0.5],
      bonuses: {
        keen_blunt_weapon: 1
      }
    },
    values: [
      {
        base: 28,
        epic: [2, 4, 6, 8],
        legendary: [2, 4, 6, 8],
        relic: [2, 4, 6, 8],
        stone: [7.5, 9.4, 13.2, 15]
      }
    ],
    // +<FONT COLOR='#99ff99'>30.00%</FONT> Crit Damage, but your attacks have a chance to deal -<FONT COLOR='#ff9999'>20%</FONT> Damage.
    stats: (values) => ({
      critDamage: values[0] / 100,
      bonuses: {
        keen_blunt_weapon: 1
      }
    })
  },
  142: {
    name: 'Vital Point Hit',
    icon: 'Buff_168',
    // Stagger attack effectiveness +<FONT COLOR='#99ff99'>6%</FONT>.
    // Stagger attack effectiveness +<FONT COLOR='#99ff99'>18%</FONT>.
    // Stagger attack effectiveness +<FONT COLOR='#99ff99'>36%</FONT>.
    legacyStats: {},
    values: [
      {
        base: 22,
        epic: [1.25, 2.5, 3.75, 5],
        legendary: [1.25, 2.5, 3.75, 5],
        relic: [1.25, 2.5, 3.75, 5],
        stone: [4, 5, 7, 8]
      }
    ]
    // Stagger Attack effectiveness +<FONT COLOR='#99ff99'>23.25%</FONT>.
  },
  167: {
    name: 'Max MP Increase',
    icon: 'Buff_122',
    // Max MP +<FONT COLOR='#99ff99'>5%</FONT>.
    // Max MP +<FONT COLOR='#99ff99'>15%</FONT>.
    // Max MP +<FONT COLOR='#99ff99'>30%</FONT>.
    legacyStats: {},
    values: [
      {
        base: 20,
        epic: [1, 2, 3, 4],
        legendary: [1, 2, 3, 4],
        relic: [1, 2, 3, 4],
        stone: [4, 5, 7, 8]
      }
    ]
    // Max MP +<FONT COLOR='#99ff99'>21.00%</FONT>.
  },
  168: {
    name: 'MP Efficiency Increase',
    icon: 'Buff_166',
    // MP Recovery +<FONT COLOR='#99ff99'>4%</FONT>. Damage of MP-consuming skills +<FONT COLOR='#99ff99'>3%</FONT>.
    // MP Recovery +<FONT COLOR='#99ff99'>10%</FONT>. Damage of MP-consuming skills +<FONT COLOR='#99ff99'>7%</FONT>.
    // MP Recovery +<FONT COLOR='#99ff99'>20%</FONT>. Damage of MP-consuming skills +<FONT COLOR='#99ff99'>15%</FONT>.
    legacyStats: {
      bonuses: {
        mp_skill_damage: [0.03, 0.07, 0.15]
      }
    },
    values: [
      {
        base: 12,
        epic: [1, 2, 3, 4],
        legendary: [1, 2, 3, 4]
      },
      {
        base: 9,
        epic: [0.5, 1, 1.5, 2],
        legendary: [0.5, 1, 1.5, 2],
        relic: [0.75, 1.5, 2.25, 3],
        stone: [3, 3.75, 5.25, 6]
      }
    ],
    // MP Recovery +<FONT COLOR='#99ff99'>13.00%</FONT>. Damage of MP-consuming skills +<FONT COLOR='#99ff99'>9.50%</FONT>.
    stats: (values) => ({
      bonuses: {
        mp_skill_damage: values[1] / 100
      }
    })
  },
  202: {
    name: 'Master of Escape',
    icon: 'Buff_10',
    // Stand Up Action Cooldown -<FONT COLOR='#99ff99'>4%</FONT>.
    // Stand Up Action Cooldown -<FONT COLOR='#99ff99'>12%</FONT>.
    // Stand Up Action Cooldown -<FONT COLOR='#99ff99'>25%</FONT>.
    legacyStats: {},
    values: [
      {
        base: 15,
        epic: [1, 2, 3, 4],
        legendary: [1, 2, 3, 4],
        relic: [1, 2, 3, 4],
        stone: [4, 5, 7, 8]
      }
    ]
    // Stand Up Cooldown -<FONT COLOR='#99ff99'>16.00%</FONT>.
  },
  235: {
    name: 'Fortitude',
    icon: 'Buff_66',
    // Incoming Damage is reduced proportional to HP lost. (Max. <FONT COLOR='#99ff99'>5%</FONT>)
    // Incoming Damage is reduced proportional to HP lost. (Max. <FONT COLOR='#99ff99'>15%</FONT>)
    // Incoming Damage is reduced proportional to HP lost. (Max. <FONT COLOR='#99ff99'>30%</FONT>)
    legacyStats: {},
    values: [
      {
        base: 20,
        epic: [1, 2, 3, 4],
        legendary: [1, 2, 3, 4],
        relic: [1, 2, 3, 4],
        stone: [4, 5, 7, 8]
      }
    ]
    // Incoming Damage is reduced proportional to HP lost. (Max. <FONT COLOR='#99ff99'>21.00%</FONT>)
  },
  236: {
    name: 'Crushing Fist',
    icon: 'Buff_83',
    // On successful Counterattack, Atk. Power +<FONT COLOR='#99ff99'>4%</FONT> for <FONT COLOR='#ffff99'>3s</FONT>. Countered target takes +<FONT COLOR='#99ff99'>2%</FONT> Damage from all party members for <FONT COLOR='#ffff99'>3s</FONT>.
    // On successful Counterattack, Atk. Power +<FONT COLOR='#99ff99'>10%</FONT> for <FONT COLOR='#ffff99'>3s</FONT>. Countered target takes +<FONT COLOR='#99ff99'>4%</FONT> Damage from all party members for <FONT COLOR='#ffff99'>3s</FONT>.
    // On successful Counterattack, Atk. Power +<FONT COLOR='#99ff99'>20%</FONT> for <FONT COLOR='#ffff99'>3s</FONT>. Countered target takes +<FONT COLOR='#99ff99'>8%</FONT> Damage from all party members for <FONT COLOR='#ffff99'>3s</FONT>.
    legacyStats: {},
    values: [
      {
        base: 12,
        legendary: [1.5, 3, 4.5, 6],
        relic: [1.5, 3, 4.5, 6]
      },
      {
        base: 5,
        epic: [0.75, 1.5, 2.25, 3],
        stone: [3, 3.75, 5.25, 6]
      }
    ]
    // On successful Counterattack, Atk. Power +<FONT COLOR='#99ff99'>12.00%</FONT> for <FONT COLOR='#ffff99'>3s</FONT>. Countered target takes +<FONT COLOR='#99ff99'>5.75%</FONT> Damage from all party members for <FONT COLOR='#ffff99'>3s</FONT>.
  },
  237: {
    name: 'Shield Piercing',
    icon: 'Buff_89',
    // Damage to shields +<FONT COLOR='#99ff99'>16%</FONT>.
    // Damage to shields +<FONT COLOR='#99ff99'>50%</FONT>.
    // Damage to shields +<FONT COLOR='#99ff99'>100%</FONT>.
    legacyStats: {},
    values: [
      {
        base: 60,
        epic: [4, 8, 12, 16],
        legendary: [4, 8, 12, 16],
        relic: [4, 8, 12, 16],
        stone: [16, 20, 28, 32]
      }
    ]
    // Damage to shields +<FONT COLOR='#99ff99'>64.00%</FONT>.
  },
  238: {
    name: "Master's Tenacity",
    icon: 'Buff_147',
    // Outgoing Damage +<FONT COLOR='#99ff99'>3%</FONT> at <FONT COLOR='#ffff99'>50%</FONT> or lower HP.
    // Outgoing Damage +<FONT COLOR='#99ff99'>8%</FONT> at <FONT COLOR='#ffff99'>50%</FONT> or lower HP.
    // Outgoing Damage +<FONT COLOR='#99ff99'>16%</FONT> at <FONT COLOR='#ffff99'>50%</FONT> or lower HP.
    legacyStats: {
      damageMultiplier: [1.03, 1.08, 1.16]
    },
    values: [
      {
        base: 8,
        epic: [0.75, 1.5, 2.25, 3],
        legendary: [0.75, 1.5, 2.25, 3],
        relic: [0.75, 1.5, 2.25, 3],
        stone: [3, 3.75, 5.25, 6]
      }
    ],
    // Outgoing Damage +<FONT COLOR='#99ff99'>8.75%</FONT> at <FONT COLOR='#ffff99'>50.00%</FONT> or lower HP.
    stats: (values) => ({
      damageMultiplier: 1 + values[0] / 100
    })
  },
  239: {
    name: 'Divine Protection',
    icon: 'Buff_229',
    // When attacked, there is a <FONT COLOR='#99ff99'>20%</FONT> chance of activating Divine Protection, which reduces the Damage received by <FONT COLOR='#99ff99'>60%</FONT>. (Cooldown: <FONT COLOR='#ffff99'>60s</FONT>)
    // When attacked, there is a <FONT COLOR='#99ff99'>20%</FONT> chance of activating Divine Protection, which reduces the Damage received by <FONT COLOR='#99ff99'>60%</FONT>. (Cooldown: <FONT COLOR='#ffff99'>20s</FONT>)
    // When attacked, there is a <FONT COLOR='#99ff99'>20%</FONT> chance of activating Divine Protection, which reduces the Damage received by <FONT COLOR='#99ff99'>60%</FONT>. (Cooldown: <FONT COLOR='#ffff99'>10s</FONT>)
    legacyStats: {},
    values: [
      {
        base: 22,
        relic: [2, 4, 6, 8]
      },
      {
        base: 30,
        epic: [2, 4, 6, 8],
        legendary: [2, 4, 6, 8],
        stone: [8, 10, 14, 16]
      }
    ]
    // When attacked, there is a <FONT COLOR='#ffff99'>22.00%</FONT> chance of activating Divine Protection, which decreases Incoming Damage by <FONT COLOR='#99ff99'>32.00%</FONT>. (Cooldown: <FONT COLOR='#ffff99'>10s</FONT>)
  },
  240: {
    name: 'Heavy Armor',
    icon: 'Buff_46',
    // All Defense +<FONT COLOR='#99ff99'>20%</FONT>. This additional Defense is immune to Defense Reduction effects.
    // All Defense +<FONT COLOR='#99ff99'>50%</FONT>. This additional Defense is immune to Defense Reduction effects.
    // All Defense +<FONT COLOR='#99ff99'>100%</FONT>. This additional Defense is immune to Defense Reduction effects.
    legacyStats: {},
    values: [
      {
        base: 58,
        epic: [4, 8, 12, 16],
        legendary: [4, 8, 12, 16],
        relic: [4, 8, 12, 16],
        stone: [12, 15, 21, 24]
      }
    ]
    // All Defense +<FONT COLOR='#99ff99'>62.00%</FONT>. This additional Defense is immune to Defense Reduction effects.
  },
  241: {
    name: 'Explosive Expert',
    icon: 'Buff_121',
    // Bomb/Grenade Battle Item carrying limit +<FONT COLOR='#99ff99'>1</FONT>.
    // Bomb/Grenade Battle Item carrying limit +<FONT COLOR='#99ff99'>2</FONT>.
    // Bomb/Grenade Battle Item carrying limit +<FONT COLOR='#99ff99'>3</FONT>.
    legacyStats: {},
    values: [
      {
        base: 1,
        legendary: [0, 1, 1, 2],
        relic: [0, 1, 1, 2]
      },
      {
        base: 40,
        epic: [10, 20, 30, 40],
        stone: [40, 50, 70, 80]
      }
    ]
    // Bomb/Grenade Battle Item carrying limit +<FONT COLOR='#99ff99'>1</FONT>. Bomb/Grenade Battle Item Damage +<FONT COLOR='#99ff99'>50.00%</FONT>.
  },
  242: {
    name: 'Enhanced Shield',
    icon: 'Buff_239',
    // Become immune to all Status Ailments while affected by shields, but -<FONT COLOR='#ff9999'>90%</FONT> Shield HP and Defensive Stance's Damage absorption amounts. (Not applicable to Battlefield Shield)
    // Become immune to all Status Ailments while affected by shields, but -<FONT COLOR='#ff9999'>75%</FONT> Shield HP and Defensive Stance's Damage absorption amounts. (Not applicable to Battlefield Shield)
    // Become immune to all Status Ailments while affected by shields, but -<FONT COLOR='#ff9999'>50%</FONT> Shield HP and Defensive Stance's Damage absorption amounts. (Not applicable to Battlefield Shield)
    legacyStats: {},
    values: [
      {
        base: 72,
        epic: [-2, -4, -6, -8],
        legendary: [-2, -4, -6, -8],
        relic: [-2, -4, -6, -8],
        stone: [-6, -7.5, -10.5, -12]
      }
    ]
    // Become immune to all Status Ailments while affected by shields, but -<FONT COLOR='#ff9999'>70.00%</FONT> to Shield HP and Defensive Stance's Damage absorption. (Not applicable to Battlefield Shield)
  },
  243: {
    name: 'Necromancy',
    icon: 'Buff_29',
    // Attacks summon temporary soldiers that Damage foes. (Cooldown: <FONT COLOR='#ffff99'>75s</FONT>)
    // Attacks summon temporary soldiers that Damage foes. (Cooldown: <FONT COLOR='#ffff99'>30s</FONT>)
    // Attacks summon temporary soldiers that Damage foes. (Cooldown: <FONT COLOR='#ffff99'>15s</FONT>)
    legacyStats: {},
    values: [
      {
        base: 25,
        epic: [-1, -2, -3, -4],
        legendary: [-1, -2, -3, -4],
        relic: [-1, -2, -3, -4],
        stone: [-4, -5, -7, -8]
      }
    ]
    // Attacks summon temporary soldiers that Damage foes. (Cooldown: <FONT COLOR='#ffff99'>24s</FONT>)
  },
  244: {
    name: 'Preemptive Strike',
    icon: 'achieve_08_62',
    // When attacking Challenge or lower monsters with full HP, your attack is a guaranteed crit with +<FONT COLOR='#99ff99'>30%</FONT> Crit Damage.
    // When attacking Challenge or lower monsters with full HP, your attack is a guaranteed crit with +<FONT COLOR='#99ff99'>80%</FONT> Crit Damage.
    // When attacking Challenge or lower monsters with full HP, your attack is a guaranteed crit with +<FONT COLOR='#99ff99'>160%</FONT> Crit Damage.
    legacyStats: {},
    values: [
      {
        base: 80,
        epic: [7.5, 15, 22.5, 30],
        legendary: [7.5, 15, 22.5, 30],
        relic: [7.5, 15, 22.5, 30],
        stone: [30, 37.5, 52.5, 60]
      }
    ]
    // When attacking Challenge or lower monsters with full HP, Crit Hit is guaranteed with a Crit Hit multiplier of +<FONT COLOR='#99ff99'>87.50%</FONT>.
  },
  245: {
    name: 'Broken Bone',
    icon: 'Buff_94',
    // Damage to Staggered foes +<FONT COLOR='#99ff99'>7.5%</FONT>.
    // Damage to Staggered foes +<FONT COLOR='#99ff99'>20%</FONT>.
    // Damage to Staggered foes +<FONT COLOR='#99ff99'>40%</FONT>.
    legacyStats: {},
    values: [
      {
        base: 27,
        epic: [1.25, 2.5, 3.75, 5],
        legendary: [1.25, 2.5, 3.75, 5],
        relic: [1.25, 2.5, 3.75, 5],
        stone: [4, 5, 7, 8]
      }
    ]
    // Damage to Staggered foes +<FONT COLOR='#99ff99'>28.25%</FONT>.
  },
  246: {
    name: 'Lightning Fury',
    icon: 'Buff_191',
    // Attacks have a <FONT COLOR='#99ff99'>60%</FONT> chance of generating a lightning orb. These lightning orbs can only be generated once every <FONT COLOR='#ffff99'>4s</FONT>. When <FONT COLOR='#ffff99'>5</FONT> orbs are created, they explode and Damage surrounding foes.
    // Attacks have a <FONT COLOR='#99ff99'>60%</FONT> chance of generating a lightning orb. These lightning orbs can only be generated once every <FONT COLOR='#ffff99'>2s</FONT>. When <FONT COLOR='#ffff99'>5</FONT> orbs are created, they explode and Damage surrounding foes.
    // Attacks have a <FONT COLOR='#99ff99'>60%</FONT> chance of generating a lightning orb. These lightning orbs can only be generated once every <FONT COLOR='#ffff99'>1s</FONT>. When <FONT COLOR='#ffff99'>5</FONT> orbs are created, they explode and Damage surrounding foes.
    legacyStats: {},
    values: [
      {
        base: 20,
        epic: [5, 10, 15, 20],
        legendary: [5, 10, 15, 20]
      },
      {
        base: 100,
        relic: [10, 20, 30, 40],
        stone: [40, 50, 70, 80]
      }
    ]
    // Attacks have a <FONT COLOR='#ffff99'>25.00%</FONT> chance of generating a lightning orb. These lightning orbs can only be generated once every <FONT COLOR='#ffff99'>1s</FONT>. When <FONT COLOR='#ffff99'>5</FONT> orbs are created, they explode and Damage surrounding foes. (Challenge or lower foes receive +<FONT COLOR='#99ff99'>100.00%</FONT> Additional Damage.)
  },
  247: {
    name: 'Cursed Doll',
    icon: 'Buff_237',
    // Outgoing Damage +<FONT COLOR='#99ff99'>3%</FONT>. Healing -<FONT COLOR='#ff9999'>25%</FONT>, natural recovery excluded.
    // Outgoing Damage +<FONT COLOR='#99ff99'>8%</FONT>. Healing -<FONT COLOR='#ff9999'>25%</FONT>, natural recovery excluded.
    // Outgoing Damage +<FONT COLOR='#99ff99'>16%</FONT>. Healing -<FONT COLOR='#ff9999'>25%</FONT>, natural recovery excluded.
    legacyStats: {
      damageMultiplier: [1.03, 1.08, 1.16]
    },
    values: [
      {
        base: 8,
        epic: [0.75, 1.5, 2.25, 3],
        legendary: [0.75, 1.5, 2.25, 3],
        relic: [0.75, 1.5, 2.25, 3],
        stone: [3, 3.75, 5.25, 6]
      }
    ],
    // Outgoing Damage +<FONT COLOR='#99ff99'>8.75%</FONT>. Recovery -<FONT COLOR='#ff9999'>25.00%</FONT>.
    stats: (values) => ({
      damageMultiplier: 1 + values[0] / 100
    })
  },
  248: {
    name: 'Contender',
    icon: 'Buff_136',
    // Atk. Power +<FONT COLOR='#99ff99'>1%</FONT> for <FONT COLOR='#ffff99'>15s</FONT> after killing a foe. (Max. <FONT COLOR='#ffff99'>5</FONT> stacks)
    // Atk. Power +<FONT COLOR='#99ff99'>1.5%</FONT> for <FONT COLOR='#ffff99'>25s</FONT> after killing a foe. (Max. <FONT COLOR='#ffff99'>6</FONT> stacks)
    // Atk. Power +<FONT COLOR='#99ff99'>2.5%</FONT> for <FONT COLOR='#ffff99'>40</FONT> after killing a foe. (Max. <FONT COLOR='#ffff99'>7</FONT> stacks)
    legacyStats: {},
    values: [
      {
        base: 1.3,
        epic: [0.1, 0.2, 0.3, 0.4],
        legendary: [0.1, 0.2, 0.3, 0.4],
        stone: [0.3, 0.38, 0.53, 0.6]
      },
      {
        base: 8,
        relic: [0, 1, 1, 2]
      }
    ]
    // Atk. Power +<FONT COLOR='#99ff99'>1.40%</FONT> for <FONT COLOR='#ffff99'>40</FONT>s after killing a foe. (Max. <FONT COLOR='#ffff99'>8</FONT> stacks)
  },
  249: {
    name: 'Ambush Master',
    icon: 'Buff_148',
    // Outgoing Damage +<FONT COLOR='#99ff99'>1%</FONT>. Back Attack Damage +<FONT COLOR='#99ff99'>3%</FONT>.
    // Outgoing Damage +<FONT COLOR='#99ff99'>3%</FONT>. Back Attack Damage +<FONT COLOR='#99ff99'>7%</FONT>.
    // Outgoing Damage +<FONT COLOR='#99ff99'>7%</FONT>. Back Attack Damage +<FONT COLOR='#99ff99'>15%</FONT>.
    legacyStats: {
      damageMultiplier: [1.01, 1.03, 1.07],
      backMultiplier: [1.03, 1.07, 1.15]
    },
    values: [
      {
        base: 3.2,
        epic: [0.2, 0.4, 0.6, 0.8],
        legendary: [0.2, 0.4, 0.6, 0.8],
        relic: [0.7, 1.4, 2.1, 2.8],
        stone: [2.7, 3.4, 4.7, 5.4]
      },
      {
        base: 9,
        epic: [0.75, 1.5, 2.25, 3],
        legendary: [0.75, 1.5, 2.25, 3]
      }
    ],
    // Outgoing Damage +<FONT COLOR='#99ff99'>3.40%</FONT>. Back Attack Damage +<FONT COLOR='#99ff99'>9.75%</FONT>.
    stats: (values) => ({
      damageMultiplier: 1 + values[0] / 100,
      backMultiplier: 1 + values[1] / 100
    })
  },
  251: {
    name: 'Magick Stream',
    icon: 'Buff_63',
    // When using skills (excluding Movement Skills and Basic Attack), MP Recovery +<FONT COLOR='#99ff99'>0.5%</FONT> for <FONT COLOR='#ffff99'>10s</FONT>. Stacks up to <FONT COLOR='#ffff99'>10</FONT> times. When max stacks are reached, Skill Cooldown -<FONT COLOR='#99ff99'>2%</FONT>. If this effect has Cooldown Reduction due to skill cancel, it is applied after the end of the skill.
    // When using skills (excluding Movement Skills and Basic Attack), MP Recovery +<FONT COLOR='#99ff99'>1.2%</FONT> for <FONT COLOR='#ffff99'>10s</FONT>. Stacks up to <FONT COLOR='#ffff99'>10</FONT> times. When max stacks are reached, Skill Cooldown -<FONT COLOR='#99ff99'>5%</FONT>. If this effect has Cooldown Reduction due to skill cancel, it is applied after the end of the skill.
    // When using skills (excluding Movement Skills and Basic Attack), MP Recovery +<FONT COLOR='#99ff99'>2.4%</FONT> for <FONT COLOR='#ffff99'>10s</FONT>. Stacks up to <FONT COLOR='#ffff99'>10</FONT> times. When max stacks are reached, Skill Cooldown -<FONT COLOR='#99ff99'>8%</FONT>. If this effect has Cooldown Reduction due to skill cancel, it is applied after the end of the skill.
    legacyStats: {
      cooldownMultiplier: [0.98, 0.95, 0.92]
    },
    values: [
      {
        base: 1.4,
        epic: [0.15, 0.3, 0.45, 0.6],
        stone: [0.6, 0.75, 1.05, 1.2]
      },
      {
        base: 4,
        legendary: [0.75, 1.5, 2.25, 3],
        relic: [0.75, 1.5, 2.25, 3]
      }
    ],
    // When using skills (excluding Movement Skills and Basic Attack), MP Recovery +<FONT COLOR='#99ff99'>1.55%</FONT> for <FONT COLOR='#ffff99'>10s</FONT>. Stacks up to <FONT COLOR='#ffff99'>10</FONT> times. When max stacks are reached, Skill Cooldown -<FONT COLOR='#99ff99'>4.00%</FONT>. If this effect has Cooldown Reduction due to skill cancel, it is applied after the end of the skill.
    stats: (values) => ({
      cooldownMultiplier: 1 - values[1] / 100
    })
  },
  253: {
    name: 'Barricade',
    icon: 'Buff_170',
    // Damage to foes while shielded +<FONT COLOR='#99ff99'>3%</FONT>.
    // Damage to foes while shielded +<FONT COLOR='#99ff99'>8%</FONT>.
    // Damage to foes while shielded +<FONT COLOR='#99ff99'>16%</FONT>.
    legacyStats: {
      damageMultiplier: [1.03, 1.08, 1.16]
    },
    values: [
      {
        base: 8,
        epic: [0.75, 1.5, 2.25, 3],
        legendary: [0.75, 1.5, 2.25, 3],
        relic: [0.75, 1.5, 2.25, 3],
        stone: [3, 3.75, 5.25, 6]
      }
    ],
    // Damage to foes while shielded +<FONT COLOR='#99ff99'>8.75%</FONT>.
    stats: (values) => ({
      damageMultiplier: 1 + values[0] / 100
    })
  },
  254: {
    name: 'Raid Captain',
    icon: 'Buff_210',
    // Outgoing Damage +<FONT COLOR='#99ff99'>10%</FONT> of basic Move Speed bonus percentage.
    // Outgoing Damage +<FONT COLOR='#99ff99'>22%</FONT> of basic Move Speed bonus percentage.
    // Outgoing Damage +<FONT COLOR='#99ff99'>45%</FONT> of basic Move Speed bonus percentage.
    legacyStats: {
      bonuses: {
        raid_captain: [0.1, 0.22, 0.45]
      }
    },
    values: [
      {
        base: 24,
        epic: [2, 4, 6, 8],
        legendary: [2, 4, 6, 8],
        relic: [2, 4, 6, 8],
        stone: [7.5, 9.4, 13.2, 15]
      }
    ],
    // Outgoing Damage +<FONT COLOR='#99ff99'>26.00%</FONT> of Move Speed Bonus percentage.
    stats: (values) => ({
      bonuses: {
        raid_captain: values[0] / 100
      }
    })
  },
  255: {
    name: 'Awakening',
    icon: 'Buff_113',
    // Awakening Skill Cooldown -<FONT COLOR='#99ff99'>10%</FONT>. Max Uses +<FONT COLOR='#ffff99'>1</FONT>.
    // Awakening Skill Cooldown -<FONT COLOR='#99ff99'>25%</FONT>. Max Uses +<FONT COLOR='#ffff99'>2</FONT>.
    // Awakening Skill Cooldown -<FONT COLOR='#99ff99'>50%</FONT>. Max Uses +<FONT COLOR='#ffff99'>3</FONT>.
    legacyStats: {
      bonuses: {
        awakening_cooldown: [0.1, 0.25, 0.5]
      }
    },
    values: [
      {
        base: 38,
        epic: [1.5, 3, 4.5, 6],
        stone: [6, 7.5, 10.5, 12]
      },
      {
        base: 1,
        legendary: [0, 1, 1, 2],
        relic: [0, 1, 1, 2]
      }
    ],
    // Awakening Skill Cooldown -<FONT COLOR='#99ff99'>39.50%</FONT>. Max Uses +<FONT COLOR='#99ff99'>1</FONT>.
    stats: (values) => ({
      bonuses: {
        awakening_cooldown: values[0] / 100
      }
    })
  },
  288: {
    name: 'Master Brawler',
    icon: 'Ability_224',
    // Outgoing Damage +<FONT COLOR='#99ff99'>1%</FONT>. Frontal Attack Damage +<FONT COLOR='#99ff99'>3%</FONT>.
    // Outgoing Damage +<FONT COLOR='#99ff99'>3%</FONT>. Frontal Attack Damage +<FONT COLOR='#99ff99'>7%</FONT>.
    // Outgoing Damage +<FONT COLOR='#99ff99'>7%</FONT>. Frontal Attack Damage +<FONT COLOR='#99ff99'>15%</FONT>.
    legacyStats: {
      damageMultiplier: [1.01, 1.03, 1.07],
      frontMultiplier: [1.03, 1.07, 1.15]
    },
    values: [
      {
        base: 3.2,
        epic: [0.2, 0.4, 0.6, 0.8],
        legendary: [0.2, 0.4, 0.6, 0.8],
        relic: [0.7, 1.4, 2.1, 2.8],
        stone: [2.7, 3.4, 4.7, 5.4]
      },
      {
        base: 9,
        epic: [0.75, 1.5, 2.25, 3],
        legendary: [0.75, 1.5, 2.25, 3]
      }
    ],
    // Outgoing Damage +<FONT COLOR='#99ff99'>3.40%</FONT>. Frontal Attack Damage +<FONT COLOR='#99ff99'>9.75%</FONT>.
    stats: (values) => ({
      damageMultiplier: 1 + values[0] / 100,
      frontMultiplier: 1 + values[1] / 100
    })
  },
  295: {
    name: 'Mass Increase',
    icon: 'Ability_231',
    // Atk. Speed -<FONT COLOR='#ff9999'>10%</FONT>. Outgoing Damage +<FONT COLOR='#99ff99'>4%</FONT>.
    // Atk. Speed -<FONT COLOR='#ff9999'>10%</FONT>. Outgoing Damage +<FONT COLOR='#99ff99'>10%</FONT>.
    // Atk. Speed -<FONT COLOR='#ff9999'>10%</FONT>. Outgoing Damage +<FONT COLOR='#99ff99'>18%</FONT>.
    legacyStats: {
      attackSpeed: -0.1,
      damageMultiplier: [0.04, 0.1, 0.18]
    },
    values: [
      {
        base: 10,
        epic: [0.75, 1.5, 2.25, 3],
        legendary: [0.75, 1.5, 2.25, 3],
        relic: [0.75, 1.5, 2.25, 3],
        stone: [3, 3.75, 5.25, 6]
      }
    ],
    // Atk. Speed -<FONT COLOR='#ff9999'>10.00%</FONT>. Outgoing Damage +<FONT COLOR='#99ff99'>10.75%</FONT>.
    stats: (values) => ({
      attackSpeed: -0.1,
      damageMultiplier: 1 + values[0] / 100
    })
  },
  296: {
    name: 'Propulsion',
    icon: 'Ability_232',
    // After using a Movement Skill, Damage of skills (excluding Basic Attack and Awakening Skills) +<FONT COLOR='#99ff99'>3%</FONT> for <FONT COLOR='#ffff99'>5s</FONT>.
    // After using a Movement Skill, Damage of skills (excluding Basic Attack and Awakening Skills) +<FONT COLOR='#99ff99'>8%</FONT> for <FONT COLOR='#ffff99'>5s</FONT>.
    // After using a Movement Skill, Damage of skills (excluding Basic Attack and Awakening Skills) +<FONT COLOR='#99ff99'>16%</FONT> for <FONT COLOR='#ffff99'>5s</FONT>.
    legacyStats: {
      bonuses: {
        propulsion: [0.03, 0.08, 0.16]
      }
    },
    values: [
      {
        base: 8,
        epic: [0.75, 1.5, 2.25, 3],
        legendary: [0.75, 1.5, 2.25, 3],
        relic: [0.75, 1.5, 2.25, 3],
        stone: [3, 3.75, 5.25, 6]
      }
    ],
    // After using a Movement Skill, Damage of skills (excluding Basic Attack and Awakening Skills) +<FONT COLOR='#99ff99'>8.75%</FONT> for <FONT COLOR='#ffff99'>5s</FONT>.
    stats: (values) => ({
      bonuses: {
        propulsion: values[0] / 100
      }
    })
  },
  297: {
    name: 'Hit Master',
    icon: 'Ability_233',
    // Damage of attacks other than Back Attack and Frontal Attack +<FONT COLOR='#99ff99'>3%</FONT>. Does not apply to Awakening Skills.
    // Damage of attacks other than Back Attack and Frontal Attack +<FONT COLOR='#99ff99'>8%</FONT>. Does not apply to Awakening Skills.
    // Damage of attacks other than Back Attack and Frontal Attack +<FONT COLOR='#99ff99'>16%</FONT>. Does not apply to Awakening Skills.
    legacyStats: {
      bonuses: {
        hit_master: [0.03, 0.08, 0.16]
      }
    },
    values: [
      {
        base: 8,
        epic: [0.75, 1.5, 2.25, 3],
        legendary: [0.75, 1.5, 2.25, 3],
        relic: [0.75, 1.5, 2.25, 3],
        stone: [3, 3.75, 5.25, 6]
      }
    ],
    // Damage of attacks other than Back Attack and Frontal Attack +<FONT COLOR='#99ff99'>8.75%</FONT>. Does not apply to Awakening Skills.
    stats: (values) => ({
      bonuses: {
        hit_master: values[0] / 100
      }
    })
  },
  298: {
    name: 'Sight Focus',
    icon: 'Ability_234',
    // When "!!!!!" is entered into normal chat, Sight Focus is activated for <FONT COLOR='#ffff99'>6s</FONT>. After the effect is activated, offensive skill Damage +<FONT COLOR='#99ff99'>8%</FONT>. Only half of the effect is applied to Awakening Skills. Does not apply to Basic Attack. Cooldown: <FONT COLOR='#ffff99'>30s</FONT>.
    // When "!!!!!" is entered into normal chat, Sight Focus is activated for <FONT COLOR='#ffff99'>6s</FONT>. After the effect is activated, offensive skill Damage +<FONT COLOR='#99ff99'>16%</FONT>. Only half of the effect is applied to Awakening Skills. Does not apply to Basic Attack. Cooldown: <FONT COLOR='#ffff99'>30s</FONT>.
    // When "!!!!!" is entered into normal chat, Sight Focus is activated for <FONT COLOR='#ffff99'>6s</FONT>. After the effect is activated, offensive skill Damage +<FONT COLOR='#99ff99'>28%</FONT>. Only half of the effect is applied to Awakening Skills. Does not apply to Basic Attack. Cooldown: <FONT COLOR='#ffff99'>30s</FONT>.
    legacyStats: {
      bonuses: {
        sight_focus: [0.08, 0.16, 0.28]
      }
    },
    values: [
      {
        base: 15,
        epic: [1.25, 2.5, 3.75, 5],
        legendary: [1.25, 2.5, 3.75, 5],
        relic: [1.25, 2.5, 3.75, 5],
        stone: [4, 5, 7, 8]
      }
    ],
    // When "!!!!!" is entered into normal chat, Sight Focus is activated for <FONT COLOR='#ffff99'>6s</FONT>. After the effect is activated, offensive skill Damage +<FONT COLOR='#99ff99'>16.25%</FONT>. Only half of the effect is applied to Awakening Skills. Does not apply to Basic Attack. Cooldown: <FONT COLOR='#ffff99'>30s</FONT>.
    stats: (values) => ({
      bonuses: {
        sight_focus: values[0] / 100
      }
    })
  },
  299: {
    name: 'Adrenaline',
    icon: 'Ability_235',
    // After using skills (excluding Movement Skills and Basic Attacks), Atk. Power +<FONT COLOR='#99ff99'>0.3%</FONT> for <FONT COLOR='#ffff99'>6s</FONT>. Stacks up to <FONT COLOR='#ffff99'>6</FONT> times. When max stacks are reached, Crit Rate +<FONT COLOR='#99ff99'>5%</FONT>. If Cooldown reduction due to skill cancel is applied to this effect, it is applied after the end of the skill.
    // After using skills (excluding Movement Skills and Basic Attack), Atk. Power +<FONT COLOR='#99ff99'>0.6%</FONT> for <FONT COLOR='#ffff99'>6s</FONT>. Stacks up to <FONT COLOR='#ffff99'>6</FONT> times. When max stacks are reached, Crit Rate +<FONT COLOR='#99ff99'>10%</FONT>. If Cooldown reduction due to skill cancel is applied to this effect, it is applied after the end of the skill.
    // After using skills (excluding Movement Skills and Basic Attack), Atk. Power +<FONT COLOR='#99ff99'>1%</FONT> for <FONT COLOR='#ffff99'>6s</FONT>. Stacks up to <FONT COLOR='#ffff99'>6</FONT> times. When max stacks are reached, Crit Rate +<FONT COLOR='#99ff99'>15%</FONT>. If Cooldown reduction due to skill cancel is applied to this effect, it is applied after the end of the skill.
    legacyStats: {
      attackPowerBonus: [0.003 * 6, 0.006 * 6, 0.01 * 6],
      critChance: [0.05, 0.1, 0.15]
    },
    values: [
      {
        base: 0.4,
        epic: [0.13, 0.25, 0.38, 0.5],
        stone: [0.48, 0.6, 0.83, 0.95]
      },
      {
        base: 8,
        legendary: [1.5, 3, 4.5, 6],
        relic: [1.5, 3, 4.5, 6]
      }
    ],
    // After using skills (excluding Movement Skills and Basic Attack), Atk. Power +<FONT COLOR='#99ff99'>0.53%</FONT> for <FONT COLOR='#ffff99'>6</FONT>s. Stacks up to <FONT COLOR='#ffff99'>6</FONT> times. When max stacks are reached, Crit Rate +<FONT COLOR='#99ff99'>8.00%</FONT>. If Cooldown reduction due to skill cancel is applied to this effect, it is applied after the end of the skill.
    stats: (values) => ({
      attackPowerBonus: values[0] / 100,
      critChance: values[1] / 100
    })
  },
  300: {
    name: 'All-Out Attack',
    icon: 'Ability_236',
    // Holding and Casting Skill Speed +<FONT COLOR='#99ff99'>5%</FONT>. Damage +<FONT COLOR='#99ff99'>4%</FONT>.
    // Holding and Casting Skill Speed +<FONT COLOR='#99ff99'>10%</FONT>. Damage +<FONT COLOR='#99ff99'>10%</FONT>.
    // Holding and Casting Skill Speed +<FONT COLOR='#99ff99'>20%</FONT>. Damage +<FONT COLOR='#99ff99'>20%</FONT>.
    legacyStats: {
      bonuses: {
        all_out_attack_speed: [0.05, 0.1, 0.2],
        all_out_attack_damage: [0.04, 0.1, 0.2]
      }
    },
    values: [
      {
        base: 12,
        epic: [1, 2, 3, 4],
        legendary: [1, 2, 3, 4]
      },
      {
        base: 14,
        epic: [0.5, 1, 1.5, 2],
        legendary: [0.5, 1, 1.5, 2],
        relic: [0.75, 1.5, 2.25, 3],
        stone: [3, 3.75, 5.25, 6]
      }
    ],
    // Holding and Casting Skill Speed +<FONT COLOR='#99ff99'>13.00%</FONT>. Damage +<FONT COLOR='#99ff99'>14.50%</FONT>.
    stats: (values) => ({
      bonuses: {
        all_out_attack_speed: values[0] / 100,
        all_out_attack_damage: values[1] / 100
      }
    })
  },
  301: {
    name: 'Expert',
    icon: 'Ability_237',
    // Shield and Healing effectiveness on all Party Members +<FONT COLOR='#99ff99'>6%</FONT>. If target's HP is <FONT COLOR='#ffff99'>50%</FONT> or lower, +<FONT COLOR='#99ff99'>3%</FONT> additional effectiveness.
    // Shield and Healing effectiveness on all Party Members +<FONT COLOR='#99ff99'>14%</FONT>. If target's HP is <FONT COLOR='#ffff99'>50%</FONT> or lower, +<FONT COLOR='#99ff99'>7%</FONT> additional effectiveness.
    // Shield and Healing effectiveness on all Party Members +<FONT COLOR='#99ff99'>24%</FONT>. If target's HP is <FONT COLOR='#ffff99'>50%</FONT> or lower, +<FONT COLOR='#99ff99'>12%</FONT> additional effectiveness.
    legacyStats: {},
    values: [
      {
        base: 16,
        epic: [1, 2, 3, 4],
        legendary: [1, 2, 3, 4],
        relic: [1, 2, 3, 4]
      },
      {
        base: 8,
        stone: [4, 5, 7, 8]
      }
    ]
    // Shield and Healing effectiveness on all Party Members +<FONT COLOR='#99ff99'>17.00%</FONT>. If target's HP is <FONT COLOR='#ffff99'>50%</FONT> or lower, +<FONT COLOR='#99ff99'>8.00%</FONT> additional effectiveness.
  },
  302: {
    name: 'Emergency Rescue',
    icon: 'Ability_238',
    // When HP falls below <FONT COLOR='#ffff99'>30%</FONT>, gain a shield equal to <FONT COLOR='#99ff99'>20%</FONT> of Max HP for <FONT COLOR='#ffff99'>6s</FONT>. If the shield is not destroyed after 6s, recover <FONT COLOR='#99ff99'>50%</FONT> of the remaining shield as HP. (Cooldown: <FONT COLOR='#ffff99'>300s</FONT>.)
    // When HP falls below <FONT COLOR='#ffff99'>30%</FONT>, gain a shield equal to <FONT COLOR='#99ff99'>30%</FONT> of Max HP for <FONT COLOR='#ffff99'>6s</FONT>. If the shield is not destroyed after 6s, recover <FONT COLOR='#99ff99'>50%</FONT> of the remaining shield as HP. (Cooldown: <FONT COLOR='#ffff99'>240s</FONT>.)
    // When HP falls below <FONT COLOR='#ffff99'>30%</FONT>, gain a shield equal to <FONT COLOR='#99ff99'>50%</FONT> of Max HP for <FONT COLOR='#ffff99'>6s</FONT>. If the shield is not destroyed after 6s, recover <FONT COLOR='#99ff99'>50%</FONT> of the remaining shield as HP. (Cooldown: <FONT COLOR='#ffff99'>180s</FONT>.)
    legacyStats: {},
    values: [
      {
        base: 240,
        legendary: [-10, -20, -30, -40],
        relic: [-10, -20, -30, -40]
      },
      {
        base: 34,
        epic: [4, 8, 12, 16],
        stone: [16, 20, 28, 32]
      }
    ]
    // When HP falls below <FONT COLOR='#ffff99'>30%</FONT>, gain a shield equal to <FONT COLOR='#99ff99'>38.00%</FONT> of Max HP for <FONT COLOR='#ffff99'>6s</FONT>. If the shield is not destroyed after 6s, recover <FONT COLOR='#99ff99'>50%</FONT> of the remaining shield as HP. (Cooldown: <FONT COLOR='#ffff99'>240</FONT>s.)
  },
  303: {
    name: 'Precise Dagger',
    icon: 'Ability_239',
    // Crit Rate +<FONT COLOR='#99ff99'>4%</FONT>. Crit Damage -<FONT COLOR='#ff9999'>6%</FONT>.
    // Crit Rate +<FONT COLOR='#99ff99'>10%</FONT>. Crit Damage -<FONT COLOR='#ff9999'>6%</FONT>.
    // Crit Rate +<FONT COLOR='#99ff99'>20%</FONT>. Crit Damage -<FONT COLOR='#ff9999'>6%</FONT>.
    legacyStats: {
      critChance: [0.04, 0.1, 0.2],
      critDamage: -0.06
    },
    values: [
      {
        base: 12,
        epic: [0.75, 1.5, 2.25, 3],
        legendary: [0.75, 1.5, 2.25, 3],
        relic: [0.75, 1.5, 2.25, 3],
        stone: [3, 3.75, 5.25, 6]
      }
    ],
    // Crit Rate +<FONT COLOR='#99ff99'>12.75%</FONT>. Crit Damage -<FONT COLOR='#ff9999'>6.00%</FONT>.
    stats: (values) => ({
      critChance: values[0] / 100,
      critDamage: -0.06
    })
  },
  125: {
    name: 'Mayhem',
    icon: 'Ability_270',
    class: 'berserker',
    // Fury Meter remains at max and turns into Mayhem Mode with the power of darkness. Mayhem Mode: Outgoing Damage +<FONT COLOR='#99ff99'>3%</FONT>, Atk. and Move Speed +<FONT COLOR='#99ff99'>15%</FONT>, all incoming Damage -<FONT COLOR='#99ff99'>72%</FONT>. When Mayhem Mode activates, HP is reduced to <FONT COLOR='#ff9999'>25%</FONT> of Max HP; this cannot be exceeded even when healing is applied. Can only receive <FONT COLOR='#ff9999'>40%</FONT> of healing and <FONT COLOR='#ff9999'>25%</FONT> of shield. Press the <FONT COLOR='#ffff99'>0</FONT> key to cancel Mayhem Mode and recover <FONT COLOR='#99ff99'>25%</FONT> of Max HP; cannot enter Mayhem Mode again for <FONT COLOR='#ffff99'>30s</FONT>.
    // Fury Meter remains at max and turns into Mayhem Mode with the power of darkness. Mayhem Mode: Outgoing Damage +<FONT COLOR='#99ff99'>8%</FONT>, Atk. and Move Speed +<FONT COLOR='#99ff99'>15%</FONT>, all incoming Damage -<FONT COLOR='#99ff99'>72%</FONT>. When Mayhem Mode activates, HP is reduced to <FONT COLOR='#ff9999'>25%</FONT> of Max HP; this cannot be exceeded even when healing is applied. Can only receive <FONT COLOR='#ff9999'>40%</FONT> of healing and <FONT COLOR='#ff9999'>25%</FONT> of shield. Press the <FONT COLOR='#ffff99'>0</FONT> key to cancel Mayhem Mode and recover <FONT COLOR='#99ff99'>25%</FONT> of Max HP; cannot enter Mayhem Mode again for <FONT COLOR='#ffff99'>30s</FONT>.
    // Fury Meter remains at max and turns into Mayhem Mode with the power of darkness. Mayhem Mode: Outgoing Damage +<FONT COLOR='#99ff99'>18%</FONT>, Atk. and Move Speed +<FONT COLOR='#99ff99'>15%</FONT>, all incoming Damage -<FONT COLOR='#99ff99'>72%</FONT>. When Mayhem Mode activates, HP is reduced to <FONT COLOR='#ff9999'>25%</FONT> of Max HP; this cannot be exceeded even when healing is applied. Can only receive <FONT COLOR='#ff9999'>40%</FONT> of healing and <FONT COLOR='#ff9999'>25%</FONT> of shield. Press the <FONT COLOR='#ffff99'>0</FONT> key to cancel Mayhem Mode and recover <FONT COLOR='#99ff99'>25%</FONT> of Max HP; cannot enter Mayhem Mode again for <FONT COLOR='#ffff99'>30s</FONT>.
    legacyStats: {}
  },
  188: {
    name: 'Berserker Technique',
    icon: 'Ability_269',
    class: 'berserker',
    // During Burst, Outgoing Damage +<FONT COLOR='#99ff99'>16%</FONT>. After Burst, Exhaustion does not occur.
    // During Burst, Outgoing Damage +<FONT COLOR='#99ff99'>25%</FONT>. After Burst, Exhaustion does not occur.
    // During Burst, Outgoing Damage +<FONT COLOR='#99ff99'>36%</FONT>. After Burst, Exhaustion does not occur.
    legacyStats: {}
  },
  129: {
    name: 'Enhanced Weapon',
    icon: 'Ability_242',
    class: 'devilhunter',
    // Changing Stances enhances your weapon. Crit Rate +<FONT COLOR='#99ff99'>20%</FONT> for <FONT COLOR='#ffff99'>9s</FONT>.
    // Changing Stances enhances your weapon. Crit Rate +<FONT COLOR='#99ff99'>25%</FONT> for <FONT COLOR='#ffff99'>9s</FONT>.
    // Changing Stances enhances your weapon. Crit Rate +<FONT COLOR='#99ff99'>30%</FONT> for <FONT COLOR='#ffff99'>9s</FONT>.
    legacyStats: {}
  },
  192: {
    name: 'Pistoleer',
    icon: 'Buff_600',
    class: 'devilhunter',
    // Can only use Handgun Stance. Handgun Skill Damage +<FONT COLOR='#99ff99'>35%</FONT>. Awakening Skill Clay Bombardment Damage +<FONT COLOR='#99ff99'>20%</FONT>. Stagger Damage +<FONT COLOR='#99ff99'>40%</FONT>. Movement Skill is replaced with Relentless Assault. Each hit with the Handgun Skill decreases the Cooldown of Movement Skill by <FONT COLOR='#99ff99'>0.1s</FONT>.
    // Can only use Handgun Stance. Handgun Skill Damage +<FONT COLOR='#99ff99'>55%</FONT>. Awakening Skill Clay Bombardment Damage +<FONT COLOR='#99ff99'>35%</FONT>. Stagger Damage +<FONT COLOR='#99ff99'>40%</FONT>. Also, Movement Skill is replaced with Relentless Assault. Each hit with the Handgun Skill decreases the Cooldown of Movement Skill by <FONT COLOR='#99ff99'>0.1s</FONT>.
    // Can only use Handgun Stance. Handgun Skill Damage +<FONT COLOR='#99ff99'>75%</FONT>. Awakening Skill Clay Bombardment Damage +<FONT COLOR='#99ff99'>50%</FONT>. Stagger Damage +<FONT COLOR='#99ff99'>40%</FONT>. Also, Movement Skill is replaced with Relentless Assault. Each hit with the Handgun Skill decreases the Cooldown of Movement Skill by <FONT COLOR='#99ff99'>0.1s</FONT>.
    legacyStats: {}
  },
  130: {
    name: 'Firepower Enhancement',
    icon: 'Ability_271',
    class: 'blaster',
    // If Firepower Level <FONT COLOR='#ffff99'>1</FONT> or more, Overheat is triggered. Normal Skill Damage +<FONT COLOR='#99ff99'>7%</FONT> and Firepower Meter duration +<FONT COLOR='#ffff99'>10s</FONT>. When not in Barrage Mode, incoming Damage -<FONT COLOR='#99ff99'>5%</FONT>.
    // If Firepower Level <FONT COLOR='#ffff99'>1</FONT> or more, Overheat is triggered. Normal Skill Damage +<FONT COLOR='#99ff99'>14%</FONT> and Firepower Meter duration +<FONT COLOR='#ffff99'>12s</FONT>. When not in Barrage Mode, incoming Damage -<FONT COLOR='#99ff99'>10%</FONT>.
    // If Firepower Level <FONT COLOR='#ffff99'>1</FONT> or more, Overheat is triggered. Normal Skill Damage +<FONT COLOR='#99ff99'>28%</FONT> and Firepower Meter duration +<FONT COLOR='#ffff99'>14s</FONT>. When not in Barrage Mode, incoming Damage -<FONT COLOR='#99ff99'>15%</FONT>.
    legacyStats: {}
  },
  193: {
    name: 'Barrage Enhancement',
    icon: 'GL_Skill_01_26',
    class: 'blaster',
    // Barrage Skill Damage +<FONT COLOR='#99ff99'>5%</FONT>. Barrage Skill Crit Rate +<FONT COLOR='#99ff99'>20%</FONT>. Barrage Meter Gain +<FONT COLOR='#99ff99'>30%</FONT>. Does not enter a cooling state. Gain <FONT COLOR='#99ff99'>70%</FONT> Firepower Meter upon entering Barrage Mode.
    // Barrage Skill Damage +<FONT COLOR='#99ff99'>12%</FONT>. Barrage Skill Crit Rate +<FONT COLOR='#99ff99'>30%</FONT>. Barrage Meter Gain +<FONT COLOR='#99ff99'>30%</FONT>. Does not enter a cooling state. Gain <FONT COLOR='#99ff99'>70%</FONT> Firepower Meter upon entering Barrage Mode.
    // Barrage Skill Damage +<FONT COLOR='#99ff99'>20%</FONT>. Barrage Skill Crit Rate +<FONT COLOR='#99ff99'>40%</FONT>. Barrage Meter Gain +<FONT COLOR='#99ff99'>30%</FONT>. Does not enter a cooling state. Gain <FONT COLOR='#99ff99'>70%</FONT> Firepower Meter upon entering Barrage Mode.
    legacyStats: {}
  },
  224: {
    name: 'Combat Readiness',
    icon: 'Ability_266',
    class: 'warlord',
    // Normal skills Damage +<FONT COLOR='#99ff99'>25%</FONT>. Shield Amount +<FONT COLOR='#99ff99'>30%</FONT> in Defensive Stance. Damage +<FONT COLOR='#99ff99'>2%</FONT> for <FONT COLOR='#ffff99'>10s</FONT> when hit and when hitting foes while in Defensive Stance (stacks up to <FONT COLOR='#ffff99'>3</FONT> times, once every <FONT COLOR='#ffff99'>1s</FONT>).
    // Normal skills Damage +<FONT COLOR='#99ff99'>27.5%</FONT>. Shield Amount +<FONT COLOR='#99ff99'>40%</FONT> in Defensive Stance. Damage +<FONT COLOR='#99ff99'>3%</FONT> for <FONT COLOR='#ffff99'>10s</FONT> when hit and when hitting foes while in Defensive Stance (stacks up to <FONT COLOR='#ffff99'>3</FONT> times, once every <FONT COLOR='#ffff99'>1s</FONT>).
    // Normal skills Damage +<FONT COLOR='#99ff99'>30%</FONT>. Shield Amount +<FONT COLOR='#99ff99'>50%</FONT> in Defensive Stance. Damage +<FONT COLOR='#99ff99'>4%</FONT> for <FONT COLOR='#ffff99'>10s</FONT> when hit and when hitting foes while in Defensive Stance (stacks up to <FONT COLOR='#ffff99'>3</FONT> times, once every <FONT COLOR='#ffff99'>1s</FONT>).
    legacyStats: {}
  },
  225: {
    name: 'Lone Knight',
    icon: 'Ability_267',
    class: 'warlord',
    // Gunlance skill Damage and Crit Rate +<FONT COLOR='#99ff99'>5%</FONT>. Crit Damage +<FONT COLOR='#99ff99'>30%</FONT>. Battlefield Shield cannot be used. Consumption of the Shield Meter during Defensive Stance +<FONT COLOR='#ff9999'>100%</FONT>.
    // Gunlance skill Damage and Crit Rate +<FONT COLOR='#99ff99'>10%</FONT>. Crit Damage +<FONT COLOR='#99ff99'>40%</FONT>. Battlefield Shield cannot be used. Consumption of the Shield Meter during Defensive Stance +<FONT COLOR='#ff9999'>100%</FONT>.
    // Gunlance skill Damage and Crit Rate +<FONT COLOR='#99ff99'>15%</FONT>. Crit Damage +<FONT COLOR='#99ff99'>50%</FONT>. Battlefield Shield cannot be used. Consumption of the Shield Meter during Defensive Stance +<FONT COLOR='#ff9999'>100%</FONT>.
    legacyStats: {}
  },
  127: {
    name: 'Esoteric Skill Enhancement',
    icon: 'Buff_238',
    class: 'battlemaster',
    // Max number of Esoteric Orbs +<FONT COLOR='#ffff99'>1</FONT>. Esoteric Skills inflict +<FONT COLOR='#99ff99'>8%</FONT> Damage per Esoteric Orb you have.
    // Max number of Esoteric Orbs +<FONT COLOR='#ffff99'>1</FONT>. Esoteric Skills inflict +<FONT COLOR='#99ff99'>10%</FONT> Damage per Esoteric Orb you have.
    // Max number of Esoteric Orbs +<FONT COLOR='#ffff99'>1</FONT>. Esoteric Skills inflict +<FONT COLOR='#99ff99'>12%</FONT> Damage per Esoteric Orb you have.
    legacyStats: {}
  },
  189: {
    name: 'First Intention',
    icon: 'Ability_25',
    class: 'battlemaster',
    // Damage to foes +<FONT COLOR='#99ff99'>30%</FONT>, but you can no longer gain Esoteric Meter.
    // Damage to foes +<FONT COLOR='#99ff99'>40%</FONT>, but you can no longer gain Esoteric Meter.
    // Damage to foes +<FONT COLOR='#99ff99'>50%</FONT>, but you can no longer gain Esoteric Meter.
    legacyStats: {}
  },
  190: {
    name: 'Ultimate Skill: Taijutsu',
    icon: 'achieve_07_22',
    class: 'infighter',
    // Natural recovery speed of Stamina Energy +<FONT COLOR='#99ff99'>300%</FONT>. Stamina Skill Damage +<FONT COLOR='#99ff99'>25%</FONT>. Shock Skill Damage -<FONT COLOR='#ff9999'>30%</FONT>. Gain <FONT COLOR='#99ff99'>3</FONT> Tenacious Power when using Stamina Skills. Gain Paralysis Immunity in Tenacity Release state.
    // Natural recovery speed of Stamina Energy +<FONT COLOR='#99ff99'>450%</FONT>. Stamina Skill Damage +<FONT COLOR='#99ff99'>35%</FONT>. Shock Skill Damage -<FONT COLOR='#ff9999'>30%</FONT>. Gain <FONT COLOR='#99ff99'>4</FONT> Tenacious Power when using Stamina Skills. Gain Paralysis Immunity in Tenacity Release state.
    // Natural recovery speed of Stamina Energy +<FONT COLOR='#99ff99'>600%</FONT>. Stamina Skill Damage +<FONT COLOR='#99ff99'>45%</FONT>. Shock Skill Damage -<FONT COLOR='#ff9999'>30%</FONT>. Gain <FONT COLOR='#99ff99'>5</FONT> Tenacious Power when using Stamina Skills. Gain Paralysis Immunity in Tenacity Release state.
    legacyStats: {}
  },
  191: {
    name: 'Shock Training',
    icon: 'Buff_177',
    class: 'infighter',
    // Shock Skill Damage +<FONT COLOR='#99ff99'>10%</FONT> and <FONT COLOR='#99ff99'>5%</FONT> of Shock Energy consumed upon using Shock Skill will be returned. Atk. Speed +<FONT COLOR='#99ff99'>20%</FONT> in Tenacity Release status, but duration decreases by <FONT COLOR='#ffff99'>5s</FONT>.
    // Shock Skill Damage +<FONT COLOR='#99ff99'>15%</FONT> and <FONT COLOR='#99ff99'>10%</FONT> of Shock Energy consumed upon using Shock Skill will be returned. Atk. Speed +<FONT COLOR='#99ff99'>20%</FONT> in Tenacity Release status, but duration decreases by <FONT COLOR='#ffff99'>5s</FONT>.
    // Shock Skill Damage +<FONT COLOR='#99ff99'>20%</FONT> and <FONT COLOR='#99ff99'>20%</FONT> of Shock Energy consumed upon using Shock Skill will be returned. Atk. Speed +<FONT COLOR='#99ff99'>20%</FONT> in Tenacity Release status, but duration decreases by <FONT COLOR='#ffff99'>5s</FONT>.
    legacyStats: {}
  },
  194: {
    name: 'True Courage',
    icon: 'Ability_275',
    class: 'bard',
    // Outgoing Damage from Serenade of Courage +<FONT COLOR='#99ff99'>10%</FONT> and Crit Rate +<FONT COLOR='#99ff99'>10%</FONT>.
    // Outgoing Damage from Serenade of Courage +<FONT COLOR='#99ff99'>15%</FONT> and Crit Rate +<FONT COLOR='#99ff99'>10%</FONT>.
    // Outgoing Damage from Serenade of Courage +<FONT COLOR='#99ff99'>20%</FONT> and Crit Rate +<FONT COLOR='#99ff99'>10%</FONT>.
    legacyStats: {}
  },
  195: {
    name: 'Desperate Salvation',
    icon: 'Ability_276',
    class: 'bard',
    // When the recovery effect ends, an additional recovery effect is activated, recovering <FONT COLOR='#99ff99'>8%</FONT> of your Max HP.
    // When the recovery effect ends, an additional recovery effect is activated, recovering <FONT COLOR='#99ff99'>16%</FONT> of your Max HP.
    // When the recovery effect ends, an additional recovery effect is activated, recovering <FONT COLOR='#99ff99'>24%</FONT> of your Max HP.
    legacyStats: {}
  },
  196: {
    name: 'Rage Hammer',
    icon: 'achieve_08_49',
    class: 'destroyer',
    // When using a Gravity Release Skill, Crit Rate +<FONT COLOR='#99ff99'>3%</FONT> and Crit Damage +<FONT COLOR='#99ff99'>6%</FONT> based on the amount of Cores used.
    // When using a Gravity Release Skill, Crit Rate +<FONT COLOR='#99ff99'>4%</FONT> and Crit Damage +<FONT COLOR='#99ff99'>12%</FONT> based on the amount of Cores used.
    // When using a Gravity Release Skill, Crit Rate +<FONT COLOR='#99ff99'>5%</FONT> and Crit Damage +<FONT COLOR='#99ff99'>18%</FONT> based on the amount of Cores used.
    legacyStats: {}
  },
  197: {
    name: 'Gravity Training',
    icon: 'Ability_268',
    class: 'destroyer',
    // Gravity Meter +<FONT COLOR='#99ff99'>20%</FONT> upon using Gravity Release Skill. In Hypergravity Mode, Crit Rate of basic attacks and Vortex Gravity +<FONT COLOR='#99ff99'>10%</FONT>. Outgoing Damage +<FONT COLOR='#99ff99'>4%</FONT>. When the Hypergravity Skill hits the same foe <FONT COLOR='#ffff99'>3</FONT> times, cause a Gravity Shock that inflicts additional Damage. Damage inflicted by Gravity Shock is influenced by Hypergravity Skill Damage.
    // Gravity Meter +<FONT COLOR='#99ff99'>45%</FONT> upon using Gravity Release Skill. In Hypergravity Mode, Crit Rate of basic attacks and Vortex Gravity +<FONT COLOR='#99ff99'>20%</FONT>. Outgoing Damage +<FONT COLOR='#99ff99'>10%</FONT>. When the Hypergravity Skill hits the same foe <FONT COLOR='#ffff99'>3</FONT> times, cause a Gravity Shock that inflicts additional Damage. Damage inflicted by Gravity Shock is influenced by Hypergravity Skill Damage.
    // Gravity Meter +<FONT COLOR='#99ff99'>70%</FONT> upon using Gravity Release Skill. In Hypergravity Mode, Crit Rate of basic attacks and Vortex Gravity +<FONT COLOR='#99ff99'>30%</FONT>. Outgoing Damage +<FONT COLOR='#99ff99'>20%</FONT>. When the Hypergravity Skill hits the same foe <FONT COLOR='#ffff99'>3</FONT> times, cause a Gravity Shock that inflicts additional Damage. Damage inflicted by Gravity Shock is influenced by Hypergravity Skill Damage.
    legacyStats: {}
  },
  198: {
    name: 'Master Summoner',
    icon: 'Buff_78',
    class: 'summoner',
    // Enhances the Ancient Elemental Skill. Elemental Orb cost -<FONT COLOR='#ffff99'>1</FONT>. Normal Skill Damage and Ancient Elemental Skill Damage +<FONT COLOR='#99ff99'>2%</FONT> and Crit Rate +<FONT COLOR='#99ff99'>3%</FONT>.
    // Enhances the Ancient Elemental Skill. Elemental Orb cost -<FONT COLOR='#ffff99'>1</FONT>. Normal Skill Damage and Ancient Elemental Skill Damage +<FONT COLOR='#99ff99'>10%</FONT> and Crit Rate +<FONT COLOR='#99ff99'>8%</FONT>.
    // Enhances the Ancient Elemental Skill. Elemental Orb cost -<FONT COLOR='#ffff99'>1</FONT>. Normal Skill Damage and Ancient Elemental Skill Damage +<FONT COLOR='#99ff99'>20%</FONT> and Crit Rate +<FONT COLOR='#99ff99'>16%</FONT>.
    legacyStats: {}
  },
  199: {
    name: 'Communication Overflow',
    icon: 'Ability_274',
    class: 'summoner',
    // Maririn, Pauru, Elcid, Shurdi, Igna, and Kelsion: Summoning Duration +<FONT COLOR='#99ff99'>5%</FONT>, Damage +<FONT COLOR='#99ff99'>15%</FONT>, Atk./Move Speed +<FONT COLOR='#99ff99'>3%</FONT>, and Command Skill Cooldown -<FONT COLOR='#99ff99'>3%</FONT>.
    // Maririn, Pauru, Elcid, Shurdi, Igna, and Kelsion: Summoning Duration +<FONT COLOR='#99ff99'>10%</FONT>, Damage +<FONT COLOR='#99ff99'>25%</FONT>, Atk./Move Speed +<FONT COLOR='#99ff99'>6%</FONT>, and Command Skill Cooldown -<FONT COLOR='#99ff99'>6%</FONT>.
    // Maririn, Pauru, Elcid, Shurdi, Igna, and Kelsion: Summoning Duration +<FONT COLOR='#99ff99'>20%</FONT>, Damage +<FONT COLOR='#99ff99'>35%</FONT>, Atk./Move Speed +<FONT COLOR='#99ff99'>10%</FONT>, and Command Skill Cooldown -<FONT COLOR='#99ff99'>10%</FONT>.
    legacyStats: {}
  },
  200: {
    name: 'Grace of the Empress',
    icon: 'Ability_272',
    class: 'arcana',
    // <FONT COLOR='#ffff99'>4-stack</FONT> Ruin Skill Damage +<FONT COLOR='#99ff99'>20%</FONT>. When Ruin hits, recover <FONT COLOR='#99ff99'>30%</FONT> of consumed MP.
    // <FONT COLOR='#ffff99'>4-stack</FONT> Ruin Skill Damage +<FONT COLOR='#99ff99'>25%</FONT>. When Ruin hits, recover <FONT COLOR='#99ff99'>30%</FONT> of consumed MP.
    // <FONT COLOR='#ffff99'>4-stack</FONT> Ruin Skill Damage +<FONT COLOR='#99ff99'>30%</FONT>. When Ruin hits, recover <FONT COLOR='#99ff99'>30%</FONT> of consumed MP.
    legacyStats: {}
  },
  201: {
    name: 'Order of the Emperor',
    icon: 'Ability_273',
    class: 'arcana',
    // Adds Emperor Cards to the Card Deck. Balance and Judgment Cards are replaced with Chancellor and Sovereign Cards. Normal Skill Damage +<FONT COLOR='#99ff99'>25%</FONT>.
    // Adds Emperor Cards to the Card Deck. Balance and Judgment Cards are replaced with Chancellor and Sovereign Cards. Normal Skill Damage +<FONT COLOR='#99ff99'>35%</FONT>. Emperor Card Damage +<FONT COLOR='#99ff99'>30%</FONT>.
    // Adds Emperor Cards to the Card Deck. Balance and Judgment Cards are replaced with Chancellor and Sovereign Cards. Normal Skill Damage <FONT COLOR='#99ff99'>+45%</FONT>. Emperor Card Damage <FONT COLOR='#99ff99'>+80%</FONT>.
    legacyStats: {}
  },
  256: {
    name: 'Energy Overflow',
    icon: 'Buff_235',
    class: 'forcemaster',
    // Energy does not go below <FONT COLOR='#ffff99'>1</FONT>, but additional Energy Recovery effect is not applied during Hype or Combat Resource Recovery. If Energy is <FONT COLOR='#ffff99'>30%</FONT> or below, Damage to foes +<FONT COLOR='#99ff99'>5%</FONT>.
    // Energy does not go below <FONT COLOR='#ffff99'>1</FONT>, but additional Energy Recovery effect is not applied during Hype or Combat Resource Recovery. If Energy is <FONT COLOR='#ffff99'>30%</FONT> or below, Damage to foes +<FONT COLOR='#99ff99'>10%</FONT>.
    // Energy does not go below <FONT COLOR='#ffff99'>1</FONT>, but additional Energy Recovery effect is not applied during Hype or Combat Resource Recovery. If Energy is <FONT COLOR='#ffff99'>30%</FONT> or below, Damage to foes +<FONT COLOR='#99ff99'>18%</FONT>.
    legacyStats: {}
  },
  257: {
    name: 'Robust Spirit',
    icon: 'Ability_45',
    class: 'forcemaster',
    // Awakening Skill Damage +<FONT COLOR='#99ff99'>5%</FONT>. When using Hype, enter level <FONT COLOR='#ffff99'>3</FONT> immediately. While in Hype Mode, Energy recovery speed +<FONT COLOR='#99ff99'>300%</FONT>, Damage +<FONT COLOR='#99ff99'>20%</FONT>.
    // Awakening Skill Damage +<FONT COLOR='#99ff99'>10%</FONT>. When using Hype, enter level <FONT COLOR='#ffff99'>3</FONT> immediately. While in Hype Mode, Energy recovery speed +<FONT COLOR='#99ff99'>300%</FONT>, Damage +<FONT COLOR='#99ff99'>30%</FONT>.
    // Awakening Skill Damage +<FONT COLOR='#99ff99'>20%</FONT>. When using Hype, enter level <FONT COLOR='#ffff99'>3</FONT> immediately. While in Hype Mode, Energy recovery speed +<FONT COLOR='#99ff99'>300%</FONT>, Damage +<FONT COLOR='#99ff99'>40%</FONT>.
    legacyStats: {}
  },
  258: {
    name: 'Loyal Companion',
    icon: 'Ability_47',
    class: 'hawkeye',
    // Summons Silverhawk MK-II, allowing Move Speed <FONT COLOR='#99ff99'>+4%</FONT>, Silverhawk's Crit Rate <FONT COLOR='#99ff99'>+10%</FONT>, Basic AoE Radius <FONT COLOR='#99ff99'>+60%</FONT>, and Silverhawk's Summoning Duration <FONT COLOR='#99ff99'>+30%</FONT>. On Basic Attack or Wings of Storm hit, foes get a Mark of Death. Outgoing Damage <FONT COLOR='#99ff99'>+4%</FONT>. Additionally, when Silverhawk is summoned Atk. Power <FONT COLOR='#99ff99'>+2%</FONT>.
    // Summons Silverhawk MK-II, allowing Move Speed +<FONT COLOR='#99ff99'>4%</FONT>, Silverhawk's Crit Rate +<FONT COLOR='#99ff99'>20%</FONT>, Basic AoE Radius +<FONT COLOR='#99ff99'>60%</FONT>, and Silverhawk's Summoning Duration +<FONT COLOR='#99ff99'>60%</FONT>. On Basic Attack or Wings of Storm hit, foes get a Mark of Death. Outgoing Damage +<FONT COLOR='#99ff99'>8%</FONT>. Additionally, when Silverhawk is summoned Atk. Power +<FONT COLOR='#99ff99'>5%</FONT>.
    // Summons Silverhawk MK-II, allowing Move Speed +<FONT COLOR='#99ff99'>4%</FONT>, Silverhawk's Crit Rate +<FONT COLOR='#99ff99'>40%</FONT>, Basic AoE Radius +<FONT COLOR='#99ff99'>60%</FONT>, and Silverhawk's Summoning Duration +<FONT COLOR='#99ff99'>100%</FONT>. On Basic Attack or Wings of Storm hit, foes get a Mark of Death. Outgoing Damage +<FONT COLOR='#99ff99'>15%</FONT>. Additionally, when Silverhawk is summoned, Atk. Power +<FONT COLOR='#99ff99'>10%</FONT>.
    legacyStats: {}
  },
  259: {
    name: 'Death Strike',
    icon: 'Buff_245',
    class: 'hawkeye',
    // On hit, outgoing Damage +<FONT COLOR='#99ff99'>3%</FONT> if Silverhawk isn't summoned. When using Last Rush, recover <FONT COLOR='#99ff99'>50%</FONT> of the remaining Hawk Meter. Adds Mark of Death II to hit targets, increasing their incoming Damage by <FONT COLOR='#99ff99'>20%</FONT> for <FONT COLOR='#ffff99'>8s</FONT>.
    // On hit, outgoing Damage +<FONT COLOR='#99ff99'>7%</FONT> if Silverhawk isn't summoned. When using Last Rush, recover <FONT COLOR='#99ff99'>50%</FONT> of the remaining Hawk Meter. Adds Mark of Death II to hit targets, increasing their incoming Damage by <FONT COLOR='#99ff99'>25%</FONT> for <FONT COLOR='#ffff99'>8s</FONT>.
    // On hit, outgoing Damage +<FONT COLOR='#99ff99'>12%</FONT> if Silverhawk isn't summoned. When using Last Rush, recover <FONT COLOR='#99ff99'>50%</FONT> of the remaining Hawk Meter. Adds Mark of Death II to hit targets, increasing their incoming Damage by <FONT COLOR='#99ff99'>30%</FONT> for <FONT COLOR='#ffff99'>8s</FONT>.
    legacyStats: {}
  },
  276: {
    name: 'Pinnacle',
    icon: 'Ability_207',
    class: 'lancemaster',
    // In addition to acquiring Flurry / Focus when switching stance, gain <FONT COLOR='#99ff99'>40%</FONT> of opposite stance's effects.
    // In addition to acquiring Flurry / Focus when switching stance, gain <FONT COLOR='#99ff99'>60%</FONT> of opposite stance's effects.
    // In addition to acquiring Flurry / Focus when switching stance, gain <FONT COLOR='#99ff99'>100%</FONT> of opposite stance's effects.
    legacyStats: {
      bonuses: {
        engraving_glaivier_pinnacle: [1, 2, 3]
      }
    }
  },
  277: {
    name: 'Control',
    icon: 'Ability_208',
    class: 'lancemaster',
    // Cannot use Focus Stance. Flurry Skill Damage +<FONT COLOR='#99ff99'>22%</FONT>, Dual Meter gain +<FONT COLOR='#99ff99'>50%</FONT>. Cooldown of Movement Skills decrease by <FONT COLOR='#99ff99'>2s</FONT> when the Dual Meter is consumed.
    // Cannot use Focus Stance. Flurry Skill Damage +<FONT COLOR='#99ff99'>33%</FONT>, Dual Meter gain +<FONT COLOR='#99ff99'>75%</FONT>. Cooldown of Movement Skills decrease by <FONT COLOR='#99ff99'>2s</FONT> when the Dual Meter is consumed.
    // Cannot use Focus Stance. Flurry Skill Damage +<FONT COLOR='#99ff99'>44%</FONT>, Dual Meter gain +<FONT COLOR='#99ff99'>100%</FONT>. Cooldown of Movement Skills decrease by <FONT COLOR='#99ff99'>2s</FONT> when the Dual Meter is consumed.
    legacyStats: {
      bonuses: {
        engraving_glaivier_control: [1, 2, 3]
      }
    }
  },
  278: {
    name: 'Remaining Energy',
    icon: 'Ability_209',
    class: 'blade',
    // Deathblade Surge skill Damage -<FONT COLOR='#ff9999'>30%</FONT>. When Art is activated, Death Orb is immediately consumed to activate Deathblade Surge. Atk. Power and Move Speed +<FONT COLOR='#99ff99'>6%</FONT>, Atk. Power +<FONT COLOR='#99ff99'>10%</FONT>, +<FONT COLOR='#99ff99'>20%</FONT>, +<FONT COLOR='#99ff99'>30%</FONT> for <FONT COLOR='#ffff99'>30s</FONT> according to the number of Death Orbs consumed.
    // Deathblade Surge skill Damage -<FONT COLOR='#ff9999'>30%</FONT>. When Art is activated, Death Orb is immediately consumed to activate Deathblade Surge. Atk. Power and Move Speed +<FONT COLOR='#99ff99'>9%</FONT>, Atk. Power +<FONT COLOR='#99ff99'>12%</FONT>, +<FONT COLOR='#99ff99'>24%</FONT>, +<FONT COLOR='#99ff99'>36%</FONT> for <FONT COLOR='#ffff99'>30s</FONT> according to the number of Death Orbs consumed.
    // Deathblade Surge skill Damage -<FONT COLOR='#ff9999'>30%</FONT>. When Art is activated, Death Orb is immediately consumed to activate Deathblade Surge. Atk. Power and Move Speed +<FONT COLOR='#99ff99'>12%</FONT>, Atk. Power +<FONT COLOR='#99ff99'>15%</FONT>, +<FONT COLOR='#99ff99'>30%</FONT>, +<FONT COLOR='#99ff99'>45%</FONT> for <FONT COLOR='#ffff99'>30s</FONT> according to the number of Death Orbs consumed.
    legacyStats: {}
  },
  279: {
    name: 'Surge',
    icon: 'Ability_210',
    class: 'blade',
    // Activates the top level of Deathblade Surge, which unleashes the same powerful Attack regardless of the number of Death Orbs available. When skills other than basic attacks hit while in Death Trance state, Surge Enhancement effects will stack in proportion to the number of hits. This effect increases Damage dealt through Deathblade Surge by up to <FONT COLOR='#99ff99'>40%</FONT>. Damage <FONT COLOR='#99ff99'>doubles</FONT> at the max stack of <FONT COLOR='#ffff99'>60</FONT> stacks. When Death Trance ends, gain up to <FONT COLOR='#99ff99'>100%</FONT> Death Orb Meter according to the number of Surge Enhancement stacks.
    // Activates the top level of Deathblade Surge, which unleashes the same powerful Attack regardless of the number of Death Orbs available. When skills other than basic attacks hit while in Death Trance state, Surge Enhancement effects will stack in proportion to the number of hits. This effect increases Damage dealt through Deathblade Surge by up to <FONT COLOR='#99ff99'>55%</FONT>. Damage <FONT COLOR='#99ff99'>doubles</FONT> at the max stack of <FONT COLOR='#ffff99'>60</FONT> stacks. When Death Trance ends, gain up to <FONT COLOR='#99ff99'>100%</FONT> Death Orb Meter according to the number of Surge Enhancement stacks.
    // Activates the top level of Deathblade Surge, which unleashes the same powerful Attack regardless of the number of Death Orbs available. When skills other than basic attacks hit while in Death Trance state, Surge Enhancement effects will stack in proportion to the number of hits. This effect increases Damage dealt through Deathblade Surge by up to <FONT COLOR='#99ff99'>80%</FONT>. Damage <FONT COLOR='#99ff99'>doubles</FONT> at the max stack of <FONT COLOR='#ffff99'>60</FONT> stacks. When Death Trance ends, gain up to <FONT COLOR='#99ff99'>100%</FONT> Death Orb Meter according to the number of Surge Enhancement stacks.
    legacyStats: {}
  },
  280: {
    name: 'Perfect Suppression',
    icon: 'Ability_211',
    class: 'demonic',
    // Normal Skill Damage +<FONT COLOR='#99ff99'>20%</FONT>. Shadowburst Meter +<FONT COLOR='#99ff99'>50%</FONT> for all skills. Disables Demonize.
    // Normal Skill Damage +<FONT COLOR='#99ff99'>28%</FONT>. Shadowburst Meter +<FONT COLOR='#99ff99'>50%</FONT> for all skills. Disables Demonize.
    // Normal Skill Damage +<FONT COLOR='#99ff99'>36%</FONT>. Shadowburst Meter +<FONT COLOR='#99ff99'>50%</FONT> for all skills. Disables Demonize.
    legacyStats: {}
  },
  281: {
    name: 'Demonic Impulse',
    icon: 'Ability_212',
    class: 'demonic',
    // The Composure effect does not activate when Demonize ends. Upon Demonize, Demon Skill Cooldown is reset (excluding Hyper Awakening Techniques).
    // The Composure effect does not activate when Demonize ends. Upon Demonize, Demon Skill Cooldown is reset (excluding Hyper Awakening Techniques), and Crit Rate +<FONT COLOR='#99ff99'>15%</FONT> while Demonize is active.
    // The Composure effect does not activate when Demonize ends. Upon Demonize, Demon Skill Cooldown is reset (excluding Hyper Awakening Techniques), and Crit Rate +<FONT COLOR='#99ff99'>30%</FONT> while Demonize is active.
    legacyStats: {}
  },
  282: {
    name: 'Judgment',
    icon: 'Ability_214',
    class: 'holyknight',
    // Punish Skill Damage +<FONT COLOR='#99ff99'>15%</FONT>, Sacred Executioner duration +<FONT COLOR='#99ff99'>100%</FONT>.
    // Punish Skill Damage +<FONT COLOR='#99ff99'>22.5%</FONT>, Sacred Executioner duration +<FONT COLOR='#99ff99'>125%</FONT>.
    // Punish Skill Damage +<FONT COLOR='#99ff99'>30%</FONT>, Sacred Executioner duration +<FONT COLOR='#99ff99'>150%</FONT>.
    legacyStats: {}
  },
  283: {
    name: 'Blessed Aura',
    icon: 'Ability_215',
    class: 'holyknight',
    // When using Holy Aura, Damage received -<FONT COLOR='#99ff99'>10%</FONT> and <FONT COLOR='#99ff99'>2%</FONT> of Max HP restored every <FONT COLOR='#ffff99'>2.5s</FONT> for all party members.
    // When using Holy Aura, Damage received -<FONT COLOR='#99ff99'>15%</FONT> and <FONT COLOR='#99ff99'>2%</FONT> of Max HP restored every <FONT COLOR='#ffff99'>2s</FONT> for all party members.
    // When using Holy Aura, Damage received -<FONT COLOR='#99ff99'>20%</FONT> and <FONT COLOR='#99ff99'>2%</FONT> of Max HP restored every <FONT COLOR='#ffff99'>1.5s</FONT> for all party members.
    legacyStats: {}
  },
  284: {
    name: 'Arthetinean Skill',
    icon: 'Ability_216',
    class: 'scouter',
    // Normal Skill, Drone Skill, and Joint Skill Damage +<FONT COLOR='#99ff99'>16%</FONT>. Battery max capacity +<FONT COLOR='#99ff99'>10%</FONT>. Upgraded drone technology increases Drone Move Speed. When using a Joint Skill or retrieving the drone with <FONT COLOR='#ffff99'>0</FONT>, Drone Defense System triggers every <FONT COLOR='#ffff99'>10s</FONT>, gaining a Shield that has <FONT COLOR='#99ff99'>2%</FONT> of Max HP for <FONT COLOR='#ffff99'>5s</FONT>. Additionally, when the drone is attached to the Machinist, caster's Move Speed +<FONT COLOR='#99ff99'>10%</FONT>.
    // Normal Skill, Drone Skill, and Joint Skill Damage +<FONT COLOR='#99ff99'>22%</FONT>. Battery max capacity +<FONT COLOR='#99ff99'>15%</FONT>. Upgraded drone technology increases Drone Move Speed. When using a Joint Skill or retrieving the drone with <FONT COLOR='#ffff99'>0</FONT>, Drone Defense System triggers every <FONT COLOR='#ffff99'>10s</FONT>, gaining a Shield that has <FONT COLOR='#99ff99'>4%</FONT> of Max HP for <FONT COLOR='#ffff99'>5s</FONT>. Additionally, when the drone is attached to the Machinist, caster's Move Speed +<FONT COLOR='#99ff99'>10%</FONT>.
    // Normal Skill, Drone Skill, and Joint Skill Damage +<FONT COLOR='#99ff99'>32%</FONT>. Battery max capacity +<FONT COLOR='#99ff99'>20%</FONT>. Upgraded drone technology increases Drone Move Speed. When using a Joint Skill or retrieving the drone with <FONT COLOR='#ffff99'>0</FONT>, Drone Defense System triggers every <FONT COLOR='#ffff99'>10s</FONT>, gaining a Shield that has <FONT COLOR='#99ff99'>8%</FONT> of Max HP for <FONT COLOR='#ffff99'>5s</FONT>. Additionally, when the drone is attached to the Machinist, caster's Move Speed +<FONT COLOR='#99ff99'>10%</FONT>.
    legacyStats: {}
  },
  285: {
    name: 'Evolutionary Legacy',
    icon: 'Ability_217',
    class: 'scouter',
    // Hypersync Mode: When using Sync skill, Damage +<FONT COLOR='#99ff99'>6%</FONT> and Cooldown for Sync skills (excluding Movement skills and Stand Up skills) -<FONT COLOR='#99ff99'>0.5s</FONT>. Also, cooldown of Sync skills (excluding Hyper Awakening Techniques) is reset when entering Hypersync Mode, and it returns <FONT COLOR='#99ff99'>40%</FONT> of its Core Energy cost when canceled.
    // Hypersync Mode: When using Sync skill, Damage +<FONT COLOR='#99ff99'>12%</FONT> and Cooldown for Sync Skills (excluding Movement Skills and Stand Up Skills) -<FONT COLOR='#99ff99'>0.5s</FONT>. Also, cooldown of Sync Skills (excluding Hyper Awakening Techniques) is reset when entering Hypersync Mode, and it returns <FONT COLOR='#99ff99'>40%</FONT> of its Core Energy cost when canceled.
    // Hypersync Mode: When using Sync skill, Damage +<FONT COLOR='#99ff99'>21%</FONT> and Cooldown for Sync Skills (excluding Movement Skills and Stand Up Skills) -<FONT COLOR='#99ff99'>0.5s</FONT>. Also, cooldown of Sync Skills (excluding Hyper Awakening Techniques) is reset when entering Hypersync Mode, and it returns <FONT COLOR='#99ff99'>40%</FONT> of its Core Energy cost when canceled.
    legacyStats: {}
  },
  286: {
    name: 'Hunger',
    icon: 'Ability_222',
    class: 'reaper',
    // Chaos Meter +<FONT COLOR='#99ff99'>50%</FONT>. Atk. Power +<FONT COLOR='#99ff99'>12%</FONT> and Crit Rate +<FONT COLOR='#99ff99'>3%</FONT> when the Chaos Meter is full.
    // Chaos Meter <FONT COLOR='#99ff99'>+50%</FONT>. Atk. Power <FONT COLOR='#99ff99'>+18%</FONT> and Crit Rate <FONT COLOR='#99ff99'>+5%</FONT> when the Chaos Meter is full.
    // Chaos Meter +<FONT COLOR='#99ff99'>50%</FONT>. Atk. Power +<FONT COLOR='#99ff99'>25%</FONT> and Crit Rate +<FONT COLOR='#99ff99'>8%</FONT> when the Chaos Meter is full.
    legacyStats: {}
  },
  287: {
    name: 'Lunar Voice',
    icon: 'Ability_223',
    class: 'reaper',
    // Upon switching to Persona Mode, gain the "Lunar Voice" effect instead of the Enhanced Swoop effect that stacks every second. Upon gaining the "Lunar Voice" effect, Swoop skill Damage +<FONT COLOR='#99ff99'>120%</FONT>, Atk. Speed +<FONT COLOR='#99ff99'>10%</FONT>, and "Shadow Step" skill cooldown is reset.
    // Upon switching to Persona Mode, gain the "Lunar Voice" effect instead of the Enhanced Swoop effect that stacks every second. Upon gaining the "Lunar Voice" effect, Swoop skill Damage +<FONT COLOR='#99ff99'>135%</FONT>, Crit Rate +<FONT COLOR='#99ff99'>5%</FONT>, Atk. Speed +<FONT COLOR='#99ff99'>10%</FONT>, and "Shadow Step" skill cooldown is reset.
    // Upon switching to Persona Mode, gain the "Lunar Voice" effect instead of the Enhanced Swoop effect that stacks every second. Upon gaining the "Lunar Voice" effect, Swoop skill Damage +<FONT COLOR='#99ff99'>150%</FONT>, Crit Rate +<FONT COLOR='#99ff99'>10%</FONT>, Atk. Speed +<FONT COLOR='#99ff99'>10%</FONT>, and "Shadow Step" skill cooldown is reset.
    legacyStats: {}
  },
  289: {
    name: 'Peacemaker',
    icon: 'Ability_225',
    class: 'devilhunter_female',
    // Atk. Speed +<FONT COLOR='#99ff99'>8%</FONT> for <FONT COLOR='#ffff99'>9s</FONT> in Handgun Stance. Crit Rate +<FONT COLOR='#99ff99'>10%</FONT> and Outgoing Damage +<FONT COLOR='#99ff99'>10%</FONT> for <FONT COLOR='#ffff99'>9s</FONT> in Shotgun Stance. Outgoing Damage +<FONT COLOR='#99ff99'>16%</FONT> for <FONT COLOR='#ffff99'>9s</FONT> while in Rifle Stance.
    // Atk. Speed +<FONT COLOR='#99ff99'>12%</FONT> for <FONT COLOR='#ffff99'>9s</FONT> in Handgun Stance. Crit Rate +<FONT COLOR='#99ff99'>10%</FONT> and Outgoing Damage +<FONT COLOR='#99ff99'>17%</FONT> for <FONT COLOR='#ffff99'>9s</FONT> in Shotgun Stance. Outgoing Damage +<FONT COLOR='#99ff99'>22%</FONT> for <FONT COLOR='#ffff99'>9s</FONT> while in Rifle Stance.
    // Atk. Speed +<FONT COLOR='#99ff99'>16%</FONT> for <FONT COLOR='#ffff99'>9s</FONT> in Handgun Stance. Crit Rate +<FONT COLOR='#99ff99'>10%</FONT> and Outgoing Damage +<FONT COLOR='#99ff99'>24%</FONT> for <FONT COLOR='#ffff99'>9s</FONT> in Shotgun Stance. Outgoing Damage +<FONT COLOR='#99ff99'>28%</FONT> for <FONT COLOR='#ffff99'>9s</FONT> while in Rifle Stance.
    legacyStats: {}
  },
  290: {
    name: 'Time to Hunt',
    icon: 'Ability_228',
    class: 'devilhunter_female',
    // Crit Rate +<FONT COLOR='#99ff99'>22%</FONT>. Unable to use Shotgun Stance.
    // Crit Rate +<FONT COLOR='#99ff99'>33%</FONT>. Crit Damage +<FONT COLOR='#99ff99'>6%</FONT>. Unable to use Shotgun Stance.
    // Crit Rate +<FONT COLOR='#99ff99'>45%</FONT>. Crit Damage +<FONT COLOR='#99ff99'>15%</FONT>. Unable to use Shotgun Stance.
    legacyStats: {}
  },
  291: {
    name: 'Deathblow',
    icon: 'Ability_230',
    class: 'battlemaster_male',
    // Max number of Esoteric Orbs +<FONT COLOR='#ffff99'>1</FONT>. Esoteric skills consume all Esoteric Orbs and inflict +<FONT COLOR='#99ff99'>17%</FONT> Damage per Esoteric Orb consumed.
    // Max number of Esoteric Orbs +<FONT COLOR='#ffff99'>1</FONT>. Esoteric skills consume all Esoteric Orbs and inflict +<FONT COLOR='#99ff99'>26%</FONT> Damage per Esoteric Orb consumed.
    // Max number of Esoteric Orbs +<FONT COLOR='#ffff99'>1</FONT>. Esoteric skills consume all Esoteric Orbs and inflict +<FONT COLOR='#99ff99'>35%</FONT> Damage per Esoteric Orb consumed.
    legacyStats: {}
  },
  292: {
    name: 'Esoteric Flurry',
    icon: 'Ability_229',
    class: 'battlemaster_male',
    // Only <FONT COLOR='#ffff99'>1</FONT> Esoteric Orb is used when using Esoteric Skill, and Esoteric Skill Damage +<FONT COLOR='#99ff99'>15%</FONT>.
    // Only <FONT COLOR='#ffff99'>1</FONT> Esoteric Orb is used when using Esoteric Skill, and Esoteric Skill Damage +<FONT COLOR='#99ff99'>22%</FONT>.
    // Only <FONT COLOR='#ffff99'>1</FONT> Esoteric Orb is used when using Esoteric Skill, and Esoteric Skill Damage +<FONT COLOR='#99ff99'>30%</FONT>.
    legacyStats: {}
  },
  293: {
    name: 'Igniter',
    icon: 'Ability_240',
    class: 'elementalmaster',
    // When Arcane Torrent is triggered, remaining skills Cooldown -<FONT COLOR='#99ff99'>50%</FONT> (except Stand Up, Movement Skills, Awakening Skills, and Hyper Awakening Techniques). During Arcane Torrent, Crit Rate +<FONT COLOR='#99ff99'>12%</FONT> and Crit Damage +<FONT COLOR='#99ff99'>20%</FONT>.
    // When Arcane Torrent is triggered, remaining skills Cooldown -<FONT COLOR='#99ff99'>50%</FONT> (except Stand Up, Movement Skills, Awakening Skills, and Hyper Awakening Techniques). During Arcane Torrent, Crit Rate +<FONT COLOR='#99ff99'>20%</FONT> and Crit Damage +<FONT COLOR='#99ff99'>37%</FONT>.
    // When Arcane Torrent is triggered, remaining skills Cooldown -<FONT COLOR='#99ff99'>50%</FONT> (except Stand Up, Movement Skills, Awakening Skills, and Hyper Awakening Techniques). During Arcane Torrent, Crit Rate +<FONT COLOR='#99ff99'>30%</FONT> and Crit Damage +<FONT COLOR='#99ff99'>55%</FONT>.
    legacyStats: {}
  },
  294: {
    name: 'Reflux',
    icon: 'Ability_241',
    class: 'elementalmaster',
    // Disables Arcane Rupture, but Damage of skills (except Awakening and Movement skills) +<FONT COLOR='#99ff99'>16%</FONT> and Cooldown -<FONT COLOR='#99ff99'>3%</FONT>.
    // Disables Arcane Rupture, but Damage of skills (except Awakening and Movement skills) +<FONT COLOR='#99ff99'>22%</FONT> and Cooldown -<FONT COLOR='#99ff99'>6%</FONT>.
    // Disables Arcane Rupture, but Damage of skills (except Awakening and Movement skills) +<FONT COLOR='#99ff99'>28%</FONT> and Cooldown -<FONT COLOR='#99ff99'>10%</FONT>.
    legacyStats: {}
  },
  305: {
    name: 'Recurrence',
    icon: 'Ability_248',
    class: 'yinyangshi',
    // Upon using Moonfall or Sunrise, gain an effect that increases the Artist's Crit Rate by <FONT COLOR='#99ff99'>6%</FONT> and Crit Damage by <FONT COLOR='#99ff99'>20%</FONT> for <FONT COLOR='#ffff99'>60s</FONT>.
    // Upon using Moonfall or Sunrise, gain an effect that increases the Artist's Crit Rate by <FONT COLOR='#99ff99'>9%</FONT> and Crit Damage by <FONT COLOR='#99ff99'>30%</FONT> for <FONT COLOR='#ffff99'>60s</FONT>.
    // Upon using Moonfall or Sunrise, gain an effect that increases the Artist's Crit Rate by <FONT COLOR='#99ff99'>12%</FONT> and Crit Damage by <FONT COLOR='#99ff99'>40%</FONT> for <FONT COLOR='#ffff99'>60s</FONT>.
    legacyStats: {}
  },
  306: {
    name: 'Full Bloom',
    icon: 'Ability_249',
    class: 'yinyangshi',
    // When casting Sunrise, the energy spreads to recover HP of Party Members within <FONT COLOR='#ffff99'>24m</FONT> of the Artist and Sun Marble. It recovers up to <FONT COLOR='#99ff99'>7%</FONT> of the Artist's Max HP.
    // When casting Sunrise, the energy spreads to recover HP of Party Members within <FONT COLOR='#ffff99'>24m</FONT> of the Artist and Sun Marble. It recovers up to <FONT COLOR='#99ff99'>11%</FONT> of the Artist's Max HP.
    // When casting Sunrise, the energy spreads to recover HP of Party Members within <FONT COLOR='#ffff99'>24m</FONT> of the Artist and Sun Marble. It recovers up to <FONT COLOR='#99ff99'>15%</FONT> of the Artist's Max HP.
    legacyStats: {}
  },
  307: {
    name: 'Wind Fury',
    icon: 'Ability_258',
    class: 'weatherartist',
    // Crit Rate +<FONT COLOR='#99ff99'>7%</FONT> of the basic Move Speed Bonus percentage, and Crit Damage +<FONT COLOR='#99ff99'>22%</FONT> of the basic Atk. Speed Increase percentage. If Umbrella skill is used and then again within <FONT COLOR='#ffff99'>3s</FONT>, recover max <FONT COLOR='#99ff99'>12%</FONT> of Raindrop Meter. Sun Shower is enhanced and counts as an Umbrella skill. Sun Shower AoE radius is reduced and Raindrop Meter consumption +<FONT COLOR='#ff9999'>50%</FONT>. Foes no longer receive the Atk. Power Reduction effect, but Atk. Speed and Move Speed Increase of allies +<FONT COLOR='#99ff99'>12%</FONT>.
    // Crit Rate +<FONT COLOR='#99ff99'>15%</FONT> of the basic Move Speed Bonus percentage, and Crit Damage +<FONT COLOR='#99ff99'>45%</FONT> of the basic Atk. Speed Increase percentage. If Umbrella skill is used and then again within <FONT COLOR='#ffff99'>3s</FONT>, recover max <FONT COLOR='#99ff99'>12%</FONT> of Raindrop Meter. Sun Shower is enhanced and counts as an Umbrella skill. Sun Shower AoE radius is reduced and Raindrop Meter consumption +<FONT COLOR='#ff9999'>50%</FONT>. Foes no longer receive the Atk. Power Reduction effect, but Atk. Speed and Move Speed Increase of allies +<FONT COLOR='#99ff99'>12%</FONT>.
    // Crit Rate +<FONT COLOR='#99ff99'>30%</FONT> of the basic Move Speed Bonus percentage, and Crit Damage +<FONT COLOR='#99ff99'>90%</FONT> of the basic Atk. Speed Increase percentage. If Umbrella skill is used and then again within <FONT COLOR='#ffff99'>3s</FONT>, recover max <FONT COLOR='#99ff99'>12%</FONT> of Raindrop Meter. Sun Shower is enhanced and counts as an Umbrella skill. Sun Shower AoE radius is reduced and Raindrop Meter consumption +<FONT COLOR='#ff9999'>50%</FONT>. Foes no longer receive the Atk. Power Reduction effect, but Atk. Speed and Move Speed Increase of allies +<FONT COLOR='#99ff99'>12%</FONT>.
    legacyStats: {}
  },
  308: {
    name: 'Drizzle',
    icon: 'Ability_259',
    class: 'weatherartist',
    // Sun Shower's Raindrop Meter consumption decreases by <FONT COLOR='#99ff99'>50%</FONT>. While Sun Shower is active, damage dealt by Weather skills increases by <FONT COLOR='#99ff99'>7%</FONT>.
    // Sun Shower's Raindrop Meter consumption decreases by <FONT COLOR='#99ff99'>50%</FONT>. While Sun Shower is active, damage dealt by Weather skills increases by <FONT COLOR='#99ff99'>15%</FONT>.
    // Sun Shower's Raindrop Meter consumption decreases by <FONT COLOR='#99ff99'>50%</FONT>. While Sun Shower is active, damage dealt by Weather skills increases by <FONT COLOR='#99ff99'>30%</FONT>.
    legacyStats: {}
  },
  309: {
    name: 'Predator',
    icon: 'Ability_260',
    class: 'berserker_female',
    // Fury Meter +<FONT COLOR='#99ff99'>3%</FONT> and MP +<FONT COLOR='#99ff99'>1%</FONT> when hitting an enemy and absorbing their Vigor. (Cooldown: <FONT COLOR='#ffff99'>1s</FONT>) In Burst Mode, Crit Damage +<FONT COLOR='#99ff99'>10%</FONT> and gain Fatigue every <FONT COLOR='#ffff99'>3s</FONT>. Fatigue: Fury Meter Consumption +<FONT COLOR='#ff9999'>10%</FONT> every <FONT COLOR='#ffff99'>3s</FONT>, and cannot use Bloodlust. When Burst Mode ends, the duration of Exhaustion will be reduced according to the stacks of Fatigue. The Fury Meter is fully recovered when Exhaustion ends.
    // Fury Meter +<FONT COLOR='#99ff99'>6%</FONT> and MP +<FONT COLOR='#99ff99'>2%</FONT> when hitting an enemy and absorbing their Vigor. (Cooldown: <FONT COLOR='#ffff99'>1s</FONT>) In Burst Mode, Crit Damage +<FONT COLOR='#99ff99'>25%</FONT> and gain Fatigue every <FONT COLOR='#ffff99'>3s</FONT>. Fatigue: Fury Meter Consumption +<FONT COLOR='#ff9999'>10%</FONT> every <FONT COLOR='#ffff99'>3s</FONT>, and cannot use Bloodlust. When Burst Mode ends, the duration of Exhaustion will be reduced according to the stacks of Fatigue. The Fury Meter is fully recovered when Exhaustion ends.
    // Fury Meter +<FONT COLOR='#99ff99'>10%</FONT> and MP +<FONT COLOR='#99ff99'>3%</FONT> when hitting an enemy and absorbing their Vigor. (Cooldown: <FONT COLOR='#ffff99'>1s</FONT>) In Burst Mode, Crit Damage +<FONT COLOR='#99ff99'>40%</FONT> and gain Fatigue every <FONT COLOR='#ffff99'>3s</FONT>. Fatigue: Fury Meter Consumption +<FONT COLOR='#ff9999'>10%</FONT> every <FONT COLOR='#ffff99'>3s</FONT>, and cannot use Bloodlust. When Burst Mode ends, the duration of Exhaustion will be reduced according to the stacks of Fatigue. The Fury Meter is fully recovered when Exhaustion ends.
    legacyStats: {}
  },
  310: {
    name: 'Punisher',
    icon: 'Ability_261',
    class: 'berserker_female',
    // Damage +<FONT COLOR='#99ff99'>7%</FONT> while in Burst Mode and Bloodlust Crit Rate +<FONT COLOR='#99ff99'>5%</FONT>. Fury Meter gain -<FONT COLOR='#ff9999'>25%</FONT> and Burst duration -<FONT COLOR='#ff9999'>50%</FONT>. When Burst ends, Exhaustion does not occur.
    // Damage +<FONT COLOR='#99ff99'>15%</FONT> while in Burst Mode and Bloodlust Crit Rate +<FONT COLOR='#99ff99'>10%</FONT>. Fury Meter gain -<FONT COLOR='#ff9999'>25%</FONT> and Burst duration -<FONT COLOR='#ff9999'>50%</FONT>. When Burst ends, Exhaustion does not occur.
    // Damage +<FONT COLOR='#99ff99'>25%</FONT> while in Burst Mode and Bloodlust Crit Rate +<FONT COLOR='#99ff99'>20%</FONT>. Fury Meter gain -<FONT COLOR='#ff9999'>25%</FONT> and Burst duration -<FONT COLOR='#ff9999'>50%</FONT>. When Burst ends, Exhaustion does not occur.
    legacyStats: {}
  },
  311: {
    name: 'Full Moon Harvester',
    icon: 'Ability_263',
    class: 'souleater',
    // Crit Rate +<FONT COLOR='#99ff99'>3%</FONT>. Upon using Soul Stone, recover Possession Meter by <FONT COLOR='#99ff99'>5%</FONT>. Upon entering Deathlord Mode, the cooldown of Deathlord Skills (excluding Hyper Awakening Techniques) resets. Deathlord Skills Damage while in Deathlord Mode +<FONT COLOR='#99ff99'>5%</FONT> and Deathlord Skills cooldown -<FONT COLOR='#99ff99'>50%</FONT> (excluding Hyper Awakening Techniques).
    // Crit Rate +<FONT COLOR='#99ff99'>8%</FONT>. Upon using Soul Stone, recover Possession Meter by <FONT COLOR='#99ff99'>5%</FONT>. Upon entering Deathlord Mode, the cooldown of Deathlord Skills (excluding Hyper Awakening Techniques) resets. Deathlord Skills Damage while in Deathlord Mode +<FONT COLOR='#99ff99'>10%</FONT> and Deathlord Skills cooldown -<FONT COLOR='#99ff99'>60%</FONT> (excluding Hyper Awakening Techniques).
    // Crit Rate +<FONT COLOR='#99ff99'>14%</FONT>. Upon using Soul Stone, recover Possession Meter by <FONT COLOR='#99ff99'>5%</FONT>. Upon entering Deathlord Mode, the cooldown of Deathlord Skills (excluding Hyper Awakening Techniques) resets. Deathlord Skills Damage while in Deathlord Mode +<FONT COLOR='#99ff99'>15%</FONT> and Deathlord Skills cooldown -<FONT COLOR='#99ff99'>70%</FONT> (excluding Hyper Awakening Techniques).
    legacyStats: {}
  },
  312: {
    name: "Night's Edge",
    icon: 'Ability_264',
    class: 'souleater',
    // Possession Meter turns into Edge Meter, disabling Deathlord Mode. Edge Meter increases upon using Deathlord Skills. When the Edge Meter is full, Deathlord Skills are disabled for <FONT COLOR='#ffff99'>12s</FONT>, but Ghast Skills are enhanced. Using Deathlord Skills does not consume Soul Stones. However, upon gathering <FONT COLOR='#ffff99'>3</FONT> Soul Stones, instead of consuming all, the enhanced Deathlord Skills are used. Ghast and Deathlord Skills Damage +<FONT COLOR='#99ff99'>20%</FONT>. Additionally, the enhanced Deathlord Skills Damage +<FONT COLOR='#99ff99'>25%</FONT>.
    // Possession Meter turns into Edge Meter, disabling Deathlord Mode. Edge Meter increases upon using Deathlord Skills. When the Edge Meter is full, Deathlord Skills are disabled for <FONT COLOR='#ffff99'>12s</FONT>, but Ghast Skills are enhanced. Using Deathlord Skills does not consume Soul Stones. However, upon gathering <FONT COLOR='#ffff99'>3</FONT> Soul Stones, instead of consuming all, the enhanced Deathlord Skills are used. Ghast and Deathlord Skills Damage +<FONT COLOR='#99ff99'>30%</FONT>. Additionally, the enhanced Deathlord Skills Damage +<FONT COLOR='#99ff99'>35%</FONT>.
    // Possession Meter turns into Edge Meter, disabling Deathlord Mode. Edge Meter increases upon using Deathlord Skills. When the Edge Meter is full, Deathlord Skills are disabled for <FONT COLOR='#ffff99'>12s</FONT>, but Ghast Skills are enhanced. Using Deathlord Skills does not consume Soul Stones. However, upon gathering <FONT COLOR='#ffff99'>3</FONT> Soul Stones, instead of consuming all, the enhanced Deathlord Skills are used. Ghast and Deathlord Skills Damage +<FONT COLOR='#99ff99'>40%</FONT>. Additionally, the enhanced Deathlord Skills Damage +<FONT COLOR='#99ff99'>50%</FONT>.
    legacyStats: {}
  },
  314: {
    name: 'Brawl King Storm',
    icon: 'Ability_277',
    class: 'infighter_male',
    // Outgoing Damage +<FONT COLOR='#99ff99'>2%</FONT>, Brawl King Stance's duration changed to <FONT COLOR='#ffff99'>15s</FONT>. When in Brawl King Stance, recovers <FONT COLOR='#99ff99'>3</FONT> Stamina and Shock Energy every 1s. Atk. Speed +<FONT COLOR='#99ff99'>20%</FONT>. During Brawl King Stance, Brawl King Twelve Forms: Falling Blossoms skill is enabled. Brawl King Twelve Forms: Falling Blossoms Damage +<FONT COLOR='#99ff99'>20%</FONT>, Crit Rate +<FONT COLOR='#99ff99'>15%</FONT>. On skill use, outgoing Damage +<FONT COLOR='#99ff99'>4%</FONT> per <FONT COLOR='#ffff99'>1</FONT> Shock Energy.
    // Outgoing Damage +<FONT COLOR='#99ff99'>8%</FONT>, Brawl King Stance's duration changed to <FONT COLOR='#ffff99'>15s</FONT>. When in Brawl King Stance, recovers <FONT COLOR='#99ff99'>4</FONT> Stamina and Shock Energy every 1s. Atk. Speed +<FONT COLOR='#99ff99'>20%</FONT>. During Brawl King Stance, Brawl King Twelve Forms: Falling Blossoms skill is enabled. Brawl King Twelve Forms: Falling Blossoms Damage +<FONT COLOR='#99ff99'>50%</FONT>, Crit Rate +<FONT COLOR='#99ff99'>15%</FONT>. On skill use, outgoing Damage +<FONT COLOR='#99ff99'>4%</FONT> per <FONT COLOR='#ffff99'>1</FONT> Shock Energy.
    // Outgoing Damage +<FONT COLOR='#99ff99'>14%</FONT>, Brawl King Stance's duration changed to <FONT COLOR='#ffff99'>15s</FONT>. When in Brawl King Stance, recovers <FONT COLOR='#99ff99'>5</FONT> Stamina and Shock Energy every 1s. Atk. Speed +<FONT COLOR='#99ff99'>20%</FONT>. During Brawl King Stance, Brawl King Twelve Forms: Falling Blossoms skill is enabled. Brawl King Twelve Forms: Falling Blossoms Damage +<FONT COLOR='#99ff99'>80%</FONT>, Crit Rate +<FONT COLOR='#99ff99'>15%</FONT>. On skill use, outgoing Damage +<FONT COLOR='#99ff99'>4%</FONT> per <FONT COLOR='#ffff99'>1</FONT> Shock Energy.
    legacyStats: {}
  },
  315: {
    name: "Asura's Path",
    icon: 'Ability_278',
    class: 'infighter_male',
    // Total Stamina and Shock Energy -<FONT COLOR='#99ff99'>30%</FONT>. Press <FONT COLOR='#ffff99'>0</FONT> to gain Defensive Speculation effect. Tenacious Power changes to Asura Energy, gaining <FONT COLOR='#99ff99'>4%</FONT> when using Shock Skill after using Stamina Skill or using Stamina Skill after Shock Skill. When in combat, gain Speculation effect, and Brawl King Stance changes to Asura State. When entering Asura State, Speculation effect changes into Asura Destruction effect. The Movement Skill changes and Basic Attack changes into Asura Destruction Basic Attack. Asura Destruction Basic Attack Damage +<FONT COLOR='#99ff99'>160%</FONT> of Crit Rate. When Speculation and Asura Destruction are in effect, Skill Damage including Awakening Skill and Basic Attack +<FONT COLOR='#99ff99'>5%</FONT>, Move Speed +<FONT COLOR='#99ff99'>15%</FONT>.
    // Total Stamina and Shock Energy -<FONT COLOR='#99ff99'>30%</FONT>. Press <FONT COLOR='#ffff99'>0</FONT> to gain Defensive Speculation effect. Tenacious Power changes to Asura Energy, gaining <FONT COLOR='#99ff99'>4%</FONT> when using Shock Skill after using Stamina Skill or using Stamina Skill after Shock Skill. When in combat, gain Speculation effect, and Brawl King Stance changes to Asura State. When entering Asura State, Speculation effect changes into Asura Destruction effect. The Movement Skill changes and Basic Attack changes into Asura Destruction Basic Attack. Asura Destruction Basic Attack Damage +<FONT COLOR='#99ff99'>180%</FONT> of Crit Rate. When Speculation and Asura Destruction are in effect, Skill Damage including Awakening Skill and Basic Attack +<FONT COLOR='#99ff99'>15%</FONT>, Move Speed +<FONT COLOR='#99ff99'>15%</FONT>.
    // Total Stamina and Shock Energy -<FONT COLOR='#99ff99'>30%</FONT>. Press <FONT COLOR='#ffff99'>0</FONT> to gain Defensive Speculation effect. Tenacious Power changes to Asura Energy, gaining <FONT COLOR='#99ff99'>4%</FONT> when using Shock Skill after using Stamina Skill or using Stamina Skill after Shock Skill. When in combat, gain Speculation effect, and Brawl King Stance changes to Asura State. When entering Asura State, Speculation effect changes into Asura Destruction effect. The Movement Skill changes and Basic Attack changes into Asura Destruction Basic Attack. Asura Destruction Basic Attack Damage +<FONT COLOR='#99ff99'>200%</FONT> of Crit Rate. When Speculation and Asura Destruction are in effect, Skill Damage including Awakening Skill and Basic Attack +<FONT COLOR='#99ff99'>25%</FONT>, Move Speed +<FONT COLOR='#99ff99'>15%</FONT>.
    legacyStats: {}
  }
}
