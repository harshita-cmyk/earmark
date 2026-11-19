/**
 * App shell. Owner: Person 4.
 *
 * Routes (hash-based, no router dependency):
 *   #            Training: hear the clip, see the graph, answer questions
 *   #test        Test: the same loop with the graph hidden until you answer
 *   #playground  engine page (unlisted): pick any graph, play it, see the notes
 */
import { useEffect, useState } from 'react'
import { Lesson } from './components/Lesson.tsx'
import { Playground } from './components/Playground.tsx'

function useHash(): string {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

export default function App() {
  const hash = useHash()
  const playground = hash === '#playground'
  const testMode = hash === '#test'

  return (
    <main className="app">
      <header className="app-header">
        <h1><img src={`${import.meta.env.BASE_URL}images/earmark-logo.webp`} alt="Earmark" width="410" height="113" /></h1>
        <nav className="nav" aria-label="Prototype">
          <a href="#" aria-current={!playground && !testMode ? 'page' : undefined}>
            Training
          </a>
          <a href="#test" aria-current={testMode ? 'page' : undefined}>
            Test
          </a>
        </nav>
      </header>
      {playground ? <Playground /> : <Lesson key={testMode ? 'test' : 'training'} mode={testMode ? 'test' : 'tutorial'} showGraph={!testMode} />}
    </main>
  )
}
