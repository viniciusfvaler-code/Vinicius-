# 3. Do documento à ficha da declaração

Esta é a tabela que o **extrator** do sistema implementa. Para cada documento encontrado na
pasta, ela diz como reconhecê-lo, o que extrair e para onde vai no programa. Os códigos vêm das
tabelas do próprio PGD 2026 (`pagamentos`, `rendimentos-isentos`,
`rendimentos-tributacao-exclusiva`, `dependentes`, `bens-direitos`).

## 3.1 Rendimentos

| Documento | Como reconhecer | Campos a extrair | Ficha / código |
| --- | --- | --- | --- |
| **Informe de rendimentos do empregador/aposentadoria** (modelo oficial, IN RFB 2.060/2021 [conferir]) | "Comprovante de Rendimentos Pagos e de Imposto sobre a Renda Retido na Fonte"; quadros 1 a 7 | CNPJ/CPF e nome da fonte; quadro 3: rendimentos (linha 1), INSS (2), previdência complementar (3), pensão (4), IRRF (5); quadro 4: isentos (65+, diárias, indenizações, lucros); quadro 5: exclusivos (13º e IRRF do 13º, PLR); quadro 6: RRA | Rend. Tributáveis PJ; Isentos (10, 04, 09, 26); Exclusivos (01 13º, 11 PLR); RRA |
| **Informe de rendimentos financeiros** (bancos e corretoras) | "Informe de Rendimentos Financeiros", CNPJ da instituição | Saldo de cada conta/aplicação em 31/12 do ano anterior e do ano atual; rendimentos de poupança/LCI/LCA (isentos); CDB/fundos (exclusivos com IRRF); JCP; dividendos | Bens (grupos 04 aplicações, 06 contas, 07 fundos); Isentos 12 e 09; Exclusivos 06 e 10 |
| **Informe da B3 / corretora** e notas de corretagem | "Área do Investidor B3", posição em 31/12 | Ações/FII/ETF: quantidade e custo médio; proventos; operações do mês | Bens grupo 03/07; Renda variável (apuração mensal); Isentos 20 (ações até 20 mil/mês) e 09 |
| **Informe do INSS** | "Comprovante de rendimentos INSS", CNPJ 29.979.036 | Benefício, 13º, IRRF, parcela isenta 65+ | PJ + Isentos 10 + Exclusivos 01 |
| **Recibos de aluguel recebido / autônomo** (de PF) | Recibos, contrato | Mês, valor, Darf do carnê-leão (0190) | Rend. Tributáveis PF/Exterior (mensal); livro-caixa |
| **Demonstrativo do Carnê-Leão Web** | Arquivo exportado do e-CAC | Rendimentos e imposto mês a mês | Importar direto (o PGD aceita o arquivo) |
| **Escritura/recibo de doação ou herança recebida** | "Escritura de doação", formal de partilha | Doador, CPF, valor, bem | Isentos 14 + Bens |
| **Venda de imóvel/veículo** | Escritura, recibo de compra e venda | Data, valor, custo, corretagem | GCAP (programa à parte) → importa o demonstrativo |

## 3.2 Deduções e pagamentos

| Documento | Como reconhecer | Campos | Ficha / código |
| --- | --- | --- | --- |
| **Informe do plano de saúde** | Operadora (ANS), "demonstrativo para IR" | Valor por beneficiário (titular e cada dependente), reembolsos | Pagamentos 26, um lançamento por beneficiário |
| **Recibos e notas de médico, dentista, psicólogo, fisio, fono e TO** | CPF/CNPJ + CRM/CRO/CRP | Prestador, CPF/CNPJ, paciente, valor, data | Pagamentos 09 a 14 |
| **Notas de hospital, clínica ou laboratório** | CNPJ, atividade de saúde | Idem | Pagamentos 21 |
| **Boletos e declarações de escola/faculdade** | CNPJ da instituição, "declaração de pagamentos" | Aluno, valor anual | Pagamentos 01 (limite por aluno) |
| **Informe de previdência privada** | "PGBL", "VGBL", "Fundo de pensão" | Contribuições do ano; saldo do VGBL | PGBL → Pagamentos 36/37; VGBL → Bens 97 (não deduz) |
| **Pensão alimentícia paga** | Decisão judicial/escritura + comprovantes | Alimentando, valor | Pagamentos 30/31/33/34 + cadastro de alimentando |
| **Recibos de advogado, aluguel pago, outros** | | Prestador e valor | Pagamentos 60 a 99 (informativos) |
| **Recibos de doação a fundos e projetos** | Recibo com CNPJ do fundo | Valor, data | Doações 40 a 47 |

## 3.3 Patrimônio

| Documento | Ficha | Observação |
| --- | --- | --- |
| Escritura/matrícula de imóvel, contrato de financiamento | Bens grupo 01 (imóveis), Dívidas | Custo de aquisição + benfeitorias; IPTU, matrícula e área |
| CRLV / nota fiscal do veículo | Bens grupo 02, código 01 | Renavam |
| Extrato do financiamento/consórcio | Dívidas e Ônus / Bens 95 | Saldo em 31/12 |
| Participações societárias (contrato social) | Bens grupo 03 | |
| Criptoativos (extrato da exchange) | Bens grupo 08 | Valor de custo |
| Contas e aplicações no exterior | Bens + ficha Lei 14.754 | Conversão pela cotação do Bacen |

## 3.4 Pessoas

| Documento | Ficha |
| --- | --- |
| Declaração do ano anterior (`.DEC` / `.DBK`) | **Ponto de partida**: identificação, dependentes, bens (a situação em 31/12 do ano anterior vem dela) |
| Documentos de dependentes (CPF, nascimento) | Dependentes (códigos 11 a 51) |
| Recibo de entrega do ano anterior | Necessário para a retificadora e a pré-preenchida |

## 3.5 Regras de validação pós-extração

1. **Soma por CNPJ:** o IRRF e os rendimentos de cada fonte batem com o informe (a DIRF/eSocial
   da fonte vai ser cruzada).
2. **Saúde:** todo pagamento tem CPF/CNPJ válido do prestador; se houver reembolso, informar.
   Gastos de saúde muito altos em relação à renda geram alerta (malha).
3. **Instrução:** limite de 3.561,50 por aluno, aplicado no motor e não no documento.
4. **Bens:** a situação em 31/12 do ano anterior deve ser igual à do ano anterior na declaração
   passada. A variação patrimonial deve ser compatível com a renda líquida, os isentos e as
   doações.
5. **Dependente:** os rendimentos dele entram; o mesmo dependente não pode estar em duas
   declarações.
6. **Doações:** checar o ITCMD (ver `04-doacoes-itcmd.md`).
7. **Pré-preenchida:** quando o arquivo da pré-preenchida existir, comparar item a item e mostrar
   as divergências antes de gerar a declaração.
