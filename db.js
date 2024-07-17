const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error ao conectar ao banco de dados: ", err.stack);
  }
  console.log("Conectando ao banco de dados, PostgreSQL");
  release();
});

module.exports = pool;
