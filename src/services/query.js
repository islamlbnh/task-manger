import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTasks,
  createTask,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
} from "../services/api";
import { useDispatch } from "react-redux";
import {
  addTask,
  updateTask as updateTaskAction,
  deleteTask as deleteTaskAction,
  setTasks,
} from "../store/taskSlice";

// ✅ Fetch tasks
export const useTasks = () => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const tasks = await getTasks();
      dispatch(setTasks(tasks));
      return tasks;
    },
    onError: (error) => {
      console.error("Error fetching tasks:", error);
    },
  });
};
// ✅ Create a new task
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: createTask,
    onSuccess: (newTask) => {
      dispatch(addTask(newTask));
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};

// ✅ Update an existing task
export const useUpdateTask = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }) => updateTaskApi(id, updates),
    onSuccess: (updatedTask) => {
      dispatch(updateTaskAction({ id: updatedTask.id, updates: updatedTask }));
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};

// ✅ Delete a task
export const useDeleteTask = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: (task) => {
      dispatch(deleteTaskAction(task.id));
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};
