import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import useUIStore from "../store/uiStore";
import { useTasks } from "../services/query";

export default function TaskList() {
  const { filter } = useUIStore();
  const tasks = useSelector((state) => state.tasks.tasks);
  const { isLoading } = useTasks();

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  if (isLoading) return <div className="max-w-md mx-auto">Loading...</div>;

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
