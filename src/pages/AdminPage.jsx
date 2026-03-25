import AdminCreateTask from "./AdminCreateTask";
import AdminShowUsers from "./AdminShowUsers";
import AdminStats from "../components/AdminStats";

export default function AdminPage() {
  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="flex flex-col gap-5">
        <AdminStats />
        <AdminShowUsers />
      </div>
      <AdminCreateTask />
    </div>
  );
}
