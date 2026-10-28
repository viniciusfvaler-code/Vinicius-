# 2. Regras por exercício (2022 a 2027)

O motor do sistema deve ser **versionado por exercício**: tabelas, limites e o leiaute do
arquivo mudam todo ano. Valores **confirmados** vêm das tabelas do programa oficial ou da
Receita; os marcados **[conferir]** vêm de memória ou de fonte secundária.

## 2.1 Obrigatoriedade de declarar

| Critério (no ano-calendário) | DIRPF 2022 | 2023 | 2024 | 2025 | **2026** |
| --- | --- | --- | --- | --- | --- |
| Rendimentos tributáveis acima de | 28.559,70 [conferir] | 28.559,70 [conferir] | 30.639,90 [conferir] | 33.888,00 | **35.584,00** |
| Isentos/exclusivos acima de | 40.000,00 [conferir] | 40.000,00 [conferir] | 200.000,00 | 200.000,00 | **200.000,00** |
| Bens e direitos em 31/12 acima de | 300.000,00 [conferir] | 300.000,00 [conferir] | 800.000,00 | 800.000,00 | **800.000,00** |
| Receita bruta rural acima de | 142.798,50 [conferir] | 142.798,50 [conferir] | 153.199,50 [conferir] | 169.440,00 | **177.920,00** |
| Bolsa de valores | qualquer operação [conferir] | alienações > 40.000 ou ganho tributável | idem | idem | **idem** |

Os critérios sempre presentes são: ganho de capital tributável; passar à condição de residente;
isenção do art. 39 da Lei 11.196/2005; compensar prejuízo rural. A partir da DIRPF 2024 entram
também: trust, aplicações financeiras e lucros no exterior, e a opção de declarar bens da
controlada como próprios (Lei 14.754/2023).

## 2.2 Tabela progressiva anual

**DIRPF 2026 (AC 2025)**, conforme a Lei 15.191/2025. Confirmada contra o programa oficial:

| Base anual | Alíquota | Parcela a deduzir |
| --- | ---: | ---: |
| até 28.467,20 | 0 | 0 |
| 28.467,21 a 33.919,80 | 7,5% | 2.135,04 |
| 33.919,81 a 45.012,60 | 15% | 4.679,03 |
| 45.012,61 a 55.976,16 | 22,5% | 8.054,97 |
| acima de 55.976,16 | 27,5% | 10.853,78 |

Os anos anteriores mudam por causa das leis 14.663/2023 e 14.848/2024. Nos casos em que a tabela
mudou no meio do ano, a anual é a soma das mensais: AC 2025 = 4 × 2.259,20 + 8 × 2.428,80.

**DIRPF 2027 (AC 2026)**, conforme a Lei 15.270/2025:

- A faixa isenta anual sobe para 29.145,60 (parcelas a deduzir 2.185,92 / 4.729,91 / 8.105,85 /
  10.904,66).
- **Redução anual (art. 11-A):** com rendimentos tributáveis de até 60.000,00, a redução é de
  até 2.694,15 (imposto zero). De 60.000,01 a 88.200,00, a redução é
  `8.429,73 − 0,095575 × rendimentos`. Acima disso, não há redução.
- **IRPFM (art. 16-A):** vale quando a soma de **todos** os rendimentos passa de 600.000,00. A
  alíquota é `REND/60.000 − 10` (%) até chegar a 10% em 1.200.000,00. Descontam-se o IRPF devido
  e o IR retido sobre dividendos.
- **Dividendos:** retenção de 10% quando uma mesma PJ paga mais de 50.000,00 no mês a uma mesma
  PF. Lucros apurados até 2025 ficam na transição.
- O desconto simplificado passa a ter teto de **17.640,00**.

## 2.3 Deduções (modelo completo)

