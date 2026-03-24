import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import UserDashboard from "./pages/UserPage";
import AdminDashboard from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup" element={<UserDashboard />} />
        <Route path="/signup" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
