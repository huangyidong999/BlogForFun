import React, { useState } from "react";

function UserForm({ addUser }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "reader",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(formData);
    setFormData({ username: "", email: "", password: "", role: "reader" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="reader">Reader</option>
        <option value="author">Author</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Add User</button>
    </form>
  );
}

export default UserForm;
