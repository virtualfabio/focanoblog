---
layout: layout.njk
title: Como construir um blog com HTML, Eleventy, JS e IA
description: Este é um artigo detalhado sobre 1
date: 2025-08-25
categorias: ["html", "js", "eleventy", "markdown"]
destaque: true
---


Neste artigo vamos aprender a criar um **blog moderno** com:

  - HTML simples
  - Eleventy (11ty) como gerador estático
  - JavaScript filtros e pesquisa dinâmica
  - Layout moderno, que você pode gerar com **IA** (por exemplo, usando [Gemini](https://gemini.google.com/))

Como exemplo, faremos um **blog de sugestões e críticas de filmes**, mas você pode adaptar para qualquer tema.


## Por que usar Eleventy?

Eleventy é um **gerador de sites estáticos** moderno e flexível:

- Simples de configurar e usar  
- Suporta Markdown e templates Nunjucks, Liquid, ou outros  
- Permite criar coleções de posts, layouts reutilizáveis e páginas de categorias  
- Ideal para blogs, portfólios e sites que não precisam de backend complexo


## Estrutura do projeto

meu-blog/
├── artigos/ # Posts em Markdown
│ ├── inception.md
│ └── matrix.md
├── public/
│ ├── css/
│ │ └── style.css
│ └── js/
│ └── artigos.js
├── _includes/
│ ├── header.html
│ └── layout.njk
├── .eleventy.js
└── index.html


---

## Instalação do Eleventy

```bash
 npm init -y
 npm install @11ty/eleventy
 npx eleventy --serve
```

## Layout moderno (IA / Gemini)

Você pode criar **layouts modernos** usando IA, como o [Gemini](https://gemini.google.com/).  
Depois, basta integrar o HTML gerado ao Eleventy, colocando os arquivos dentro de `_includes` e ajustando o layout Nunjucks.

**Exemplo de layout (_includes/layout.njk):**

<pre>
&lt;html&gt;
&lt;!DOCTYPE html&gt;
&lt;html lang="pt-BR"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;&#123;&#123; title &#125;&#125;&lt;/title&gt;
  &lt;link rel="stylesheet" href="/css/style.css"&gt;
&lt;/head&gt;
&lt;body class="font-sans bg-gray-50 text-gray-800"&gt;
    &#123;% include "header.html" %&#125;
    &lt;main class="max-w-5xl mx-auto p-4 md:p-8"&gt;
    &#123;&#123; content | safe &#125;&#125;
    &lt;/main&gt;
    &lt;script src="/js/artigos.js" defer&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>


## Header (_includes/header.html)

<pre>
&lt;html&gt;
&lt;header class="py-6 mb-8 text-center bg-yellow-100 rounded-lg shadow"&gt;
  &lt;h1 class="text-4xl font-bold"&gt;Blog de Sugestões e Críticas de Filmes&lt;/h1&gt;
  &lt;nav class="mt-2"&gt;
    &lt;a href="/" class="mr-4 text-blue-600 hover:underline"&gt;Home&lt;/a&gt;
    &lt;a href="/categorias/" class="text-blue-600 hover:underline"&gt;Categorias&lt;/a&gt;
  &lt;/nav&gt;
&lt;/header&gt;
</pre>


## Exemplo de artigos Markdown

### artigos/inception.md

<pre>
---
title: "Inception - Uma Análise Profunda"
date: 2025-08-23
categories: ["Ficção Científica", "Suspense"]
tags: ["inception", "filme", "crítica"]
layout: layout.njk
titleClass: "text-red-600 font-bold"
---

"Inception" é um filme que explora os limites da mente e dos sonhos.

### Resumo

Dirigido por Christopher Nolan, o filme acompanha Dom Cobb, um especialista em extrair segredos do subconsciente durante os sonhos.

### Pontos fortes

- Enredo complexo e inteligente
- Atuação impecável do elenco
- Efeitos visuais impressionantes

### Dicas para assistir

- Preste atenção aos detalhes, eles são importantes para entender a história  
- Assista mais de uma vez para captar todas as camadas da narrativa
</pre>

**artigos/matrix.md**

<pre>
---
title: "Matrix - Clássico da Ficção Científica"
date: 2025-08-23
categories: ["Ficção Científica", "Ação"]
tags: ["matrix", "filme", "crítica"]
layout: layout.njk
titleClass: "text-blue-600 font-bold"
---

"Matrix" revolucionou o cinema com sua visão futurista e ação inovadora.

### Resumo

O hacker Neo descobre que a realidade é uma simulação controlada por máquinas. Ele se une a Morpheus e Trinity para lutar pela liberdade da humanidade.

### Pontos fortes

- Efeitos especiais inovadores
- Trama filosófica e intrigante
- Sequências de ação icônicas
</pre>


## Configuração Eleventy (.eleventy.js)

<pre>
const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) &#123; 
  eleventyConfig.addPassthroughCopy("public");

  const mdOptions = &#123;  html: true, breaks: true, linkify: true &#125; ;
  eleventyConfig.setLibrary("md", markdownIt(mdOptions));

  eleventyConfig.addCollection("artigos", function(collectionApi) &#123; 
    return collectionApi.getFilteredByGlob("./artigos/*.md");
  &#125; );
&#125; ;
</pre>


## Página inicial com pesquisa e filtros (index.html)

<pre>
---
layout: layout.njk
title: "Blog de Sugestões e Críticas de Filmes"
templateEngineOverride: njk
---

&lt;div class="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:gap-4"&gt;
  &lt;div id="filtrosCategorias" class="flex flex-wrap gap-2"&gt;&lt;/div&gt;
  &lt;input id="pesquisa" type="text" placeholder="Pesquisar..." class="px-2 py-1 border rounded flex-1"&gt;
&lt;/div&gt;

&lt;div id="lista-artigos" class="grid grid-cols-1 md:grid-cols-2 gap-6"&gt;&lt;/div&gt;

&lt;script\&gt;
  window.artigos = [
    &#123; % for post in collections.artigos | reverse %&#125; 
    &#123; 
      "title": &#123; &#123;  post.data.title | jsonify &#125; &#125; ,
      "url": "&#123; &#123;  post.url &#125; &#125; ",
      "categorias": &#123; &#123;  (post.data.categories or post.data.tags or []) | jsonify &#125; &#125; ,
      "date": "&#123; &#123;  post.date | date: "%Y-%m-%d" &#125; &#125; "
    &#125; &#123; % if not loop.last %&#125; ,&#123; % endif %&#125; 
    &#123; % endfor %&#125; 
  ];
&lt;/script\&gt;
</pre>


## JavaScript para pesquisa, filtros (public/js/artigos.js)

<pre>
document.addEventListener("DOMContentLoaded", () =&gt; &#123; 
  const container = document.getElementById("lista-artigos");
  const filtrosCategorias = document.getElementById("filtrosCategorias");
  const inputPesquisa = document.getElementById("pesquisa");

  const artigos = Array.isArray(window.artigos) ? window.artigos : [];
  let listaAtual = artigos.slice();

  function renderArtigos(lista) &#123; 
    container.innerHTML = "";
    if(lista.length === 0) &#123; 
      container.innerHTML = `&lt;p class="text-gray-500"&gt;Nenhum artigo encontrado.&lt;/p&gt;`;
      return;
    &#125; 
    lista.forEach(post =&gt; &#123; 
      const el = document.createElement("article");
      el.className = "prose p-4 border rounded shadow bg-white";
      el.innerHTML = `
        &lt;a href="$&#123; post.url&#125; " class="font-bold text-blue-600 hover:underline"&gt;$&#123; post.title&#125; &lt;/a&gt;
        &lt;div class="text-sm text-gray-500"&gt;Categorias: $&#123; post.categorias.join(", ")&#125; &lt;/div&gt;
        &lt;small&gt;Publicado em $&#123; post.date&#125; &lt;/small&gt;
      `;
      container.appendChild(el);
    &#125; );
  &#125; 

  const todasCategorias = [...new Set(artigos.flatMap(a =&gt; a.categorias))];
  todasCategorias.forEach(cat =&gt; &#123; 
    const label = document.createElement("label");
    label.className = "flex items-center gap-1";
    label.innerHTML = `&lt;input type="checkbox" class="filter-category" value="$&#123; cat&#125; "&gt; &lt;span&gt;$&#123; cat&#125; &lt;/span&gt;`;
    filtrosCategorias.appendChild(label);
  &#125; );

  function aplicarFiltros() &#123; 
    const termo = inputPesquisa.value.toLowerCase();
    const selecionadas = Array.from(filtrosCategorias.querySelectorAll("input:checked"))
                              .map(cb =&gt; cb.value);

    listaAtual = artigos.filter(post =&gt; &#123; 
      const matchesSearch = post.title.toLowerCase().includes(termo)
                          || post.categorias.some(c =&gt; c.toLowerCase().includes(termo));

      const matchesCategory = selecionadas.length === 0
                              ? true
                              : post.categorias.some(c =&gt; selecionadas.includes(c));

      return matchesSearch &amp;&amp; matchesCategory;
    &#125; );

    renderArtigos(listaAtual);
  &#125; 

  inputPesquisa.addEventListener("input", aplicarFiltros);
  filtrosCategorias.addEventListener("change", aplicarFiltros);

  renderArtigos(listaAtual);
&#125; );
</pre>

---

## Conclusão

Agora você tem um **blog moderno** com Eleventy, Markdown e JS, focado em **sugestões e críticas de filmes**, com:

- Pesquisa e filtros dinâmicos  
- Layoutes modernos que podem ser gerados por IA, como [Gemini](https://gemini.google.com/)  

Você pode expandir para incluir categorias de filmes, tags de gêneros, ou recomendações baseadas em IA.