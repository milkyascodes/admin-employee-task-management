import { useDispatch, useSelector } from "react-redux";

import AccountNavbar from "../components/AccountNavbar";
import { useEffect } from "react";
import { fetchTasks } from "../features/tasks/taskSlice";

function UserPage() {
  const { user } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);
  if (tasks) {
  }

  if (!user) return <p>Loading...</p>;
  return (
    <div className="min-h-screen  bg-gray-100">
      <AccountNavbar />
      <div className=" mx-auto w-full max-w-6xl flex flex-col gap-6">
        <h1 className="text-xl">My Tasks</h1>
        <div class="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 w-full overflow-hidden">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
            <div>
              <h3 class="text-lg font-bold text-gray-800">Task Overview</h3>
              <p class="text-sm text-gray-500 font-medium">
                Manage and track recent assignments
              </p>
            </div>
            <span class="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
              {tasks?.length} Active
            </span>
          </div>

          <div class="divide-y divide-gray-50">
            {tasks?.map((task) => (
              <div
                key={task.id}
                class="p-6 hover:bg-gray-50/80 transition-all group flex items-start space-x-4"
              >
                <div class="mt-1.5 w-1.5 h-10 rounded-full bg-amber-400 group-hover:h-12 transition-all"></div>

                <div class="flex-1">
                  <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h4 class="text-md font-bold text-gray-800 group-hover:text-amber-600 transition-colors leading-tight">
                      {task.title}
                    </h4>
                    <div class="flex items-center text-gray-400 text-xs font-medium space-x-1">
                      <svg
                        class="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span>
                        Created {new Date(task.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p class="mt-1 text-sm text-gray-600 leading-relaxed max-w-3xl">
                    {task.description}
                  </p>
                </div>

                <button class="p-2 text-gray-300 hover:text-gray-600 transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserPage;
