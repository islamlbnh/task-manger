import { useState } from "react";
import { useDeleteTask, useUpdateTask } from "../services/query";

export default function TaskItem({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const updateMutation = useUpdateTask();
  const deleteMutation = useDeleteTask();

  const handleTitleUpdate = () => {
    if (newTitle.trim() && newTitle !== task.title) {
      updateMutation.mutate({
        id: task.id,
        updates: { title: newTitle },
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() =>
            updateMutation.mutate({
              id: task.id,
              updates: { completed: !task.completed },
            })
          }
        />

        {isEditing ? (
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleTitleUpdate}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleTitleUpdate();
              if (e.key === "Escape") {
                setNewTitle(task.title);
                setIsEditing(false);
              }
            }}
            autoFocus
            className="border p-1 rounded"
          />
        ) : (
          <span
            className={`${task.completed ? "line-through" : ""} cursor-pointer`}
            onClick={() => setIsEditing(true)}
          >
            {task.title}
          </span>
        )}
      </div>

      <button
        onClick={() => deleteMutation.mutate(task.id)}
        className="text-red-500"
        disabled={deleteMutation.isLoading}
      >
        {deleteMutation.isLoading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
