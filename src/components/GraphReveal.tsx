import type { Graph, Point, Sonification } from '../types.ts'
import { LineChart } from './LineChart.tsx'
import { DataTable } from './DataTable.tsx'

export function GraphReveal({ graph, activePosition = null, includeTable = true }: { graph: Graph; sonification: Sonification; activePosition?: Point | null; includeTable?: boolean }) {
  return <section className="reveal" aria-label="Graph">
    <h3>Graph and playback position</h3>
    <LineChart series={graph} activePosition={activePosition} />
    {includeTable && <DataTable graph={graph} />}
  </section>
}
