import dados from './data/treinos.json'
import type { Rascunho, Sessao, Treino } from './types'

export const treinos: Treino[] = dados.treinos

const CHAVE_HISTORICO = 'treino:historico'
const CHAVE_RASCUNHO = 'treino:rascunho:'
const CHAVE_DESCANSO = 'treino:descanso'

function ler<T>(chave: string, padrao: T): T {
  try {
    const bruto = localStorage.getItem(chave)
    return bruto ? (JSON.parse(bruto) as T) : padrao
  } catch {
    return padrao
  }
}

function gravar(chave: string, valor: unknown) {
  try {
    if (valor === null) localStorage.removeItem(chave)
    else localStorage.setItem(chave, JSON.stringify(valor))
  } catch {
    // armazenamento cheio ou bloqueado: segue sem salvar
  }
}

/** Histórico em ordem cronológica (mais antigo primeiro). */
export function lerHistorico(): Sessao[] {
  return ler<Sessao[]>(CHAVE_HISTORICO, [])
}

export function salvarSessao(sessao: Sessao) {
  gravar(CHAVE_HISTORICO, [...lerHistorico(), sessao])
}

export function excluirSessao(id: string) {
  gravar(CHAVE_HISTORICO, lerHistorico().filter((s) => s.id !== id))
}

export function lerRascunho(treinoId: string): Rascunho | null {
  return ler<Rascunho | null>(CHAVE_RASCUNHO + treinoId, null)
}

export function salvarRascunho(treinoId: string, r: Rascunho | null) {
  gravar(CHAVE_RASCUNHO + treinoId, r)
}

export function lerDescanso(): number {
  return ler<number>(CHAVE_DESCANSO, 60)
}

export function salvarDescanso(segundos: number) {
  gravar(CHAVE_DESCANSO, segundos)
}

export function ultimaVezTreino(historico: Sessao[], treinoId: string): Sessao | undefined {
  for (let i = historico.length - 1; i >= 0; i--) {
    if (historico[i].treinoId === treinoId) return historico[i]
  }
}

/** Cargas da última vez em que o exercício teve alguma carga registrada. */
export function ultimasCargas(historico: Sessao[], nomeExercicio: string) {
  for (let i = historico.length - 1; i >= 0; i--) {
    const ex = historico[i].exercicios.find((e) => e.nome === nomeExercicio)
    if (ex && ex.series.some((s) => s.carga !== null)) {
      return { data: historico[i].fim, cargas: ex.series.map((s) => s.carga) }
    }
  }
}

export function cargaMaxima(series: { carga: number | null }[]): number | null {
  const valores = series.map((s) => s.carga).filter((c): c is number => c !== null)
  return valores.length ? Math.max(...valores) : null
}

export function formatarKg(kg: number | null | undefined) {
  if (kg === null || kg === undefined) return '–'
  return `${kg.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} kg`
}

export function formatarData(iso: string, comAno = false) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    ...(comAno ? { year: 'numeric' } : {}),
  })
}

export function haQuantoTempo(iso: string) {
  const inicioHoje = new Date()
  inicioHoje.setHours(0, 0, 0, 0)
  const dia = new Date(iso)
  dia.setHours(0, 0, 0, 0)
  const dias = Math.round((inicioHoje.getTime() - dia.getTime()) / 86_400_000)
  if (dias <= 0) return 'hoje'
  if (dias === 1) return 'ontem'
  return `há ${dias} dias`
}
