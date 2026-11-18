import type { Graph, Point, Sonification } from '../types.ts'
import { LineChart } from './LineChart.tsx'
import { DataTable } from './DataTable.tsx'

export function GraphReveal({ graph, activePosition = null }: { graph: Graph; sonification: Sonification; activePosition?: Point | null }) {
  return <section className="reveal" aria-label="Graph">
    <h3>Graph and playback position</h3>
    <LineChart series={graph} activePosition={activePosition} />
    <DataTable graph={graph} />
  </section>
}
