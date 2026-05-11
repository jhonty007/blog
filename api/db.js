const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.PG_HOST || "localhost",
  port: parseInt(process.env.PG_PORT, 10) || 5432,
  user: process.env.PG_USER || "blog_user",
  password: process.env.PG_PASSWORD || "blog_password",
  database: process.env.PG_DATABASE || "blog_db",
});

module.exports = pool;
