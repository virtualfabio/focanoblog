---
layout: layout.njk
title: Entendendo o "O" do SOLID
description: Entenda de maneira prática e fácil o "Open/Closed Principle"
date: 2025-08-26
categorias: ["js", "solid"]
destaque: false
---

O **SOLID** é um conjunto de princípios de design de software para ajudar desenvolvedores a criarem sistemas mais flexíveis e fáceis de manter.  

Hoje vamos estudar o segundo princípio:  

## 🔹 O — Open/Closed Principle (Princípio Aberto/Fechado)

Esse princípio afirma que:

> **"As entidades de software (classes, funções, módulos) devem estar abertas para extensão, mas fechadas para modificação."**

Ou seja:  
- Podemos **estender** o comportamento de uma classe ou função.  
- Mas **não devemos modificar diretamente** o código existente.  

Isso ajuda a evitar erros quando o sistema já está em produção e promove **reuso e flexibilidade**.

---

## 🚫 Exemplo errado (violando OCP)

Imagine que temos um sistema de pagamento para um blog de **críticas de filmes**.  
Cada pagamento pode ser feito com **Cartão de Crédito** ou **Pix**.

```js
class PaymentProcessor {
  process(type, amount) {
    if (type === "creditcard") {
      console.log(`Pagamento de R$${amount} no cartão de crédito.`);
    } else if (type === "pix") {
      console.log(`Pagamento de R$${amount} via Pix.`);
    }
  }
}
```

## 👉 Problema:
Se amanhã quisermos adicionar PayPal ou Criptomoeda, teremos que alterar o código da classe.
Isso viola o OCP, porque a classe não está fechada para modificação.

---

## ✅ Exemplo correto (respeitando OCP)

Vamos refatorar usando polimorfismo e herança:

<pre>
// Interface (contrato) de um método de pagamento
class PaymentMethod {
  pay(amount) {
    throw new Error("Método não implementado.");
  }
}

// Implementações específicas
class CreditCardPayment extends PaymentMethod {
  pay(amount) {
    console.log(`Pagamento de R$${amount} no cartão de crédito.`);
  }
}

class PixPayment extends PaymentMethod {
  pay(amount) {
    console.log(`Pagamento de R$${amount} via Pix.`);
  }
}

// Agora o processador não precisa mudar mais
class PaymentProcessor {
  process(paymentMethod, amount) {
    paymentMethod.pay(amount);
  }
}
</pre>

### 👉 Agora, se quisermos adicionar PayPal, basta criar uma nova classe:

<pre>
class PayPalPayment extends PaymentMethod {
  pay(amount) {
    console.log(`Pagamento de R$${amount} via PayPal.`);
  }
}
</pre>

Perceba que **não precisamos alterar** _PaymentProcessor_.
Apenas adicionamos uma nova classe = estamos **estendendo** o sistema, sem modificar o código existente.


## 🎬 Usando o código

<pre>
const processor = new PaymentProcessor();

const credit = new CreditCardPayment();
const pix = new PixPayment();
const paypal = new PayPalPayment();

processor.process(credit, 50);
processor.process(pix, 30);
processor.process(paypal, 100);
</pre>

### Saída esperada:

<pre>
Pagamento de R$50 no cartão de crédito.
Pagamento de R$30 via Pix.
Pagamento de R$100 via PayPal.
</pre>

## 📌 Vantagens do OCP

- Mais **flexibilidade** para adicionar novas funcionalidades.  
- Código existente fica **estável e confiável**.  
- Facilita **testes e manutenção**.  
- Diminui o risco de introduzir **bugs** ao modificar código antigo.  

---

## 🚀 Conclusão

O **O do SOLID** nos mostra a importância de projetar sistemas que sejam **abertos para extensão**, mas **fechados para modificação**.  

No exemplo, conseguimos adicionar novos métodos de pagamento sem alterar o processador central, tornando o sistema mais **robusto e evolutivo**.  

![Diagrama de Classes](../../public/img/diagrama-classes-solid-o.png "Diagrama de Classes")
