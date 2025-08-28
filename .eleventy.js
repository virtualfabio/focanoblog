const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  // Copia a pasta public/ para _site/
  eleventyConfig.addPassthroughCopy("public");

 eleventyConfig.addFilter("formatBR", function(input) {
    if (!input) return "";

    // Date object
    if (Object.prototype.toString.call(input) === "[object Date]") {
      const y = input.getUTCFullYear();
      const m = String(input.getUTCMonth() + 1).padStart(2, "0");
      const d = String(input.getUTCDate()).padStart(2, "0");
      return `${d}/${m}/${y}`;
    }

    // Timestamp numérico
    if (typeof input === "number") {
      const dt = new Date(input);
      const y = dt.getUTCFullYear();
      const m = String(dt.getUTCMonth() + 1).padStart(2, "0");
      const d = String(dt.getUTCDate()).padStart(2, "0");
      return `${d}/${m}/${y}`;
    }

    // String "YYYY-MM-DD"
    if (typeof input === "string") {
      const m1 = input.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (m1) return `${m1[3]}/${m1[2]}/${m1[1]}`;

      // ISO ou outros formatos: parse e formata em UTC
      const dt = new Date(input);
      if (!isNaN(dt)) {
        const y = dt.getUTCFullYear();
        const m = String(dt.getUTCMonth() + 1).padStart(2, "0");
        const d = String(dt.getUTCDate()).padStart(2, "0");
        return `${d}/${m}/${y}`;
      }
    }

    return String(input);
  });

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