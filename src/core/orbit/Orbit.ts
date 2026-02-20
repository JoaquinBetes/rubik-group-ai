import { Move } from '../group/Move'

export class Orbit {
    static compute(
        group: Move[],
        start: number
    ): number[] {
        const result = new Set<number>()

        for (const g of group) {
        const image = g.permutation.apply(start)
        result.add(image)
        }

        return Array.from(result)
    }

    static decompose(
        group: Move[],
        degree: number
    ): number[][] {
        const visited = new Set<number>()
        const orbits: number[][] = []

        for (let i = 0; i < degree; i++) {
            if (visited.has(i)) continue

            const orbit = this.compute(group, i)

            orbit.forEach(x => visited.add(x))
            orbits.push(orbit)
        }

        return orbits
    }

}
