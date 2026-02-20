import { Permutation } from './Permutation'
import { Move } from './Move'

/**
 * Generadores del grupo S3
 */
export function createS3Generators() {
  // r = (0 1 2)
  const r = new Move(
    'r',
    new Permutation([1, 2, 0])
  )

  // s = (1 2)
  const s = new Move(
    's',
    new Permutation([0, 2, 1])
  )

  return { r, s }
}

export function createBlockGenerators() {
  const a = new Move(
    'a',
    new Permutation([1, 0, 2, 3])
  )

  const b = new Move(
    'b',
    new Permutation([0, 1, 3, 2])
  )

  return { a, b }
}
