import React, { useState } from "react";

function ArticleForm({ addArticle }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    tags: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert tags from a comma-separated string to an array
    const articleData = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    // Call the addArticle function passed as a prop
    addArticle(articleData);

    // Reset the form
    setFormData({
      title: "",
      content: "",
      author: "",
      category: "",
      tags: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Content</label>
        <br></br>
        <textarea
          style={{ width: "300px", height: "150px" }}
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Author ID</label>
        <input
          type="text"
          name="author"
          placeholder="Author ID"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Category ID</label>
        <input
          type="text"
          name="category"
          placeholder="Category ID"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Tags</label>
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Add Article</button>
    </form>
  );
}

export default ArticleForm;