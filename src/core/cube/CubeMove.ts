import { Permutation } from '../group/Permutation'
import { CornerState } from './CornerState'
import { EdgeState } from './EdgeState'
import { CubeState } from './CubeState'

export class CubeMove {
  readonly name: string

  readonly cornerPermutation: Permutation
  readonly cornerOrientationDelta: number[]

  readonly edgePermutation: Permutation
  readonly edgeOrientationDelta: number[]

  constructor(
    name: string,
    cornerPermutation: Permutation,
    cornerOrientationDelta: number[],
    edgePermutation: Permutation,
    edgeOrientationDelta: number[]
  ) {
    this.name = name
    this.cornerPermutation = cornerPermutation
    this.cornerOrientationDelta = cornerOrientationDelta
    this.edgePermutation = edgePermutation
    this.edgeOrientationDelta = edgeOrientationDelta
  }

  apply(state: CubeState): CubeState {
    const newCornerPerm = new Array(8)
    const newCornerOrient = new Array(8)

    const newEdgePerm = new Array(12)
    const newEdgeOrient = new Array(12)

    // --- Corners ---
    for (let i = 0; i < 8; i++) {
      const source = this.cornerPermutation.apply(i)

      newCornerPerm[i] = state.corners.permutation[source]

      newCornerOrient[i] =
        (state.corners.orientation[source] +
          this.cornerOrientationDelta[i]) % 3
    }

    // --- Edges ---
    for (let i = 0; i < 12; i++) {
      const source = this.edgePermutation.apply(i)

      newEdgePerm[i] = state.edges.permutation[source]

      newEdgeOrient[i] =
        (state.edges.orientation[source] +
          this.edgeOrientationDelta[i]) % 2
    }

    return new CubeState(
      new CornerState(newCornerPerm, newCornerOrient),
      new EdgeState(newEdgePerm, newEdgeOrient)
    )
  }

  inverse(): CubeMove {
    const invCornerPerm = this.cornerPermutation.inverse()
    const invEdgePerm = this.edgePermutation.inverse()

    const invCornerOrient = new Array(8)
    const invEdgeOrient = new Array(12)

    // invertir orientación corners
    for (let i = 0; i < 8; i++) {
      const source = invCornerPerm.apply(i)
      invCornerOrient[i] =
        (3 - this.cornerOrientationDelta[source]) % 3
    }

    // invertir orientación edges
    for (let i = 0; i < 12; i++) {
      const source = invEdgePerm.apply(i)
      invEdgeOrient[i] =
        (2 - this.edgeOrientationDelta[source]) % 2
    }

    return new CubeMove(
      this.name + "'",
      invCornerPerm,
      invCornerOrient,
      invEdgePerm,
      invEdgeOrient
    )
  }
}
