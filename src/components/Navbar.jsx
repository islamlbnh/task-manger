import { useNavigate } from "react-router-dom";
import useUIStore from "../store/uiStore";

export default function Navbar() {
  const { isDarkMode, toggleDarkMode, filter, setFilter } = useUIStore();
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Task Manager
        </h1>
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-700 p-2 rounded"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <button onClick={toggleDarkMode} className="bg-gray-700 p-2 rounded">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}
