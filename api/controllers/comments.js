const pool = require("../db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

const getComments = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, u.username, u.img AS user_img
       FROM comments c JOIN users u ON c.user_id = u.id
       WHERE c.post_id = $1 ORDER BY c.created_at DESC`,
      [req.params.postId]
    );
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Something went wrong.");
  }
};

const addComment = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const userInfo = jwt.verify(token, JWT_SECRET);
    const { text, postId } = req.body;

    if (!text || !postId) {
      return res.status(400).json("Text and postId are required.");
    }

    const result = await pool.query(
      `INSERT INTO comments (text, post_id, user_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [text, postId, userInfo.id]
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

const deleteComment = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const userInfo = jwt.verify(token, JWT_SECRET);
    const result = await pool.query(
      "DELETE FROM comments WHERE id = $1 AND user_id = $2 RETURNING id",
      [req.params.id, userInfo.id]
    );

    if (result.rows.length === 0) {
      return res.status(403).json("You can delete only your comment!");
    }

    return res.status(200).json("Comment has been deleted!");
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json("Token is not valid!");
    }
    console.error(err);
    return res.status(500).json("Something went wrong.");
  }
};

module.exports = { getComments, addComment, deleteComment };
