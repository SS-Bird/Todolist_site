// src/pages/ListPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageTemplate from "./PageTemplate";
import TaskItem from "../components/TaskItem";
import AddButton from "../components/AddButton";
import { getTasks, addTask, getLists } from "../api";

function ListPage({ user }) {
  const { id } = useParams(); // list id
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchListAndTasks() {
      try {
        const lists = await getLists(); // fetch all lists
        const currentList = lists.find((l) => l.id === parseInt(id));
        if (!currentList) return navigate("/"); // redirect if list not found
        setList(currentList);
        setTasks(currentList.tasks || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchListAndTasks();
  }, [id, user, navigate]);

  const refreshTasks = async () => {
    try {
      const lists = await getLists();
      const currentList = lists.find((l) => l.id === parseInt(id));
      setTasks(currentList?.tasks || []);
    } catch (err) {
      console.error(err);
    }
  };

  async function handleAddTask() {
    const title = prompt("Enter new task title:");
    if (!title) return;
    try {
      const newTask = await addTask(title, parseInt(id));
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error(err);
    }
  }

  if (!user) {
    return (
      <PageTemplate title="Unauthorized">
        <p>Please log in to view this list.</p>
      </PageTemplate>
    );
  }

  if (loading) return <p>Loading...</p>;

  return (
    <PageTemplate
      title={list?.name || "List"}
      path={[
        { label: "Home", link: "/" },
        { label: list?.name || "List", link: `/lists/${id}` },
      ]}
    >
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} refresh={refreshTasks} />
        ))}
        <AddButton onClick={handleAddTask} label="+ Add Task" />
      </div>
    </PageTemplate>
  );
}

export default ListPage;