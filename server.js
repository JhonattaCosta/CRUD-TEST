const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const pool = require("./db");

const host = process.env.DB_HOST || "localhost";
const port = process.env.SERVER_PORT || 8080;

// Definindo um diretório público para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Middleware para parsear o corpo das requisições
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do Handlebars
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Rota para exibir o formulário na página inicial
app.get("/", (req, res) => {
  res.render("index");
});

// Rota para exibir as postagens
app.get("/blog", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM postagens");
    res.render("blog", { postagens: result.rows });
  } catch (err) {
    console.error("Erro ao buscar postagens, ", err);
    res.status(500).send("Erro ao buscar postagens");
  }
});

// Rota responsável por receber os dados do formulário
app.post("/submit", async (req, res) => {
  const { titulo, conteudo } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO postagens (titulo, conteudo) VALUES ($1, $2) RETURNING *",
      [titulo, conteudo]
    );
    if (!(result.rows.length > 0)) {
      throw new Error("Nenhum dado retornado após a inserção");
    }
    res.redirect("/");
  } catch (err) {
    console.error("Erro ao inserir dados: ", err);
    res.status(500).send("Erro ao salvar os dados no banco de dados");
  }
});

//Rota responsável por apagar postagens pelo ID
app.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM postagens WHERE id = $1", [id]);
    res.redirect("/blog");
  } catch (err) {
    console.error("Erro ao delete postagem: ", err);
    res.status(500).send("Erro ao deletar postagem");
  }
});

// Rota para exibir o formulário de edição
app.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM postagens WHERE id = $1", [
      id,
    ]);
    if (!(result.rows.length > 0)) {
      return res.status(404).send("Postagem não encontrada");
    }
    res.render("edit", { postagem: result.rows[0] });
  } catch (err) {
    console.error("Erro ao buscar postagem: ", err);
    res.status(500).send("Erro ao buscar postagem");
  }
});

// Rota para atualizar a postagem
app.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, conteudo } = req.body;
  try {
    await pool.query(
      "UPDATE postagens SET titulo = $1, conteudo = $2 WHERE id = $3",
      [titulo, conteudo, id]
    );
    res.redirect("/blog");
  } catch (err) {
    console.error("Erro ao atualizar postagens: ", err);
    res.status(500).send("Erro ao atualizar postagem");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});
