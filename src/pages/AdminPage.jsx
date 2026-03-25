import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/users/userSlice";
import AccountNavbar from "../components/AccountNavbar";
import AssignTask from "../components/AssignTask";
import AdminCreateTask from "./AdminCreateTask";
import AdminShowUsers from "./AdminShowUsers";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* <AdminShowUsers />
      <AdminCreateTask /> */}
    </div>
  );
}
