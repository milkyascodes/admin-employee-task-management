import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RouteGuard({ children }) {
  const { user, loading } = useSelector((state) => state.auth);
  console.log("protection", user);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
