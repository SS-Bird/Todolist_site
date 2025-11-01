// src/pages/TaskPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageTemplate from "./PageTemplate";
import TaskItem from "../components/TaskItem";
import AddButton from "../components/AddButton";
import { getLists, addTask } from "../api";

function TaskPage({ user }) {
  const { listId, taskId } = useParams(); // params: /lists/:listId/tasks/:taskId
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchTask() {
      try {
        const lists = await getLists();
        const currentList = lists.find((l) => l.id === parseInt(listId));
        if (!currentList) return navigate("/");

        const findTask = (tasks, id) => {
          for (let t of tasks) {
            if (t.id === parseInt(id)) return t;
            if (t.subtasks?.length) {
              const sub = findTask(t.subtasks, id);
              if (sub) return sub;
            }
          }
          return null;
        };

        const currentTask = findTask(currentList.tasks || [], taskId);
        if (!currentTask) return navigate(`/lists/${listId}`);
        setTask(currentTask);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTask();
  }, [listId, taskId, user, navigate]);

  const refreshTask = async () => {
    try {
      const lists = await getLists();
      const currentList = lists.find((l) => l.id === parseInt(listId));
      const findTask = (tasks, id) => {
        for (let t of tasks) {
          if (t.id === parseInt(id)) return t;
          if (t.subtasks?.length) {
            const sub = findTask(t.subtasks, id);
            if (sub) return sub;
          }
        }
        return null;
      };
      const currentTask = findTask(currentList.tasks || [], taskId);
      setTask(currentTask);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSubtask = async () => {
    const title = prompt("Enter new subtask title:");
    if (!title) return;
    try {
      const newTask = await addTask(title, parseInt(listId), parseInt(taskId));
      refreshTask();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <PageTemplate title="Unauthorized">
        <p>Please log in to view this task.</p>
      </PageTemplate>
    );
  }

  if (loading) return <p>Loading...</p>;

  if (!task) return <p>Task not found.</p>;

  return (
    <PageTemplate
      title={task.title}
      path={[
        { label: "Home", link: "/" },
        { label: "List", link: `/lists/${listId}` },
        { label: task.title, link: `/lists/${listId}/tasks/${task.id}` },
      ]}
    >
      <div className="flex flex-col gap-2">
        {task.subtasks?.map((sub) => (
          <TaskItem key={sub.id} task={sub} refresh={refreshTask} />
        ))}
        <AddButton onClick={handleAddSubtask} label="+ Add Subtask" />
      </div>
    </PageTemplate>
  );
}

export default TaskPage;