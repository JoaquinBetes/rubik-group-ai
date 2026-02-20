import { CubeState } from '../cube/CubeState'
import { Move } from '../group/Move'

export interface BFSResult {
  distances: Map<string, number>
}

export function bfsExplore(
  initial: CubeState,
  moves: Move[]
): BFSResult {
  const queue: CubeState[] = []
  const distances = new Map<string, number>()

  const initialKey = initial.toString()

  queue.push(initial)
  distances.set(initialKey, 0)

  while (queue.length > 0) {
    const current = queue.shift()!
    const currentKey = current.toString()
    const currentDist = distances.get(currentKey)!

    for (const move of moves) {
      const next = current.apply(move)
      const nextKey = next.toString()

      if (!distances.has(nextKey)) {
        distances.set(nextKey, currentDist + 1)
        queue.push(next)
      }
    }
  }

  return { distances }
}
