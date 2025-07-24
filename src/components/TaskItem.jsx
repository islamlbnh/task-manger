import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../store/taskSlice";
import {
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
} from "../services/api";

export default function TaskItem({ task }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }) => updateTaskApi(id, updates),
    onSuccess: (updatedTask) => {
      dispatch(updateTask({ id: updatedTask.id, updates: updatedTask }));
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => {
      dispatch(deleteTask(task.id));
      queryClient.invalidateQueries(["tasks"]);
    },
  });

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
