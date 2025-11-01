import { useState } from "react";
import AddTaskForm from "./AddTaskForm";

function TaskItem({ task, refresh }) {
  const [expanded, setExpanded] = useState(false);

  function toggleComplete() {
    fetch(`/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    }).then((r) => r.ok && refresh());
  }

  function handleDelete() {
    fetch(`/tasks/${task.id}`, { method: "DELETE" }).then((r) => r.ok && refresh());
  }

  return (
    <div className="ml-4 mb-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleComplete}
        />
        <span className={task.completed ? "line-through" : ""}>
          {task.title}
        </span>
        {task.subtasks?.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-blue-600 underline"
          >
            {expanded ? "Hide" : "Show"} subtasks
          </button>
        )}
        <button onClick={handleDelete} className="text-red-600 text-sm ml-2">
          Delete
        </button>
      </div>

      {expanded && (
        <div className="pl-6">
          {task.subtasks.map((sub) => (
            <TaskItem key={sub.id} task={sub} refresh={refresh} />
          ))}
          <AddTaskForm listId={task.list_id} parentId={task.id} refresh={refresh} />
        </div>
      )}
    </div>
  );
}

export default TaskItem;