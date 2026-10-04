---
titulo: Landing page completa do portfólio "Minhas Aulas"
data: 2026-10-03
status: aprovado
---

# Plano: landing page completa para o portfólio "Minhas Aulas"

## Contexto

O site hoje tem só uma capa, a galeria de 5 aulas e um rodapé com o e-mail. O pedido é transformá-lo numa landing page completa, com quatro seções (**Início, Sobre, Aulas, Contato**) e rolagem suave entre elas. A estética de caderno de laboratório continua a mesma: quadriculado, tinta azul, caneta vermelha, marca-texto, fita crepe, Kalam e Atkinson Hyperlegible. A página fica maior usando os recursos que já existem.

Decisões tomadas na entrevista (termos registrados em `GLOSSARY.md`: Professor, Aula, Aula em destaque):

- O termo é **Aula**. A seção se chama "Aulas" e a lista nos dados continua `AULAS`.
- Barra de menu fixa no topo, manuscrita. A seção atual fica grifada com marca-texto.
- **Início:** ocupa a primeira tela inteira, mantém o esquema do foguete e ganha o botão "Ver as aulas ↓" e o link "Sobre o professor".
- **Sobre:** texto de apresentação, "Como eu trabalho" (3 notas) e números: o total de aulas é calculado, os outros dois valores são informados. Todos os textos são rascunho meu.
- **Aulas:** a última aula da lista é a **Aula em destaque**, maior e com a foto ao lado do texto. As demais ficam no grid atual.
- **Contato:** chamada para escolas e professores, botão grande de e-mail e a escola.
- Todos os textos novos ficam em `dados/aulas.js` (bloco `PROFESSOR`), marcados com `// RASCUNHO`. O professor continua editando um único arquivo.
- Continua sem build, sem dependências, em JS puro, e funciona também via `file://`.

## Arquivos

- `dados/aulas.js`: campos novos em `PROFESSOR`.
- `index.html`: menu e as quatro seções.
- `js/main.js`: monta Sobre, destaque e Contato; destaca a seção atual no menu.
- `css/styles.css`: menu, hero em tela cheia, Sobre, destaque, Contato e rolagem suave.
- `README.md`: descreve os campos novos.
- `docs/plans/`: cópia deste plano depois de aprovado (skill plan-backup).

## Passos

### 1. Dados (`dados/aulas.js`)
Acrescentar ao `PROFESSOR`, sem mexer em `AULAS`:

```js
sobre: [                      // RASCUNHO: um item por parágrafo
  "…", "…",
],
comoTrabalho: [               // RASCUNHO: três notas curtas
  { titulo: "Material de baixo custo", texto: "…" },
  { titulo: "Mão na massa", texto: "…" },
  { titulo: "Ciência para mostrar", texto: "…" },   // feiras e seminários
],
numeros: [                    // RASCUNHO: VALORES PROVISÓRIOS, corrigir antes de publicar
  { valor: "?", rotulo: "anos de sala de aula" },
  { valor: "?", rotulo: "feiras de ciências" },
],
chamadaContato: "…",          // RASCUNHO: convite a escolas e professores
```

- Os rascunhos falam só do que os dados já mostram: Física, a escola, os experimentos com garrafa PET, a fonte de Heron, o painel óptico, o Arduino, as feiras e os seminários.
- Os valores dos números ficam como `"?"`, e não como números inventados. Assim o site não publica dados falsos por engano, e fica evidente o que falta corrigir.
- O comentário no topo do arquivo ganha uma linha apontando os campos novos.

### 2. Marcação (`index.html`)
- `<nav class="menu" aria-label="Seções">` fora de `.pagina`, com quatro links: `#inicio`, `#sobre`, `#aulas`, `#contato`.
- `header.capa#inicio`: o conteúdo atual, mais `.capa-acoes`, com `<a class="botao" href="#aulas">Ver as aulas ↓</a>` e `<a href="#sobre">Sobre o professor</a>`. O SVG do foguete não muda.
- `section#sobre`: `h2`, um `div#sobre-texto`, uma `ol#como-trabalho` e uma `ul#numeros`.
- `section#aulas` (antes `titulo-aulas`): `h2` "Aulas", aviso, `div#destaque` e `ul#galeria`.
- `section#contato`: `h2`, `p#chamada-contato`, `p#contato-botao` e `p#contato-escola`. O `footer` atual vira esta seção.
- `footer.rodape` mínimo, com o link "Voltar ao início ↑".
- Atualizar a `meta description` para mencionar as seções.

### 3. Script (`js/main.js`)
Reaproveitar `criar()`, `avisar()` e `criarCartao()`. Continuar usando só `textContent`, nunca `innerHTML`.

