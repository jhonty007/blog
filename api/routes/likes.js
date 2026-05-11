const express = require("express");
const { getLikes, toggleLike } = require("../controllers/likes");

const router = express.Router();

router.get("/:postId", getLikes);
router.post("/", toggleLike);

module.exports = router;
