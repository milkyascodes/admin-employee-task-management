import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";

export default function AccountNavbar() {
  const { user, role } = useSelector((state) => state.auth);
  const [isMenuhidden, setIsMenuhidden] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="w-full relative bg-white shadow-md px-6 py-4 flex justify-between items-center mb-10">
      <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>

      {role === "admin" && (
        <div className="flex gap-2">
          <Link to="/admin" className=" hover:underline">
            Dashboard
          </Link>
          <Link to="/admin/list" className=" hover:underline">
            Users
          </Link>
          <Link to="/admin/tasks" className=" hover:underline">
            Tasks
          </Link>
          <Link to="/admin/create" className=" hover:underline">
            Create Task
          </Link>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div
          onClick={() => setIsMenuhidden((state) => !state)}
          className=" cursor-pointer w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-lg"
        >
          👤
        </div>
      </div>

      {!isMenuhidden && (
        <div className="text-right flex flex-col gap-2 items-start absolute shadow-md  right-0 top-full bg-white p-4 z-50 mt-1">
          <p className="text-sm font-medium text-gray-800">
            Email: {user?.email || " No email"}
          </p>
          <p className="text-sm font-medium text-gray-800">
            Role: {role || "guest"}
          </p>
          <button
            onClick={handleLogout}
            className="w-full cursor-pointer bg-gray-500 text-white py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
