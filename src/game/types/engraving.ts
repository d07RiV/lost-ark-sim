import { StatValues, StatValuesPerLevel } from './stats'

export type Engraving = {
  name: string
  icon: string
  class?: string
  legacyStats: StatValuesPerLevel
  values?: {
    base: number
    epic?: number[]
    legendary?: number[]
    relic?: number[]
    stone?: number[]
  }[]
  stats?: (values: number[]) => Partial<StatValues>
}
