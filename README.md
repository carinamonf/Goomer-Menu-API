# Goomer Menu API

API RESTful desenvolvida por Carina Monteiro como parte do desafio técnico para a vaga de Pessoa Desenvolvedora Back-end. O objetivo é gerenciar produtos, promoções e o cardápio de um restaurante, com foco em código limpo, SQL puro e boas práticas de arquitetura.

---

## 🚀 Features Implementadas

- **CRUD de Produtos:** Criação, listagem, atualização (parcial) e exclusão de produtos.
- **CRUD de Promoções:** Criação, listagem, atualização e exclusão de promoções, vinculadas a um produto.
- **Cardápio Consolidado:** Um único endpoint (`GET /menu`) que retorna o cardápio completo, com promoções aplicadas em tempo real (baseado no dia da semana e horário).
- **Validação de Horário:** As promoções só podem ser criadas em intervalos de 15 minutos (ex: 18:00, 18:15).
- **Regras de Negócio:**
  - O preço promocional deve ser menor que o preço original do produto.
  - O horário de término da promoção deve ser maior que o de início.
- **Ordenação (Opcional):** Implementada a funcionalidade de ordenação do cardápio controlada pelo restaurante através de uma coluna `posicao` nos produtos.
- **Documentação:** API 100% documentada e testável via **Swagger (OpenAPI)**.
- **Testes Unitários:** Testes para as regras de negócio críticas do serviço de promoções.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Express.js** (Framework da API)
- **PostgreSQL** (Banco de dados SQL)
- **Docker** (para rodar o ambiente de banco de dados)
- **Knex.js** (Utilizado **apenas** para Migrations e conexão)
- **SQL Puro** (Todas as queries da aplicação são feitas com `knex.raw()`)
- **Yup** (Para validação de schemas)
- **Vitest** (Para testes unitários)
- **Swagger** (Para documentação da API)
- **ts-node-dev** (Para desenvolvimento com hot-reload)

---

## 🏁 Como Rodar o Projeto Localmente

Siga as instruções abaixo para configurar e rodar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (v18 ou superior)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

### 1. Clone o Repositório

```bash
git clone https://https://github.com/carinamonf/Goomer-Menu-API
cd goomer-menu-api
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Suba o Banco de Dados (Docker)

O projeto usa Docker para garantir um ambiente de banco de dados consistente.

```bash
docker-compose up -d
```
*(Isso irá iniciar um container PostgreSQL na porta `5432` com as credenciais do `knexfile.ts`)*

### 4. Execute as Migrations

Com o banco rodando, precisamos criar as tabelas.

```bash
npx knex migrate:latest
```

### 5. Rode a Aplicação

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`.

---

## 📚 Documentação da API (Swagger)

A documentação completa e interativa da API está disponível via Swagger UI. Com o servidor rodando (`npm run dev`), acesse:

**[http://localhost:3333/api-docs](http://localhost:3333/api-docs)**

---

## 🧪 Testes

Para rodar os testes unitários:

```bash
npm run test
```

Para gerar o relatório de cobertura de testes:

```bash
npm run coverage
```

---

## 🧠 Desafios e Decisões de arquitetura

Decisões tomadas para atender aos requisitos do desafio:

1.  **SQL Puro vs. ORM:** O desafio exigia SQL puro para consultas e ORM para migrations. Escolhi o **Knex.js** por ele ter um bom sistema de migrations do ecossistema Node e permite o uso fácil de SQL puro (`db.raw()`) sem carregar um ORM completo (e desnecessário para o desafio atual) como o Sequelize.

2.  **Arquitetura "Module-First":** Em vez de organizar o projeto em pastas genéricas (`/controllers`, `/services`), optei por uma estrutura modular (`/modules/produtos`, `/modules/promocoes`). O foco foi melhorar a **harmonia** (tudo de um módulo fica junto) e a **manutenção**, facilitando a vida do time e a escalabilidade do projeto.

3.  **Armazenamento de Preço:** Todos os valores monetários (`preco`, `preco_promocional`) são salvos como **inteiros (cents)**. Isso evita os problemas de arredondamento de `float` e garante a precisão financeira.

4.  **Query do Cardápio:** A query (`GET /menu`) aplica promoções em tempo real. Utilizei um `LEFT JOIN` na tabela `promocoes` com condições diretamente na cláusula `ON`, utilizando as funções `EXTRACT(DOW FROM CURRENT_DATE)` e `CURRENT_TIME BETWEEN ...` do PostgreSQL. Isso garante que o "join" só seja bem-sucedido se a promoção estiver ativa *agora*.

5.  **Opcional (Timezone):** Analisei a opcional de timezone, mas para implementar de uma forma correta (um sistema multi-tenant com `restaurantes.timezone` e `NOW() AT TIME ZONE ...`) seria uma mudança consideravel na arquitetura do projeto. Optei por focar na entrega dos requisitos e do opcional de ordenação, deixando o timezone como próxima melhoria.