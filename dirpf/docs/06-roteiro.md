# 6. Roteiro de implementação (alvo: DIRPF 2027)

Cada etapa termina com algo utilizável e testado com documentos fictícios.

| Etapa | Período | Entrega | Critério de pronto |
| --- | --- | --- | --- |
| **0. Pesquisa** | out/2026 ✔ | Base legal, regras 2022 a 2027, doações/ITCD-RS, mapa documento→ficha, arquitetura, uso comercial | Documentos em `dirpf/docs/` |
| **1. Fundação** | nov/2026 | Projeto TypeScript; **codec `.DBK` próprio dirigido por leiaute** (leiaute 2026 como base); CLI `dirpf abrir arquivo.DBK` | Ler e regravar byte a byte um `.DBK` real gerado no seu PGD 2026 |
| **2. Coletor + classificador** | nov/2026 | Varredura da pasta do cliente, inventário com hash, tipo de cada documento | ≥ 95% de acerto nos documentos de teste |
| **3. Extratores padronizados** | dez/2026 | Informe de rendimentos PJ, INSS, bancos/corretoras, plano de saúde (PDF com texto) | 100% dos valores iguais nos testes |
| **4. OCR e documentos livres** | jan/2027 | Tesseract local; recibos médicos, escolas, aluguel, doações; IA opcional e mascarada | Campo com origem e confiança; baixa confiança vai para a revisão |
| **5. Motor 2027 e regras** | jan/2027 | Tabela 2027, redução do art. 11-A, IRPFM, dividendos, deduções, doações, alertas de malha e ITCD-RS | Bate com os exemplos oficiais da Receita para a Lei 15.270 |
| **6. Revisão e relatório** | fev/2027 | Tela de revisão (documento ao lado do valor) e relatório de conferência | Revisão de uma declaração completa em menos de 15 minutos |
| **7. Homologação no PGD 2027** | mar/2027 | Leiaute 2027 aplicado ao codec; testes no programa oficial | O PGD restaura sem erro e mostra o mesmo imposto em todos os casos de teste |
| **8. Produção** | mar a mai/2027 | Instalador Windows, pastas por cliente, backups e log LGPD | Primeiras declarações reais revisadas |

## Testes de aceitação no seu computador

O ambiente em nuvem não acessa a sua Área de Trabalho nem roda o programa da Receita. A
validação final é feita no seu Windows:

1. Instalar o PGD do exercício.
2. Rodar `dirpf processar <pasta do cliente>`.
3. No PGD: **Ferramentas › Cópia de Segurança › Restaurar**, escolher o arquivo gerado.
4. Usar **Verificar Pendências** e comparar o resumo com o relatório do sistema.

## O que preciso de você para a etapa 1

- Um ou dois arquivos `.DBK` **de teste** gerados no seu PGD 2026, com dados fictícios: é o padrão
  de referência para o codec. Não use dados de clientes reais no repositório.
- Exemplos de documentos com os dados apagados (informe de rendimentos, informe de banco, plano de
  saúde, recibo médico), para os extratores.
