const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "clientes",
  password: "32458423",
  port: 5432,
});

module.exports = pool;
