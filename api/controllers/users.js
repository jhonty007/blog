const pool = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

const getUser = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, email, img, created_at FROM users WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json("User not found!");
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Something went wrong.");
  }
};

const updateUser = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const userInfo = jwt.verify(token, JWT_SECRET);

    if (parseInt(req.params.id, 10) !== userInfo.id) {
      return res.status(403).json("You can update only your profile!");
    }

    const { username, email, img, password } = req.body;
    let query;
    let values;

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      query = `UPDATE users SET username = $1, email = $2, img = $3, password = $4
               WHERE id = $5 RETURNING id, username, email, img, created_at`;
      values = [username, email, img, hash, userInfo.id];
    } else {
      query = `UPDATE users SET username = $1, email = $2, img = $3
               WHERE id = $4 RETURNING id, username, email, img, created_at`;
      values = [username, email, img, userInfo.id];
    }

    const result = await pool.query(query, values);
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json("Token is not valid!");
    }
    console.error(err);
    return res.status(500).json("Something went wrong.");
  }
};

module.exports = { getUser, updateUser };
