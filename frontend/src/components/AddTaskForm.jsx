// src/components/AddTaskForm.jsx
import { useState } from "react";

function AddTaskForm({ listId, parentId = null, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/backend/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, list_id: listId, parent_id: parentId }),
      });

      if (res.ok) {
        const newTask = await res.json();
        if (onTaskAdded) onTaskAdded(newTask);
        setTitle(""); // clear input after adding
      } else {
        console.error("Failed to add task", res.status);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        className="border rounded p-1 flex-1"
        disabled={submitting}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 rounded"
        disabled={submitting}
      >
        {submitting ? "Adding..." : "Add"}
      </button>
    </form>
  );
}

export default AddTaskForm;