const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  // Copia a pasta public/ para _site/
  eleventyConfig.addPassthroughCopy("public");

    // Configura o Markdown com breaks: true
  const mdOptions = {
    html: true,      // permite tags HTML no Markdown
    breaks: true,    // ENTER vira <br>
    linkify: true    // transforma URLs em links automaticamente
  };

  eleventyConfig.setLibrary("md", markdownIt(mdOptions));
  // Coleção de artigos(todos)
  eleventyConfig.addCollection("artigos", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./artigos/*.md");
  });

    // Apenas artigos em destaque
  eleventyConfig.addCollection("destaques", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./artigos/*.md").filter(item => {
      return item.data.destaque === true;
    });
  });

  // Agrupa artigos por categoria
  eleventyConfig.addCollection("categorias", function(collectionApi) {
    let artigos = collectionApi.getFilteredByGlob("./artigos/*.md");
    let categorias = {};

    artigos.forEach(item => {
      let cats = item.data.categorias || [];

      cats.forEach(cat => {
        if(!categorias[cat]) {
          categorias[cat] = [];
        }
        [cat].push(item);
      });
    });

    return categorias;
  });
};