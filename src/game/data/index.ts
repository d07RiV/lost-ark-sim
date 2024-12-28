import Base from './json/base.json'
import Glaivier from './json/class.lancemaster.json'
import { GameDataExt } from './types'

const Data = Base as any as GameDataExt
for (const [key, value] of Object.entries(Glaivier)) {
  ;(Data as any)[key] = { ...(Data as any)[key], ...value }
}

export default Data
