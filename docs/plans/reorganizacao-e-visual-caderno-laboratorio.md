---
titulo: Reorganização e novo visual do portfólio "Minhas Aulas"
data: 2026-09-30
status: aprovado
---

# Plano: reorganização e novo visual do portfólio "Minhas Aulas"

## Contexto

O repositório é o portfólio do professor Sidnei Ribeiro de Moraes (Física, E. E. Prof. Primo Ferreira), publicado no GitHub Pages. Hoje é uma página estática única com problemas de organização (arquivos duplicados, 36 MB de imagens, nomes com espaços e acentos, HTML sem doctype/charset/viewport) e de apresentação (não se adapta ao celular, os títulos dos vídeos só existem no `alt`).

Resultado esperado: uma vitrine para o público geral, com tema de caderno de laboratório, leve no celular, em que o professor consiga adicionar uma aula editando um único arquivo.

Decisões já confirmadas no brainstorming:
- Site estático, sem build e sem dependências; JS puro.
- Conteúdo em `aulas.js` (não `.json`, para abrir também com dois cliques).
- Uma página: apresentação do professor, galeria (foto, título e uma frase), contato.
- Vídeos continuam abrindo no Google Drive em nova aba.
- Imagens otimizadas; originais pesados e imagens sem uso saem do repositório.
- `index.html` permanece na raiz (o endereço do Pages já está em uso).
- README com guia para o professor.
- Fora do escopo: filtros, vídeo embutido, página por experimento, framework, reescrita do histórico do git.

## Estrutura final

```
index.html
README.md
css/styles.css
js/main.js            monta a página a partir dos dados
dados/aulas.js        ÚNICO arquivo que o professor edita
img/aulas/*.jpg       miniaturas otimizadas
```

Removidos: `boaaspraticas`, `#style.css`, `styles.css` (movido), as 9 imagens da raiz.

## Passos

### 1. Imagens
Descoberta: cinco dos arquivos `.jpg` são na verdade PNG 2048×2048 (por isso 5–7 MB). Não há ImageMagick; usar um script Python descartável com Pillow (já instalado), rodado a partir do scratchpad, que não entra no repositório.

- Redimensionar para no máximo 800 px no maior lado, salvar como JPEG real, qualidade ~80 (meta: menos de 150 KB cada). As duas que já são pequenas (424×601 e 551×313) só são copiadas e renomeadas, sem ampliar.
- Mapeamento:

| Original | Novo | Aula |
|---|---|---|
| `1751822227568.jpg` | `img/aulas/escola-de-tempo-integral.jpg` | Escola de Tempo Integral |
| `1751822232063.jpg` | `img/aulas/itinerario-ciencia-em-acao.jpg` | Itinerário Ciência em Ação |
| `optica da visão.jpg` | `img/aulas/seminario-de-experimentos.jpg` | Seminário de Experimentos |
| `fonte de heron.jpg` | `img/aulas/experimentos-de-baixo-custo.jpg` | Experimentos de Baixo Custo |
| `1751821487103.jpg` | `img/aulas/feira-de-ciencias.jpg` | Feira de Ciências |

- Apagar com `git rm`: os 5 originais acima e as 4 sem uso (`1751821474450.jpg`, `1751821705118.jpg`, `MOTOR ELÉTRICO.jpg`, `MOTOR ELÉTRICOthumb.jpg`).

### 2. Dados — `dados/aulas.js`
Dois objetos globais, com comentário no topo explicando como adicionar uma aula:

```js
const PROFESSOR = {
  nome: "Sidnei Ribeiro de Moraes",
  disciplina: "Física",
  escola: "E. E. Prof. Primo Ferreira",
  apresentacao: "…",          // RASCUNHO
  foto: "",                    // em aberto: vazio = bloco sem foto
  email: "sidlevi61@gmail.com",
};

const AULAS = [
  {
    titulo: "Experimentos de baixo custo",
    descricao: "…",            // RASCUNHO
    imagem: "img/aulas/experimentos-de-baixo-custo.jpg",
    video: "https://drive.google.com/file/d/…/view",
  },
  // …
];
```

Os 5 links do Drive são copiados sem alteração do `index.html` atual. As frases e a apresentação são rascunhos meus, escritos só a partir do título e do que a imagem mostra (ex.: fonte de Heron com garrafas PET; painel óptico de defeitos da visão), e marcados com `// RASCUNHO` para revisão.

