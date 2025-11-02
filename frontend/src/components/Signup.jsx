// src/components/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("/backend/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include"                         // I added
      });

      if (res.ok) {
        alert("Signup successful! Please log in.");
        navigate("/login"); // redirect to login page
      } else {
        const error = await res.json();
        alert(error.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Signup error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
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
      <button type="submit" className="mt-2 bg-green-600 text-white px-3 py-1 rounded">
        Sign Up
      </button>
    </form>
  );
}

export default Signup;