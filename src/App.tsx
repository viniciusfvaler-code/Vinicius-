import { useEffect, useState } from 'react'
import Inicio from './components/Inicio'
import TelaTreino from './components/TelaTreino'
import Historico from './components/Historico'

/** Rotas por hash (#/, #/treino/A, #/historico): funcionam offline e em qualquer hospedagem. */
function lerRota() {
  return window.location.hash.replace(/^#/, '') || '/'
}

export function navegar(rota: string) {
  window.location.hash = rota
}

export default function App() {
  const [rota, setRota] = useState(lerRota)

  useEffect(() => {
    const aoMudar = () => {
      setRota(lerRota())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', aoMudar)
    return () => window.removeEventListener('hashchange', aoMudar)
  }, [])

  const treino = rota.match(/^\/treino\/(\w+)/)
  if (treino) return <TelaTreino treinoId={treino[1]} />
  if (rota.startsWith('/historico')) return <Historico />
  return <Inicio />
}
