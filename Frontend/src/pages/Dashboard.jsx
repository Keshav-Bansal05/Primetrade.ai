import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      alert("Session expired. Login again.");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!title) return alert("Title required");

    await api.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Dashboard</h2>
      <p><b>Logged in as:</b> {role}</p>

      <button onClick={logout}>Logout</button>

      <h3>Create Task</h3>
      <input
        placeholder="Task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={createTask}>Add</button>

      <h3>Tasks</h3>

      {tasks.map(task => (
        <div key={task._id} style={{ border: "1px solid gray", padding: "10px", margin: "5px" }}>
          <p><b>{task.title}</b></p>
          <p>Status: {task.completed ? "Done" : "Pending"}</p>

          {role === "ADMIN" && (
            <p style={{ color: "blue" }}>
              Owner: {task.user?.email || task.user}
            </p>
          )}

          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
