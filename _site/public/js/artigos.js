document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("lista-artigos");
  const inputPesquisa = document.getElementById("pesquisa");
  const filtrosCategorias = document.getElementById("filtrosCategorias");

  let listaAtual = [...window.artigos];

  function renderArtigos(lista) {
    const container = document.getElementById("artigos-list");
    container.innerHTML = "";

    lista.forEach(post => {
        const el = document.createElement("article");
        el.className = "prose prose-lg p-2 border rounded bg-white hover:border-blue-500";
        el.innerHTML = `
        <a href="${post.url}" class="font-bold text-blue-600 hover:underline">
            ${post.title}
        </a>
        <div class="text-sm text-gray-500">
            Categorias: ${post.categorias.join(", ")}
        </div>
        `;
        container.appendChild(el);
    });
  }

  function aplicarFiltros() {
    const searchTerm = inputPesquisa.value.toLowerCase();

    // pega categorias selecionadas
    const checkedCategories = Array.from(
      filtrosCategorias.querySelectorAll("input[type=checkbox]:checked")
    ).map(cb => cb.value);

    listaAtual = window.artigos.filter(post => {
      const matchesSearch =
        !searchTerm ||
        post.title.toLowerCase().includes(searchTerm) ||
        post.categorias.some(cat => cat.toLowerCase().includes(searchTerm));

        const matchesCategory =
            checkedCategories.length === 0
                ? true
                : post.categorias.some(cat => checkedCategories.includes(cat));

      return matchesSearch && matchesCategory;
    });

    renderArtigos(listaAtual);
  }

  // inicial
  setInterval(renderArtigos(listaAtual), 1200);


  // 🔹 cria checkboxes dinamicamente
  const todasCategorias = [...new Set(window.artigos.flatMap(p => p.categorias))];
  todasCategorias.forEach(cat => {
    const label = document.createElement("label");
    label.className = "flex items-center gap-1";
    label.innerHTML = `
      <input type="checkbox" value="${cat}" class="form-checkbox">
      <span>${cat}</span>
    `;
    filtrosCategorias.appendChild(label);
  });

  // eventos
  filtrosCategorias.addEventListener("change", aplicarFiltros);
  inputPesquisa.addEventListener("input", aplicarFiltros);
});
