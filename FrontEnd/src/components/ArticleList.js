import React, { useState } from "react";

function ArticleList({ articles, updateArticle, deleteArticle }) {
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    tags: "",
  });

  const handleEdit = (article) => {
    setEditMode(article._id);
    setEditData({
      title: article.title,
      content: article.content,
      author: article.author,
      category: article.category,
      tags: article.tags.join(", "), // Convert tags array to comma-separated string
    });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (id) => {
    // Convert tags from a comma-separated string to an array
    const updatedArticle = {
      ...editData,
      tags: editData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""), // Remove empty tags
    };
    updateArticle(id, updatedArticle);
    setEditMode(null);
  };

  return (
    <div>
      <h2>Article List</h2>
      {Array.isArray(articles) && articles.length > 0 ? (
        <ul>
          {articles.map((article) => (
            <li key={article._id}>
              {editMode === article._id ? (
                <>
                  <div>
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editData.title}
                      onChange={handleChange}
                      placeholder="Title"
                      required
                    />
                  </div>
                  <div>
                    <label>Content</label>
                    <textarea
                      name="content"
                      value={editData.content}
                      onChange={handleChange}
                      placeholder="Content"
                      required
                    />
                  </div>
                  <div>
                    <label>Author ID</label>
                    <input
                      type="text"
                      name="author"
                      value={editData.author}
                      onChange={handleChange}
                      placeholder="Author ID"
                      required
                    />
                  </div>
                  <div>
                    <label>Category ID</label>
                    <input
                      type="text"
                      name="category"
                      value={editData.category}
                      onChange={handleChange}
                      placeholder="Category ID"
                      required
                    />
                  </div>
                  <div>
                    <label>Tags</label>
                    <input
                      type="text"
                      name="tags"
                      value={editData.tags}
                      onChange={handleChange}
                      placeholder="Tags (comma separated)"
                    />
                  </div>
                  <button onClick={() => handleUpdate(article._id)}>Save</button>
                  <button onClick={() => setEditMode(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>{article.title}</h3>
                  <p>{article.content}</p>
                  <p>Author: {article.author}</p>
                  <p>Category: {article.category}</p>
                  <p>Tags: {article.tags.join(", ")}</p>
                  <button onClick={() => handleEdit(article)}>Edit</button>
                  <button onClick={() => deleteArticle(article._id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
}

export default ArticleList;