import { useEffect, useRef, useState } from 'react'
import { alertarFimDescanso } from '../alerta'

interface Props {
  /** Momento (ms) em que o descanso termina; null = sem descanso ativo. */
  fimEm: number | null
  onAjustar: (deltaSegundos: number) => void
  onFechar: () => void
}

function formatar(segundos: number) {
  const m = Math.floor(segundos / 60)
  const s = segundos % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function Descanso({ fimEm, onAjustar, onFechar }: Props) {
  const [agora, setAgora] = useState(Date.now)
  const alertado = useRef<number | null>(null)

  useEffect(() => {
    if (fimEm === null) return
    setAgora(Date.now())
    const id = window.setInterval(() => setAgora(Date.now()), 250)
    return () => window.clearInterval(id)
  }, [fimEm])

  const restante = fimEm === null ? 0 : Math.max(0, Math.ceil((fimEm - agora) / 1000))
  const acabou = fimEm !== null && restante === 0

  useEffect(() => {
    if (acabou && alertado.current !== fimEm) {
      alertado.current = fimEm
      alertarFimDescanso()
    }
  }, [acabou, fimEm])

  if (fimEm === null) return null

  return (
    <div className={`barra-descanso ${acabou ? 'acabou' : ''}`} role="timer" aria-live="polite">
      {acabou ? (
        <>
          <span className="descanso-tempo">Bora! Próxima série 💪</span>
          <button className="btn-descanso" onClick={onFechar}>OK</button>
        </>
      ) : (
        <>
          <button className="btn-descanso" onClick={() => onAjustar(-15)} aria-label="Menos 15 segundos">
            −15
          </button>
          <span className="descanso-tempo">
            <small>Descanso</small>
            {formatar(restante)}
          </span>
          <button className="btn-descanso" onClick={() => onAjustar(15)} aria-label="Mais 15 segundos">
            +15
          </button>
          <button className="btn-descanso" onClick={onFechar}>
            Pular
          </button>
        </>
      )}
    </div>
  )
}
