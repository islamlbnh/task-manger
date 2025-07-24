import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import useUIStore from "../store/uiStore";

export default function Home() {
  const { isDarkMode } = useUIStore();

  return (
    <div
      className={
        isDarkMode
          ? "dark bg-gray-900 min-h-screen"
          : "bg-gray-100 min-h-screen"
      }
    >
      <Navbar />
      <TaskForm />
      <TaskList />
    </div>
  );
}
