// Gera os ícones do PWA (halter estilizado) em public/. Uso: npm run icons
import sharp from 'sharp'
import { writeFileSync } from 'node:fs'

/** Halter em 512x512. `margem` encolhe o desenho (ícone "maskable" precisa de área segura). */
function svg({ fundo = true, margem = 0, raio = 112 } = {}) {
  const s = 1 - margem * 2
  const t = 256 * (1 - s)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  ${fundo ? `<rect width="512" height="512" rx="${raio}" fill="#ea580c"/>` : ''}
  <g transform="translate(${t} ${t}) scale(${s}) rotate(-35 256 256)" fill="#fff">
    <rect x="130" y="238" width="252" height="36" rx="12"/>
    <rect x="96" y="160" width="52" height="192" rx="18"/>
    <rect x="364" y="160" width="52" height="192" rx="18"/>
    <rect x="58" y="196" width="40" height="120" rx="14"/>
    <rect x="414" y="196" width="40" height="120" rx="14"/>
  </g>
</svg>`
}

const pasta = new URL('../public/', import.meta.url)
writeFileSync(new URL('favicon.svg', pasta), svg())

const png = (conteudo, tamanho, nome) =>
  sharp(Buffer.from(conteudo)).resize(tamanho, tamanho).png().toFile(new URL(nome, pasta).pathname)

await Promise.all([
  png(svg({ margem: 0.08 }), 192, 'pwa-192.png'),
  png(svg({ margem: 0.08 }), 512, 'pwa-512.png'),
  // Maskable e Apple: fundo cheio (o sistema recorta o formato)
  png(svg({ margem: 0.16, raio: 0 }), 512, 'pwa-maskable-512.png'),
  png(svg({ margem: 0.12, raio: 0 }), 180, 'apple-touch-icon.png'),
])
console.log('Ícones gerados em public/')
