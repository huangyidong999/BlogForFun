import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import Navbar from "./components/Navbar";
import ArticleForm from "./components/ArticleForm";
import ArticleList from "./components/ArticleList";
import ArticleDisply from "./components/ArticleDisplay";
import LoginPage from "./components/Login";
import { AuthContext } from "./auth_context";

const USER_API_URL = "http://localhost:5000/api/users";
const ARTICLE_API_URL = "http://localhost:5000/api/articles";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);

  // Fetch users from backend
  useEffect(() => {
    fetch(USER_API_URL)
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Fetch articles from backend
  useEffect(() => {
    fetch(ARTICLE_API_URL)
      .then((response) => response.json())
      .then((data) => setArticles(data.articles))
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  // Add a new user
  const addUser = (newUser) => {
    fetch(USER_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => setUsers([...users, data.user]))
      .catch((error) => console.error("Error adding user:", error));
  };

  // Update an existing user
  const updateUser = (id, updatedUser) => {
    fetch(`${USER_API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(users.map((user) => (user._id === id ? data.user : user)));
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  // Delete a user
  const deleteUser = (id) => {
    fetch(`${USER_API_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  // Add a new article
  const addArticle = (newArticle) => {
    fetch(ARTICLE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArticle),
    })
      .then((response) => response.json())
      .then((data) => setArticles([...articles, data.article]))
      .catch((error) => console.error("Error adding article:", error));
  };

  // Update an existing article
  const updateArticle = (id, updatedArticle) => {
    fetch(`${ARTICLE_API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedArticle),
    })
      .then((response) => response.json())
      .then((data) => {
        setArticles(articles.map((article) => (article._id === id ? data.article : article)));
      })
      .catch((error) => console.error("Error updating article:", error));
  };

  // Delete an article
  const deleteArticle = (id) => {
    fetch(`${ARTICLE_API_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        setArticles(articles.filter((article) => article._id !== id));
      })
      .catch((error) => console.error("Error deleting article:", error));
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Blog Management System</h1>
        <nav>
          <ul>
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/users">User Management</Link>
                </li>
                <li>
                  <Link to="/articles">Article Management</Link>
                </li>
              </>
            )}
            <li>
              <ArticleDisply />
            </li>
          </ul>
        </nav>

        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* User Management Routes (Only available when logged in) */}
          {isLoggedIn && (
            <>
              <Route
                path="/users"
                element={
                  <>
                    <h2>User Management</h2>
                    <UserForm addUser={addUser} />
                    <UserList users={users} updateUser={updateUser} deleteUser={deleteUser} />
                  </>
                }
              />

              {/* Article Management Routes */}
              <Route
                path="/articles"
                element={
                  <>
                    <h2>Article Management</h2>
                    <ArticleForm addArticle={addArticle} />
                    <ArticleList
                      articles={articles}
                      updateArticle={updateArticle}
                      deleteArticle={deleteArticle}
                    />
                  </>
                }
              />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
