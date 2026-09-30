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

  // Um erro de digitação em dados/aulas.js impede o arquivo inteiro de carregar.
  if (typeof PROFESSOR === "undefined" || typeof AULAS === "undefined") {
    avisar("Não foi possível ler o arquivo dados/aulas.js. Confira se não falta uma vírgula ou uma aspa.");
    return;
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

    const contato = document.getElementById("contato");
    if (PROFESSOR.email) {
      const link = criar("a", null, PROFESSOR.email);
      link.href = "mailto:" + PROFESSOR.email;
      contato.append("Para falar sobre uma aula, escreva para ", link, ".");
    }
  }

  function criarCartao(aula) {
    const item = criar("li", "aula");
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

    link.append(moldura, titulo, criar("p", "aula-descricao", aula.descricao), assistir);
    item.append(link);
    return item;
  }

  montarProfessor();

  if (AULAS.length === 0) {
    avisar("Nenhuma aula publicada ainda. Volte em breve.");
    return;
  }
  galeria.append(...AULAS.map(criarCartao));
})();
