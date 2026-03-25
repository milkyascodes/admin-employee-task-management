import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../features/tasks/taskSlice";

export default function AdminCreateTask() {
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
    <div className=" bg-white rounded-xl shadow-sm border border-gray-100 max-w-xl mx-auto overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-lg font-bold text-gray-800">Create New Task</h3>
        <p className="text-sm text-gray-500 font-medium">
          Fill in the details below to assign a new objective.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="task-title"
              className="text-sm font-semibold text-gray-700"
            >
              Task Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              id="task-title"
              placeholder="e.g. Redesign homepage hero section"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="task-desc"
              className="text-sm font-semibold text-gray-700"
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="task-desc"
              rows="4"
              placeholder="Describe the goals and requirements..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="assign"
              className="text-sm font-semibold text-gray-700"
            >
              Assign task to
            </label>
            <div className="relative">
              <select
                value={assigned_to}
                onChange={(e) => setAssignedTo(e.target.value)}
                id="assign"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white cursor-pointer"
              >
                <option defaultValue disabled>
                  choose a user
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.email} ({user.role})
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-4">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-md shadow-blue-200 transition-all active:scale-95"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}
