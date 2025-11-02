// src/components/Nav.jsx
import { Link } from "react-router-dom";

function Nav({ user, logout }) {
  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-bold text-lg">
          Home
        </Link>
        {user && (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        {!user && (
          <>
            <Link
              to="/login"
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Nav;