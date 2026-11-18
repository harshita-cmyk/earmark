import type { Graph, Sonification } from '../types.ts'
import { formatValue, valueUnit } from '../graph/descriptions.ts'

const seconds = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 })

/**
 * On-screen version of the spoken header: the same facts, one short row each.
 * Allowed before listening in every mode. No extrema locations or full data.
 */
export function ProtocolSummary({ graph, sonification: s, headingLevel = 2 }: { graph: Graph; sonification: Sonification; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2'
  const step = s.stepSemitones === 1 ? '' : ` per ${s.stepSemitones} semitones`
  return <section className="graph-information" aria-label="Graph information">
    <Heading>{graph.title}</Heading>
    <dl>
      <dt>Horizontal axis</dt><dd>{graph.xDescription ?? graph.xLabel}{graph.xUnit ? `, ${graph.xUnit}` : ''}</dd>
      <dt>Vertical axis</dt><dd>{graph.yDescription ?? graph.yLabel}, {valueUnit(graph).description}</dd>
      <dt>Lowest</dt><dd>{formatValue(graph, s.trough.value)}</dd>
      <dt>Highest</dt><dd>{formatValue(graph, s.peak.value)}</dd>
      <dt>Starting</dt><dd>{formatValue(graph, s.start.value)}</dd>
      <dt>Step</dt><dd>{formatValue(graph, s.unitsPerStep)} apart{step}</dd>
      <dt>Length</dt><dd>{seconds.format(s.durationMs / 1000)} seconds</dd>
    </dl>
  </section>
}
