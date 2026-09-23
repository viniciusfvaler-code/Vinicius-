import { useCallback, useEffect, useMemo, useState } from 'react'
import { navegar } from '../App'
import { prepararAudio } from '../alerta'
import {
  formatarData,
  formatarKg,
  lerDescanso,
  lerHistorico,
  lerRascunho,
  salvarDescanso,
  salvarRascunho,
  salvarSessao,
  treinos,
  ultimasCargas,
} from '../storage'
import type { Exercicio, Rascunho, Treino, Video } from '../types'
import Descanso from './Descanso'
import VideoModal, { abrirVideo } from './VideoModal'

function novoRascunho(treino: Treino): Rascunho {
  return {
    treinoId: treino.id,
    inicio: new Date().toISOString(),
    exercicios: Object.fromEntries(
      treino.exercicios.map((e) => [e.nome, Array.from({ length: e.series }, () => ({ feita: false, carga: '' }))]),
    ),
  }
}

/** Garante que o rascunho acompanha a ficha, mesmo que o JSON tenha mudado. */
function alinhar(r: Rascunho, treino: Treino): Rascunho {
  const base = novoRascunho(treino)
  for (const ex of treino.exercicios) {
    const salvas = r.exercicios[ex.nome] ?? []
    base.exercicios[ex.nome] = base.exercicios[ex.nome].map((s, i) => salvas[i] ?? s)
  }
  return { ...base, inicio: r.inicio }
}

function paraNumero(texto: string): number | null {
  const n = parseFloat(texto.replace(',', '.'))
  return Number.isFinite(n) && n >= 0 ? n : null
}

/** "20/15/12/10" com 4 séries vira uma meta por série. */
function repsDaSerie(ex: Exercicio, i: number) {
  const partes = ex.repeticoes.split('/').map((p) => p.trim())
  return partes.length === ex.series ? partes[i] : ex.repeticoes
}

function resumoCargas(cargas: (number | null)[]) {
  const validas = cargas.filter((c): c is number => c !== null)
  if (!validas.length) return ''
  if (validas.every((c) => c === validas[0])) return formatarKg(validas[0])
  return `${validas.map((c) => c.toLocaleString('pt-BR')).join(' / ')} kg`
}

/** Mantém a tela acesa durante o treino (quando o navegador permite). */
function useTelaAcesa() {
  useEffect(() => {
    let trava: WakeLockSentinel | undefined
    const pedir = async () => {
      try {
        if (document.visibilityState === 'visible') trava = await navigator.wakeLock?.request('screen')
      } catch {
        // sem suporte ou sem permissão
      }
    }
    void pedir()
    document.addEventListener('visibilitychange', pedir)
    return () => {
      document.removeEventListener('visibilitychange', pedir)
      void trava?.release()
    }
  }, [])
}

