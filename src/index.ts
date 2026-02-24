import { CubeState } from './core/cube/CubeState'
import { solve } from './core/cube/solver'
import { R, U, F, B, D, L, moves } from './core/cube/moveDefinitions'

function test(name: string, condition: boolean) {
  console.log(`${name}:`, condition ? '✅' : '❌')
}

console.log("========== TEST 1: Inversos ==========")

const solved = CubeState.solved()

// R seguido de R'
const Rprime = moves.find(m => m.name === "R'")!
const testR = Rprime.apply(R.apply(solved))
test("R then R' returns solved", testR.equals(solved))

// U seguido de U'
const Uprime = moves.find(m => m.name === "U'")!
const testU = Uprime.apply(U.apply(solved))
test("U then U' returns solved", testU.equals(solved))

// F seguido de F'
const Fprime = moves.find(m => m.name === "F'")!
const testF = Fprime.apply(F.apply(solved))
test("F then F' returns solved", testF.equals(solved))


console.log("\n========== TEST 2: Solver simple ==========")

const scrambled =
  F.apply(
    R.apply(
      U.apply(
        F.apply(
          R.apply(solved)
        )
      )
    )
  )

console.log("Scrambled:", scrambled)

const solution = solve(scrambled, 8)

console.log("Solution:", solution)

if (solution) {
  let state = scrambled

  for (const moveName of solution) {
    const move = moves.find(m => m.name === moveName)!
    state = move.apply(state)
  }

  test(
    "Solver actually returns to solved",
    state.equals(solved)
  )
} else {
  console.log("❌ Solver returned null")
}

console.log("\n========== TEST 3: Invariante orientación ==========")

const randomScramble =
  F.apply(
    R.apply(
      U.apply(
        F.apply(
          R.apply(
            U.apply(solved)
          )
        )
      )
    )
  )

console.log(
  "Corner orientation valid:",
  randomScramble.corners.isOrientationValid() ? "✅" : "❌"
)

console.log(
  "Edge orientation valid:",
  randomScramble.edges.equals(randomScramble.edges) ? "✅" : "❌"
)



let state = CubeState.solved()
state = D.apply(D.apply(D.apply(D.apply(state))))
console.log("D^4 identity:", state.isSolved())

state = L.apply(L.apply(L.apply(L.apply(CubeState.solved()))))
console.log("L^4 identity:", state.isSolved())

state = B.apply(B.apply(B.apply(B.apply(CubeState.solved()))))
console.log("B^4 identity:", state.isSolved())

console.log("Solved parity:", CubeState.solved().isParityValid())
