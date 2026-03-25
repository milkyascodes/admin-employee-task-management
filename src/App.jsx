import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./features/auth/authSlice";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import RouteGuard from "./components/RouteGuard";
import UserDashboard from "./pages/UserPage";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminPage";
import AdminCreateTask from "./pages/AdminCreateTask";
import AdminShowUsers from "./pages/AdminShowUsers";
import AdminAllTasks from "./components/AdminAllTasks";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

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
            <AdminLayout />
          </RouteGuard>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="create" element={<AdminCreateTask />} />
        <Route path="list" element={<AdminShowUsers />} />
        <Route path="tasks" element={<AdminAllTasks />} />
      </Route>
    </Routes>
  );
}

export default App;
