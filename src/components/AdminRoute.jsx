import { useSelector } from "react-redux";
import AdminLayout from "./AdminLayout";
import { Navigate, useLocation } from "react-router-dom";

export default function AdminRoute() {
  const { user, role, loading } = useSelector((state) => state.auth);
  const location = useLocation(); // Import this from react-router-dom
  //   console.log("Route Check:", { path: location.pathname, role, user });
  if (loading) return <p>Loading...</p>;
  //   console.log("userrrr", user);

  if (!user) {
    console.log("NO USER");
    return <Navigate to="/" replace />;
  }
  if (role !== "admin") {
    console.log("here");
    return <Navigate to="/employee" replace />;
  }

  return <AdminLayout />;
}
