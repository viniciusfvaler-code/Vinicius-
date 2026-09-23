import { useMemo, useState } from 'react'
import { navegar } from '../App'
import { cargaMaxima, excluirSessao, formatarData, formatarKg, lerHistorico, treinos } from '../storage'
import type { Sessao } from '../types'
import GraficoEvolucao, { type Ponto } from './GraficoEvolucao'

function duracao(s: Sessao) {
  const min = Math.round((new Date(s.fim).getTime() - new Date(s.inicio).getTime()) / 60_000)
  return min >= 60 ? `${Math.floor(min / 60)}h${String(min % 60).padStart(2, '0')}` : `${min} min`
}

export default function Historico() {
  const [historico, setHistorico] = useState(lerHistorico)
  const [aba, setAba] = useState<'evolucao' | 'sessoes'>('evolucao')

  // Exercícios da ficha atual + exercícios antigos que só existem no histórico.
  const nomes = useMemo(() => {
    const daFicha = treinos.flatMap((t) => t.exercicios.map((e) => ({ nome: e.nome, grupo: t.nome })))
    const conhecidos = new Set(daFicha.map((e) => e.nome))
    const antigos = [...new Set(historico.flatMap((s) => s.exercicios.map((e) => e.nome)))]
      .filter((n) => !conhecidos.has(n))
      .map((nome) => ({ nome, grupo: 'Fora da ficha atual' }))
    return [...daFicha, ...antigos]
  }, [historico])

  const [exercicio, setExercicio] = useState(() => {
    const ultimoComCarga = [...historico]
      .reverse()
      .flatMap((s) => s.exercicios)
      .find((e) => cargaMaxima(e.series) !== null)
    return ultimoComCarga?.nome ?? nomes[0]?.nome ?? ''
  })

  const pontos: Ponto[] = historico.flatMap((s) => {
    const ex = s.exercicios.find((e) => e.nome === exercicio)
    const max = ex ? cargaMaxima(ex.series) : null
    return ex && max !== null ? [{ data: s.fim, carga: max, series: ex.series.map((x) => x.carga) }] : []
  })

  function excluir(s: Sessao) {
    if (!window.confirm(`Excluir o treino de ${formatarData(s.fim, true)}?`)) return
    excluirSessao(s.id)
    setHistorico(lerHistorico())
  }

  const grupos = [...new Set(nomes.map((n) => n.grupo))]

  return (
    <main className="tela">
      <header className="topo">
        <button className="btn-voltar" onClick={() => navegar('/')} aria-label="Voltar">‹</button>
        <div className="topo-titulo">
          <h1>Histórico</h1>
          <span className="suave">{historico.length} treinos registrados</span>
        </div>
      </header>

      <div className="abas" role="tablist">
        <button role="tab" aria-selected={aba === 'evolucao'} onClick={() => setAba('evolucao')}>
          Evolução
        </button>
        <button role="tab" aria-selected={aba === 'sessoes'} onClick={() => setAba('sessoes')}>
          Treinos
        </button>
      </div>

      {aba === 'evolucao' ? (
        <section>
          <label className="rotulo-select">
            Exercício
            <select value={exercicio} onChange={(e) => setExercicio(e.target.value)}>
              {grupos.map((g) => (
                <optgroup key={g} label={g}>
                  {nomes
                    .filter((n) => n.grupo === g)
                    .map((n) => (
                      <option key={n.nome} value={n.nome}>{n.nome}</option>
                    ))}
                </optgroup>
              ))}
            </select>
          </label>

          {pontos.length === 0 ? (
            <p className="vazio">Nenhuma carga registrada para este exercício ainda.</p>
          ) : (
            <>
              <div className="resumo-evolucao">
                <div>
                  <span className="suave">Atual</span>
                  <strong>{formatarKg(pontos[pontos.length - 1].carga)}</strong>
                </div>
                <div>
                  <span className="suave">Recorde</span>
                  <strong>{formatarKg(Math.max(...pontos.map((p) => p.carga)))}</strong>
                </div>
                <div>
                  <span className="suave">Variação</span>
                  <strong>
                    {(() => {
                      const d = pontos[pontos.length - 1].carga - pontos[0].carga
                      return `${d > 0 ? '+' : ''}${formatarKg(d)}`
                    })()}
                  </strong>
                </div>
              </div>

              <GraficoEvolucao pontos={pontos} />

              <table className="tabela">
                <caption>Carga máxima por treino (e por série)</caption>
                <thead>
                  <tr><th>Data</th><th>Máx.</th><th>Séries</th></tr>
                </thead>
                <tbody>
                  {[...pontos].reverse().map((p, i) => (
                    <tr key={i}>
                      <td>{formatarData(p.data, true)}</td>
                      <td><strong>{formatarKg(p.carga)}</strong></td>
                      <td className="suave">{p.series.map((c) => c?.toLocaleString('pt-BR') ?? '–').join(' · ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </section>
      ) : (
        <section>
          {historico.length === 0 && <p className="vazio">Nenhum treino finalizado ainda.</p>}
          <ul className="lista-sessoes">
            {[...historico].reverse().map((s) => {
              const feitas = s.exercicios.flatMap((e) => e.series).filter((x) => x.feita).length
              const total = s.exercicios.flatMap((e) => e.series).length
              return (
                <li key={s.id} className="cartao-sessao">
                  <div className="sessao-topo">
                    <div>
                      <strong>{s.treinoNome}</strong>
                      <div className="suave">
                        {new Date(s.fim).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })}
                        {' · '}{duracao(s)} · {feitas}/{total} séries
                      </div>
                    </div>
                    <button className="btn-texto" onClick={() => excluir(s)} aria-label="Excluir treino">Excluir</button>
                  </div>
                  <ul className="sessao-exercicios">
                    {s.exercicios.map((e) => (
                      <li key={e.nome}>
                        <span>{e.nome}</span>
                        <span className="suave">
                          {e.series.some((x) => x.carga !== null)
                            ? `${e.series.map((x) => x.carga?.toLocaleString('pt-BR') ?? '–').join(' · ')} kg`
                            : `${e.series.filter((x) => x.feita).length}/${e.series.length}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </main>
  )
}
