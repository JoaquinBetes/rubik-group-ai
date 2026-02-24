import { Permutation } from '../group/Permutation'
import { CubeMove } from './CubeMove'

/*
  IMPORTANTE:
  Las definiciones internas son antihorarias (ccw).
  Exportamos su inversa como movimiento estándar horario.
*/

// -------------------------
// CORNERS
// -------------------------

const Ucorner = Permutation.fromMapping([3,0,1,2,4,5,6,7])
const Rcorner = Permutation.fromMapping([4,1,2,0,7,5,6,3])
const Fcorner = Permutation.fromMapping([1,5,2,3,0,4,6,7])
const Dcorner = Permutation.fromMapping([
  0,1,2,3,
  7,4,5,6
])
const Lcorner = Permutation.fromMapping([
  0,2,6,3,
  4,1,5,7
])
const Bcorner = Permutation.fromMapping([
  0,1,3,7,
  4,5,2,6
])



// -------------------------
// EDGES
// -------------------------

// U edges (ccw)
const Uedge = Permutation.fromMapping(
  [1,2,3,0,4,5,6,7,8,9,10,11]
)
// R edges (ccw)
const Redge = Permutation.fromMapping(
  [0,8,2,3,4,9,6,7,5,1,10,11]
)
// F edges (ccw)
const Fedge = Permutation.fromMapping(
  [11,1,2,3,8,5,6,7,0,9,10,4]
)
// D edges (ccw)
const Dedge = Permutation.fromMapping([
  0,1,2,3,
  7,4,5,6,
  8,9,10,11
])
// L edges (ccw)
const Ledge = Permutation.fromMapping([
  0,1,10,3,
  4,5,9,7,
  8,6,2,11
])
// B edges (ccw)
const Bedge = Permutation.fromMapping([
  0,1,2,11,
  4,5,6,10,
  8,9,3,7
])

const zeroCorners = [0,0,0,0,0,0,0,0]
const zeroEdges = new Array(12).fill(0)

// F edge flips (ccw)
const FedgeOrient = [
  1,0,0,0,
  1,0,0,0,
  1,0,0,1
]

// -------------------------
// DEFINICIONES CCW
// -------------------------

const Uccw = new CubeMove(
  'Uccw',
  Ucorner,
  zeroCorners,
  Uedge,
  zeroEdges
)

const Rccw = new CubeMove(
  'Rccw',
  Rcorner,
  [2,0,0,1,1,0,0,2],
  Redge,
  zeroEdges
)

const Fccw = new CubeMove(
  'Fccw',
  Fcorner,
  [1,2,0,0,2,1,0,0],
  Fedge,
  FedgeOrient
)

const Dccw = new CubeMove(
  'Dccw',
  Dcorner,
  zeroCorners,
  Dedge,
  zeroEdges
)

const Lccw = new CubeMove(
  'Lccw',
  Lcorner,
  [0,1,2,0,0,2,1,0],
  Ledge,
  zeroEdges
)

const Bccw = new CubeMove(
  'Bccw',
  Bcorner,
  [0,0,1,2,0,0,2,1],
  Bedge,
  [
    0,0,0,1,
    0,0,0,1,
    0,0,1,1
  ]
)

// -------------------------
// EXPORTAMOS HORARIOS
// -------------------------

export const U = new CubeMove(
  "U",
  Uccw.inverse().cornerPermutation,
  Uccw.inverse().cornerOrientationDelta,
  Uccw.inverse().edgePermutation,
  Uccw.inverse().edgeOrientationDelta
)

export const R = new CubeMove(
  "R",
  Rccw.inverse().cornerPermutation,
  Rccw.inverse().cornerOrientationDelta,
  Rccw.inverse().edgePermutation,
  Rccw.inverse().edgeOrientationDelta
)

export const F = new CubeMove(
  "F",
  Fccw.inverse().cornerPermutation,
  Fccw.inverse().cornerOrientationDelta,
  Fccw.inverse().edgePermutation,
  Fccw.inverse().edgeOrientationDelta
)

export const D = new CubeMove(
  "D",
  Dccw.inverse().cornerPermutation,
  Dccw.inverse().cornerOrientationDelta,
  Dccw.inverse().edgePermutation,
  Dccw.inverse().edgeOrientationDelta
)

export const L = new CubeMove(
  "L",
  Lccw.inverse().cornerPermutation,
  Lccw.inverse().cornerOrientationDelta,
  Lccw.inverse().edgePermutation,
  Lccw.inverse().edgeOrientationDelta
)

export const B = new CubeMove(
  "B",
  Bccw.inverse().cornerPermutation,
  Bccw.inverse().cornerOrientationDelta,
  Bccw.inverse().edgePermutation,
  Bccw.inverse().edgeOrientationDelta
)


export const moves = [
  U, U.inverse(),
  R, R.inverse(),
  F, F.inverse(),
  D, D.inverse(),
  L, L.inverse(),
  B, B.inverse()
]
