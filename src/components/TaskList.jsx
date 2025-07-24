import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { setTasks } from "../store/taskSlice";
import { getTasks } from "../services/api";
import TaskItem from "./TaskItem";
import useUIStore from "../store/uiStore";

export default function TaskList() {
  const { filter } = useUIStore();
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const { isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const data = await getTasks();
      dispatch(setTasks(data));
      return data;
    },
  });

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto">
      {filteredTasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
}
