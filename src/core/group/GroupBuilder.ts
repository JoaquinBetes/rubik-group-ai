import { Permutation } from './Permutation'
import { Move } from './Move'

export function generateGroup(
  generators: Move[],
  degree: number
): Move[] {
  const identity = new Move(
    'e',
    Permutation.identity(degree)
  )

  const elements: Move[] = [identity]
  const queue: Move[] = [identity]

  while (queue.length > 0) {
    const current = queue.shift()!

    for (const g of generators) {
      const nextPerm = current.permutation.compose(g.permutation)

      const alreadyExists = elements.some(e =>
        e.permutation.equals(nextPerm)
      )

      if (!alreadyExists) {
        const newMove = new Move(
          `${current.name}${g.name}`,
          nextPerm
        )

        elements.push(newMove)
        queue.push(newMove)
      }
    }
  }

  return elements
}