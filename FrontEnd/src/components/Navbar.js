import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth_context";

function Navbar() {
  const { isLoggedIn, userName, logout } = useContext(AuthContext);

  return (
    <nav>
      <h2>Blog System</h2>
      <div className="nav-right">
        {isLoggedIn ? (
          <>
            <span>Welcome, {userName}!</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
