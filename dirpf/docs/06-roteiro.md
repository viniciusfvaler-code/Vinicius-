# 6. Roteiro de implementação

Cada etapa termina com algo utilizável e testado com documentos fictícios.

| Etapa | Entrega | Critério de pronto |
| --- | --- | --- |
| **0. Pesquisa** (esta) | Base legal, regras 2022 a 2027, doações/ITCMD, mapa documento→ficha, arquitetura | Documentos em `dirpf/docs/` ✔ |
| **1. Fundação** | Projeto TS em `dirpf/`, núcleo `.DBK` integrado, CLI `dirpf abrir arquivo.DBK` | Ler e regravar um `.DBK` real byte a byte |
| **2. Coletor + classificador** | Varredura da pasta, inventário com hash, tipo de cada documento | ≥ 95% de acerto nos documentos de teste |
| **3. Extratores dos informes padronizados** | Informe de rendimentos PJ (modelo oficial), INSS, bancos, plano de saúde | Valores iguais ao informe em 100% dos testes |
| **4. Recibos e documentos livres** | OCR + extração (médico, escola, aluguel, doação) | Cada campo com origem; baixa confiança vai para a revisão |
| **5. Regras e motor** | Validações, alertas de malha e ITCMD, comparação dos modelos, doação direta | Resultado igual ao do PGD nos casos de referência |
| **6. Revisão + geração** | Relatório de conferência (HTML/PDF) e `.DBK` final | O programa oficial restaura sem erro e mostra o mesmo imposto |
| **7. Exercício 2027** | Leiaute, tabelas e motor 2027 (redução da Lei 15.270, IRPFM) | Depende do PGD 2027 (março/2027) |

## Testes de aceitação no seu computador

O ambiente em nuvem não acessa a sua Área de Trabalho nem roda o programa da Receita. A
validação final (restaurar o `.DBK` no PGD e conferir) é feita no seu computador:

1. Instalar o PGD do exercício.
2. Rodar `dirpf processar <pasta>`.
3. No PGD: **Ferramentas › Cópia de Segurança › Restaurar**, escolher o arquivo gerado.
4. Usar **Verificar Pendências** e comparar o resumo com o relatório do sistema.
