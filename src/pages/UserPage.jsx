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
      <div className=" mx-auto w-full max-w-[90%] flex flex-col gap-6">
        <h1 className="text-xl">My Tasks</h1>

        <ul className="bg-white p-4 rounded-xl shadow-md w-full gap-2">
          {tasks?.map((task) => (
            <li key={task.id} className="flex justify-between ">
              <div className="flex flex-col ">
                <h1 className="font-bold">{task.title}</h1>
                <p className="opacity-75 ">{task.description}</p>
              </div>
              <p className="opacity-75 text-xs">
                {new Date(task.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default UserPage;
