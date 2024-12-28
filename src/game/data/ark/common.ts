import { ArkPassive } from '../../types/ark'

export const common_passives: Record<number, ArkPassive> = {
  1010100: {
    name: 'Crit',
    icon: 'Ark_Passive_Evolution_1',
    points: 1,
    levels: 30,
    group: 0,
    tier: 0,
    position: 0,
    stats: { crit: 50 }
  },
  1010200: {
    name: 'Specialization',
    icon: 'Ark_Passive_Evolution_2',
    points: 1,
    levels: 30,
    group: 0,
    tier: 0,
    position: 1,
    stats: { specialization: 50 }
  },
  1010300: {
    name: 'Domination',
    icon: 'Ark_Passive_Evolution_3',
    points: 1,
    levels: 30,
    group: 0,
    tier: 0,
    position: 2,
    stats: {}
  },
  1010400: {
    name: 'Swiftness',
    icon: 'Ark_Passive_Evolution_4',
    points: 1,
    levels: 30,
    group: 0,
    tier: 0,
    position: 3,
    stats: { swiftness: 50 }
  },
  1010500: {
    name: 'Endurance',
    icon: 'Ark_Passive_Evolution_5',
    points: 1,
    levels: 30,
    group: 0,
    tier: 0,
    position: 4,
    stats: {}
  },
  1010600: {
    name: 'Expertise',
    icon: 'Ark_Passive_Evolution_6',
    points: 1,
    levels: 30,
    group: 0,
    tier: 0,
    position: 5,
    stats: {}
  },
  1020100: {
    name: 'Boundless MP',
    icon: 'Ark_Passive_Evolution_16',
    points: 10,
    levels: 2,
    group: 0,
    tier: 1,
    position: 0,
    stats: {
      bonuses: {
        mp_skill_cdr: 0.07,
        mp_reduction: 0.1
      }
    }
  },
  1020200: {
    name: 'Illicit Spell',
    icon: 'Ark_Passive_Evolution_12',
    points: 10,
    levels: 2,
    group: 0,
    tier: 1,
    position: 1,
    stats: {
      evoDamage: 0.05,
      bonuses: {
        mp_evo_damage: 0.05,
        mp_reduction: 0.06
      }
    }
  },
  1020300: {
    name: 'Keen Sense',
    icon: 'Ark_Passive_Evolution_29',
    points: 10,
    levels: 2,
    group: 0,
    tier: 1,
    position: 2,
    stats: {
      critChance: 0.04,
      evoDamage: 0.05
    }
  },
  1020400: {
    name: 'Limit Break',
    icon: 'Ark_Passive_Evolution_34',
    points: 10,
    levels: 3,
    group: 0,
    tier: 1,
    position: 3,
    stats: {
      evoDamage: 0.1
    }
  },
  1020500: {
    name: 'Optimized Training',
    icon: 'Ark_Passive_Evolution_22',
    points: 10,
    levels: 2,
    group: 0,
    tier: 1,
    position: 4,
    stats: {
      evoDamage: 0.05,
      bonuses: {
        skill_cdr: 0.04
      }
    }
  },
  1020600: {
    name: 'Goddess of Blessings',
    icon: 'Ark_Passive_Evolution_19',
    points: 10,
    levels: 3,
    group: 0,
    tier: 1,
    position: 5,
    stats: {}
  },
  1030100: {
    name: 'Unlimited Magick',
    icon: 'Ark_Passive_Evolution_14',
    points: 10,
    levels: 2,
    group: 0,
    tier: 2,
    position: 0,
    stats: {
      evoDamage: 0.08,
      bonuses: {
        mp_skill_cdr: 0.07,
        mp_reduction: 0.08
      }
    }
  },
  1030200: {
    name: 'Zealous Smite',
    icon: 'Ark_Passive_Evolution_27',
    points: 10,
    levels: 2,
    group: 0,
    tier: 2,
    position: 1,
    stats: {
      critChance: 0.12,
      evoDamage: 0.02
    }
  },
  1030300: {
    name: 'Strike',
    icon: 'Ark_Passive_Evolution_32',
    points: 10,
    levels: 2,
    group: 0,
    tier: 2,
    position: 2,
    stats: {
      critChance: 0.1,
      bonuses: {
        directional_crit_damage: 0.16
      }
    }
  },
  1030400: {
    name: 'Destruction Charger',
    icon: 'Ark_Passive_Evolution_35',
    points: 10,
    levels: 2,
    group: 0,
    tier: 2,
    position: 3,
    stats: {
      evoDamage: 0.12,
      attackSpeed: 0.04
    }
  },
  1030500: {
    name: 'Dominion Timing',
    icon: 'Ark_Passive_Evolution_23',
    points: 10,
    levels: 2,
    group: 0,
    tier: 2,
    position: 4,
    stats: {
      evoDamage: 0.08,
      bonuses: {
        skill_cdr: 0.05
      }
    }
  },
  1030600: {
    name: 'Passionate Dance',
    icon: 'Ark_Passive_Evolution_33',
    points: 10,
    levels: 2,
    group: 0,
    tier: 2,
    position: 5,
    requires: { id: 1020600, level: 3 },
    stats: {}
  },
  1040100: {
    name: 'Blunt Thorn',
    icon: 'Ark_Passive_Evolution_20',
    points: 15,
    levels: 2,
    group: 0,
    tier: 3,
    position: 0,
    stats: {
      evoDamage: 0.075,
      bonuses: {
        blunt_thorn: 1
      }
    }
  },
  1040200: {
    name: 'Supersonic Breakthrough',
    icon: 'Ark_Passive_Evolution_21',
    points: 15,
    levels: 2,
    group: 0,
    tier: 3,
    position: 1,
    stats: {
      bonuses: {
        supersonic_breakthrough: 1
      }
    }
  },
  1040300: {
    name: 'Infighting',
    icon: 'Ark_Passive_Evolution_38',
    points: 15,
    levels: 2,
    group: 0,
    tier: 3,
    position: 2,
    stats: {
      evoDamage: 0.09
    }
  },
  1040400: {
    name: 'Standing Striker',
    icon: 'Ark_Passive_Evolution_18',
    points: 15,
    levels: 2,
    group: 0,
    tier: 3,
    position: 3,
    stats: {
      evoDamage: 0.105
    }
  },
  1040500: {
    name: 'MP Furnace',
    icon: 'Ark_Passive_Evolution_24',
    points: 15,
    levels: 2,
    group: 0,
    tier: 3,
    position: 4,
    stats: {
      bonuses: {
        mp_furnace: 1
      }
    }
  },
  1040600: {
    name: 'Stable Manager',
    icon: 'Ark_Passive_Evolution_25',
    points: 15,
    levels: 2,
    group: 0,
    tier: 3,
    position: 5,
    stats: {}
  }
}