- `montarProfessor()` passa a preencher também:
  - `montarSobre()`: os parágrafos de `sobre`, as notas de `comoTrabalho` e os números. O primeiro número é sempre `AULAS.length`, com o rótulo "aula registrada" ou "aulas registradas" conforme a quantidade. Depois vêm os números de `PROFESSOR.numeros`.
  - `montarContato()`: a chamada, o botão `mailto:` com o e-mail visível e a linha da escola.
  - Cada bloco é montado só se o campo existir e não estiver vazio. Um `aulas.js` antigo, sem os campos novos, continua funcionando.
- Aulas:
  - O destaque é `AULAS[AULAS.length - 1]`, montado com `criarCartao()` e a classe extra `aula--destaque`. Ganha a anotação "Aula mais recente" e vai para `#destaque`.
  - As demais aulas (`AULAS.slice(0, -1)`) vão para o grid, na ordem atual.
  - Com uma aula só, aparece apenas o destaque. Com zero aulas, aparece o aviso atual, sem destaque e sem o número de aulas.
- Menu ativo: um `IntersectionObserver` nas quatro seções marca o link correspondente com `aria-current="true"`. Sem JS, o menu continua funcionando como âncoras comuns.
- Para o erro de leitura de `aulas.js`, o aviso atual continua. O menu e o hero estático aparecem mesmo assim.

### 4. Visual (`css/styles.css`)
Reaproveitar os tokens do `:root`. Novo token: `--menu: calc(var(--q) * 2.5)` (altura da barra).

- **Rolagem:** `html { scroll-padding-top: var(--menu) }`. A regra `scroll-behavior: smooth` só vale dentro de `prefers-reduced-motion: no-preference`.
- **Menu:**
  - `position: sticky; top: 0`, largura total, fundo papel quase opaco e borda inferior de 2px em vermelho.
  - Links em Kalam, sem sublinhado. `aria-current` e hover ganham o grifo de marca-texto, o mesmo gradiente de `.aula-titulo span`.
  - Os 4 links cabem em 375px. Em telas largas, o menu se alinha à margem vermelha (o mesmo `padding-left` de `.pagina`).
- **Hero:** `.capa` com `min-height: calc(100svh - var(--menu))` e o conteúdo centralizado na vertical.
  - `.botao`: borda de caneta (2px tinta), cantos levemente irregulares (`border-radius` assimétrico), rotação de -1deg. No hover, marca-texto e a rotação zera. Foco visível igual ao atual.
- **Seções:**
  - Classe comum `.secao` com `margin-top: calc(var(--q) * 4)`.
  - O `h2` ganha um traço vermelho manuscrito embaixo, com `::after` e `border-radius`, para dar ritmo de capítulo.
- **Sobre:**
  - O texto fica limitado a `34rem`.
  - As notas de "Como eu trabalho" são lista numerada com círculos de caneta vermelha (`counter` + `::before` em Kalam): três colunas em tela larga, uma no celular.
  - Os números ficam grandes em Kalam vermelha, com o rótulo embaixo, numa linha flexível.
- **Destaque:** `.aula--destaque` usa grid de duas colunas a partir de 48rem (foto e texto) e um título maior. Fica sem rotação, ou com rotação mínima, e mantém a fita crepe.
- **Contato:**
  - A seção reaproveita o estilo atual de `.rodape`, renomeado para `.contato`, com borda superior vermelha.
  - O e-mail vira `.botao` maior.
  - `overflow-wrap: anywhere` continua valendo, por causa do e-mail no celular.
- **Rodapé:** uma linha discreta com "Voltar ao início ↑".
- Remover as regras que ficarem sem uso, como o seletor antigo `.rodape h2`.

### 5. README.md
Atualizar o parágrafo "Para mudar o texto de apresentação…":
- listar `sobre`, `comoTrabalho`, `numeros` e `chamadaContato`;
- explicar que a última aula da lista aparece em destaque;
- avisar para trocar os `"?"` dos números antes de publicar.

## Pontos de atenção
- Os textos novos são rascunhos meus. Os números ficam como `"?"` até o professor informar os valores.
- Não faço commit nem push sem pedido.

## Verificação
1. Servir com `python -m http.server`. Abrir no Playwright em 375px e 1280px e tirar screenshots de cada seção. Conferir que não há rolagem horizontal nem erros no console.
2. Clicar em cada link do menu: a página rola até a seção, o título não fica escondido sob a barra e o link ativo fica grifado. Repetir rolando a página manualmente.
3. Conferir que o destaque mostra "Feira de Ciências" (a última da lista) e o grid mostra as outras 4. O número de aulas deve mostrar 5.
4. Testar casos de borda editando os dados temporariamente: `AULAS` com 1 item, `AULAS` vazio, e `PROFESSOR` sem os campos novos.
5. Testar `prefers-reduced-motion: reduce` (sem rolagem suave e sem animação) e a navegação por Tab, com foco visível em todos os links.
6. Abrir via `file://`.
