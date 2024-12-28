import classNames from 'classnames'
import React from 'react'
import { Icon } from './Icon'
import { selectConfig, SetterValue } from './state'

import { BuffInfo, PlayerCalc, SkillInfo } from './game/calc'
import { SkillConfig } from './game/config'
import Data from './game/data'
import { cooldown_gems, damage_gems } from './game/data/gems'
import NumberInput from './Number'
import './Skill.scss'
import { StatsList, StatsListEx } from './Stats'
import { Tooltip } from './Tooltip'

function SkillMenu({
  onSelect,
  hidden
}: {
  onSelect: (id: number | undefined) => void
  hidden: number[]
}) {
  const [charClass] = selectConfig('class')

  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => ref.current!.focus(), [])

  const list = React.useMemo(
    () =>
      Object.keys(Data.skills)
        .map(Number)
        .filter((id) => {
          const skill = Data.skills[id]
          if (skill.class !== charClass) return false
          if (!skill.sort) return false
          //if (skill.hidden && !hidden.includes(id)) return false
          //if (!skill.data) return false
          return true
        })
        .sort((a, b) => {
          const sa = Data.skills[a],
            sb = Data.skills[b]
          if (sa.awakening !== sb.awakening) return sa.awakening ? 1 : -1
          if (sa.super !== sb.super) return sa.super ? 1 : -1
          //if (sa.hidden !== sb.hidden) return sa.hidden ? 1 : -1
          if (sa.category !== sb.category)
            return (sa.category ?? 0) - (sb.category ?? 0)
          if (sa.sort !== sb.sort) return sa.sort - sb.sort
          return sa.learn - sb.learn
        }),
    [charClass, hidden]
  )

  return (
    <div
      className="modal-bg"
      onKeyDown={(e) => {
        if (e.key === 'Escape') onSelect(undefined)
      }}>
      <div
        className="skill-menu"
        tabIndex={-1}
        ref={ref}
        onBlur={() => onSelect(undefined)}>
        {list.map((id) => (
          <div className="skill-entry" key={id} onClick={() => onSelect(id)}>
            <Icon icon={Data.skills[id].icon} />
            <span>{Data.skills[id].name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function GemMenu({
  onSelect,
  damage
}: {
  onSelect: (id: number | undefined) => void
  damage: boolean
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => ref.current!.focus(), [])

  const list = React.useMemo(() => {
    const t3: number[] = []
    const t4: number[] = []
    const gems = damage ? damage_gems : cooldown_gems
    for (const [id, gem] of Object.entries(gems)) {
      if (gem.tier === 3) t3.push(Number(id))
      else t4.push(Number(id))
    }
    t3.sort((a, b) => gems[b].level - gems[a].level)
    t4.sort((a, b) => gems[b].level - gems[a].level)
    return [t3, t4]
  }, [damage])

  return (
    <div
      className="modal-bg"
      onKeyDown={(e) => {
        if (e.key === 'Escape') onSelect(undefined)
      }}>
      <div
        className="gem-menu"
        tabIndex={-1}
        ref={ref}
        onBlur={() => onSelect(undefined)}>
        {list.map((col, idx) => (
          <div className="col" key={idx}>
            {col.map((id) => (
              <GemIcon key={id} id={id} onClick={() => onSelect(id)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const tripodRows = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7]
]

function SkillTripod({
  skill,
  setSkill,
  index
}: {
  skill: SkillConfig
  setSkill: (value: SetterValue<SkillConfig>) => void
  index: number
}) {
  const data = Data.skills[skill.id]
  const tripod = data.tripods?.[index]

  const onClick = React.useCallback(
    () =>
      setSkill((skill) => {
        skill = { ...skill }
        skill.tripods = { ...skill.tripods }
        const row = tripodRows.findIndex((row) => row.includes(index))
        const rowLevel = 4 + 3 * row
        if (skill.tripods[index] && skill.level >= 4 + 3 * row) {
          delete skill.tripods[index]
          const reqLevel = Math.max(
            1,
            ...Object.keys(skill.tripods)
              .map(Number)
              .map(
                (index) =>
                  4 + 3 * tripodRows.findIndex((row) => row.includes(index))
              )
          )
          if (reqLevel < rowLevel && skill.level >= rowLevel) {
            skill.level = reqLevel
          }
        } else {
          const value = Math.max(
            ...tripodRows[row].map((index) => skill.tripods[index] ?? 0)
          )
          for (const index of tripodRows[row]) delete skill.tripods[index]
          let level = tripod?.levels ?? 1
          if (value) level = Math.min(level, value)
          skill.tripods[index] = level
          if (skill.level < rowLevel) {
            skill.level = rowLevel
          }
        }
        return skill
      }),
    [setSkill, index]
  )

  if (!tripod) return null

  const row = tripodRows.findIndex((row) => row.includes(index))
  return (
    <Tooltip tooltip={tripod.name}>
      <Icon
        icon={tripod.icon}
        className={classNames(
          'tripod',
          skill.tripods[index] && skill.level >= 4 + 3 * row && 'active'
        )}
        onClick={onClick}
      />
    </Tooltip>
  )
}

function SkillTripodLevel({
  skill,
  setSkill,
  row
}: {
  skill: SkillConfig
  setSkill: (value: SetterValue<SkillConfig>) => void
  row: number
}) {
  const data = Data.skills[skill.id]
  const index = tripodRows[row].find((idx) => skill.tripods[idx])
  const tripod = index != null ? data.tripods?.[index] : undefined

  const onChange = React.useCallback(
    (value: number) =>
      index != null &&
      setSkill((skill) => {
        skill = { ...skill }
        skill.tripods = { ...skill.tripods }
        skill.tripods[index] = value
        return skill
      }),
    [setSkill, index]
  )

  if (!skill.tripods) return null
  const enabled =
    tripod != null && skill.level >= 4 + 3 * row && (tripod.levels ?? 1) > 1
  return (
    <NumberInput
      min={1}
      max={tripod?.levels ?? 1}
      value={index != null ? skill.tripods[index] ?? 1 : 1}
      onChange={onChange}
      disabled={!enabled}
    />
  )
}

function GemIcon({
  id,
  disabled,
  className,
  ...props
}: { id: number; disabled?: boolean } & Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'id'
>) {
  const gem = damage_gems[id] ?? cooldown_gems[id]
  if (!gem) return null
  if (disabled) {
    return (
      <div className={classNames('gem disabled', className)} {...props}>
        <Icon icon={gem.icon} />
      </div>
    )
  }
  return (
    <Tooltip
      tooltip={
        <div className="buff-tooltip">
          <h3>{gem.name}</h3>
          <ul>
            <li>
              {damage_gems[id] ? 'Damage' : 'Cooldown'}:{' '}
              {(gem.effect * 100).toFixed(0)}%
            </li>
            {gem.bonus && <li>Atk. Power +{(gem.bonus * 100).toFixed(2)}%</li>}
          </ul>
        </div>
      }>
      <div className={classNames('gem', className)} {...props}>
        <Icon icon={gem.icon} />
        <div className="level">Lv. {gem.level}</div>
      </div>
    </Tooltip>
  )
}

function SkillGemSlot({
  skill,
  setSkill,
  damage
}: {
  skill: SkillConfig
  setSkill: (value: SetterValue<SkillConfig>) => void
  damage: boolean
}) {
  const [selecting, setSelecting] = React.useState(false)
  const data = Data.skills[skill.id]

  if (data.awakening || data.super) return null

  const defaultGem = Number(
    Object.keys(damage ? damage_gems : cooldown_gems).pop()
  )
  const id = damage ? skill.damageGem : skill.cooldownGem

  return (
    <>
      <GemIcon
        id={id ?? defaultGem}
        disabled={!id}
        onClick={() => setSelecting(true)}
        onContextMenu={(e) => {
          e.preventDefault()
          setSkill((skill) => {
            skill = { ...skill }
            if (damage) delete skill.damageGem
            else delete skill.cooldownGem
            return skill
          })
        }}
      />
      {selecting && (
        <GemMenu
          damage={damage}
          onSelect={(id) => {
            setSelecting(false)
            if (id != null) {
              setSkill((skill) => {
                skill = { ...skill }
                if (damage) skill.damageGem = id
                else skill.cooldownGem = id
                return skill
              })
            }
          }}
        />
      )}
    </>
  )
}

function formatDmg(value: number) {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(1) + 'b'
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(1) + 'm'
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(1) + 'k'
  } else {
    return value.toFixed(0)
  }
}

function SkillValues({
  info,
  setSkill
}: {
  info: SkillInfo
  setSkill: (value: SetterValue<SkillConfig>) => void
}) {
  if (!info.data) return null
  return (
    <Tooltip className="left" tooltip={<StatsListEx data={info.data} />}>
      <div className="values">
        <div className="freq">
          <NumberInput
            min={0}
            value={info.config.rotationNum ?? 0}
            onChange={(value) =>
              setSkill((skill) => ({ ...skill, rotationNum: value }))
            }
          />
          {' / '}
          <NumberInput
            min={0}
            value={info.config.rotationDen ?? 1}
            onChange={(value) =>
              setSkill((skill) => ({ ...skill, rotationDen: value }))
            }
          />
        </div>
        <div>{info.data?.cooldown.toFixed(1)}s</div>
        <div>{info.data?.manaCost.toFixed(0)}</div>
        <div>{((info.data?.critChance ?? 0) * 100).toFixed(1)}%</div>
        <div>{info.damage != null && formatDmg(info.damage)}</div>
      </div>
    </Tooltip>
  )
}

function SkillRow({
  index,
  info,
  buffs,
  hidden,
  active,
  setActive
}: {
  index: number
  info: SkillInfo
  buffs: Record<string, BuffInfo>
  hidden: number[]
  active: number | undefined
  setActive: (value: number | undefined) => void
}) {
  const [skill, setSkill] = selectConfig(`skills.${index}`)
  const data = Data.skills[skill.id]

  const [selecting, setSelecting] = React.useState(false)
  const onSelect = React.useCallback(
    (id: number | undefined) => {
      setSelecting(false)
      if (id != null) {
        setSkill((skill) => ({
          id,
          level: skill.level,
          tripods: []
        }))
      }
    },
    [setSkill]
  )

  return (
    <>
      <div
        className={classNames('skill-row', active === index && 'expanded')}
        onClick={(e) => {
          if (
            (e.target as HTMLElement).closest(
              '.buff, .gem, .tripods .row, input, .name'
            )
          )
            return
          setActive(active === index ? undefined : index)
        }}>
        <div
          className={classNames(
            'name',
            !data.tripods && 'no-tripods',
            data.maxLevel <= 1 && 'no-level'
          )}
          onClick={() => setSelecting(true)}
          onContextMenu={(e) => {
            e.preventDefault()
            setSkill(undefined)
          }}>
          <Icon icon={data.icon} />
          <span>{data.name}</span>
        </div>
        {data.maxLevel > 1 && (
          <div className="skill-level">
            <NumberInput
              value={skill.level}
              onChange={(level) =>
                setSkill((skill) => ({
                  ...skill,
                  level
                }))
              }
              min={1}
              max={14}
            />
          </div>
        )}
        {data.tripods && (
          <div className="tripods">
            {active === index ? (
              tripodRows.map((indices, row) => (
                <div className="row" key={row}>
                  <div className="list">
                    {indices.map((index) => (
                      <SkillTripod
                        key={index}
                        skill={skill}
                        setSkill={setSkill}
                        index={index}
                      />
                    ))}
                  </div>
                  <div className="level">
                    <SkillTripodLevel
                      skill={skill}
                      setSkill={setSkill}
                      row={row}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="compact">
                {Object.keys(skill.tripods)
                  .map(Number)
                  .map((index) => {
                    const tripod = data.tripods?.[index]
                    if (!tripod) return null
                    return (
                      <Tooltip key={index} tooltip={tripod.name}>
                        <div className="tripod">
                          <Icon icon={tripod.icon} />
                          <span className="index">
                            {index - Math.floor(index / 3) * 3 + 1}
                          </span>
                          {(tripod.levels ?? 1) > 1 && (
                            <span className="level">
                              {skill.tripods[index]}
                            </span>
                          )}
                        </div>
                      </Tooltip>
                    )
                  })}
              </div>
            )}
          </div>
        )}
        <div className="gems">
          <SkillGemSlot skill={skill} setSkill={setSkill} damage={true} />
          <SkillGemSlot skill={skill} setSkill={setSkill} damage={false} />
        </div>
        <div className="buffs">
          {Object.entries(buffs).map(([id, buff]) => (
            <Tooltip
              key={id}
              tooltip={
                <div className="buff-tooltip">
                  <h3>{buff.name}</h3>
                  <StatsList stats={buff.stats} />
                </div>
              }>
              <Icon
                icon={buff.icon}
                className={classNames(
                  'buff',
                  skill.flags?.includes(id) && 'active'
                )}
                onClick={() =>
                  setSkill((skill) => {
                    skill = { ...skill }
                    if (skill.flags?.includes(id))
                      skill.flags = skill.flags.filter((f) => f !== id)
                    else skill.flags = [...(skill.flags ?? []), id]
                    return skill
                  })
                }
              />
            </Tooltip>
          ))}
        </div>
        <SkillValues info={info} setSkill={setSkill} />
      </div>
      {selecting && <SkillMenu onSelect={onSelect} hidden={hidden} />}
    </>
  )
}

function EmptySkillRow({
  setActive,
  hidden
}: {
  setActive: (value: number) => void
  hidden: number[]
}) {
  const [selecting, setSelecting] = React.useState(false)

  const [list, setSkills] = selectConfig('skills')
  const onSelect = React.useCallback(
    (id: number | undefined) => {
      setSelecting(false)
      if (id != null) {
        const data = Data.skills[id]
        setActive(list.length)
        setSkills((skills) => {
          skills = skills.slice()
          skills.push({
            id,
            level: Math.min(data.maxLevel, 14),
            tripods: []
          })
          return skills
        })
      }
    },
    [setSkills, list]
  )

  return (
    <>
      <div className="skill-row" onClick={() => setSelecting(true)}>
        <div className="name">Add skill...</div>
      </div>
      {selecting && <SkillMenu onSelect={onSelect} hidden={hidden} />}
    </>
  )
}

export function SkillTable({ calc }: { calc: PlayerCalc }) {
  const [active, setActive] = React.useState<number>()

  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <div
      className="skill-table-ex"
      tabIndex={-1}
      ref={ref}
      onBlur={(e) => {
        if (!ref.current!.contains(e.relatedTarget)) {
          setActive(undefined)
        }
      }}>
      <div className="skill-header">
        <div className="values">
          <div>CD</div>
          <div>Mana</div>
          <div>Crit</div>
          <div>Dmg</div>
        </div>
      </div>
      <div className="skill-row summary">
        <div className="name">Total</div>
        <div className="buffs" />
        <div className="values">
          <div className="dps">DPS: {formatDmg(calc.summary.dps)}</div>
          <div>{calc.summary.duration.toFixed(1)}s</div>
          <div>{calc.summary.mana.toFixed(0)}</div>
          <div></div>
          <div>{formatDmg(calc.summary.damage)}</div>
        </div>
      </div>
      {calc.skills.map((skill, index) => (
        <SkillRow
          index={skill.index}
          key={index}
          info={skill}
          buffs={calc.buffs}
          hidden={calc.hiddenSkills}
          active={active}
          setActive={setActive}
        />
      ))}
      <EmptySkillRow setActive={setActive} hidden={calc.hiddenSkills} />
    </div>
  )
}