export default function TelaTreino({ treinoId }: { treinoId: string }) {
  const treino = treinos.find((t) => t.id === treinoId)
  const historico = useMemo(lerHistorico, [])
  const [rascunho, setRascunho] = useState<Rascunho | null>(() => {
    const salvo = treino && lerRascunho(treino.id)
    return salvo && treino ? alinhar(salvo, treino) : null
  })
  const [descansoPadrao, setDescansoPadrao] = useState(lerDescanso)
  const [fimDescanso, setFimDescanso] = useState<number | null>(null)
  const [video, setVideo] = useState<Video | null>(null)
  const fecharVideo = useCallback(() => setVideo(null), [])

  useTelaAcesa()

  if (!treino) {
    return (
      <main className="tela">
        <p>Treino não encontrado.</p>
        <button className="btn-secundario" onClick={() => navegar('/')}>Voltar</button>
      </main>
    )
  }

  const atual = rascunho ?? novoRascunho(treino)

  function atualizar(nome: string, i: number, mudanca: Partial<{ feita: boolean; carga: string }>) {
    const series = atual.exercicios[nome].map((s, j) => (j === i ? { ...s, ...mudanca } : s))
    const novo = { ...atual, exercicios: { ...atual.exercicios, [nome]: series } }
    setRascunho(novo)
    salvarRascunho(treino!.id, novo)
  }

  function alternarSerie(nome: string, i: number) {
    prepararAudio()
    const serie = atual.exercicios[nome][i]
    const feita = !serie.feita
    // Campo vazio ao marcar: assume a mesma carga da última vez (o número cinza no campo).
    const anterior = ultimasCargas(historico, nome)?.cargas[i]
    const carga = feita && !serie.carga && anterior != null ? anterior.toLocaleString('pt-BR') : serie.carga
    atualizar(nome, i, { feita, carga })
    setFimDescanso(feita ? Date.now() + descansoPadrao * 1000 : null)
  }

  function mudarPadrao(delta: number) {
    const novo = Math.min(600, Math.max(15, descansoPadrao + delta))
    setDescansoPadrao(novo)
    salvarDescanso(novo)
  }

  const total = treino.exercicios.reduce((n, e) => n + e.series, 0)
  const feitas = Object.values(atual.exercicios).flat().filter((s) => s.feita).length

  function finalizar() {
    const aviso =
      feitas === 0
        ? 'Nenhuma série marcada. Salvar mesmo assim?'
        : `Finalizar o ${treino!.nome}? (${feitas} de ${total} séries feitas)`
    if (!window.confirm(aviso)) return
    salvarSessao({
      id: crypto.randomUUID?.() ?? String(Date.now()),
      treinoId: treino!.id,
      treinoNome: `${treino!.nome} – ${treino!.foco}`,
      inicio: atual.inicio,
      fim: new Date().toISOString(),
      exercicios: treino!.exercicios.map((e) => ({
        nome: e.nome,
        series: atual.exercicios[e.nome].map((s) => ({ feita: s.feita, carga: paraNumero(s.carga) })),
      })),
    })
    salvarRascunho(treino!.id, null)
    navegar('/historico')
  }

  function descartar() {
    if (!window.confirm('Descartar o que foi marcado neste treino?')) return
    salvarRascunho(treino!.id, null)
    setRascunho(null)
    setFimDescanso(null)
  }

  return (
    <main className={`tela ${fimDescanso !== null ? 'com-descanso' : ''}`}>
      <header className="topo">
        <button className="btn-voltar" onClick={() => navegar('/')} aria-label="Voltar">‹</button>
        <div className="topo-titulo">
          <h1>{treino.nome}</h1>
          <span className="suave">{treino.foco}</span>
        </div>
      </header>

      <div className="barra-info">
        <div className="progresso" aria-label={`${feitas} de ${total} séries`}>
          <div style={{ width: `${(feitas / total) * 100}%` }} />
        </div>
        <div className="ajuste-descanso">
          <span>Descanso</span>
          <button onClick={() => mudarPadrao(-15)} aria-label="Diminuir descanso">−</button>
          <strong>{descansoPadrao}s</strong>
          <button onClick={() => mudarPadrao(15)} aria-label="Aumentar descanso">+</button>
        </div>
      </div>

      <ol className="lista-exercicios">
        {treino.exercicios.map((ex) => {
          const series = atual.exercicios[ex.nome]
          const ultima = ultimasCargas(historico, ex.nome)
          const completo = series.every((s) => s.feita)
          return (
            <li key={ex.nome} className={`cartao-exercicio ${completo ? 'completo' : ''}`}>
              <div className="ex-cabecalho">
                <h2>{completo && <span aria-label="concluído">✓ </span>}{ex.nome}</h2>
                <p className="ex-meta">
                  {ex.series} séries · {ex.repeticoes}
                </p>
                {ultima && (
                  <p className="ultima-carga">
                    Última vez: <strong>{resumoCargas(ultima.cargas)}</strong>{' '}
                    <span className="suave">({formatarData(ultima.data)})</span>
                  </p>
                )}
                {ex.observacao && <p className="observacao">{ex.observacao}</p>}
              </div>

              <div className="videos">
                {ex.videos.map((v) => (
                  <button key={v.rotulo} className="btn-video" onClick={() => abrirVideo(v, setVideo)}>
                    ▶ {ex.videos.length > 1 ? v.rotulo : 'Ver vídeo'}
                    {!v.youtubeId.trim() && <span className="suave"> (YouTube)</span>}
                  </button>
                ))}
              </div>

              <div className="series">
                {series.map((s, i) => (
                  <div key={i} className={`serie ${s.feita ? 'feita' : ''}`}>
                    <button
                      className="btn-serie"
                      onClick={() => alternarSerie(ex.nome, i)}
                      aria-pressed={s.feita}
                    >
                      <span className="check">{s.feita ? '✓' : i + 1}</span>
                      <span className="serie-reps">{repsDaSerie(ex, i)}</span>
                    </button>
                    <label className="campo-carga">
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder={ultima?.cargas[i]?.toLocaleString('pt-BR') ?? '0'}
                        value={s.carga}
                        onChange={(e) => atualizar(ex.nome, i, { carga: e.target.value.replace(/[^\d.,]/g, '') })}
                        aria-label={`Carga da série ${i + 1} em kg`}
                      />
                      <span>kg</span>
                    </label>
                  </div>
                ))}
              </div>
            </li>
          )
        })}
      </ol>

      <div className="acoes-finais">
        <button className="btn-principal" onClick={finalizar}>
          Finalizar treino
        </button>
        {rascunho && (
          <button className="btn-texto" onClick={descartar}>
            Descartar treino em andamento
          </button>
        )}
      </div>

      <Descanso
        fimEm={fimDescanso}
        onAjustar={(d) => setFimDescanso((f) => (f === null ? f : Math.max(Date.now(), f + d * 1000)))}
        onFechar={() => setFimDescanso(null)}
      />

      {video && <VideoModal video={video} onFechar={fecharVideo} />}
    </main>
  )
}
