import { Move } from '../group/Move'

export class CubeState {
  private readonly positions: number[]

  constructor(positions: number[]) {
    this.positions = [...positions]
  }

  static solved(n: number): CubeState {
    return new CubeState([...Array(n).keys()])
  }

  apply(move: Move): CubeState {
    const newPositions = new Array(this.positions.length)

    for (let i = 0; i < this.positions.length; i++) {
      const newIndex = move.permutation.apply(i)
      newPositions[newIndex] = this.positions[i]
    }

    return new CubeState(newPositions)
  }

  equals(other: CubeState): boolean {
    if (this.positions.length !== other.positions.length) return false

    for (let i = 0; i < this.positions.length; i++) {
      if (this.positions[i] !== other.positions[i]) {
        return false
      }
    }

    return true
  }

  toString(): string {
    return `[${this.positions.join(', ')}]`
  }
}
