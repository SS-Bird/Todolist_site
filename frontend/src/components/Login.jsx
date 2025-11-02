import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("/backend/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include"                          // I added
      });
      if (res.ok) {
        const data = await res.json();
        onLogin(data);            // Update App's user state
        navigate("/");            // Go to HomePage (where lists are)
      } else {
        const error = await res.json();
        alert(error.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Login error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <div>
        <label>Username:</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">
        Log In
      </button>
    </form>
  );
}

export default Login;