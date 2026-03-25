import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../features/tasks/taskSlice";

export default function AssignTask() {
  const dispatch = useDispatch();
  const { list: users } = useSelector((state) => state.users);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigned_to, setAssignedTo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("assigned to", assigned_to);

    await dispatch(
      createTask({
        title,
        description,
        assigned_to,
      }),
    );
    setTitle("");
    setDescription("");
    setAssignedTo("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6 mb-4">
      <h3 className="text-lg font-bold mb-4">Assign Task</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Task title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Select user */}
        <select
          className="w-full border p-2 rounded"
          value={assigned_to}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Select user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email} ({user.role})
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
}
