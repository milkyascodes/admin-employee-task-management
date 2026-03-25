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
  console.log(list);

  return (
    <div className=" bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Recent Users</h3>
        <button className="text-sm text-blue-600 font-semibold hover:underline">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>

              <th className="px-6 py-4">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {list.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                    <i className=" fa fa-user"></i>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.email}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.role}</td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(user.created_at).toDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    // <div className="">
    //   <h2 className="text-2xl font-bold mb-6">All Users</h2>
    //   <div className="bg-white shadow rounded-xl p-4">
    //     <table className="w-full text-left border-collapse">
    //       <thead>
    //         <tr>
    //           <th className="border-b p-2">Email</th>
    //           <th className="border-b p-2">Role</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {list.map((user) => (
    //           <tr key={user.id}>
    //             <td className="border-b p-2">{user.email}</td>
    //             <td className="border-b p-2">
    //               {user.role}
    //               <span className=" font-bold text-sm ml-2 text-green-400">
    //                 {currentUser?.id === user.id && "﹒You"}
    //               </span>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
}
