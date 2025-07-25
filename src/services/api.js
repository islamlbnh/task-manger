import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getTasks = () =>
  api.get("/tasks").then((res) => {
    return res.data;
  });
export const createTask = (task) =>
  api.post("/tasks", task).then((res) => res.data);
export const updateTask = (id, updates) =>
  api.patch(`/tasks/${id}`, updates).then((res) => res.data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
