import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function UserPage() {
  const { user, role } = useSelector((state) => state.auth);
  console.log("user", user, role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    dispatch(logoutUser());
    navigate("/");
  };

  if (!user) return <p>Loading...</p>;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome</h2>

        <p className="mb-2">
          <span className="font-semibold">Email:</span> {user.email}
        </p>

        <p>
          <span className="font-semibold">Role:</span> {role}
        </p>
        <button
          onClick={handleLogout}
          className="border rounded-sm my-4 py-1 px-3"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
export default UserPage;
