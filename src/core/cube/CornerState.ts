import { Permutation } from '../group/Permutation'

export class CornerState {
  readonly permutation: Permutation
  readonly orientation: number[]

  constructor(
    permutation: Permutation,
    orientation: number[]
  ) {
    if (orientation.length !== 8) {
      throw new Error('Corner orientation must have length 8')
    }

    this.permutation = permutation
    this.orientation = [...orientation]
  }

  static solved(): CornerState {
    return new CornerState(
      Permutation.identity(8),
      new Array(8).fill(0)
    )
  }

  equals(other: CornerState): boolean {
    return (
      this.permutation.equals(other.permutation) &&
      this.orientation.every((v, i) => v === other.orientation[i])
    )
  }

  isSolved(): boolean {
    return this.equals(CornerState.solved())
  }

  totalOrientation(): number {
    return this.orientation.reduce((acc, o) => acc + o, 0)
  }

  isOrientationValid(): boolean {
    return this.totalOrientation() % 3 === 0
  }

  toString(): string {
    return `P:${this.permutation.toString()} | O:${this.orientation.join(',')}`
  }
}