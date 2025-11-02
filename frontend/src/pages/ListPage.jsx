// src/pages/ListPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "./PageTemplate";
import TaskItem from "../components/TaskItem";
import AddTaskForm from "../components/AddTaskForm";
import { getTasks, addTask } from "../api"; // use API wrapper functions

function ListPage({ user }) {
  const { id } = useParams();
  const [list, setList] = useState(null);
  //const [list, setList] = useState({ id, name: "Loading...", tasks: [] });
  const [loading, setLoading] = useState(true);

  async function fetchList() {
    if (!user) return;
    setLoading(true);
    try {
        // get the full list object (name + tasks) from backend
        const res = await fetch(`/backend/lists/${id}`, { credentials: "include" });
        if (!res.ok) {
        setList(null); // list not found or unauthorized
        return;
        }
        const data = await res.json();
        setList(data);
    } catch (err) {
        console.error("Failed to fetch list:", err);
        setList(null);
    } finally {
        setLoading(false);
    }
    }

  useEffect(() => {
    fetchList();
  }, [id, user]);

  async function handleAddTask(title) {
    if (!title) return;
    try {
      const newTask = await addTask(title, id);
      setList((prev) => ({
        ...prev,
        tasks: [...prev.tasks, newTask],
      }));
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  }

  if (!user) return <p>Please log in to view this list.</p>;
  if (loading) return <p>Loading list...</p>;
  if (!list) return <p>List not found.</p>;

  return (
    <PageTemplate title={list.name} breadcrumbs={[{ label: "Home", link: "/" }]}>
      {list.tasks.length > 0 ? (
        <div>
          {list.tasks.map((task) => (
            <TaskItem key={task.id} task={task} refresh={fetchList} />
          ))}
        </div>
      ) : (
        <p>This list is empty. Add your first task below!</p>
      )}
      <AddTaskForm listId={id} onTaskAdded={handleAddTask} />
    </PageTemplate>
  );
}

export default ListPage;