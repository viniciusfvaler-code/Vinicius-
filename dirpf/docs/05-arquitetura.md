# 5. Arquitetura proposta

## 5.1 Como "preencher o programa": três caminhos

| Caminho | Como funciona | Prós | Contras | Veredito |
| --- | --- | --- | --- | --- |
| **A. Gerar a cópia de segurança `.DBK`** | O sistema grava um `.DBK` no formato do PGD. O usuário restaura em **Ferramentas › Cópia de Segurança › Restaurar**, confere e transmite | Robusto; não depende de tela; a validação do programa roda na restauração; o leiaute vem dentro do PGD | Precisa acompanhar o leiaute a cada ano; os controles (CRC) devem estar certos | **Recomendado** |
| B. Automação de interface (robô clicando no programa Java) | pywinauto / Java Access Bridge / visão computacional digitam os campos | Usa o programa exatamente como uma pessoa usaria | Frágil (muda a cada versão), lento, quebra com pop-ups, difícil de testar | Só como plano B para campos que o `.DBK` não cubra |
| C. Só gerar um relatório para digitar à mão | Planilha/PDF com cada ficha e código | Simples | Não automatiza | Útil como saída complementar de conferência |

**Descoberta da pesquisa:** o formato `.DBK`/`.DEC` já foi documentado e implementado pelo
projeto livre [`mcp-imposto-de-renda`](https://github.com/ALASTecnology/mcp-imposto-de-renda)
(TypeScript, AGPL-3.0, exercício 2026). Ele lê e grava o `.DBK`, recalcula os controles
(CRC-32 por linha; o header usa o prefixo `<8 dígitos do CPF>.DBK`), calcula os dois modelos e
reproduz ao centavo 65 casos gerados pelo programa oficial. **O que falta nele é justamente o
que você pediu:** ler os documentos (PDF/imagem) de uma pasta. A proposta é **reutilizar o
núcleo** (`@mcp-imposto-de-renda/core`) e construir a camada de captura e extração. Em
28/10/2026 o pacote ainda não estava publicado no npm (`"private": true`). Por isso o reuso seria
por *git submodule* fixado num commit, ou por uma cópia do pacote `core` com a licença
preservada.

> Licença: a AGPL-3.0 permite usar e modificar. Se o sistema for **distribuído ou oferecido
> como serviço a terceiros** (por exemplo, a clientes de um escritório), o código combinado
> também precisa ser AGPL. Para uso próprio não há restrição. Decisão sua (ver § 5.6).

## 5.2 Fluxo

```
 Área de Trabalho/
 └── IRPF-2027/                      ← pasta monitorada (uma por contribuinte e exercício)
     ├── informes/*.pdf
     ├── recibos/*.pdf|jpg
     ├── declaracao-anterior.DEC
     └── pre-preenchida.json (opcional)
            │
            ▼
 [1] Coletor ─── inventário + hash de cada arquivo (não processa duas vezes)
            │
            ▼
 [2] Classificador ─── tipo do documento (informe PJ, banco, plano de saúde, recibo médico…)
            │            regras por palavras-chave/CNPJ conhecido → LLM como desempate
            ▼
 [3] Extrator ─── PDF com texto: pdfplumber/pdf.js (posições dos quadros)
            │      PDF escaneado/foto: OCR (Tesseract) → LLM com saída estruturada (JSON)
            │      cada campo leva a origem: arquivo, página, trecho
            ▼
 [4] Normalizador ─── CPF/CNPJ validados, valores em centavos, códigos das tabelas do PGD
            │
            ▼
 [5] Regras e motor ─── validações do doc 03 §3.5, alertas de malha, ITCMD,
            │            cálculo completo × simplificado, sugestão de doação direta
            ▼
 [6] Revisão humana ─── tela/relatório: cada lançamento com o documento de origem;
            │            o usuário aprova, corrige ou descarta
            ▼
 [7] Gerador ─── modelo JSON → .DBK (núcleo reutilizado) → validação dos controles
                 → grava em  Documentos/IRPF/<ano>/  (pasta onde o PGD procura)
                 + relatório PDF/HTML de conferência
```

## 5.3 Decisões técnicas

- **Linguagem:** TypeScript/Node 22, para usar o núcleo existente sem ponte entre linguagens. O
  OCR roda pelo Tesseract (binário local) e o PDF pelo `pdfjs-dist`.
- **Execução local:** os documentos fiscais não saem da máquina. Se for usado um LLM para extrair
  campos de documentos mal formatados, isso é **opcional** e explícito: o texto enviado é
  mostrado e pode ser anonimizado (CPF mascarado).
- **Rastreabilidade:** cada valor no `.DBK` aponta para o documento e a página de origem. Isso é
  essencial na malha fina.
- **Versionamento por exercício:** leiaute, tabelas e motor ficam em `exercicios/<ano>/`. O
  exercício 2027 (AC 2026, Lei 15.270) depende do PGD 2027, que sai por volta de março de 2027.
- **Nunca transmitir:** o sistema não envia a declaração. A transmissão é sempre pelo programa
  oficial, depois da conferência do usuário.
- **Backup:** antes de sobrescrever um `.DBK`, guardar uma cópia com data e hora.

## 5.4 Onde ficam os arquivos do programa oficial (Windows)

- Declarações em preenchimento: `%USERPROFILE%\Documents\ProgramasRFB\IRPF<ano>\aplicacao\dados\<CPF>\`
  **[conferir no seu computador]**. A cópia de segurança fica onde o usuário escolher.
- Transmitidas: `...\IRPF<ano>\transmitidas\` (`.DEC` + `.REC`).
- O leiaute oficial do arquivo vem dentro do PGD (`IRPF<ano>.zip`, pasta `lib`/recursos).

## 5.5 Estrutura de pastas no repositório

```
dirpf/
├── docs/                 ← esta pesquisa
├── src/
│   ├── coletor/          ← varredura da pasta e inventário
│   ├── classificador/
│   ├── extratores/       ← um por tipo de documento
│   ├── regras/           ← validações, malha, ITCMD por UF
│   ├── declaracao/       ← modelo JSON, ponte com o núcleo .DBK
│   └── cli.ts            ← `dirpf processar ~/Desktop/IRPF-2027`
├── exercicios/2026/, 2027/
└── test/fixtures/        ← documentos fictícios para testes
```

## 5.6 Decisões que dependem de você

1. **Sistema operacional** do computador onde o programa IRPF roda (Windows, Mac ou Linux).
2. **Estado (UF)** do ITCMD: a pesquisa usou SP.
3. **Uso:** só as suas declarações (e da família) ou de clientes? Isso afeta a licença AGPL, a
   LGPD e o volume.
4. **LLM na extração:** permitido (melhor precisão em recibos fora do padrão) ou 100% offline
   (só regras + OCR)?
5. **Exercício-alvo:** começar pela **DIRPF 2026** (retificadora/atrasada, motor já pronto) ou
   ir direto para a **DIRPF 2027**?
