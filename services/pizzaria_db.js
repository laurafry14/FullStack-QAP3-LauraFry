const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pizzaria",
  password: "Macymacy!1414",
  port: 5432,
});
module.exports = pool;
