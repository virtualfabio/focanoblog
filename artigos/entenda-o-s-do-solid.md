---
layout: layout.njk
title: Princípios SOLID - Entenda o "S" do SOLID
description: Entenda de maneira prática e fácil o "Single Responsibility Principle"
date: 2025-08-26
categorias: ["js", "solid"]
destaque: false
---


O **SOLID** é um conjunto de cinco princípios de programação orientada a objetos, criado para ajudar desenvolvedores a escreverem **códigos mais limpos, organizados e fáceis de manter**.  

Hoje, vamos falar apenas do primeiro princípio:  

## 🔹 S — Single Responsibility Principle (Princípio da Responsabilidade Única)

Esse princípio diz que:  

> **"Uma classe, função ou módulo deve ter apenas uma única razão para mudar."**

Ou seja, **cada parte do código deve ter apenas uma responsabilidade**.  
Se sua função ou classe está fazendo mais de uma coisa, provavelmente está violando o SRP.

---

## 🚫 Exemplo errado (sem SRP)

Imagine que queremos criar um sistema para **gerenciar filmes** de um blog de sugestões e críticas.  

```js
class Movie {
  constructor(title, rating) {
    this.title = title;
    this.rating = rating;
  }

  // Responsabilidade 1: Mostrar informações
  getInfo() {
    return `${this.title} - Nota: ${this.rating}`;
  }

  // Responsabilidade 2: Salvar em banco de dados (simulação)
  saveToDatabase() {
    console.log(`Salvando ${this.title} no banco de dados...`);
  }

  // Responsabilidade 3: Exportar em JSON
  toJSON() {
    return JSON.stringify(\{ title: this.title, rating: this.rating \});
  }
}
```

### 👉 Problema:  
A classe Movie faz três coisas diferentes:

Gerencia dados do filme.

Faz persistência em banco de dados.

Exporta em JSON.

Se amanhã o banco mudar, a classe terá que mudar.
Se quisermos exportar em XML, a classe também terá que mudar.
Ou seja, muitas razões para mudar = violação do SRP.

## ✅ Exemplo correto (com SRP)

Agora vamos separar cada responsabilidade em sua própria classe/função:

```js
// Classe simples para representar o filme
class Movie {
  constructor(title, rating) {
    this.title = title;
    this.rating = rating;
  }

  getInfo() {
    return `${this.title} - Nota: ${this.rating}`;
  }
}
```
```js
// Classe responsável apenas por salvar dados
class MovieRepository {
  save(movie) {
    console.log(`Salvando ${movie.title} no banco de dados...`);
  }
}
```
```js
// Classe responsável apenas por exportar dados
class MovieExporter {
  toJSON(movie) {
    return JSON.stringify({ title: movie.title, rating: movie.rating });
  }
}
```
### 👉 Agora temos responsabilidades separadas:

- Movie → representa o objeto de domínio (um filme).
- MovieRepository → cuida da persistência em banco.
- MovieExporter → cuida da exportação de dados.

## 🎬 Usando o código

```js
const movie = new Movie("Inception", 9);

// Persistência
const repo = new MovieRepository();
repo.save(movie);

// Exportação
const exporter = new MovieExporter();
console.log(exporter.toJSON(movie));

// Exibição
console.log(movie.getInfo());
```

### Saída esperada:

Salvando Inception no banco de dados...
{\"title\":\"Inception\",\"rating\":9}
Inception - Nota: 9

## 📌 Vantagens do SRP

Código mais fácil de manter.

Cada parte pode ser testada separadamente.

Mudanças em uma responsabilidade não afetam as outras.

Mais flexibilidade para evoluir o sistema.

## 🚀 Conclusão

O S do SOLID nos ensina a escrever código mais limpo e modular, separando responsabilidades em pequenas partes coesas.
No exemplo do blog de filmes, conseguimos dividir dados, persistência e exportação, deixando cada módulo com apenas uma única razão para mudar.

![Diagrama de Classes](../../public/img/diagrama-classes-solid-s.png "Diagrama de Classes")