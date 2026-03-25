import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import UserDashboard from "./pages/UserPage";
import AdminDashboard from "./pages/AdminPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./features/auth/authSlice";
import RouteGuard from "./components/RouteGuard";

function App() {
  const { user, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  useEffect(() => {
    if (role === "admin") navigate("/admin");
    else if (role === "employee") navigate("/employee");
  }, [role, user]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/employee"
        element={
          <RouteGuard>
            <UserDashboard />
          </RouteGuard>
        }
      />
      <Route
        path="/admin"
        element={
          <RouteGuard>
            <AdminDashboard />
          </RouteGuard>
        }
      />
    </Routes>
  );
}

export default App;
