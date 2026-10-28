# 7. Fontes e limitações da pesquisa

## Limitação importante

A rede deste ambiente bloqueou `gov.br`, `receita.fazenda.gov.br`, `planalto.gov.br`,
`normas.receita.fazenda.gov.br` e `fazenda.sp.gov.br`. Por isso **não foi possível baixar e ler
na íntegra** os PDFs "Perguntas e Respostas IRPF" de 2022 a 2026, as INs e as leis no Planalto.
A pesquisa usou:

1. Buscas na web (notícias e análises de CFC, CRC, Fenacon, EY, escritórios, B3 e Sefaz).
2. As tabelas e regras extraídas do **programa oficial IRPF 2026** pelo projeto
   `mcp-imposto-de-renda`, que citam o P&R 2026 pergunta a pergunta e foram conferidas contra
   65 declarações geradas pelo PGD.

Para completar a leitura direta, libere estes domínios em **Network access** nas configurações
do ambiente: `www.gov.br`, `normas.receita.fazenda.gov.br`, `www.planalto.gov.br`,
`downloadirpf.receita.fazenda.gov.br` e o portal da sua Sefaz. Depois disso dá para baixar os
5 P&R e marcar como conferidos os itens **[conferir]**.

## Fontes oficiais (para leitura direta)

- Perguntas e Respostas IRPF:
  https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/perguntas-e-respostas/dirpf
  (2026: `p-r-irpf-2026-v1-00-2026-04-23.pdf`)
- Tabelas: https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2025 e `/2026`
- Leiautes do arquivo: https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/documentos-tecnicos/dirpf
- Lei 9.250/1995: https://www.planalto.gov.br/ccivil_03/leis/l9250.htm
- Lei 15.270/2025: https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15270.htm
- Sefaz-SP ITCMD: https://portal.fazenda.sp.gov.br/servicos/itcmd (Operação Donatio)

## Fontes secundárias consultadas

- IN RFB 2.312/2026: [IRIB](https://www.irib.org.br/instrucao-normativa-rfb-n-2-312-de-13-de-marco-de-2026/), [LegisWeb](https://www.legisweb.com.br/legislacao/?id=492395), [Contábeis](https://www.contabeis.com.br/noticias/75605/rfb-libera-regras-do-imposto-de-renda-2026-veja-novidades/)
- P&R 2026: [Fenacon](https://fenacon.org.br/noticias/receita-publica-perguntas-e-respostas-irpf-2026-com-orientacoes-atualizadas-aos-contribuintes/), [CNN Brasil](https://www.cnnbrasil.com.br/economia/macroeconomia/ir-2026-fisco-divulga-pagina-com-perguntas-e-respostas/)
- Lei 15.270/2025: [CRC-MG](https://crcmg.org.br/wp-content/uploads/2025/12/Cafe-com-o-Contabilista-Lei-n.-15.270-e-a-tributacao-de-dividendos-e-de-altas-rendas-16dez2025.pdf), [IOB](https://noticias.iob.com.br/tributacao-dividendos-imposto-de-renda/)
- INs de 2024 e 2025: [EY 2025](https://ey.com/content/dam/ey-unified-site/ey-com/pt-br/campaigns/tax/documents/ey-brasil-alert-irpf-25-03-17-2025.pdf), [IRIB IN 2.255](https://irib.org.br/noticias/detalhes/instrucao-normativa-rfb-n-2-255-de-11-de-marco-de-2025), [CRC-MG 2024](https://crcmg.org.br/wp-content/uploads/2024/03/Apresentacao-Novidades-do-IRPF-2024.pdf)
- 2023: [Econet](https://blog.econeteditora.com.br/principais-mudancas-no-irpf-2023), [CFC](https://cfc.org.br/?p=52020)
- Offshore (Lei 14.754): [BMA](https://www.bmalaw.com.br/conteudo/direito-tributario/publicacoes/irpf-2025-temas-praticos-incluindo-impactos-da-nova-tributacao-dos-investimentos-offshore/pdf)
- Doações no IRPF: [Portal Tributário: doador](https://www.portaltributario.com.br/irpf/como-o-doador-deve-declarar-as-doacoes-efetuadas-em.htm), [donatário](https://www.portaltributario.com.br/irpf/como-o-donatario-deve-declarar-as-doacoes-recebidas-em.htm), [Agência Gov: fundos](https://agenciagov.ebc.com.br/noticias/202504/como-destinar-parte-imposto-renda-fundos-criancas-adolescentes-idosos)
- ITCMD-SP: [Operação Donatio](https://portal.fazenda.sp.gov.br/servicos/itcmd/Paginas/Operacao-Donatio.aspx), [RC 30926/2024](https://legislacao.fazenda.sp.gov.br/Paginas/RC30926_2024.aspx), [isenção não dispensa declaração (RC 33778/2026)](https://rotadajurisprudencia.com.br/2026/07/sefaz-sp-reafirma-que-isencao-do-itcmd-nao-dispensa-obrigacoes-acessorias/), [COAD: veículos](https://www.coad.com.br/home/noticias-detalhe/122701/mais-de-2-mil-doacoes-de-veiculos-estao-com-o-itcmd-pendente-em-sao-paulo)
- LC 227/2026 (ITCMD): [Contábeis](https://www.contabeis.com.br/noticias/74671/reforma-tributaria-institui-normas-gerais-para-o-itcmd/), [Lefosse](https://lefosse.com/noticias/alerta/itcmd-lei-complementar-preve-mudancas-na-tributacao-de-doacao-e-herancas/)

## Projetos de referência (código aberto)

- [ALASTecnology/mcp-imposto-de-renda](https://github.com/ALASTecnology/mcp-imposto-de-renda) (AGPL-3.0): codec `.DBK`/`.DEC`, motor 2026, tabelas do PGD, `docs/regras/irpf-2026.md` e `irpf-2027.md`.
- [pereirapthiago/dbkIRRF](https://github.com/pereirapthiago/dbkIRRF) (MIT, PHP): engenharia reversa do `.DBK`, mas com o checksum ainda desconhecido. Serve só como referência.
