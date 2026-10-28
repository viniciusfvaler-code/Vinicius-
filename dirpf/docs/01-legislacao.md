# 1. Base legal do IRPF

Mapa das normas que o sistema precisa respeitar. A coluna **Uso no sistema** diz onde cada
norma entra: na extração dos documentos, nas regras de validação ou no cálculo.

> Pesquisa feita em 28/10/2026. Os sites gov.br, planalto.gov.br e das Sefaz estavam
> bloqueados na rede deste ambiente, então os textos integrais não foram lidos direto da
> fonte. As informações vêm de buscas, de fontes secundárias e das tabelas extraídas do
> programa oficial (PGD) pelo projeto `mcp-imposto-de-renda` (ver `07-fontes.md`). Antes de
> pôr em produção, confira cada item marcado **[conferir]** no texto oficial.

## 1.1 Leis federais

| Norma | Assunto | Uso no sistema |
| --- | --- | --- |
| **Lei 7.713/1988** | Lei-base do IRPF: incidência, rendimentos isentos (art. 6º: doença grave, FGTS, indenizações, parcela isenta 65+, doações e heranças), ganho de capital (arts. 3º e 18, reduções para imóveis antigos) | Classificar rendimentos isentos e apurar o ganho de capital |
| **Lei 8.134/1990** | Carnê-leão e livro-caixa (art. 6º) | Autônomos, aluguéis recebidos de PF |
| **Lei 9.250/1995** | Declaração de ajuste: deduções (art. 8º), desconto simplificado (art. 10), cálculo (arts. 11 a 13), incentivos/doações (art. 12), tabela | **Núcleo do motor de cálculo** |
| **Lei 11.033/2004** | Isenção de ações (R$ 20 mil/mês), IRRF em bolsa | Renda variável |
| **Lei 11.196/2005** | Art. 39: isenção na venda de imóvel residencial com reaplicação em 180 dias; art. 40: fatores de redução FR1/FR2 | Ganho de capital de imóveis |
| **Lei 8.981/1995** | Art. 21: alíquotas progressivas do ganho de capital (15% a 22,5%) | GCAP |
| **Lei 8.069/1990 (ECA), art. 260** e **Lei 12.213/2010 (Idoso)** | Doações a fundos da criança/adolescente e da pessoa idosa | Ficha Doações / doação direta na declaração |
| **Lei 13.797/2019** | Doação direta ao Fundo do Idoso na própria declaração | Doações diretas |
| **Lei 14.663/2023** | Tabela mensal a partir de maio/2023 (isenção R$ 2.112,00) | Tabela AC 2023 |
| **Lei 14.754/2023** | Aplicações financeiras e entidades controladas no exterior (offshore), trusts; 15% anual na DAA | Ficha de bens/aplicações no exterior (a partir da DIRPF 2024/2025) |
| **Lei 14.848/2024** | Tabela mensal a partir de fev/2024 (isenção R$ 2.259,20) | Tabela AC 2024 |
| **Lei 15.191/2025** | Tabela mensal a partir de maio/2025 (isenção R$ 2.428,80); tabela anual da DIRPF 2026 | Tabela AC 2025 |
| **Lei 15.270/2025** | Isenção efetiva até R$ 5.000/mês por redução de imposto (arts. 3º-A e 11-A da Lei 9.250); tributação mínima de altas rendas (IRPFM, art. 16-A); retenção de 10% sobre dividendos acima de R$ 50 mil/mês por fonte | **Motor de 2027** (AC 2026) |
| **LC 214/2025 e LC 227/2026** | Reforma tributária; a LC 227/2026 dá normas gerais do ITCMD (progressividade obrigatória, valor de mercado, soma de doações sucessivas) | Alertas de ITCMD |

## 1.2 Regulamento

- **Decreto 9.580/2018 (RIR/2018).** Consolida a legislação. Pontos úteis: art. 35
  (isentos), arts. 66 a 75 (deduções, sujeitas a comprovação), art. 73 § 1º (o excedente do
  limite de uma pessoa não passa para outra), art. 76 (base de cálculo), art. 77 (desconto
  simplificado).

## 1.3 Instruções normativas da DIRPF (uma por exercício)

| Exercício (AC) | IN RFB | Prazo de entrega |
| --- | --- | --- |
| 2022 (2021) | **IN 2.065/2022** | 07/03 a 31/05/2022 [conferir] |
| 2023 (2022) | **IN 2.118/2022** [conferir número] | 15/03 a 31/05/2023 |
| 2024 (2023) | **IN 2.178/2024** | 15/03 a 31/05/2024 |
| 2025 (2024) | **IN 2.255/2025** | 17/03 a 30/05/2025 |
| 2026 (2025) | **IN 2.312/2026** (DOU 16/03/2026) | 23/03 a 29/05/2026 |
| 2027 (2026) | ainda não publicada | provavelmente março a maio de 2027 |

Cada IN define: quem é obrigado, prazo, formas de entrega, multa por atraso (1% ao mês sobre o
imposto devido, mínimo R$ 165,74, máximo 20%), quotas (até 8, mínimo R$ 50,00), modelos
(completo/simplificado) e casos de vedação do simplificado.

## 1.4 Outras normas operacionais

- **IN RFB 1.500/2014.** Norma geral do IRPF: dependentes, deduções, carnê-leão, comprovação.
- **IN RFB 1.585/2015.** Tributação de aplicações financeiras e renda variável.
- **IN SRF 84/2001.** Ganho de capital da pessoa física (custo, reduções, GCAP).
- **Declarações cruzadas pela Receita** (é por elas que a malha fina compara): DIRF,
  substituída pelo eSocial/EFD-Reinf a partir de 2025; DMED (saúde); DIMOB (imóveis);
  e-Financeira; DOI (cartórios); DBF (benefícios fiscais). O sistema deve tratar estes dados
  como **a verdade com que a declaração será comparada**.

## 1.5 Perguntas e Respostas IRPF (últimos 5 exercícios)

A Receita publica um "Perguntas e Respostas" por exercício (2026: versão 1.0 de abril/2026, com
745 perguntas). Ele não é norma, mas é a interpretação oficial usada na fiscalização. Os temas
que mais afetam a automação, com as mudanças entre os anos, estão em `02-regras-por-exercicio.md`.
As perguntas citadas (por exemplo, P&R 2026 nº 001 obrigatoriedade, 012 simplificado, 063 quotas,
130+ instrução, 455 doações e limites globais, 457 fim da dedução do empregador doméstico) foram
confirmadas por meio do projeto de referência. Os PDFs de 2022 a 2025 **não puderam ser lidos
diretamente** nesta sessão (ver `07-fontes.md`).
