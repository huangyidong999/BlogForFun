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
    const formattedData = { ...formData, tags: formData.tags.split(",") };
    addArticle(formattedData);
    setFormData({ title: "", content: "", author: "", category: "", tags: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <textarea name="content" placeholder="Content" value={formData.content} onChange={handleChange} required />
      <input type="text" name="author" placeholder="Author ID" value={formData.author} onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category ID" value={formData.category} onChange={handleChange} required />
      <input type="text" name="tags" placeholder="Tags (comma separated)" value={formData.tags} onChange={handleChange} />
      <button type="submit">Publish</button>
    </form>
  );
}

export default ArticleForm;
