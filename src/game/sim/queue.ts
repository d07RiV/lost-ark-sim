type SimEvent = {
  time: number
  func: () => any
}

export class EventQueue {
  private heap: SimEvent[] = []
  private map = new Map<SimEvent, number>()

  get empty() {
    return !this.heap.length
  }
  get length() {
    return this.heap.length
  }

  private siftUp(pos: number) {
    const e = this.heap[pos]
    while (pos > 0) {
      const next = (pos - 1) >> 1
      const parent = this.heap[next]
      if (parent.time <= e.time) break
      this.heap[pos] = parent
      this.map.set(parent, pos)
      pos = next
    }
    this.heap[pos] = e
    this.map.set(e, pos)
    return pos
  }
  private siftDown(pos: number) {
    const e = this.heap[pos]
    while (2 * pos + 1 < this.heap.length) {
      let next = 2 * pos + 1
      let child = this.heap[next]
      if (
        next + 1 < this.heap.length &&
        this.heap[next + 1].time < child.time
      ) {
        child = this.heap[++next]
      }
      if (e.time <= child.time) break
      this.heap[pos] = child
      this.map.set(child, pos)
      pos = next
    }
    this.heap[pos] = e
    this.map.set(e, pos)
    return pos
  }
  private remove(e: SimEvent) {
    const pos = this.map.get(e)
    if (pos === undefined) return
    const end = this.heap.pop()
    this.map.delete(e)
    if (pos < this.heap.length) {
      this.heap[pos] = end!
      this.siftDown(this.siftUp(pos))
    }
  }

  push(time: number, func: () => any) {
    const e: SimEvent = { time, func }
    this.heap.push(e)
    this.siftUp(this.heap.length - 1)
    return () => this.remove(e)
  }

  top() {
    return this.heap[0]?.time ?? Infinity
  }

  pop() {
    const result = this.heap[0]
    const end = this.heap.pop()
    this.map.delete(result)
    if (this.heap.length) {
      this.heap[0] = end!
      this.siftDown(0)
    }
    result.func()
    return result.time
  }
}
