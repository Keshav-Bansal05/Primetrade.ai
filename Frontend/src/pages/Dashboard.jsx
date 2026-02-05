import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import { Plus, Trash2, LogOut, ClipboardList, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);        // 👈 NEW
  const [selectedUser, setSelectedUser] = useState(""); // 👈 NEW
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  // ---------- FETCH TASKS ----------
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      toast.error("Session expired. Please login again.");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  // ---------- FETCH USERS (ADMIN ONLY) ----------
  const fetchUsers = async () => {
    if (role === "ADMIN") {
      try {
        const res = await api.get("/auth/users");
        setUsers(res.data);
      } catch (err) {
        toast.error("Failed to load users list");
      }
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  // ---------- CREATE TASK ----------
  const createTask = async () => {
    if (!title.trim()) {
      toast.error("Task title is required");
      return;
    }

    try {
      await api.post("/tasks", {
        title,
        userId: role === "ADMIN" ? selectedUser : undefined, // 👈 IMPORTANT
      });

      toast.success("Task created!");
      setTitle("");
      setSelectedUser(""); // reset dropdown
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create task");
    }
  };

  // ---------- DELETE TASK ----------
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch {
      toast.error("Delete failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    toast.info("Logged out");
    navigate("/");
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#0A0F1C] to-[#1a1f2d] overflow-hidden px-6 py-12">

      {/* Background glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-10 left-10 w-96 h-96 bg-primary/10 blur-3xl rounded-full"
      />

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, delay: 4, repeat: Infinity }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 blur-3xl rounded-full"
      />

      {/* Header */}
      <div className="relative max-w-5xl mx-auto mb-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">Task Dashboard</h1>
            <p className="text-white/60 mt-1">Manage your tasks efficiently</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm">
              Role: <b>{role}</b>
            </span>

            {role === "ADMIN" && (
              <span className="px-3 py-2 bg-blue-500/10 border border-blue-400/30 text-blue-400 rounded-lg flex items-center gap-1 text-sm">
                <ShieldCheck size={16} /> Admin
              </span>
            )}

            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-400/30 rounded-lg hover:bg-red-500/20 transition"
            >
              <LogOut className="inline mr-1" size={16} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* CREATE TASK CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-w-5xl mx-auto mb-10 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-xl text-white mb-4 flex items-center gap-2">
          <Plus size={20} className="text-primary" /> Create New Task
        </h2>

        <div className="flex gap-4 items-center">
          <input
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

        {role === "ADMIN" && (
          <select
            className="
              bg-[#0A0F1C] text-white 
              border border-white/10 
              rounded-lg px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-primary/30
              appearance-none
            "
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option className="bg-[#0A0F1C] text-white" value="">
              Assign to (default: yourself)
            </option>

            {users.map((u) => (
              <option
                key={u._id}
                value={u._id}
                className="bg-[#0A0F1C] text-white hover:bg-primary/20"
              >
                {u.name} — {u.email}
              </option>
            ))}
          </select>
        )}


          <button
            onClick={createTask}
            className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg"
          >
            Add Task
          </button>
        </div>
      </motion.div>

      {/* TASK LIST */}
      <div className="relative max-w-5xl mx-auto">
        <h2 className="text-xl text-white mb-4 flex items-center gap-2">
          <ClipboardList size={20} className="text-accent" /> Your Tasks
        </h2>

        {loading && (
          <p className="text-white/60 text-center">Loading tasks...</p>
        )}

        {!loading && tasks.length === 0 && (
          <div className="text-center text-white/60 bg-white/5 border border-white/10 rounded-xl p-10">
            No tasks yet. Create one above 🚀
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-lg"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-white">
                  {task.title}
                </h3>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <p className="mt-2 text-white/60">
                Status:{" "}
                <span className={task.completed ? "text-green-400" : "text-yellow-400"}>
                  {task.completed ? "Done" : "Pending"}
                </span>
              </p>

              {role === "ADMIN" && (
                <p className="mt-2 text-sm text-blue-400">
                  Owner: {task.user?.email || task.user}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