| Dedução | Limite DIRPF 2026 | Observações para a automação |
| --- | --- | --- |
| Desconto simplificado | 20% dos tributáveis, até **16.754,34** | Substitui todas as deduções. O motor deve comparar os dois modelos sempre |
| Dependente | **2.275,08** por dependente | Código 31 (pais/avós) só se o dependente teve rendimentos até 28.467,20. Os rendimentos e bens do dependente entram na declaração |
| Instrução | **3.561,50** por pessoa | O excesso de uma pessoa não passa para outra. Cursos livres, idiomas e material **não** entram |
| Saúde | sem limite | Exige CPF/CNPJ do prestador. Subtrair reembolso. Plano de saúde: separar titular e dependentes (informe do plano). Cruzado com a DMED |
| Previdência oficial (INSS) | sem limite | Vem do informe da fonte pagadora |
| PGBL / Funpresp / FAPI (36, 37) | 12% dos tributáveis | Só se contribui ao regime oficial. **VGBL não deduz**: vai para Bens (código 97) |
| Pensão alimentícia judicial/escritura | sem limite | Códigos 30, 31, 33 e 34 |
| Livro-caixa | até a receita do trabalho não assalariado | Autônomos |
| Contribuição patronal de doméstico | **extinta** desde a DIRPF 2020 | P&R 2026 nº 457 |

Arredondamento usado pelo programa oficial: os percentuais (alíquota, 20%, 12%, 3%) são
**truncados** no centavo, não arredondados. Isso foi confirmado em 65 casos de referência.

## 2.4 Doações e incentivos (dedução do imposto devido, só no modelo completo)

| Destinação | Limite |
| --- | --- |
| Doação **direta na declaração**: Fundo da Criança e do Adolescente (Darf 3351) | 3% do imposto devido |
| Doação **direta na declaração**: Fundo da Pessoa Idosa (Darf 9090) | 3% do imposto devido |
| Doações no ano: ECA (40), Idoso (44), Cultura (41), Audiovisual (42) | global de 6% |
| + Reciclagem (47) | global de 6% |
| + Desporto (43) | global de 7% |
| Pronas/PCD (45) e Pronon (46) | 1% cada, fora do global |

A doação direta só vale se a declaração for entregue **no prazo** e o Darf pago até o último dia
do prazo, sem parcelamento. Na DIRPF 2026, um imposto de 10.000,00 permite 600,00 (global) ou
300,00 (por fundo direto). Ver detalhes em `04-doacoes-itcmd.md`.

## 2.5 O que mudou em cada exercício (resumo dos P&R e das INs)

| Exercício | Novidades relevantes para a automação |
| --- | --- |
| **2022** | Restituição e Darf por **Pix** (chave CPF). Pré-preenchida pelo gov.br (conta prata/ouro) [conferir] |
| **2023** | Pré-preenchida ampliada (DIRF, DMED, DIMOB, e-Financeira). Prioridade na restituição para quem usa pré-preenchida **e** Pix. Critério de bolsa passou a ser alienações acima de 40 mil. Procuração para terceiros usarem a pré-preenchida |
| **2024** | Limites de obrigatoriedade sobem (isentos e bens para 200 mil e 800 mil). Nova tabela (Lei 14.663). Lei 14.754/2023: trusts, controladas no exterior, atualização de bens no exterior. Código 31 de dependentes ligado ao limite da tabela |
| **2025** | Primeira DAA com a **tributação anual de 15%** das aplicações no exterior (ficha própria, compensação de prejuízos). Contas no exterior na pré-preenchida. Atualização de imóveis (Lei 14.973/2024) [conferir] |
| **2026** | IN 2.312/2026. Tabela da Lei 15.191/2025. Limites: 35.584 / 177.920. P&R com 745 perguntas. Prazo de 23/03 a 29/05 |
| **2027** | Lei 15.270/2025: redução até 5 mil/mês, IRPFM e dividendos. O motor e o leiaute de 2027 só ficam fechados quando a Receita publicar o PGD 2027 (por volta de mar/2027) |

## 2.6 Calendário do ciclo

- O PGD (programa) do ano sai no fim de fevereiro ou em março. O **leiaute do arquivo** vem dentro
  dele.
- A entrega vai de março a maio. A restituição sai em lotes de maio a setembro.
- A declaração retificadora pode ser feita em até 5 anos, sem mudar o modelo após o prazo.
