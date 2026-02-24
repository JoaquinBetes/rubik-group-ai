// HELPERS

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b)
}


export class Permutation {
  private readonly mapping: number[]

  constructor(mapping: number[]) {
    if (!Permutation.isValid(mapping)) {
      throw new Error('Invalid permutation')
    }
    this.mapping = [...mapping] // copia defensiva
  }

  // FACTORIES

  static identity(n: number): Permutation {
    return new Permutation([...Array(n).keys()])
  }

  static fromMapping(mapping: number[]): Permutation {
    return new Permutation(mapping)
  }

  // CORE OPERATIONS
  /*
   this ∘ other
   Aplica primero other, luego this
   */
  compose(other: Permutation): Permutation {
    if (this.size() !== other.size()) {
      throw new Error('Permutation size mismatch')
    }

    const result = other.mapping.map(i => this.mapping[i])
    return new Permutation(result)
  }

  inverse(): Permutation {
    const inv = new Array(this.mapping.length)

    for (let i = 0; i < this.mapping.length; i++) {
      inv[this.mapping[i]] = i
    }

    return new Permutation(inv)
  }

  apply(i: number): number {
    return this.mapping[i]
  }

  equals(other: Permutation): boolean {
    if (this.size() !== other.size()) return false

    for (let i = 0; i < this.mapping.length; i++) {
      if (this.mapping[i] !== other.mapping[i]) {
        return false
      }
    }

    return true
  }

  size(): number {
    return this.mapping.length
  }

  power(k: number): Permutation {
    if (!Number.isInteger(k)) {
        throw new Error('Exponent must be an integer')
    }

    const n = this.size()

    if (k === 0) {
        return Permutation.identity(n)
    }

    if (k < 0) {
        return this.inverse().power(-k)
    }

    let result: Permutation = Permutation.identity(n)
    let base: Permutation = this
    let exp = k

    while (exp > 0) {
        if (exp % 2 === 1) {
        result = base.compose(result)
        }
        base = base.compose(base)
        exp = Math.floor(exp / 2)
    }

    return result
    }

    order(): number {
        const n = this.mapping.length
        const visited = new Array(n).fill(false)
        const cycleLengths: number[] = []

        for (let i = 0; i < n; i++) {
            if (visited[i]) continue

            let length = 0
            let current = i

            while (!visited[current]) {
            visited[current] = true
            current = this.apply(current)
            length++
            }

            if (length > 1) {
            cycleLengths.push(length)
            }
        }

        if (cycleLengths.length === 0) {
            return 1 // identidad
        }

        return cycleLengths.reduce((acc, len) => lcm(acc, len), 1)
    }

    isEven(): boolean {
      const n = this.mapping.length
      const visited: boolean[] = new Array(n).fill(false)
      let parity = 0

      for (let i = 0; i < n; i++) {
        if (!visited[i]) {
          let length = 0
          let current = i

          while (!visited[current]) {
            visited[current] = true
            current = this.apply(current)
            length++
          }

          if (length > 0) {
            parity += (length - 1)
          }
        }
      }

      return parity % 2 === 0
    }


    // UTILITIES

    toString(): string {
    return `[${this.mapping.join(', ')}]`
    }

    // VALIDATION

    private static isValid(mapping: number[]): boolean {
    const n = mapping.length
    const seen = new Set(mapping)

    if (seen.size !== n) return false

    for (const value of mapping) {
        if (!Number.isInteger(value)) return false
        if (value < 0 || value >= n) return false
    }

    return true
    }
}
