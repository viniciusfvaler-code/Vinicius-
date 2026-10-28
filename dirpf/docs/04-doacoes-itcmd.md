# 4. Doações: IRPF (federal) e ITCMD (estadual / Sefaz)

Doação tem dois lados que o sistema precisa tratar juntos. A Receita e as Sefaz **trocam dados
por convênio**: o que se declara no IRPF é cruzado com o ITCMD pago ao estado.

## 4.1 Doações entre pessoas físicas no IRPF

**Quem doa (doador):**

- Informa na ficha **Doações Efetuadas** o código **80** (em espécie) ou **81** (bens e
  direitos), com o CPF do donatário e o valor.
- Na ficha **Bens e Direitos**, baixa o bem (situação em 31/12 zerada ou reduzida) e descreve a
  doação.
- O valor pode ser o de **custo** (declarado) ou o de **mercado**. Se for de mercado e maior que o
  custo, o doador paga **ganho de capital** (GCAP, Darf 4600 até o último dia útil do mês
  seguinte).
- Doação a pessoa física **não deduz** imposto.

**Quem recebe (donatário):**

- Informa em **Rendimentos Isentos e Não Tributáveis**, código **14** ("Transferências
  patrimoniais: doações e heranças"), com o CPF do doador e o valor.
- Inclui o bem em **Bens e Direitos** pelo mesmo valor declarado pelo doador.
- Para um adiantamento de legítima, a descrição deve citar a escritura.

**Regras de consistência que o sistema deve checar:**

1. O valor e o CPF batem entre o doador e o donatário (quando os dois declaram pelo sistema).
2. A doação recebida explica o acréscimo patrimonial. Sem ela, o patrimônio cresce sem renda e
   a declaração cai em malha.
3. Se a doação passa do limite de isenção do estado, deve existir uma guia de ITCMD paga (ver
   4.3).

## 4.2 Doações incentivadas (que reduzem o imposto)

Elas só valem no modelo completo. Os limites estão em `02-regras-por-exercicio.md` § 2.4.

| Código (Pagamentos/Doações) | Destino | Documento esperado na Área de Trabalho |
| --- | --- | --- |
| 40 | Fundos dos Direitos da Criança e do Adolescente (ECA) | Recibo do fundo com CNPJ |
| 44 | Fundos da Pessoa Idosa | Recibo do fundo com CNPJ |
| 41 / 42 | Cultura (Lei Rouanet) / Audiovisual | Recibo do projeto (Pronac) |
| 43 | Desporto | Recibo do projeto aprovado |
| 45 / 46 | Pronas/PCD / Pronon | Recibo do projeto |
| 47 | Reciclagem | Recibo do projeto |
| Doação direta na declaração | ECA (Darf 3351) e Idoso (Darf 9090) | O próprio programa gera o Darf; vencimento no último dia do prazo |

O sistema deve **sugerir** a doação direta quando o modelo completo for o vantajoso e houver
imposto devido. O contribuinte paga o Darf da doação e o mesmo valor é abatido do imposto
devido. Assim a restituição aumenta ou o saldo a pagar diminui na mesma medida: parte do imposto
vai para um fundo escolhido, sem custo final para o contribuinte.

## 4.3 ITCD no Rio Grande do Sul (Receita Estadual / Sefaz-RS)

No RS o imposto se chama **ITCD**. A base legal é a **Lei estadual 8.821/1989**, com as faixas
da Lei 14.741/2015 (em vigor desde 01/01/2016), regulamentada pelo Decreto 33.156/1989
[conferir número].

| Ponto | Regra (RS, 2026) | Situação |
| --- | --- | --- |
| Alíquota da doação | **3%** até 10.000 UPF-RS (R$ 283.264,00); **4%** acima. A alíquota da faixa incide sobre o valor **inteiro** (arts. 18 § 1º e 19 § 1º) | Vigente. A LC 227/2026 não mudou os percentuais. Até 19/10/2026 não havia lei nem projeto gaúcho para a progressividade |
| UPF-RS 2026 | **R$ 28,3264** | O motor lê o valor por ano (tabela própria) |
| Alíquota zero | Quinhão ou doação de até **2.000 UPF-RS** (R$ 56.652,80 em 2026) | Ver art. 7º para as demais isenções |
| Imóvel urbano a ascendente, descendente ou cônjuge | Isenção até **4.379 UPF-RS** (R$ 124.041,31) | [conferir condições] |
| Contribuinte na doação | Em regra o **donatário** [conferir art. 8º; há fonte que aponta o doador] | |
| Declaração | **DIT** (Declaração de ITCD) eletrônica no **Portal Pessoa Física** da Receita Estadual. A Receita Estadual avalia o bem e fixa a base; há 20 dias para contestar | A data da escritura ou do contrato define o ano da doação |
| Fiscalização | **Programas anuais de autorregularização**: cruzam as doações declaradas no IRPF com as DITs, por convênio com a RFB. Edições sobre 2017, 2019 e 2021 (prazo até 31/05/2026); em jun/2026, programa para holdings e planejamento sucessório | Adesão em Portal Pessoa Física › ITCD › Programas Oficiais de Autorregularização |

### Regras da automação (RS)

1. Para cada doação **recebida** (isento código 14) ou **feita** (códigos 80/81), somar por par
   doador–donatário no ano e converter em UPF-RS do ano da doação.
2. Até 2.000 UPF-RS: alíquota zero, mas o sistema **recomenda guardar o comprovante da DIT**
   [conferir se a DIT é exigida também abaixo do limite].
3. Acima disso: exigir na pasta o **comprovante da DIT e da guia paga**. Sem ele, emitir o alerta
   "doação sem ITCD: entra no próximo cruzamento IRPF × DIT da Receita Estadual" e calcular o
   imposto estimado (3% ou 4% sobre o valor total).
4. O valor da doação no IRPF deve ser **igual** nas declarações do doador e do donatário e
   compatível com a base da DIT.
5. Bens em outro estado: o ITCD de imóvel é devido onde ele está. Para bens móveis e dinheiro,
   vale o domicílio do doador (regra constitucional). O sistema pergunta a UF quando não for
   RS.

## 4.4 Outros estados (referência)

São Paulo cobra 4% (Lei 10.705/2000), com isenção de 2.500 UFESPs por ano entre as mesmas partes.
A isenção não dispensa a declaração (RC 33778/2026). A Sefaz-SP faz a **Operação Donatio**, o
mesmo tipo de cruzamento. Santa Catarina cobra com base só na declaração do doador. Como o uso será
comercial, o módulo de ITCD deve ser **uma tabela por UF**, começando por RS.

## 4.5 Pontos ainda abertos

- Conferir no portal da Receita Estadual RS: o contribuinte (art. 8º), o número do decreto, se a
  DIT é obrigatória abaixo de 2.000 UPF-RS e as condições da isenção de imóvel urbano.
- Acompanhar um eventual projeto de lei gaúcho de progressividade (LC 227/2026), que só valeria
  para doações posteriores à lei.
