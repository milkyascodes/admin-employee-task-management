import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/users/userSlice";

export default function AdminShowUsers() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.users);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>
      <div className="bg-white shadow rounded-xl p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">Email</th>
              <th className="border-b p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {list.map((user) => (
              <tr key={user.id}>
                <td className="border-b p-2">{user.email}</td>
                <td className="border-b p-2">
                  {user.role}
                  <span className=" font-bold text-sm ml-2 text-green-400">
                    {currentUser?.id === user.id && "﹒You"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
