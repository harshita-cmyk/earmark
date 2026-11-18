import { chartPosition } from '../graph/coordinates.ts'
import { GRAPHS } from '../data/graphs.ts'
import { buildPreamble, preambleText, sonify } from '../audio/sonification.ts'
import type { Player } from '../audio/usePlayer.ts'
import { LineChart } from './LineChart.tsx'
import { ProtocolSummary } from './ProtocolSummary.tsx'
import { StoppedPosition } from './StoppedPosition.tsx'
import { DataTable } from './DataTable.tsx'

export function ProtocolIntro({ player, onStart, mode = 'tutorial' }: { player: Player; onStart: () => void; mode?: 'tutorial' | 'test' }) {
  // A tutorial example avoids previewing a scored Test stimulus.
  const sample = GRAPHS[0]
  const sonification = sonify(sample)
  const preamble = buildPreamble(sonification, sample)
  const busy = player.status !== 'idle' && player.status !== 'error'
  return <section className="intro">
    <h2>{mode === 'test' ? 'Prepare for the test' : 'Training'}</h2>
    <p>Higher values produce higher piano notes. Before each graph a short header gives the title, the axes, the lowest, highest and starting values with their notes, the size of one step, and the length.</p>
    <p>Press Stop at any time to hear the position and value at that moment. Listen to the whole graph before answering; you may replay as often as you like.</p>
    <p>{mode === 'test'
      ? 'In the test the graph stays hidden until you have answered.'
      : 'In training the graph is shown while it plays, so you can match what you hear to what you see. The test uses the same loop with the graph hidden.'}</p>
    <ProtocolSummary graph={sample} sonification={sonification} headingLevel={3} />
    {mode === 'tutorial' && <><LineChart series={sample} activePosition={chartPosition(sonification, player.activeIndex, player.stoppedPosition)} /><DataTable graph={sample} /></>}
    <details><summary>Read the sample narration</summary><p>{preambleText(preamble)}</p></details>
    <StoppedPosition graph={sample} position={player.stoppedPosition} />
    {player.error && <p role="alert">{player.error}</p>}
    <div className="controls">
      <button type="button" onClick={() => busy ? player.stopAndAnnounce(sample) : void player.play(sonification, preamble)}>{busy ? 'Stop' : 'Play sample'}</button>
      <button type="button" className="secondary" onClick={onStart}>{mode === 'test' ? 'Start test' : 'Start training'}</button>
    </div>
  </section>
}
