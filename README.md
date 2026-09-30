# Minhas Aulas

Portfólio do professor Sidnei Ribeiro de Moraes (Física, E. E. Prof. Primo Ferreira): uma página com os vídeos de aulas e experimentos, publicada pelo GitHub Pages.

## Pastas

```
index.html        a página
dados/aulas.js    os textos e a lista de aulas (é o único arquivo que você edita)
img/aulas/        as imagens das aulas
css/ e js/        aparência e funcionamento (não precisa mexer)
```

## Como adicionar uma aula

Tudo pode ser feito pelo site do GitHub, sem instalar nada.

1. **Envie a imagem.** Abra a pasta `img/aulas`, clique em **Add file → Upload files**, escolha a imagem e confirme em **Commit changes**.
   - Nome do arquivo sem espaços e sem acentos, por exemplo `motor-eletrico.jpg`.
   - Tamanho recomendado: até 800 px de largura e menos de 200 KB. Fotos direto do celular são muito maiores; reduza antes de enviar.
2. **Abra `dados/aulas.js`** e clique no lápis (**Edit this file**).
3. **Copie um bloco inteiro** da lista `AULAS`, da chave `{` até a `},`, e cole logo abaixo do último.
4. **Troque os quatro campos:**

   ```js
   {
     titulo: "Motor elétrico",
     descricao: "Uma frase curta sobre a aula.",
     imagem: "img/aulas/motor-eletrico.jpg",
     video: "https://drive.google.com/file/d/.../view",
   },
   ```

   No Google Drive, o vídeo precisa estar compartilhado como "Qualquer pessoa com o link".
5. **Salve** em **Commit changes**. O site se atualiza sozinho em um ou dois minutos.

Para mudar o texto de apresentação, o e-mail ou incluir uma foto sua, edite o bloco `PROFESSOR` no mesmo arquivo.

## Se algo der errado

Se a página mostrar "Não foi possível ler o arquivo dados/aulas.js", quase sempre é um destes:

- faltou a **vírgula** no fim de uma linha ou depois de `}`;
- faltou abrir ou fechar as **aspas** de um texto;
- há aspas dentro do texto: troque por aspas simples, como em `"Aula sobre 'empuxo'"`.

Se a imagem não aparece, confira se o nome em `imagem:` é idêntico ao do arquivo enviado, incluindo maiúsculas e a extensão.

## Sugestão

Três das imagens atuais são ilustrações geradas por IA (uma delas tem um balão com texto em japonês). Trocar por fotos reais das aulas deixaria o portfólio mais fiel ao trabalho: basta enviar a nova imagem com o mesmo nome da antiga.
