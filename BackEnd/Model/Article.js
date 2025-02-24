const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
    comments: [
      {type: String}
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema);
