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

## 4.3 ITCMD: imposto estadual sobre doações (Sefaz)

> **Estado a confirmar.** A pesquisa abaixo usa **São Paulo** como referência (Sefaz-SP). Se você
> declara em outro estado, as alíquotas, isenções e o portal mudam. Indique o estado para eu
> ajustar.

**Base legal em SP:** Lei 10.705/2000, Decreto 46.655/2002 (RITCMD) e portarias CAT. Pela LC
227/2026, a progressividade passa a ser obrigatória em todos os estados.

| Ponto | Regra (SP) | Situação |
| --- | --- | --- |
| Alíquota | **4%** sobre o valor (venal/mercado) | Vigente. SP ainda precisa adaptar a lei à progressividade da LC 227/2026 (teto de 8%). Mudanças só valem para fatos posteriores, respeitando a anterioridade |
| Isenção de doação | até **2.500 UFESPs** por ano, entre o mesmo doador e o mesmo donatário (Lei 10.705, art. 6º, II) | A resposta à consulta RC 30926/2024 aplicou a isenção a cada doação separadamente |
| Obrigação acessória | **A isenção não dispensa a declaração** (RC 33778/2026) | Declarar mesmo quando isento |
| Como declarar | Online no portal da Sefaz-SP: declaração de ITCMD (doação), pagamento ou parcelamento em até 12 vezes. A maioria é homologada automaticamente (Portaria CAT 64/2020) | Guardar os comprovantes por 5 anos |
| Escritura | O cartório exige a declaração e o pagamento antes de lavrar a escritura de doação de imóvel | |
| Fiscalização | **Operação Donatio** (cruza o IRPF com o ITCMD; 24 mil contribuintes notificados em uma rodada) e a **Operação Cruzamento** (veículos: IPVA × renda) | Prazo de 30 dias para autorregularização |

**Regra da automação:** sempre que o sistema encontrar uma doação (recebida ou feita) acima do
limite estadual, ele deve exigir o **comprovante da declaração/guia de ITCMD** na pasta de
documentos. Sem ele, o sistema emite o alerta "risco de autuação estadual (Donatio)" antes de
gerar o arquivo. Outros estados (SC, PR, ES, PE e outros) têm convênios iguais com a Receita.
Santa Catarina, por exemplo, cobra **com base só na declaração do doador**.

## 4.4 Pontos ainda abertos

- O valor da UFESP de 2026 e o limite em reais (2.500 × UFESP) devem ser lidos no portal
  da Sefaz-SP. **[conferir]**
- A lei paulista de progressividade (projeto em tramitação) precisa ser acompanhada.
- Se o estado não for SP, refazer esta seção.
