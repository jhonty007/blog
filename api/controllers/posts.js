const pool = require("../db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

const getPosts = async (req, res) => {
  const { cat } = req.query;
  try {
    let result;
    if (cat) {
      result = await pool.query(
        `SELECT p.*, u.username, u.img AS user_img
         FROM posts p JOIN users u ON p.uid = u.id
         WHERE p.cat = $1 ORDER BY p.date DESC`,
        [cat]
      );
    } else {
      result = await pool.query(
        `SELECT p.*, u.username, u.img AS user_img
         FROM posts p JOIN users u ON p.uid = u.id
         ORDER BY p.date DESC`
      );
    }
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Something went wrong.");
  }
};

const getPost = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, u.username, u.img AS user_img
       FROM posts p JOIN users u ON p.uid = u.id
       WHERE p.id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json("Post not found!");
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Something went wrong.");
  }
};

const addPost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const userInfo = jwt.verify(token, JWT_SECRET);
    const { title, description, img, cat, date } = req.body;

    const result = await pool.query(
      `INSERT INTO posts (title, description, img, cat, date, uid)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, description, img, cat, date || new Date(), userInfo.id]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json("Token is not valid!");
    }
    console.error(err);
    return res.status(500).json("Something went wrong.");
  }
};

const deletePost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const userInfo = jwt.verify(token, JWT_SECRET);
    const result = await pool.query(
      "DELETE FROM posts WHERE id = $1 AND uid = $2 RETURNING id",
      [req.params.id, userInfo.id]
    );

    if (result.rows.length === 0) {
      return res.status(403).json("You can delete only your post!");
    }

    return res.status(200).json("Post has been deleted!");
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json("Token is not valid!");
    }
    console.error(err);
    return res.status(500).json("Something went wrong.");
  }
};

const updatePost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const userInfo = jwt.verify(token, JWT_SECRET);
    const { title, description, img, cat } = req.body;

    const result = await pool.query(
      `UPDATE posts SET title = $1, description = $2, img = $3, cat = $4
       WHERE id = $5 AND uid = $6 RETURNING *`,
      [title, description, img, cat, req.params.id, userInfo.id]
    );

    if (result.rows.length === 0) {
      return res.status(403).json("You can update only your post!");
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json("Token is not valid!");
    }
    console.error(err);
    return res.status(500).json("Something went wrong.");
  }
};

module.exports = { getPosts, getPost, addPost, deletePost, updatePost };
