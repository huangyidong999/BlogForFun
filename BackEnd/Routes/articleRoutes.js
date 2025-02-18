const express = require("express");
const { getArticles, createArticle, updateArticle, deleteArticle } = require("../Controller/ArticleController");

const router = express.Router();

router.get("/", getArticles);
router.post("/", createArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

module.exports = router;
