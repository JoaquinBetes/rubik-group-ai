import { Permutation } from './Permutation'

export class Move {
  readonly name: string
  readonly permutation: Permutation

  constructor(name: string, permutation: Permutation) {
    this.name = name
    this.permutation = permutation
  }

  compose(other: Move): Move {
    return new Move(
      `${this.name} ${other.name}`,
      this.permutation.compose(other.permutation)
    )
  }

  inverse(): Move {
    return new Move(
      `${this.name}'`,
      this.permutation.inverse()
    )
  }

  power(k: number): Move {
    if (k === 1) return this

    return new Move(
      `${this.name}^${k}`,
      this.permutation.power(k)
    )
  }

  order(): number {
    return this.permutation.order()
  }
}
