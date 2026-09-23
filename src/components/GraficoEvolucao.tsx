import { useState, type PointerEvent } from 'react'
import { formatarData, formatarKg } from '../storage'

export interface Ponto {
  data: string
  carga: number
  series: (number | null)[]
}

const L = 360
const A = 200
const M = { topo: 16, dir: 16, base: 28, esq: 40 }

function ticks(min: number, max: number) {
  const passoBruto = (max - min) / 4 || 1
  const mag = 10 ** Math.floor(Math.log10(passoBruto))
  const passo = [1, 2, 2.5, 5, 10].map((f) => f * mag).find((p) => p >= passoBruto) ?? passoBruto
  const ini = Math.floor(min / passo) * passo
  const fim = Math.ceil(max / passo) * passo
  const lista: number[] = []
  for (let v = ini; v <= fim + passo / 2; v += passo) lista.push(+v.toFixed(2))
  return lista
}

/** Linha da carga máxima por treino. Toque/arraste para ver o valor de cada ponto. */
export default function GraficoEvolucao({ pontos }: { pontos: Ponto[] }) {
  const [ativo, setAtivo] = useState<number | null>(null)
  const valores = pontos.map((p) => p.carga)
  const marcas = ticks(Math.min(...valores), Math.max(...valores))
  const yMin = marcas[0]
  const yMax = marcas[marcas.length - 1] === yMin ? yMin + 1 : marcas[marcas.length - 1]

  const larguraUtil = L - M.esq - M.dir
  const x = (i: number) => M.esq + (pontos.length === 1 ? larguraUtil / 2 : (i / (pontos.length - 1)) * larguraUtil)
  const y = (v: number) => M.topo + (1 - (v - yMin) / (yMax - yMin)) * (A - M.topo - M.base)

  const caminho = pontos.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.carga).toFixed(1)}`).join(' ')

  function aoMover(e: PointerEvent<SVGSVGElement>) {
    const caixa = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - caixa.left) / caixa.width) * L
    let melhor = 0
    pontos.forEach((_, i) => {
      if (Math.abs(x(i) - px) < Math.abs(x(melhor) - px)) melhor = i
    })
    setAtivo(melhor)
  }

  const p = ativo !== null ? pontos[ativo] : null
  const ultimo = pontos.length - 1

  return (
    <figure className="grafico">
      <svg
        viewBox={`0 0 ${L} ${A}`}
        role="img"
        aria-label={`Evolução da carga máxima: de ${formatarKg(pontos[0].carga)} para ${formatarKg(pontos[ultimo].carga)}`}
        onPointerDown={aoMover}
        onPointerMove={aoMover}
        onPointerLeave={() => setAtivo(null)}
      >
        {marcas.map((m) => (
          <g key={m}>
            <line className="grade" x1={M.esq} x2={L - M.dir} y1={y(m)} y2={y(m)} />
            <text className="eixo" x={M.esq - 6} y={y(m)} dy="0.35em" textAnchor="end">
              {m.toLocaleString('pt-BR')}
            </text>
          </g>
        ))}
        <text className="eixo" x={x(0)} y={A - 8} textAnchor={pontos.length === 1 ? 'middle' : 'start'}>
          {formatarData(pontos[0].data)}
        </text>
        {pontos.length > 1 && (
          <text className="eixo" x={x(ultimo)} y={A - 8} textAnchor="end">
            {formatarData(pontos[ultimo].data)}
          </text>
        )}

        {p && <line className="mira" x1={x(ativo!)} x2={x(ativo!)} y1={M.topo} y2={A - M.base} />}
        <path className="linha" d={caminho} />
        {pontos.map((pt, i) => (
          <circle
            key={i}
            className="ponto"
            cx={x(i)}
            cy={y(pt.carga)}
            r={i === ativo ? 6 : i === ultimo ? 5 : 4}
          />
        ))}
        {!p && (
          <text className="rotulo-ponto" x={x(ultimo)} y={y(pontos[ultimo].carga) - 12} textAnchor={pontos.length === 1 ? 'middle' : 'end'}>
            {formatarKg(pontos[ultimo].carga)}
          </text>
        )}
      </svg>
      <figcaption className="dica">
        {p ? (
          <>
            <strong>{formatarData(p.data, true)}</strong>: {formatarKg(p.carga)}
            <span className="suave"> (séries: {p.series.map((c) => c?.toLocaleString('pt-BR') ?? '–').join(' · ')})</span>
          </>
        ) : (
          <span className="suave">Toque no gráfico para ver cada treino · carga máxima em kg</span>
        )}
      </figcaption>
    </figure>
  )
}
