export class EdgeState {
  readonly permutation: number[]
  readonly orientation: number[]

  constructor(permutation: number[], orientation: number[]) {
    if (permutation.length !== 12 || orientation.length !== 12) {
      throw new Error('EdgeState must have length 12')
    }

    if (!EdgeState.isValidPermutation(permutation)) {
      throw new Error('Invalid edge permutation')
    }

    if (!EdgeState.isValidOrientation(orientation)) {
      throw new Error('Invalid edge orientation')
    }

    this.permutation = [...permutation]   // copia defensiva
    this.orientation = [...orientation]  // copia defensiva
  }

  // Estado resuelto
  static solved(): EdgeState {
    return new EdgeState(
      [...Array(12).keys()],
      new Array(12).fill(0)
    )
  }

  equals(other: EdgeState): boolean {
    for (let i = 0; i < 12; i++) {
      if (this.permutation[i] !== other.permutation[i]) return false
      if (this.orientation[i] !== other.orientation[i]) return false
    }
    return true
  }

  // --- VALIDACIONES ---

  private static isValidPermutation(perm: number[]): boolean {
    const n = 12

    const seen = new Set(perm)
    if (seen.size !== n) return false

    for (const value of perm) {
      if (!Number.isInteger(value)) return false
      if (value < 0 || value >= n) return false
    }

    return true
  }

  private static isValidOrientation(orient: number[]): boolean {
    if (orient.some(o => o !== 0 && o !== 1)) {
      return false
    }

    // Invariante física del cubo:
    // la suma de orientaciones debe ser par
    const sum = orient.reduce((a, b) => a + b, 0)
    return sum % 2 === 0
  }
}
