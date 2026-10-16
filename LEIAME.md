# Seleção do Clube SKEM.AI

Site estático (HTML, CSS e JS). Não precisa de build.

## Publicar na Vercel
1. Suba esta pasta para um repositório no GitHub (ou use `vercel` na pasta).
2. Na Vercel, "Add New Project", escolha o repositório. Framework: "Other". Deixe build e output vazios.
3. IMPORTANTE: o site contém dados das entrevistas. Em Settings > Deployment Protection, ative a proteção por senha ou "Vercel Authentication" antes de abrir o link na reunião.

## Editar notas e textos
Tudo está em `js/data.js`: notas (`scores`), justificativas (`why`), resumo (`summary`) e pontos de atenção (`attention`).

## Cadeiras
Padrão: 4 das meninas e 6 dos meninos. Mude na engrenagem do topo, sem mexer em código.


## Sala de fora do clube

- Botão "Sala de fora do clube" no topo alterna entre as duas salas. A escolha de dentro nunca é apagada.
- Cadeiras de fora = candidatos - cadeiras do clube, divididas em Talvez fora, Meio fora e Muito fora (com 12 de fora: 5, 4 e 3).
- Quem senta dentro do clube não pode ir para a sala de fora; quem está fora aparece com um × na fila.
- Para incluir mais candidatos, edite js/data.js.
