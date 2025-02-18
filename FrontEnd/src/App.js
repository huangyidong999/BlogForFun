import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import Navbar from "./components/Navbar";

const API_URL = "http://localhost:5000/api/users";

function App() {
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  useEffect(() => {
    axios.get(API_URL)
      .then((response) => setUsers(response.data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Add a new user
  const addUser = (newUser) => {
    axios.post(API_URL, newUser)
      .then((response) => setUsers([...users, response.data.user]))
      .catch((error) => console.error("Error adding user:", error));
  };

  // Update an existing user
  const updateUser = (id, updatedUser) => {
    axios.put(`${API_URL}/${id}`, updatedUser)
      .then((response) => {
        setUsers(users.map(user => user._id === id ? response.data.user : user));
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  // Delete a user
  const deleteUser = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setUsers(users.filter(user => user._id !== id)))
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>User Management</h1>
        <UserForm addUser={addUser} />
        <UserList users={users} updateUser={updateUser} deleteUser={deleteUser} />
      </div>
    </div>
  );
}

export default App;
