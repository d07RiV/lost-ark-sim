export interface CombatModifierFuncs {
  modDamage(value: number): void
  modCritChance(value: number): void
  modCritDamage(value: number): void
  modPenetration(value: number): void
  modManaReduction(value: number): void
  modCooldownReduction(value: number): void
  modPartyHeal(value: number): void
  modPartyShield(value: number): void
  modAtkPowerAddend(value: number): void
  modAtkPowerMultiplier(value: number): void
}

export class CombatModifiers implements CombatModifierFuncs {
  private _damage?: number
  private _critChance?: number
  private _critDamage?: number
  private _penetration?: number
  private _manaReduction?: number
  private _cooldownReduction?: number
  private _partyHeal?: number
  private _partyShield?: number
  private _atkPowerAddend?: number
  private _atkPowerMultiplier?: number
  private _defReduction?: number

  private parent?: CombatModifiers
  private extraSources?: CombatModifiers[]

  constructor(parent?: CombatModifiers, extraSources?: CombatModifiers[]) {
    Object.defineProperties(this, {
      parent: { value: parent },
      extraSources: { value: extraSources }
    })
  }

  get damage(): number {
    return (this._damage ?? 1) * (this.parent?.damage ?? 1)
  }
  get critChance(): number {
    return (this._critChance ?? 0) + (this.parent?.critChance ?? 0)
  }
  get critDamage(): number {
    return (this._critDamage ?? 0) + (this.parent?.critDamage ?? 0)
  }
  get penetration(): number {
    return (this._penetration ?? 0) + (this.parent?.penetration ?? 0)
  }
  get manaReduction(): number {
    return (this._manaReduction ?? 0) + (this.parent?.manaReduction ?? 0)
  }
  get cooldownMultiplier(): number {
    let value = 1 - (this._cooldownReduction ?? 0)
    if (this.parent) value *= this.parent.cooldownMultiplier
    if (this.extraSources) {
      for (const src of this.extraSources) {
        value *= src.cooldownMultiplier
      }
    }
    return value
  }
  get partyHeal(): number {
    return (this._partyHeal ?? 0) + (this.parent?.partyHeal ?? 0)
  }
  get partyShield(): number {
    return (this._partyShield ?? 0) + (this.parent?.partyShield ?? 0)
  }
  get atkPowerAddend(): number {
    return (this._atkPowerAddend ?? 0) + (this.parent?.atkPowerAddend ?? 0)
  }
  get atkPowerMultiplier(): number {
    return (
      (this._atkPowerMultiplier ?? 1) * (this.parent?.atkPowerMultiplier ?? 1)
    )
  }
  get defReduction(): number {
    return (this._defReduction ?? 0) + (this.parent?._defReduction ?? 0)
  }

  modDamage(value: number) {
    this._damage = (this._damage ?? 1) * (1 + value)
  }
  modCritChance(value: number) {
    this._critChance = (this._critChance ?? 0) + value
  }
  modCritDamage(value: number) {
    this._critDamage = (this._critDamage ?? 0) + value
  }
  modPenetration(value: number) {
    this._penetration = (this._penetration ?? 0) + value
  }
  modManaReduction(value: number) {
    this._manaReduction = (this._manaReduction ?? 0) + value
  }
  modCooldownReduction(value: number) {
    this._cooldownReduction = (this._cooldownReduction ?? 0) + value
  }
  modPartyHeal(value: number) {
    this._partyHeal = (this._partyHeal ?? 0) + value
  }
  modPartyShield(value: number) {
    this._partyShield = (this._partyShield ?? 0) + value
  }
  modAtkPowerAddend(value: number) {
    this._atkPowerAddend = (this._atkPowerAddend ?? 0) + value
  }
  modAtkPowerMultiplier(value: number) {
    this._atkPowerMultiplier = (this._atkPowerMultiplier ?? 1) * (1 + value)
  }
  modDefReduction(value: number) {
    this._defReduction = (this._defReduction ?? 0) + value
  }
}
