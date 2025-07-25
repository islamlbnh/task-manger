import { useState } from "react";

import { useCreateTask } from "../services/query";

export default function TaskForm() {
  const [title, setTitle] = useState("");

  const mutation = useCreateTask();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      mutation.mutate({ title, completed: false });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task"
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Adding..." : "Add Task"}
        </button>
      </div>
    </form>
  );
}
