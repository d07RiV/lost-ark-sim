import React, { ReactNode } from 'react'
import { PlayerConfig } from './game/config'

type NestedKeys<T> = Cleanup<T> extends infer U
  ? U extends object
    ?
        | ValueOf<{
            [K in keyof U]-?: (x: PrefixKeys<NestedKeys<U[K]>, K>) => void
          }>
        | ((x: U) => void) extends (x: infer I) => void
      ? { [K in keyof I]: I[K] }
      : never
    : U
  : never

type Cleanup<T> = 0 extends 1 & T
  ? unknown
  : T extends readonly any[]
  ? Exclude<keyof T, keyof any[]> extends never
    ? { [k: `${number}`]: T[number] }
    : Omit<T, keyof any[]>
  : T

type PrefixKeys<V, K extends PropertyKey> = V extends object
  ? {
      [P in keyof V as `${Extract<K, string | number>}.${Extract<
        P,
        string | number
      >}`]: V[P]
    }
  : { [P in K]: V }

type ValueOf<T> = T[keyof T]

const Context = React.createContext<
  [PlayerConfig, React.Dispatch<React.SetStateAction<PlayerConfig>>]
>(undefined!)

const override: Partial<PlayerConfig> = {
  class: 305,
  level: 70,
  attackPower: 108044 / 1.0184,
  attackPowerBonus: 0.0184,
  crit: 66,
  specialization: 64 + 160 + 109,
  swiftness: 65 + 112,
  additionalDamage: 0.338,
  damageMultiplier: 1.024 * 1.0108 * 1.0189 * 1.04 * 1.15,
  critMultiplier: 1.12,
  critChance: 0.008,
  critDamage: 0,
  backMultiplier: 1,
  frontMultiplier: 1,
  synergy: {
    moveSpeed: 0.13,
    attackSpeed: 0.13,
    critChance: 0,
    critMultiplier: 0,
    additionalDamage: 0,
    evoDamage: 0,
    attackPower: 0,
    attackPowerMultiplier: 0,
    multipliers: [],
    armorReduction: 0,
    directionalMultipliers: []
  }
}

const defaultConfig: PlayerConfig = {
  class: 305,
  level: 70,
  attackPower: 100000,
  attackPowerBonus: 0,
  crit: 69,
  specialization: 72 + 160,
  swiftness: 70,
  additionalDamage: 0.3,
  damageMultiplier: 1,
  critMultiplier: 1,
  critChance: 0,
  critDamage: 0,
  backMultiplier: 1,
  frontMultiplier: 1,
  engravings: {},
  arkEnabled: true,
  arkPassive: {},
  arkEngravings: {},
  setBonus: undefined,
  skills: [],
  synergy: {
    moveSpeed: 0,
    attackSpeed: 0,
    critChance: 0,
    critMultiplier: 0,
    additionalDamage: 0,
    evoDamage: 0,
    attackPower: 0,
    attackPowerMultiplier: 0,
    multipliers: [],
    armorReduction: 0,
    directionalMultipliers: []
  },
  directionalFactor: 1
}

export function ConfigProvider({ children }: { children: ReactNode }) {
  const statePair = React.useState<PlayerConfig>(() => {
    try {
      const value = window.localStorage.getItem('la-sim-config')
      if (!value) return defaultConfig
      return Object.assign(JSON.parse(value), override)
    } catch (e) {
      return defaultConfig
    }
  })

  React.useEffect(() => {
    try {
      window.localStorage.setItem('la-sim-config', JSON.stringify(statePair[0]))
    } catch (e) {
      // do nothing
    }
  }, [statePair[0]])

  return <Context.Provider value={statePair}>{children}</Context.Provider>
}

export type SetterValue<Value extends unknown> =
  | Value
  | undefined
  | ((prev: Value) => Value | undefined)

export function useConfig() {
  return React.useContext(Context)
}

export function selectConfig<K extends keyof NestedKeys<PlayerConfig>>(
  path: K
): [
  NestedKeys<PlayerConfig>[K],
  React.Dispatch<SetterValue<NestedKeys<PlayerConfig>[K]>>
] {
  const [state, setState] = React.useContext(Context)

  type Value = NestedKeys<PlayerConfig>[K]
  const value = React.useMemo(() => {
    let value: any = state
    for (const p of path.split('.')) {
      value = value[p]
    }
    return value as Value
  }, [state, path])
  const setValue = React.useCallback(
    (value: SetterValue<Value>) =>
      setState((state) => {
        const keys = path.split('.')
        function modState(state: any, pos: number) {
          if (pos >= keys.length) {
            return typeof value === 'function' ? value(state) : value
          } else if (Array.isArray(state)) {
            const next = modState(state[keys[pos] as any], pos + 1)
            if (next === state[keys[pos] as any]) return state
            state = state.slice()
            if (next === undefined) state.splice(keys[pos] as any, 1)
            else state[keys[pos] as any] = next
            return state
          } else {
            const next = modState(state[keys[pos]], pos + 1)
            if (next === state[keys[pos]]) return state
            state = { ...state }
            if (next === undefined) delete state[keys[pos]]
            else state[keys[pos]] = next
            return state
          }
        }
        return modState(state, 0)
      }),
    [path]
  )
  return [value, setValue]
}
