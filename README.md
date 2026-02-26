# Sistema de Controle de Produção

Este projeto é um sistema web simples para gerenciar o estoque de matérias-primas e produtos de uma indústria, permitindo associar matérias-primas aos produtos e calcular a produção possível com base no estoque disponível. O sistema prioriza a produção dos produtos de maior valor.

---

## Funcionalidades

- Cadastro CRUD de produtos (código, nome e valor)

- Cadastro CRUD de matérias-primas (código, nome e quantidade em estoque)

- Associação de matérias-primas aos produtos com quantidade necessária

- Cálculo da quantidade máxima de produtos que podem ser produzidos considerando o estoque disponível

- Interface responsiva e amigável

- Uso de JavaScript puro (Vanilla JS), HTML5 e CSS3

---

## Tecnologias utilizadas

- HTML5

- CSS3

- JavaScript (ES6+)

---

## Como usar

1. Abra o arquivo `index.html` no seu navegador preferido (Chrome, Firefox, Edge).

2. Na seção **Gerenciar Produtos**, adicione produtos informando código, nome e valor.

3. Na seção **Gerenciar Matérias-Primas**, cadastre as matérias-primas com código, nome e quantidade em estoque.

4. Na seção **Associar Matérias-Primas aos Produtos**, associe matérias-primas a produtos indicando a quantidade necessária para produção.

5. Clique no botão **Calcular Produção Possível** para visualizar os produtos que podem ser produzidos, as quantidades e o valor total da produção.

---

## Estrutura do projeto

- `index.html`: arquivo principal com toda a estrutura HTML, CSS e JavaScript embutidos.

- Código dividido em seções para facilitar a manutenção:
  - Produtos
  - Matérias-Primas
  - Associações
  - Sugestão de Produção

---

## Considerações

- Todos os dados são armazenados temporariamente na memória do navegador (não há persistência real).

- Para uso em produção, recomenda-se integrar com um back-end e banco de dados.

- O código está todo em português para facilitar o entendimento e manutenção.

---
