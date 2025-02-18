import React, { useState } from "react";

function UserList({ users, updateUser, deleteUser }) {
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({ username: "", email: "", role: "" });

  const handleEdit = (user) => {
    setEditMode(user._id);
    setEditData({ username: user.username, email: user.email, role: user.role });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (id) => {
    updateUser(id, editData);
    setEditMode(null);
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {editMode === user._id ? (
              <>
                <input type="text" name="username" value={editData.username} onChange={handleChange} />
                <input type="email" name="email" value={editData.email} onChange={handleChange} />
                <select name="role" value={editData.role} onChange={handleChange}>
                  <option value="reader">Reader</option>
                  <option value="author">Author</option>
                  <option value="admin">Admin</option>
                </select>
                <button onClick={() => handleUpdate(user._id)}>Save</button>
              </>
            ) : (
              <>
                <span>{user.username} ({user.email}) - {user.role}</span>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
