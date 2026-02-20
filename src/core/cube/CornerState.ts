export class CornerState {
  readonly permutation: number[]
  readonly orientation: number[]

  constructor(
    permutation: number[],
    orientation: number[]
  ) {
    this.permutation = [...permutation]
    this.orientation = [...orientation]
  }

  static solved(): CornerState {
    return new CornerState(
      [0,1,2,3,4,5,6,7],
      [0,0,0,0,0,0,0,0]
    )
  }

  equals(other: CornerState): boolean {
    for (let i = 0; i < 8; i++) {
      if (this.permutation[i] !== other.permutation[i]) return false
      if (this.orientation[i] !== other.orientation[i]) return false
    }
    return true
  }

  toString(): string {
    return `P:${this.permutation.join(',')} | O:${this.orientation.join(',')}`
  }
}
