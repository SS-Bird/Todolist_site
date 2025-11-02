// src/components/ListCard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ListCard({ list, refreshLists }) {
  const navigate = useNavigate();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [addingTask, setAddingTask] = useState(false);

  async function handleAddTask() {
    if (!newTaskTitle.trim()) return;
    try {
      const res = await fetch("/backend/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTaskTitle, list_id: list.id }),
      });
      if (res.ok) {
        setNewTaskTitle("");
        setAddingTask(false);
        refreshLists?.();
      } else {
        console.error("Failed to add task:", res.status);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="border p-4 rounded shadow-md">
      <h2
        className="text-lg font-bold cursor-pointer"
        onClick={() => navigate(`/lists/${list.id}`)}
      >
        {list.name}
      </h2>
      <p>{list.tasks?.length || 0} tasks</p>

      {addingTask ? (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            className="border rounded p-1 flex-1"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="New task title"
          />
          <button
            onClick={handleAddTask}
            className="px-2 py-1 bg-green-600 text-white rounded"
          >
            Add
          </button>
          <button
            onClick={() => setAddingTask(false)}
            className="px-2 py-1 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setAddingTask(true)}
          className="mt-2 px-2 py-1 bg-blue-600 text-white rounded"
        >
          + Add Task
        </button>
      )}
    </div>
  );
}

export default ListCard;