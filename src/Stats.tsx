import { SkillData } from './game/types/skills'
import { StatData, StatKey, statKeys, StatValues } from './game/types/stats'

type StatDesc = {
  name: string
  decimal?: number
  percent?: boolean
  multiplier?: boolean
}

const statPct: Omit<StatDesc, 'name'> = { percent: true, decimal: 2 }
const statMult: Omit<StatDesc, 'name'> = {
  percent: true,
  decimal: 2,
  multiplier: true
}

const statDesc: {
  [key in StatKey]: StatDesc
} = {
  attackPower: { name: 'Attack Power' },
  attackPowerBonus: { ...statPct, name: 'Attack Power (+)' },
  attackPowerMultiplier: { ...statMult, name: 'Attack Power (x)' },
  critChance: { ...statPct, name: 'Crit Chance' },
  critDamage: { ...statPct, name: 'Crit Damage' },
  critMultiplier: { ...statMult, name: 'Crit Multiplier' },
  moveSpeed: { ...statPct, name: 'Movement Speed' },
  attackSpeed: { ...statPct, name: 'Attack Speed' },
  speedMultiplier: { ...statMult, name: 'Casting Speed' },
  cooldownMultiplier: { ...statMult, name: 'Cooldown' },
  armorMultiplier: { ...statMult, name: 'Enemy Defense' },
  crit: { name: 'Crit' },
  swiftness: { name: 'Swiftness' },
  specialization: { name: 'Specialization' },
  additionalDamage: { ...statPct, name: 'Additional Damage' },
  evoDamage: { ...statPct, name: 'Evolution Damage' },
  damageMultiplier: { ...statMult, name: 'Damage' },
  frontMultiplier: { ...statMult, name: 'Front Attack Damage' },
  backMultiplier: { ...statMult, name: 'Back Attack Damage' },
  manaMultiplier: { ...statMult, name: 'Mana Cost' }
}

export function StatsList({
  stats,
  showPlus = true
}: {
  stats: Partial<StatValues>
  showPlus?: boolean
}) {
  return (
    <ul>
      {statKeys.map((key) => {
        const desc = statDesc[key]
        let value = stats[key]
        if (value == null) return null
        if (desc.multiplier) value -= 1
        if (!value) return null
        if (desc.percent) value *= 100
        value = parseFloat(value.toFixed(desc.decimal ?? 0))
        return (
          <li key={key}>
            {desc.name}: {showPlus && value > 0 ? '+' : ''}
            {value}
            {desc.percent ? '%' : ''}
          </li>
        )
      })}
    </ul>
  )
}

function SkillBaseDamage({ data }: { data: SkillData }) {
  if (!data.base.damage) return null
  const dmg =
    data.attackPower * data.base.damage.scaling + data.base.damage.base
  return (
    <li>
      <div>Base Damage: {dmg.toFixed(0)}</div>
      <ul>
        <li>Base: {data.base.damage.base.toFixed(0)}</li>
        <li>Scaling: {data.base.damage.scaling.toFixed(1)} x (attack power)</li>
      </ul>
    </li>
  )
}

export function StatsListEx({ data }: { data: StatData }) {
  const display = data.clone()
  display.applyStats()
  return (
    <ul className="stats-ex">
      {display instanceof SkillData && <SkillBaseDamage data={display} />}
      {statKeys.map((key) => {
        const desc = statDesc[key]
        let value = display.values[key]
        if (value == null) return null
        if (desc.multiplier) value -= 1
        if (!value) return null

        const fmt = (value: number) => {
          if (desc.percent) value *= 100
          let str = parseFloat(value.toFixed(desc.decimal ?? 0)).toString()
          if (desc.percent) str += '%'
          return str
        }

        return (
          <li key={key}>
            <div>
              {desc.name}: {fmt(value)}
            </div>
            {display.sources[key] && (
              <ul>
                {Object.entries(display.sources[key]).map(([src, value]) => (
                  <li>
                    {src}: {fmt(value)}
                  </li>
                ))}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )
}
