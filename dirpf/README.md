# DIRPF Automático

Sistema para ler os documentos fiscais de uma pasta (por exemplo, na Área de Trabalho) e
preencher a Declaração de Ajuste Anual do IRPF no programa oficial da Receita Federal.

**Status:** etapa 0 concluída (pesquisa e arquitetura). Alvo: **DIRPF 2027**, Windows, uso
comercial, ITCD do RS. O código começa na etapa 1.

## Como vai funcionar

1. Você coloca os informes, recibos e a declaração do ano anterior numa pasta.
2. O sistema identifica cada documento, extrai os valores e os enquadra na ficha e no código
   certos.
3. Ele valida (limites, malha fina, ITCMD das doações) e compara os modelos completo e
   simplificado.
4. Você revisa cada lançamento, que mostra o documento de origem.
5. O sistema gera a cópia de segurança `.DBK`. No programa IRPF: **Ferramentas › Cópia de
   Segurança › Restaurar**, conferir e transmitir.

O sistema **nunca transmite** a declaração: a entrega é sempre sua, pelo programa oficial.

## Documentação da pesquisa

| Arquivo | Conteúdo |
| --- | --- |
| [docs/01-legislacao.md](docs/01-legislacao.md) | Leis, decreto, INs de cada exercício e P&R |
| [docs/02-regras-por-exercicio.md](docs/02-regras-por-exercicio.md) | Obrigatoriedade, tabelas, deduções e doações de 2022 a 2027 (Lei 15.270) |
| [docs/03-documentos-para-fichas.md](docs/03-documentos-para-fichas.md) | Cada documento → ficha e código do programa |
| [docs/04-doacoes-itcmd.md](docs/04-doacoes-itcmd.md) | Doações no IRPF, incentivadas e ITCD-RS |
| [docs/05-arquitetura.md](docs/05-arquitetura.md) | Arquitetura e decisões pendentes |
| [docs/06-roteiro.md](docs/06-roteiro.md) | Etapas de implementação |
| [docs/07-fontes.md](docs/07-fontes.md) | Fontes e limitações da pesquisa |
| [docs/08-uso-comercial-lgpd.md](docs/08-uso-comercial-lgpd.md) | Licença, LGPD, OCR e IA no uso comercial |

> Aviso: este sistema não é oficial nem tem vínculo com a Receita Federal. A responsabilidade
> pela declaração é do contribuinte.
