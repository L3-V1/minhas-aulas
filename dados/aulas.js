/*
  ESTE É O ÚNICO ARQUIVO QUE PRECISA SER EDITADO PARA ATUALIZAR O SITE.

  Como adicionar uma aula:
    1. Envie a imagem para a pasta img/aulas/ (nome sem espaços e sem acentos).
    2. Copie um bloco inteiro da lista AULAS, da chave { até a },
       e cole logo abaixo do último.
    3. Troque os quatro campos: titulo, descricao, imagem e video.
    4. Salve.

  Cuidados: cada texto fica entre aspas "assim" e cada linha termina com vírgula.
  O passo a passo completo está no README.md.
*/

const PROFESSOR = {
  nome: "Sidnei Ribeiro de Moraes",
  disciplina: "Física",
  escola: "E. E. Prof. Primo Ferreira",
  // RASCUNHO: revisar o texto de apresentação
  apresentacao: "Aqui reúno vídeos de aulas e experimentos feitos com os alunos, quase sempre com material simples e fácil de encontrar.",
  foto: "", // opcional: caminho de uma foto, por exemplo "img/professor.jpg". Vazio = sem foto.
  email: "sidlevi61@gmail.com",
};

const AULAS = [
  {
    titulo: "Escola de Tempo Integral",
    // RASCUNHO
    descricao: "Lançamento de foguete de garrafa PET a partir de uma base de tubos de PVC.",
    imagem: "img/aulas/escola-de-tempo-integral.jpg",
    video: "https://drive.google.com/file/d/185aLTzXqZc9Dd6Y5UhncmE0gQ7Gi3UG8/view",
  },
  {
    titulo: "Itinerário Ciência em Ação",
    // RASCUNHO
    descricao: "Montagem e disparo de um foguete de garrafa PET acionado por um cordão.",
    imagem: "img/aulas/itinerario-ciencia-em-acao.jpg",
    video: "https://drive.google.com/file/d/1LcGt3XrCm4mw_pbrFlLkYSkCIwSQjoTq/view?usp=sharing",
  },
  {
    titulo: "Seminário de Experimentos",
    // RASCUNHO
    descricao: "Um painel óptico mostra os defeitos da visão e como as lentes desviam a luz.",
    imagem: "img/aulas/seminario-de-experimentos.jpg",
    video: "https://drive.google.com/file/d/1Nb4jNF-Yb5koiqbzGUjLBmG-4yZewrLX/view",
  },
  {
    titulo: "Experimentos de Baixo Custo",
    // RASCUNHO
    descricao: "Fonte de Heron montada com garrafas PET e mangueiras: a água sobe sem bomba.",
    imagem: "img/aulas/experimentos-de-baixo-custo.jpg",
    video: "https://drive.google.com/file/d/1zkFLlk-BNOG09WLWVAHcPD1wxY38NTa1/view",
  },
  {
    titulo: "Feira de Ciências",
    // RASCUNHO
    descricao: "Guindaste com garra controlado por Arduino e programado no computador.",
    imagem: "img/aulas/feira-de-ciencias.jpg",
    video: "https://drive.google.com/file/d/1Td9YgoA51rxJec3P6beNpPphOU650Jed/view",
  },
];
