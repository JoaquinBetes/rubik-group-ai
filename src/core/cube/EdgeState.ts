import { Permutation } from '../group/Permutation'

export class EdgeState {
  readonly permutation: Permutation
  readonly orientation: number[]

  constructor(
    permutation: Permutation,
    orientation: number[]
  ) {
    if (orientation.length !== 12) {
      throw new Error('Edge orientation must have length 12')
    }

    this.permutation = permutation
    this.orientation = [...orientation]
  }

  static solved(): EdgeState {
    return new EdgeState(
      Permutation.identity(12),
      new Array(12).fill(0)
    )
  }

  equals(other: EdgeState): boolean {
    return (
      this.permutation.equals(other.permutation) &&
      this.orientation.every((v, i) => v === other.orientation[i])
    )
  }
}