### 3. Marcação — `index.html`
Reescrito com `<!DOCTYPE html>`, `charset`, `viewport`, `<meta name="description">`, título com o nome do professor. Estrutura semântica: `header` (apresentação), `main` com `section` da galeria (`<ul>` vazia preenchida pelo JS), `footer` (contato). `<noscript>` com aviso simples. Scripts com `defer`: `dados/aulas.js` e depois `js/main.js`.

### 4. Script — `js/main.js`
- Preenche apresentação e contato a partir de `PROFESSOR` (link `mailto:`; foto só se o campo estiver preenchido).
- Para cada item de `AULAS`, cria um cartão: link para o vídeo (`target="_blank" rel="noopener"`), `img` com `alt`, `loading="lazy"`, `width`/`height`, título e frase visíveis.
- Usa `createElement`/`textContent`, nunca `innerHTML` com dados.
- Estado vazio: se `AULAS` estiver vazio, mostra uma mensagem em vez de galeria em branco.

### 5. Visual — `css/styles.css`
Tema caderno de laboratório. Tokens em variáveis CSS no `:root`.

- **Cores:** papel `#FBFCF8`; linhas do quadriculado `#C9DCEB`; tinta de caneta azul `#1F3A8A` (texto e títulos); caneta vermelha `#C8322B` (linha de margem e realces, a cor de correção do professor); marca-texto amarelo `#FFE45C` (herda o amarelo do site atual); fita crepe `#E9DFC0`.
- **Tipografia:** Kalam (manuscrita, títulos e legendas) e Atkinson Hyperlegible (texto corrido, legível em celular). Substituem a Chakra Petch. Carregadas do Google Fonts com `display=swap`.
- **Fundo:** quadriculado feito com `linear-gradient` repetido, sem imagem. Linha de margem vermelha à esquerda em telas largas.
- **Apresentação:** o nome do professor escrito "à caneta" sobre a página, com a escola como anotação. Ao lado, um esquema em SVG inline desenhado à mão: a trajetória parabólica de um foguete de garrafa PET com vetores de velocidade, referência direta às aulas dele. É o único elemento animado: o traço se desenha uma vez ao carregar (`stroke-dashoffset`), desligado em `prefers-reduced-motion`.
- **Galeria:** fotos "coladas" com fita crepe (pseudo-elemento), leve rotação alternada, legenda manuscrita e frase abaixo. Uma coluna no celular, duas ou três em telas largas (`grid` com `auto-fill`), substituindo a rolagem horizontal atual. Sem a opacidade de 50% de hoje. Proporção das fotos preservada com `object-fit`, pois há imagens quadradas, verticais e horizontais.
- **Interação:** no hover/foco o cartão endireita e o título ganha marca-texto; foco de teclado visível.
- **Contato:** rodapé simples, como anotação no pé da página.
- Sem regras mortas: `.chamada`, `.chamada-texto` e `.categoria h2` não são migradas.

### 6. README.md
Em português, curto: o que é o site, a estrutura de pastas e um passo a passo "Como adicionar uma aula" pelo próprio site do GitHub (subir a imagem em `img/aulas/`, copiar um bloco em `dados/aulas.js`, trocar os quatro campos, salvar). Inclui recomendação de tamanho de imagem e os erros comuns (vírgula, aspas).

## Pontos de atenção
- Três das imagens atuais são ilustrações geradas por IA (uma tem balão com texto em japonês e duas têm selo "ai"). Serão mantidas como estão; trocar por fotos reais é decisão do professor, anotada no README como sugestão.
- Nada é publicado até haver `git push` na `main`. Não farei commit nem push sem pedido.

## Verificação
1. Servir localmente (`python3 -m http.server`) e abrir com o Playwright em 375 px e 1280 px: conferir screenshots, ausência de rolagem horizontal e de erros no console.
2. Abrir também via `file://` para confirmar que funciona com dois cliques.
3. Conferir que os 5 cartões aparecem com título, frase e o mesmo link do Drive de antes.
4. Testar o estado vazio (lista `AULAS` vazia) e o bloco do professor sem foto.
5. Navegar por teclado (Tab) e checar foco visível; checar `prefers-reduced-motion`.
6. Conferir o peso final: `img/` abaixo de ~1 MB no total e nenhuma referência a arquivo inexistente (`git status` + busca por `src=`/`href=`).
