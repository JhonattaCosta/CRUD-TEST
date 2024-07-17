<<<<<<< HEAD
# CRUD-TEST

---

# CRUD API com Node.js, Express, PostgreSQL e Handlebars

Este projeto é uma API CRUD (Create, Read, Update, Delete) construída com Node.js, Express, PostgreSQL e Handlebars. A aplicação permite criar, visualizar, atualizar e deletar postagens de um blog.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript.
- **Express**: Framework web para Node.js.
- **PostgreSQL**: Banco de dados relacional (Você pode escolher seu próprio banco de dados, mas lembre-se de realizar as alterações necessárias).
- **Handlebars**: Template para geração de HTML dinâmico.
- **Body-parser**: Middleware para parsear o corpo das requisições.

## Instalação e Configuração

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/JhonattaCosta/CRUD-TEST.git
   cd CRUD-TEST
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

   Dependências do meu `package.json`:

   ```json
   "dependencies": {
     "@handlebars/allow-prototype-access": "^1.0.5",
     "body-parser": "^1.20.2",
     "dotenv": "^16.4.5",
     "express": "^4.19.2",
     "express-handlebars": "^7.1.3",
     "init": "^0.1.2",
     "nodemon": "^3.1.4",
     "pg": "^8.12.0",
     "postgres": "^3.4.4"
   }
   ```

3. **Configure o banco de dados:**

   Crie um banco de dados PostgreSQL (ou da sua preferência) e configure as credenciais no arquivo `.env` e coloque-as no `db.js`.

   Exemplo do arquivo `.env`:

   ```env
   DB_HOST = 'host'
   DB_PORT = 'port'
   DB_USER = 'user'
   DB_PASSWORD = 'password'
   DB_NAME = 'database name'
   ```

   Exemplo do arquivo `db.js`:

   ```javascript
   dotenv.config();
   const { Pool } = require("pg");

   const pool = new Pool({
     host: process.env.DB_HOST,
     port: process.env.DB_PORT,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
   });

   module.exports = pool;
   ```

4. **Crie a tabela de postagens:**

   Execute o seguinte comando SQL para criar a tabela de postagens:

   ```sql
   CREATE TABLE postagens (
     id SERIAL PRIMARY KEY,
     titulo VARCHAR(255) NOT NULL,
     conteudo TEXT NOT NULL
   );
   ```

5. **Inicie o servidor:**

   ```bash
   node server.js
   ```

6. **Acesse a aplicação:**

   Abra o navegador e vá para `http://localhost:8080`.

## Estrutura do Projeto

```
.
├── db.js
├── package.json
├── public
│   └── styles.css
├── server.js
└── views
    ├── blog.handlebars
    ├── index.handlebars
    └── layouts
        └── main.handlebars
```

## Funcionalidades

### 1. Criar Postagem (Create)

- **Rota:** `/submit`
- **Método:** `POST`
- **Descrição:** Adiciona uma nova postagem ao banco de dados.

### 2. Visualizar Postagens (Read)

- **Rota:** `/blog`
- **Método:** `GET`
- **Descrição:** Busca todas as postagens do banco de dados e renderiza na página `blog.handlebars`.

### 3. Atualizar Postagem (Update)

- **Rota:** `/update/:id`
- **Método:** `POST`
- **Descrição:** Atualiza uma postagem existente no banco de dados com base no `id`.

### 4. Deletar Postagem (Delete)

- **Rota:** `/delete/:id`
- **Método:** `POST`
- **Descrição:** Remove uma postagem do banco de dados com base no `id`.

## Desafio

Desafie a si mesmo a melhorar este código! Faça o fork deste repositório, implemente novas funcionalidades, melhore o design ou otimize o desempenho. Quando terminar, poste sua versão melhorada no seu próprio GitHub e compartilhe!

## Licença

Este projeto é licenciado sob a Licença ISC. Veja mais detalhes em [ISC License](https://opensource.org/license/isc-license-txt).

---
=======
