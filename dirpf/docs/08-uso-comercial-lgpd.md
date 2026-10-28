# 8. Uso comercial: licença, LGPD, OCR e IA

Decisões registradas em 28/10/2026: **Windows**, **RS**, **uso comercial**, **exercício 2027**.

## 8.1 Licença: codec próprio em vez de reusar o projeto AGPL

O `mcp-imposto-de-renda` é AGPL-3.0. Em uso comercial (sistema vendido, instalado em clientes ou
oferecido como serviço), qualquer código que o incorpore teria de ser aberto sob a mesma licença.
Por isso:

- O sistema terá **codec `.DBK` próprio**, escrito a partir do **leiaute oficial** que a Receita
  publica (PDF "Leiaute DIRPF" e o leiaute que vem dentro do PGD) e dos fatos técnicos do formato
  (texto latin-1 com posições fixas, CRLF, valores em centavos, `NR_CONTROLE` = CRC-32 da linha,
  contagens no `T9`).
- **Não copiamos código** do projeto AGPL. Ele pode servir só como **oráculo de teste externo**:
  rodar a ferramenta dele, como programa separado, para comparar a saída com a nossa. Isso não
  incorpora o código dele.
- A conferência definitiva é sempre o **programa oficial**: o `.DBK` gerado tem de restaurar sem
  erro e mostrar o mesmo imposto.

## 8.2 O que é OCR

**OCR (reconhecimento óptico de caracteres)** é o programa que "lê" uma imagem e devolve o texto.
É necessário quando o documento é uma **foto ou um PDF escaneado**, em que o computador só vê
pixels. PDFs gerados por bancos e empresas já trazem o texto e **não precisam de OCR**.

- Roda **no próprio computador** (Tesseract, gratuito, com o idioma português). **Nenhum dado sai
  da máquina.**
- O risco do OCR não é de privacidade, e sim de **leitura errada**: um 8 lido como 3, uma vírgula
  perdida, um CPF com dígito trocado. Mitigações no sistema:
  - Validar CPF/CNPJ pelo dígito verificador.
  - Conferir somas (total do informe = soma das linhas).
  - Mostrar a confiança de cada campo; abaixo do limite, vai para a revisão humana com o recorte
    da imagem ao lado.
  - Nunca gerar o `.DBK` com campo não revisado.

**Conclusão:** liberar o OCR local não tem risco de privacidade. Recomendo usar.

## 8.3 IA (LLM) na extração: esse é o ponto de risco

A pergunta 4 era, na verdade, sobre **IA na nuvem** (por exemplo, a API da Anthropic) para
entender recibos fora do padrão. A diferença em relação ao OCR é que **o conteúdo do documento é
enviado a um servidor externo**.

| Risco | Por que importa no uso comercial | Mitigação |
| --- | --- | --- |
| Dados pessoais e **dados sensíveis** (saúde: recibos médicos, plano, doença grave) saem do computador | LGPD art. 11: dado de saúde é sensível. Você é o **controlador ou operador** dos dados dos clientes | Base legal e cláusula no contrato com o cliente; enviar só o necessário |
| Retenção ou uso dos dados pelo provedor | Contratos comerciais de API normalmente não usam dados para treino, mas guardam por um período | Usar a API em conta comercial com termos de proteção de dados (DPA) e, se possível, retenção zero |
| Vazamento por erro de configuração | Responsabilidade civil e sanções da ANPD | Mascarar CPF, nomes e endereços antes de enviar (o sistema troca por marcadores e repõe depois) |
| A IA "inventar" um valor | Erro na declaração do cliente | A IA só **propõe**; todo valor é validado por regra e revisado por humano |

**Recomendação:** modo **híbrido e configurável por cliente**.

1. Padrão: **100% local** (texto do PDF + OCR + modelos de extração por tipo de documento). Isso
   cobre informes de rendimentos, bancos, INSS e planos de saúde, que são padronizados.
2. IA na nuvem **desligada por padrão**, ativada só com o consentimento do cliente, para os
   documentos que o modo local não conseguir ler. O texto vai mascarado.
3. Registro (log) de tudo o que foi enviado, para prestar contas sob a LGPD.

## 8.4 Outras exigências do uso comercial

- **LGPD:** contrato com cláusula de tratamento de dados, política de retenção (apagar
  documentos ao fim do prazo), criptografia da pasta de trabalho, controle de acesso e registro
  das operações.
- **Separação por cliente:** uma pasta e um cadastro por CPF, sem misturar dados.
- **Responsabilidade:** o sistema deixa claro que a declaração é revisada e transmitida pelo
  responsável. Guarde a trilha "documento → valor" de cada lançamento para defesa em malha fina.
- **Procuração eletrônica (e-CAC):** para baixar a pré-preenchida dos clientes, cada cliente
  precisa outorgar procuração eletrônica ao escritório. O sistema importa o arquivo baixado e não
  acessa o e-CAC sozinho.
