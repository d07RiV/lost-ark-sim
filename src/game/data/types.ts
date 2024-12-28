import {
  EAddonType,
  ECombatEffectActionType,
  ECombatEffectActorType,
  ECombatEffectConditionType,
  EInputEventType,
  EInputTimingType,
  ESkillConstraintType,
  ESkillEffectChainActor,
  ESkillEffectChainType,
  EStatType
} from './enums'

export type ScalingValue =
  | number
  | ({
      [key in number]: number
    } & {
      clvl?: number
    })

export type ChainSkillEffect = {
  type: ESkillEffectChainType
  actor: ESkillEffectChainActor
  id: number
  chance: number
}

export type SkillEffect = {
  type: number
  values: ScalingValue[]
  weakpoint?: number
  identityType?: number
  directional?: number
  counter?: number
  ultimateMin?: number
  ultimateMax?: number
  multiHitCount?: number
  multiHitTime?: number
  aiMin?: number
  aiMax?: number
  divisionType?: number
  chainSkillEffects?: ChainSkillEffect[]
  chainCombatEffect?: number
}

export type SkillFeatureEffect = {
  type: number
  paramType?: number
  paramName0?: string
  paramName1?: string
  values: (number | undefined)[]
}

export type SkillTripodEffect = SkillFeatureEffect & {
  level: number
  includeTier?: number[]
  excludeTier?: number[]
}

export type SkillTripod = {
  name: string
  levels: number
  icon: string
  effects: SkillTripodEffect[]
}

export interface StageNotifyBase {
  type: string
  time: number
  duration: number
  repeat?: number
  interval?: number
  name?: string
  group?: string
  notifyType?: number
  disabled?: number
  triggerEffect?: number
}

export interface StageInputTiming extends StageNotifyBase {
  type: 'InputTiming'
  inputEvent: EInputEventType
  inputType: EInputTimingType
  instant?: number
  nextStage: number
  skills?: number[]
  categories?: number[]
}

export interface StageEffect extends StageNotifyBase {
  type: 'Effect'
  effects: {
    id: number
    uniqueId?: number
  }[]
}

export interface ActionConditionBase {
  type: string
  outputStage: number[]
  validOutputStage: number[]
}

// CEFActionConditionIdentity
// CEFActionConditionBattleMode
// CEFActionConditionHitReaction
// CEFActionConditionStanceMode
// CEFActionConditionProbablity
// CEFActionConditionWeaponMode
// CEFActionConditionSkillEffectHit
// CEFActionConditionPlayerClass
// CEFActionConditionStatusEffect
// CEFActionConditionTakeDamage
// CEFActionConditionPlayerSpecial
export interface ActionConditionBasic extends ActionConditionBase {
  type:
    | 'Identity'
    | 'BattleMode'
    | 'HitRaction'
    | 'StanceMode'
    | 'WeaponMode'
    | 'PlayerClass'
    | 'TakeDamage'
    | 'PlayerSpecial'
}
export interface ActionConditionProbablity extends ActionConditionBase {
  type: 'Probability'
  probability: number
}
export interface ActionConditionSkillEffectHit extends ActionConditionBase {
  type: 'SkillEffectHit'
  effectId: number[]
  grade: number
}
export interface ActionConditionStatusEffect extends ActionConditionBase {
  type: 'StatusEffect'
  existIds: number[]
  addedId: number
  removedId: number
}

export type ActionCondition =
  | ActionConditionBasic
  | ActionConditionProbablity
  | ActionConditionSkillEffectHit
  | ActionConditionStatusEffect

export interface StageCondition extends StageNotifyBase {
  type: 'Condition'
  condition: ActionCondition
  conditionOutputCount: number
}

export type StageNotify = StageInputTiming | StageEffect | StageCondition

export type ActionStage = {
  attackSpeed?: number
  nextStage: number
  length: number
  playRate: number
  buff?: number
  buffEnable?: number
  notify: StageNotify[]
}

export type ActionStageLayer = {
  stages: ActionStage[]
}

export interface ProjectileActionBase {
  actions?: ProjectileActionBase[]
  type: string
}

