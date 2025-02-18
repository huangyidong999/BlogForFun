import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/articles";

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setArticles(response.data.articles))
      .catch(error => console.error("Error fetching articles:", error));
  }, []);

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <p>Author: {article.author.username}</p>
            <p>Category: {article.category.name}</p>
            <p>Tags: {article.tags.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;
