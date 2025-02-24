const Article = require("../Model/Article");

// Create a new article
exports.createArticle = async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("author category");
    res.status(200).json({ articles }); // Wrap the array under the "articles" key
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single article by ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate("author category");
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an article by ID
exports.updateArticle = async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an article by ID
exports.deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};