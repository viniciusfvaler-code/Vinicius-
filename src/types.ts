export interface Video {
  rotulo: string
  /** ID do vídeo no YouTube (ex.: "dQw4w9WgXcQ"). Vazio = abre a busca. */
  youtubeId: string
  busca: string
}

export interface Exercicio {
  nome: string
  series: number
  repeticoes: string
  observacao?: string
  videos: Video[]
}

export interface Treino {
  id: string
  nome: string
  foco: string
  exercicios: Exercicio[]
}

export interface SerieRegistro {
  feita: boolean
  /** Carga em kg; null quando não informada. */
  carga: number | null
}

export interface ExercicioRegistro {
  nome: string
  series: SerieRegistro[]
}

/** Treino concluído, salvo no histórico. */
export interface Sessao {
  id: string
  treinoId: string
  treinoNome: string
  inicio: string
  fim: string
  exercicios: ExercicioRegistro[]
}

/** Treino em andamento (sobrevive a fechar o app). */
export interface Rascunho {
  treinoId: string
  inicio: string
  /** Por nome do exercício: lista de séries com carga digitada como texto. */
  exercicios: Record<string, { feita: boolean; carga: string }[]>
}
