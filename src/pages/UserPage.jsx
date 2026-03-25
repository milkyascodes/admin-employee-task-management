import { useDispatch, useSelector } from "react-redux";

import AccountNavbar from "../components/AccountNavbar";

function UserPage() {
  const { user, role } = useSelector((state) => state.auth);

  if (!user) return <p>Loading...</p>;
  return (
    <div className="min-h-screen  bg-gray-100">
      <AccountNavbar />
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
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
