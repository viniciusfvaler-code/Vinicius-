# Meu Treino 🏋️

App de ficha de academia (PWA) em português. Funciona offline, instala no celular e guarda tudo no próprio aparelho (localStorage), sem login e sem servidor.

## Rodar no computador

```bash
npm install
npm run dev        # abre em http://localhost:5173
npm run build      # gera a versão de produção em dist/
npm run preview    # serve o dist/ (é aqui que o modo offline funciona)
```

## Trocar a ficha

Edite **`src/data/treinos.json`**. Cada exercício tem:

```json
{
  "nome": "Cadeira extensora",
  "series": 4,
  "repeticoes": "20/15/12/10",
  "observacao": "opcional",
  "videos": [
    { "rotulo": "Cadeira extensora", "youtubeId": "", "busca": "cadeira extensora execução correta" }
  ]
}
```

- `repeticoes`: com `/` e a mesma quantidade das séries (`20/15/12/10`), cada série mostra sua meta.
- `youtubeId` vazio: o botão abre a busca no YouTube com o texto de `busca`.
- `youtubeId` preenchido: o vídeo toca dentro do app. O ID é o trecho depois de `v=` no link
  (`youtube.com/watch?v=`**`abc123XYZ`**) ou depois de `youtu.be/`.
- O histórico é ligado ao **nome** do exercício. Mudou o nome? O histórico antigo continua
  aparecendo na tela de Histórico, no grupo "Fora da ficha atual".

## Ícones

`npm run icons` recria os ícones em `public/` a partir do desenho em `scripts/gerar-icones.mjs`.
