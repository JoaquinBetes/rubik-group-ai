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
    return `P:${this.permutation.join(',')} | O:${this.orientation.join(',')}`
  }
}
