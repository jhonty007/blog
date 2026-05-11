const pool = require("../db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

const getLikes = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT user_id FROM likes WHERE post_id = $1",
      [req.params.postId]
    );
    const userIds = result.rows.map((row) => row.user_id);
    return res.status(200).json(userIds);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Something went wrong.");
  }
};

const toggleLike = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const userInfo = jwt.verify(token, JWT_SECRET);
    const { postId } = req.body;

    const existing = await pool.query(
      "SELECT id FROM likes WHERE post_id = $1 AND user_id = $2",
      [postId, userInfo.id]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        "DELETE FROM likes WHERE post_id = $1 AND user_id = $2",
        [postId, userInfo.id]
      );
      return res.status(200).json("Like removed.");
    }

    await pool.query(
      "INSERT INTO likes (post_id, user_id) VALUES ($1, $2)",
      [postId, userInfo.id]
    );
    return res.status(200).json("Post liked.");
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json("Token is not valid!");
    }
    console.error(err);
    return res.status(500).json("Something went wrong.");
  }
};

module.exports = { getLikes, toggleLike };
