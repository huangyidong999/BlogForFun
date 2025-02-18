const Article = require("../Model/Article");

// Get all articles
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("author", "username").populate("category", "name");
    res.status(200).json({ articles });
  } catch (err) {
    res.status(500).json({ message: "Fetching articles failed, please try again later." });
  }
};

// Create a new article
const createArticle = async (req, res) => {
  const { title, content, author, category, tags } = req.body;

  try {
    const newArticle = new Article({ title, content, author, category, tags });
    await newArticle.save();
    res.status(201).json({ article: newArticle });
  } catch (err) {
    res.status(500).json({ message: "Creating article failed, please try again later." });
  }
};

// Update an article
const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, tags } = req.body;

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { title, content, category, tags },
      { new: true }
    );
    res.status(200).json({ article: updatedArticle });
  } catch (err) {
    res.status(500).json({ message: "Updating article failed, please try again later." });
  }
};

// Delete an article
const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    await Article.findByIdAndDelete(id);
    res.status(200).json({ message: "Article deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Deleting article failed, please try again later." });
  }
};

module.exports = { getArticles, createArticle, updateArticle, deleteArticle };
