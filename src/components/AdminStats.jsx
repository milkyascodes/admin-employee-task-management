import { useSelector } from "react-redux";

export default function AdminStats() {
  const { tasks } = useSelector((state) => state.tasks);
  const { list: users, loading, error } = useSelector((state) => state.users);

  return (
    <div className="flex gap-6 w-full">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="浸9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            ></path>
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Total Tasks</p>
          <h3 className="text-2xl font-bold text-gray-800">{tasks.length}</h3>
          <p className="text-xs text-green-600 font-semibold">
            {/* +12% from last week */}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className="p-3 bg-purple-100 rounded-lg">
          <svg
            className="w-6 h-6 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Total Users</p>
          <h3 className="text-2xl font-bold text-gray-800">{users.length}</h3>
        </div>
      </div>
    </div>
  );
}
