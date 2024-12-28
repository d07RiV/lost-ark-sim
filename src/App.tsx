import React from 'react'
import './App.scss'
import { playerState } from './game/calc'

import Data from './game/data'
import { engravings } from './game/data/engraving'
import { Icon } from './Icon'
import NumberInput from './Number'
import { SkillTable } from './Skill'
import { selectConfig, useConfig } from './state'

const engravingLevels = [
  'Rare',
  'Epic 1/4',
  'Epic 2/4',
  'Epic 3/4',
  'Epic 4/4',
  'Legendary 1/4',
  'Legendary 2/4',
  'Legendary 3/4',
  'Legendary 4/4',
  'Relic 1/4',
  'Relic 2/4',
  'Relic 3/4',
  'Relic 4/4'
]

function EngravingLine({ id }: { id: number }) {
  const [engs, setEngravings] = selectConfig(`arkEngravings`)
  return (
    <tr>
      <td>
        <select
          value={id}
          onChange={(e) =>
            setEngravings((eng) => {
              eng = { ...eng }
              if (e.target.value) {
                const nid = Number(e.target.value)
                if (nid === id) return eng
                eng[nid] = eng[nid]
              }
              delete eng[id]
              return eng
            })
          }>
          <option>Remove</option>
          {Object.entries(engravings)
            .filter(([, info]) => info.values)
            .sort((a, b) => a[1].name.localeCompare(b[1].name))
            .map(([id, info]) => (
              <option key={id} value={id}>
                {info.name}
              </option>
            ))}
        </select>
      </td>
      <td>
        <select
          value={engs[id]?.level}
          onChange={(e) =>
            setEngravings((eng) => {
              eng = { ...eng }
              eng[id] = {
                level: Number(e.target.value),
                stone: eng[id]?.stone ?? 0
              }
              return eng
            })
          }>
          {engravingLevels.map((name, id) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          type="number"
          min={0}
          max={4}
          value={engs[id]?.stone ?? 0}
          onChange={(e) =>
            setEngravings((eng) => {
              eng = { ...eng }
              eng[id] = {
                level: eng[id]?.level ?? 0,
                stone: Number(e.target.value)
              }
              return eng
            })
          }
        />
      </td>
    </tr>
  )
}

function ArkPage({ group }: { group: number }) {
  const [charClass] = selectConfig('class')
  const [passives, setPassives] = selectConfig('arkPassive')
  const nodes = React.useMemo(() => {
    const rows: number[][] = [[], [], [], []]
    for (const [id, node] of Object.entries(Data.arkPassive)) {
      if (node.group !== group) continue
      if (node.class && node.class !== charClass) continue
      if (!rows[node.tier]) continue
      rows[node.tier][node.position] = Number(id)
    }
    return rows
  }, [charClass, group])
  const width = Math.max(...nodes.map((n) => n.length))
  return (
    <div className="ark-table">
      {nodes.map((row, index) => (
        <div className="row" key={index}>
          {[...Array(width)].map((_, i) => {
            const id = row[i]
            if (!id) return <div className="node" key={i} />
            const node = Data.arkPassive[id]
            return (
              <div className="node" key={i}>
                <Icon
                  icon={node.icon}
                  onClick={(e) =>
                    setPassives((points) => {
                      points = { ...points }
                      points[id] = Math.min(
                        node.levels,
                        (points[id] ?? 0) + (e.shiftKey ? 10 : 1)
                      )
                      return points
                    })
                  }
                  onContextMenu={(e) => {
                    e.preventDefault()
                    setPassives((points) => {
                      points = { ...points }
                      points[id] = Math.max(
                        0,
                        (points[id] ?? 0) - (e.shiftKey ? 10 : 1)
                      )
                      return points
                    })
                  }}
                />
                <div className="name">{node.name}</div>
                <NumberInput
                  min={0}
                  max={node.levels}
                  value={passives[id] ?? 0}
                  onChange={(value) =>
                    setPassives((points) => {
                      points = { ...points }
                      if (value) points[id] = value
                      else delete points[id]
                      return points
                    })
                  }
                />
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

function EngravingTable() {
  const [engs, setEngravings] = selectConfig('arkEngravings')

  return (
    <table className="engraving-table">
      <thead>
        <tr>
          <th>Engraving</th>
          <th>Rank</th>
          <th>Stone</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(engs).map((id) => (
          <EngravingLine key={id} id={Number(id)} />
        ))}
        <tr>
          <td>
            <select
              value=""
              onChange={(e) =>
                setEngravings((eng) => {
                  eng = { ...eng }
                  if (e.target.value) {
                    const nid = Number(e.target.value)
                    eng[nid] = {
                      level: 8,
                      stone: 0
                    }
                  }
                  return eng
                })
              }>
              <option disabled hidden value="">
                Select Engraving...
              </option>
              {Object.entries(engravings)
                .filter(([, info]) => info.values)
                .sort((a, b) => a[1].name.localeCompare(b[1].name))
                .map(([id, info]) => (
                  <option key={id} value={id}>
                    {info.name}
                  </option>
                ))}
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

function App() {
  const [config] = useConfig()
  const calc = playerState(config)
  return (
    <>
      <EngravingTable />
      <div className="ark-tables">
        <div>
          <h3>Evolution</h3>
          <ArkPage group={0} />
        </div>
        <div>
          <h3>Enlightenment</h3>
          <ArkPage group={1} />
        </div>
        <div>
          <h3>Leap</h3>
          <ArkPage group={2} />
        </div>
      </div>
      <SkillTable calc={calc} />
    </>
  )
}

export default App
