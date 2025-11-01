import { useState } from "react";

function AddTaskForm({ listId, parentId = null, refresh }) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, list_id: listId, parent_id: parentId }),
    }).then((r) => {
      if (r.ok) {
        setTitle("");
        refresh();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <input
        className="border p-1 rounded mr-2 text-sm"
        placeholder={parentId ? "Add subtask..." : "Add task..."}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="bg-green-500 text-white px-2 py-1 text-sm rounded">
        +
      </button>
    </form>
  );
}

export default AddTaskForm;