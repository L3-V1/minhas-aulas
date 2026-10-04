// Monta a página a partir de dados/aulas.js. Não é preciso editar este arquivo.

(function () {
  const galeria = document.getElementById("galeria");
  const aviso = document.getElementById("aviso");

  function criar(tag, classe, texto) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto) el.textContent = texto;
    return el;
  }

  function avisar(texto) {
    aviso.textContent = texto;
    aviso.hidden = false;
  }

  function temItens(lista) {
    return Array.isArray(lista) && lista.length > 0;
  }

  // Grifa no menu a seção que está na tela. Sem JS, o menu continua funcionando como âncoras.
  function marcarMenu() {
    if (!("IntersectionObserver" in window)) return;
    const links = Array.from(document.querySelectorAll('.menu a[href^="#"]'));
    const secoes = links.map((link) => document.getElementById(link.hash.slice(1)));
    const visiveis = new Set();
    let noFim = false;

    function atualizar() {
      // No fim da página, a última seção pode ser curta demais para chegar ao topo.
      const atual = noFim ? secoes[secoes.length - 1] : secoes.filter((s) => visiveis.has(s)).pop();
      if (!atual) return;
      links.forEach((link, i) => {
        if (secoes[i] === atual) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }

    // Uma seção conta como atual quando ocupa a faixa de cima da tela (os primeiros 40%).
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => (e.isIntersecting ? visiveis.add(e.target) : visiveis.delete(e.target)));
      atualizar();
    }, { rootMargin: "0px 0px -60% 0px" });
    secoes.filter(Boolean).forEach((s) => observador.observe(s));

    const rodape = document.querySelector(".rodape");
    if (rodape) {
      new IntersectionObserver(([e]) => {
        noFim = e.isIntersecting;
        atualizar();
      }).observe(rodape);
    }
  }

  marcarMenu();

  // Um erro de digitação em dados/aulas.js impede o arquivo inteiro de carregar.
  if (typeof PROFESSOR === "undefined" || typeof AULAS === "undefined") {
    avisar("Não foi possível ler o arquivo dados/aulas.js. Confira se não falta uma vírgula ou uma aspa.");
    return;
  }

  function montarSobre() {
    const texto = document.getElementById("sobre-texto");
    if (temItens(PROFESSOR.sobre)) {
      texto.append(...PROFESSOR.sobre.map((paragrafo) => criar("p", null, paragrafo)));
    } else {
      texto.hidden = true;
    }

    const notas = document.getElementById("como-trabalho");
    if (temItens(PROFESSOR.comoTrabalho)) {
      notas.append(...PROFESSOR.comoTrabalho.map((nota) => {
        const item = criar("li");
        item.append(criar("h4", null, nota.titulo), criar("p", null, nota.texto));
        return item;
      }));
    } else {
      notas.hidden = true;
      document.getElementById("titulo-como-trabalho").hidden = true;
    }

    // Sem nada para mostrar, a seção sai da página e do menu.
    if (texto.hidden && notas.hidden) {
      document.getElementById("sobre").hidden = true;
      document.querySelectorAll('a[href="#sobre"]').forEach((link) => {
        (link.closest("li") || link).hidden = true;
      });
    }
  }

  function montarContato() {
    const chamada = document.getElementById("chamada-contato");
    if (PROFESSOR.chamadaContato) chamada.textContent = PROFESSOR.chamadaContato;
    else chamada.hidden = true;

    const botao = document.getElementById("contato-botao");
    if (PROFESSOR.email) {
      const link = criar("a", "botao botao--grande", PROFESSOR.email);
      link.href = "mailto:" + PROFESSOR.email;
      botao.append(link);
    } else {
      botao.hidden = true;
    }

    document.getElementById("contato-escola").textContent =
      PROFESSOR.nome + ", professor de " + PROFESSOR.disciplina + " na " + PROFESSOR.escola + ".";
  }

  function montarProfessor() {
    document.getElementById("nome").textContent = PROFESSOR.nome;
    document.getElementById("escola").textContent =
      "Professor de " + PROFESSOR.disciplina + " na " + PROFESSOR.escola;
    document.getElementById("apresentacao").textContent = PROFESSOR.apresentacao;

    if (PROFESSOR.foto) {
      const foto = criar("img", "retrato");
      foto.src = PROFESSOR.foto;
      foto.alt = "Foto de " + PROFESSOR.nome;
      document.getElementById("retrato").append(foto);
    }

    montarSobre();
    montarContato();
  }

  function criarCartao(aula, tag) {
    const item = criar(tag || "li", "aula");
    const link = criar("a", "aula-link");
    link.href = aula.video;
    link.target = "_blank";
    link.rel = "noopener";

    const moldura = criar("span", "aula-foto");
    const img = criar("img");
    img.src = aula.imagem;
    img.alt = "Imagem da aula " + aula.titulo;
    img.loading = "lazy";
    // Reserva espaço antes de a imagem carregar; a proporção real vale depois.
    img.width = 800;
    img.height = 800;
    moldura.append(img);

    const titulo = criar("h3", "aula-titulo");
    titulo.append(criar("span", null, aula.titulo));

    const assistir = criar("span", "aula-assistir", "Assistir ao vídeo");
    assistir.append(criar("span", "so-leitor", " (abre o Google Drive em nova aba)"));

    const texto = criar("div", "aula-texto");
    texto.append(titulo, criar("p", "aula-descricao", aula.descricao), assistir);
    link.append(moldura, texto);
    item.append(link);
    return item;
  }

  // A última aula da lista é a mais recente e aparece com mais espaço.
  function criarDestaque(aula) {
    const cartao = criarCartao(aula, "article");
    cartao.classList.add("aula--destaque");
    cartao.querySelector(".aula-texto").prepend(criar("p", "anotacao", "Aula mais recente"));
    return cartao;
  }

  montarProfessor();

  if (AULAS.length === 0) {
    avisar("Nenhuma aula publicada ainda. Volte em breve.");
    return;
  }
  document.getElementById("destaque").append(criarDestaque(AULAS[AULAS.length - 1]));
  galeria.append(...AULAS.slice(0, -1).map((aula) => criarCartao(aula)));
})();
