import { CornerState } from './CornerState'
import { EdgeState } from './EdgeState'

export class CubeState {
  readonly corners: CornerState
  readonly edges: EdgeState

  constructor(corners: CornerState, edges: EdgeState) {
    this.corners = corners
    this.edges = edges
  }

  static solved(): CubeState {
    return new CubeState(
      CornerState.solved(),
      EdgeState.solved()
    )
  }

  equals(other: CubeState): boolean {
    return (
      this.corners.equals(other.corners) &&
      this.edges.equals(other.edges)
    )
  }

  isSolved(): boolean {
    return this.equals(CubeState.solved())
  }
}
