import { useDeleteTask, useUpdateTask } from "../services/query";

export default function TaskItem({ task }) {
  const updateMutation = useUpdateTask();

  const deleteMutation = useDeleteTask();

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
        <span className={task.completed ? "line-through" : ""}>
          {task.title}
        </span>
      </div>
      <button
        onClick={() => deleteMutation.mutate(task.id)}
        className="text-red-500"
        disabled={deleteMutation.isLoading}
      >
        Delete
      </button>
    </div>
  );
}
