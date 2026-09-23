import { navegar } from '../App'
import { formatarData, haQuantoTempo, lerHistorico, lerRascunho, treinos, ultimaVezTreino } from '../storage'

export default function Inicio() {
  const historico = lerHistorico()

  return (
    <main className="tela">
      <header className="topo">
        <h1>Meu Treino</h1>
        <button className="btn-secundario" onClick={() => navegar('/historico')}>
          Histórico
        </button>
      </header>

      <ul className="lista-treinos">
        {treinos.map((t) => {
          const ultima = ultimaVezTreino(historico, t.id)
          const emAndamento = lerRascunho(t.id) !== null
          return (
            <li key={t.id}>
              <button className="cartao-treino" onClick={() => navegar(`/treino/${t.id}`)}>
                <span className="letra">{t.id}</span>
                <span className="cartao-texto">
                  <strong>{t.foco}</strong>
                  <span className="suave">
                    {t.exercicios.length} exercícios
                  </span>
                  <span className={emAndamento ? 'selo-andamento' : 'suave'}>
                    {emAndamento
                      ? 'Em andamento – toque para continuar'
                      : ultima
                        ? `Último: ${formatarData(ultima.fim)} (${haQuantoTempo(ultima.fim)})`
                        : 'Ainda não feito'}
                  </span>
                </span>
                <span className="seta" aria-hidden>›</span>
              </button>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