export interface ProjectileActionTimer extends ProjectileActionBase {
  type: 'Timer'
  delay: number
  repeat: number
  interval: number
}

export interface ProjectileActionEffect extends ProjectileActionBase {
  type: 'Effect'
  id: number
  uniqueId?: number
}

export interface ProjectileActionBuff extends ProjectileActionBase {
  type: 'Buff'
  buff: number
  buff2?: number
  conditionType?: number
  conditionValue?: number
}

export interface ProjectileActionTierChecker extends ProjectileActionBase {
  type: 'TierChecker'
  ifActions: ProjectileActionBase[]
  elseActions: ProjectileActionBase[]
  data: {
    activate: number
    tier1: number
    tier2: number
    tier3: number
  }[]
}

export type ProjectileAction =
  | ProjectileActionTimer
  | ProjectileActionEffect
  | ProjectileActionBuff
  | ProjectileActionTierChecker

export type ProjectileData = {
  lifetime: number
  effectStart: ProjectileAction[]
  effectHit: ProjectileAction[]
  effectEnd: ProjectileAction[]
  effectCollision: ProjectileAction[]
}

export type SkillConstraint = {
  type: ESkillConstraintType
  value: number
  value2: number
}

export type SkillDefinition = {
  name: string
  icon: string
  learn: number
  maxLevel: number
  bookType: number
  bookTypeValue?: number
  category: number
  sort: number
  awakening?: boolean
  super?: boolean
  identity?: boolean
  runes: number
  cooltime?: ScalingValue
  stackTime?: ScalingValue
  stackLimit?: number
  mana?: ScalingValue
  gauge0?: ScalingValue
  gauge1?: ScalingValue
  class?: number
  tripods?: SkillTripod[]
  layers: ActionStageLayer[]
  groups: number[]
  constraints?: SkillConstraint[]
  instanceEffect?: number
}

export type CombatEffect = {
  cooldown?: number
  conditions: {
    type: ECombatEffectConditionType
    actor: ECombatEffectActorType
    arg: number
  }[]
  actions: {
    type: ECombatEffectActionType
    actor: ECombatEffectActorType
    args: number[]
  }[]
}

export type SkillBuff = {
  name: string
  icon: string
  duration: ScalingValue
  type: number
  values: ScalingValue[]
  interval?: number
  firstInterval?: number
  expire?: {
    type: number
    effect: number
  }[]
  passive?: StatValue<ScalingValue>[]
  effect?: number
  ultimateMin?: number
  ultimateMax?: number
  unique?: number
  stacks?: number
  stackEffect?: {
    count: number
    effect: number
  }
}

export type StatValue<V = number> = {
  type: EAddonType
  stat: EStatType
  index: V
  value: V
}

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
  class?: number
  stats: StatValue<ScalingValue>[]
}

export type Engraving = {
  name: string
  icon: string
  penalty?: number
  season: number
  class?: number
  stats: StatValue<ScalingValue>[]
}

export type AbilityFeature = {
  type: number
  values: ScalingValue[]
  baseRatio?: number
  maxRatio?: number
  interval?: number
  cooldown?: ScalingValue
}

export type AddonSkillFeature = SkillFeatureEffect & {
  skill: number
  skillGroup: number
  skillTier: number
}

export type RuneDefinition = {
  name: string
  icon: string
  grade: number
  type: number
  effect: StatValue
}

export type GameData = {
  runes: Record<number, RuneDefinition>
  arkPassive: Record<number, ArkPassive>
  engravings: Record<number, Engraving>
  skills: Record<number, SkillDefinition>
  effects: Record<number, SkillEffect>
  combatEffects: Record<number, CombatEffect[]>
  buffs: Record<number, SkillBuff>
  projectiles: Record<number, ProjectileData>
  abilityFeatures: Record<number, AbilityFeature>
  skillFeatures: Record<number, AddonSkillFeature[]>
}

export type GameDataExt = GameData & {
  statLevelScaling: Record<number, Record<number, number>>
  statConversion: Record<
    number,
    Record<
      number,
      {
        stat: EStatType
        coeff: number
      }
    >
  >
}
