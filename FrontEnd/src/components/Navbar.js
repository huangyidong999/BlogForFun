import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./Login";

function Navbar() {
  return (
    <div>
      <nav>
        <h2>Blog System</h2>
        <div className="nav-right">
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </nav>

      <Routes>
        {/* User Management Routes */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default Navbar;