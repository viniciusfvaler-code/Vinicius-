# Resumo da conversa (28 e 29/10/2026)

Sessão: https://claude.ai/code/session_015fF3Dhado62z57LRkXRx3f

## Pedido

Criar um sistema que pegue os documentos da Área de Trabalho e preencha a DIRPF no programa da
Receita. Antes, estudar as leis e as instruções normativas do IRPF, as regras de doações da Sefaz e
os Perguntas e Respostas dos últimos cinco anos.

## Decisões

| Pergunta | Resposta |
| --- | --- |
| Sistema operacional | Windows |
| Estado (ITCD) | RS |
| Uso | Comercial (declarações de clientes) |
| OCR / IA | OCR local recomendado; IA na nuvem opcional por cliente, mascarada (**aguarda confirmação**) |
| Exercício-alvo | DIRPF 2027 (ano-calendário 2026) |

## Conclusões principais

- O programa será preenchido gerando a **cópia de segurança `.DBK`**, que o usuário abre no PGD em
  Ferramentas › Cópia de Segurança › Restaurar, confere e transmite. Robôs que clicam na tela
  ficam só como plano B.
- O codec `.DBK` e o motor de cálculo serão **próprios** (o projeto livre encontrado é AGPL,
  incompatível com o uso comercial fechado).
- A DIRPF 2027 segue a Lei 15.270/2025 (redução até R$ 5 mil/mês, IRPFM e dividendos). O leiaute
  definitivo só sai com o PGD 2027 (por volta de mar/2027).
- ITCD-RS: 3% até 10.000 UPF-RS e 4% acima, alíquota zero até 2.000 UPF-RS. A Receita Estadual
  cruza o IRPF com a DIT e faz programas de autorregularização.
- Os sites gov.br e da Sefaz estavam bloqueados no ambiente em nuvem: os itens **[conferir]** dos
  documentos precisam de leitura na fonte oficial.

## Próximos passos (o que falta de você)

1. Confirmar a política de IA (local por padrão, nuvem opcional com consentimento).
2. Enviar um ou dois `.DBK` de teste do PGD 2026, com dados fictícios.
3. Enviar exemplos de documentos com os dados apagados (informe de rendimentos, banco, plano de
   saúde, recibo médico).

Detalhes em `README.md` e nos documentos 01 a 08 desta pasta.
