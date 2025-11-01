// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import TaskPage from "./pages/TaskPage";
import { checkSession } from "./api";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSession() {
      try {
        const data = await checkSession();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSession();
  }, []);

  function logout() {
    setUser(null);
    fetch("/backend/logout", { method: "DELETE" }).then(() => navigate("/"));
  }

  return (
    <main>
      <Nav user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/lists/:listId" element={<ListPage user={user} />} />
        <Route path="/tasks/:taskId" element={<TaskPage user={user} />} />
      </Routes>
    </main>
  );
}

export default App;