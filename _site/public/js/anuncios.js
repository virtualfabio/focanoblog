
 const anuncios_lateral = [
    {
      href: "https://amzn.to/4msbrhY",
      imgsrc: "https://images-na.ssl-images-amazon.com/images/I/71vbRyfPiXL._AC_UL232_SR232,232_.jpg",
      alt: "Livro: Nexus, adquira na amazon.com.br",
      title: "Livro: Nexus",
      description: "Uma breve história das redes de informação, da Idade da Pedra à inteligência artificial..."
    },
    {
      href: "https://amzn.to/4fVz8N5",
      imgsrc: "https://images-na.ssl-images-amazon.com/images/I/71dH97FwGbL._AC_UL232_SR232,232_.jpg",
      alt: "livro: Código Limpo, adquira na amazon.com.br",
      title: "livro: Código Limpo",
      description: "Mesmo um código ruim pode funcionar. Mas se ele não for limpo, pode acabar com sua aplicação..."
    }
  ];


 const anuncios_rodape = [
    {
      href: "https://amzn.to/4lPIAD8",
      imgsrc: "https://images-na.ssl-images-amazon.com/images/I/71mouBDwxAL._AC_UL232_SR232,232_.jpg",
      alt: "Livro: Arquitetura de Software: as Partes Difíceis, adquira na amazon.com.br",
      title: "Livro: " + "Arquitetura de Software: as Partes Difíceis: Análises Modernas de Trade-off Para Arquiteturas Distribuídas",
      description: "Com este livro, você aprenderá a pensar criticamente sobre as vantagens e desvantagens das arquiteturas distribuídas..."
    },
    {
      href: "https://amzn.to/3HIvSIs",
      imgsrc: "https://images-na.ssl-images-amazon.com/images/I/71Vkg7GfPFL._AC_UL232_SR232,232_.jpg",
      alt: "Livro: Entendendo Algoritmos, adquira na amazon.com.br",
      title: "Livro: " + "Entendendo Algoritmos",
      description: "Um guia ilustrado para programadores e outros curiosos. Um algoritmo nada mais é do que um procedimento passo a passo para a resolução de um problema..."
    }
  ];


  function renderAnuncios(lista, containerId, width, height) {
    const container = document.getElementById(containerId);
    let html = "";

    for (const item of lista) {
      html += `
        <a target="_blank"
           href="${item.href}"
           class="group flex flex-col items-center bg-white p-2 mb-3 border border-gray-200 rounded-lg 
          hover:border-blue-500 hover:shadow-md transition duration-300">
          <img class="mx-auto transform transition duration-300 group-hover:scale-105"
               src="${item.imgsrc}"
               alt="${item.alt}"
               title="${item.title}"
               width="200" height="200" />
          <span class="titulo-anuncio mt-2 font-semibold">${item.title}</span>
          <span class="descricao-anuncio text-sm text-gray-600">
            ${item.description}
          </span>
        </a>
      `;
    }

    container.innerHTML = html;
  }

//---------------

if(window.innerWidth <= 640) {
    console.log("smrtphone")
    const anuncios_smartphone = [...anuncios_lateral, ...anuncios_rodape];
    renderAnuncios(anuncios_smartphone, "anuncios_rodape", 180, 180);
}else{
    renderAnuncios(anuncios_lateral, "anuncios_lateral", 180, 180);
    renderAnuncios(anuncios_rodape, "anuncios_rodape", 180, 180);
}