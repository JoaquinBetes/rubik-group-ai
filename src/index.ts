import { Permutation } from './core/group/Permutation'
import { Move } from './core/group/Move'
import { createS3Generators } from './core/group/generators'
import { generateGroup } from './core/group/GroupBuilder'
import { Orbit } from './core/orbit/Orbit'
import { createBlockGenerators } from './core/group/generators'
import { CubeState } from './core/cube/CubeState'
import { bfsExplore } from './core/orbit/StateExplorer'


function test(name: string, condition: boolean) {
  console.log(`${name}:`, condition ? '✅' : '❌')
}

const { r, s } = createS3Generators()
const p = new Permutation([1, 2, 0]) // ciclo (0 1 2)
const id = Permutation.identity(3)

// 1. Inversa
test(
  'Inverse property',
  p.compose(p.inverse()).equals(id)
)

// 2. Potencia 0
test(
  'Power 0 is identity',
  p.power(0).equals(id)
)

// 3. Potencia positiva
test(
  'p^3 = identity',
  p.power(3).equals(id)
)

// 4. Potencia negativa
test(
  'p^-1 = inverse',
  p.power(-1).equals(p.inverse())
)

/* // 5. Asociatividad
const a = new Permutation([1, 2, 0])
const b = new Permutation([2, 0, 1])
const c = new Permutation([0, 2, 1])

test(
  'Associativity',
  a.compose(b).compose(c).equals(
    a.compose(b.compose(c))
  )
) */
// Test distribución correcta de power
const q = new Permutation([0, 2, 1]) // transposición (1 2)

test(
  'Power distributes: p^2 = p ∘ p',
  p.power(2).equals(p.compose(p))
)

test(
  'Negative power consistency',
  p.power(-2).equals(p.inverse().compose(p.inverse()))
)

test(
  'Order of 3-cycle',
  p.order() === 3
)

test(
  'Order of transposition',
  q.order() === 2
)

test(
  'Order of identity',
  id.order() === 1
)

const R = new Move('R', p)

test(
  'Move order matches permutation',
  R.order() === 3
)

const R2 = R.power(2)

test(
  'Move power works',
  R2.permutation.equals(p.power(2))
)

test('r order = 3', r.order() === 3)
test('s order = 2', s.order() === 2)

// S3 relation: s r s = r^-1
const left = s.compose(r).compose(s)
const right = r.inverse()

test(
  'Relation s r s = r^-1',
  left.permutation.equals(right.permutation)
)


const group = generateGroup([r, s], 3)

console.log('Generated group size:', group.length)

test('S3 has 6 elements', group.length === 6)

const orbit0 = Orbit.compute(group, 0)

console.log('Orbit of 0:', orbit0)

test(
  'Orbit size is 3',
  orbit0.length === 3
)

const orbits = Orbit.decompose(group, 3)

console.log('All orbits:', orbits)

test(
  'Only one orbit in S3 action',
  orbits.length === 1
)

test(
  'Orbit size is 3',
  orbits[0].length === 3
)

const { a, b } = createBlockGenerators()
const blockGroup = generateGroup([a, b], 4)

console.log('Block group size:', blockGroup.length)

test(
  'Block group size is 4',
  blockGroup.length === 4
)

const blockOrbits = Orbit.decompose(blockGroup, 4)

console.log('Block orbits:', blockOrbits)

test(
  'There are 2 orbits',
  blockOrbits.length === 2
)

test(
  'Each orbit has size 2',
  blockOrbits.every(o => o.length === 2)
)

const state0 = CubeState.solved(4)

const state1 = state0.apply(a)

console.log('Initial:', state0.toString())
console.log('After a:', state1.toString())

test(
  'Applying a swaps 0 and 1',
  state1.toString() === '[1, 0, 2, 3]'
)

const state2 = state1.apply(a)

test(
  'Applying a twice returns to solved',
  state2.equals(state0)
)

const initialState = CubeState.solved(4)
const result = bfsExplore(initialState, [a, b])

console.log('Total states found:', result.distances.size)

test(
  'Block system has 4 reachable states',
  result.distances.size === 4
)