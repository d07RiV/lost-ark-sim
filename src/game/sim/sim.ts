import { CombatConfig } from '../config'
import { ActorState } from './actor'
import { EventQueue } from './queue'
import { SkillInstance } from './skillInstance'

export class Simulation {
  private queue = new EventQueue()

  player: ActorState
  target: ActorState

  time = 0

  constructor(public config: CombatConfig) {
    this.player = ActorState.player(this, config)
    this.target = ActorState.target(this, config)
  }

  at(time: number, func: () => any) {
    return this.queue.push(time, func)
  }
  after(d: number, func: () => any) {
    return this.queue.push(this.time + d, func)
  }

  effect(id: number, skill: SkillInstance) {
    console.log(`${this.time}: effect ${id}`)
    // apply effect
  }

  run(until?: number) {
    while (!this.queue.empty) {
      if (until !== undefined && this.queue.top() > until) break
      this.time = this.queue.top()
      this.queue.pop()
    }
  }
}
