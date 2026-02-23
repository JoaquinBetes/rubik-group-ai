import { Permutation } from '../group/Permutation'
import { CubeMove } from './CubeMove'

// --- Corner permutations ---

const Ucorner = Permutation.fromMapping([3,0,1,2,4,5,6,7])
const Rcorner = Permutation.fromMapping([4,1,2,0,7,5,6,3])
const Fcorner = Permutation.fromMapping([1,5,2,3,0,4,6,7])

// --- Edge identity (temporal) ---

const edgeIdentity = Permutation.identity(12)
const edgeZero = new Array(12).fill(0)

// --- U ---
export const U = new CubeMove(
  'U',
  Ucorner,
  [0,0,0,0,0,0,0,0],
  edgeIdentity,
  edgeZero
)

// --- R ---
export const R = new CubeMove(
  'R',
  Rcorner,
  [2,0,0,1,1,0,0,2],
  edgeIdentity,
  edgeZero
)

// --- F ---
export const F = new CubeMove(
  'F',
  Fcorner,
  [1,2,0,0,2,1,0,0],
  edgeIdentity,
  edgeZero
)

export const moves = [
  U,
  U.inverse(),
  R,
  R.inverse(),
  F,
  F.inverse()
]
