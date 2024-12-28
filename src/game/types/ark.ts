import { StatMultiplierKey, StatValues } from './stats'

export type ArkPassive = {
  name: string
  icon: string
  points: number
  levels: number
  group: number
  tier: number
  position: number
  exclusive?: number
  requires?: {
    id: number
    level: number
  }
  class?: string
  stats?:
    | Partial<Omit<StatValues, StatMultiplierKey>>
    | Partial<StatValues>[]
    | ((points: number) => Partial<StatValues>)
  skill?: number
}
