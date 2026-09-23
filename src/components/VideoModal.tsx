import { useEffect } from 'react'
import type { Video } from '../types'

export function urlBusca(v: Video) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(v.busca)}`
}

/** Vídeo sem youtubeId abre a busca do YouTube; com ID, toca dentro do app. */
export function abrirVideo(v: Video, tocar: (v: Video) => void) {
  if (v.youtubeId.trim()) tocar(v)
  else window.open(urlBusca(v), '_blank', 'noopener')
}

export default function VideoModal({ video, onFechar }: { video: Video; onFechar: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onFechar()
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [onFechar])

  return (
    <div className="modal-fundo" onClick={onFechar}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={video.rotulo}>
        <div className="modal-topo">
          <strong>{video.rotulo}</strong>
          <button className="btn-fechar" onClick={onFechar} aria-label="Fechar vídeo">✕</button>
        </div>
        <div className="video-caixa">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId.trim()}?playsinline=1&rel=0`}
            title={video.rotulo}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
