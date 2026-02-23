import { CubeState } from './CubeState'
import { moves } from './moveDefinitions'

function inverseName(name: string): string {
  if (name.endsWith("'")) {
    return name.slice(0, -1)
  }
  return name + "'"
}

function depthLimitedDFS(
  state: CubeState,
  depth: number,
  path: string[],
  lastMove: string | null
): string[] | null {

  if (state.isSolved()) {
    return path
  }

  if (depth === 0) {
    return null
  }

  for (const move of moves) {

    // evitar inverso inmediato
    if (lastMove && move.name === inverseName(lastMove)) continue

    const nextState = move.apply(state)

    const result = depthLimitedDFS(
      nextState,
      depth - 1,
      [...path, move.name],
      move.name
    )

    if (result !== null) {
      return result
    }
  }

  return null
}

export function solve(
  initial: CubeState,
  maxDepth: number = 11
): string[] | null {

  for (let depth = 0; depth <= maxDepth; depth++) {
    console.log("Searching depth:", depth)

    const result = depthLimitedDFS(initial, depth, [], null)

    if (result !== null) {
      return result
    }
  }

  return null
}
