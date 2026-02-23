import { CornerState } from './CornerState'
import { moves } from './moveDefinitions'

export function getNeighbors(state: CornerState) {
  return moves.map(move => ({
    move: move.name,
    state: move.apply(state)
  }))
}
