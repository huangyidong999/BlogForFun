import React, { useEffect, useState } from "react";

const ArticleDisply = () => {
  const [ArticleList, setArticles] = useState([]); // 初始化为空数组

  useEffect(() => {
    const fetchArticleList = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/articles");
        if (!response.ok) {
          throw new Error("Fetch data got an error .... pls check the ArticleDisplay component...");
        }
        const data = await response.json();
        setArticles(data.articles); // 假设返回的数据结构是 { articles: [...] }
      } catch (error) {
        console.log("Error is on going now...", error);
      }
    };

    fetchArticleList(); // 调用函数
  }, []);

  return (
    <div>
      <h2>Hello Welcome to My Blog!</h2>
      <ul>
        {ArticleList.map((article) => (
          <li key={article._id}> {/* 确保每个元素有唯一的 key */}
            <>
              <h3>{article.title}</h3>
              <p>{article.content}</p>
              <p>Author: {article.author}</p>
              <p>Category: {article.category}</p>
              <p>Tags: {article.tags.join(", ")}</p>
            </>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleDisply;