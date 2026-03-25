import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RouteGuard({ children }) {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!user) return <Navigate to="/" replace />;

  return children ? children : <Outlet />;
}
