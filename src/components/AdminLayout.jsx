import { Outlet } from "react-router-dom";
import AccountNavbar from "./AccountNavbar";

export default function AdminLayout() {
  return (
    <div>
      <AccountNavbar />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}
