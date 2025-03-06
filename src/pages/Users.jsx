import { useEffect, useState } from 'react';
import { fetchUsers } from '../services/Api';
import { getToken } from '../utils/auth';
import { Link } from 'react-router-dom';
import '../style/tableBorder.css'

// React Icons
import { MdPageview, MdBrowserUpdated } from "react-icons/md";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUsers(getToken());

        if (response.status === 401) {
          localStorage.removeItem('authToken');
          alert('Anda harus login terlebih dahulu!');
          window.location.href = '/login';
          return;
        }

        const {data} = response;
        setUsers(data);
      } catch (error) {
        alert('Gagal memuat data users!');
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    };
    loadUsers();
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    window.location.href = '/login';
    alert('Logout berhasil!');
  };

  const userData = JSON.parse(localStorage.getItem('userData'));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="text-black py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-xs md:text-xl font-semibold">Selamat datang, {userData?.username} 🎉</h1>
        <button
          onClick={logout}
          className="bg-white text-xs md:text-xl px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* List of Users */}
      <div className="container mx-auto mt-10 p-6 md:p-10 bg-white shadow-lg rounded-lg">
        <Link to="/createuser" className=" bg-red-500 text-white text-xs md:text-xl px-4 py-2 rounded-lg shadow-md hover:bg-white hover:text-black transition duration-300">
          Create User
        </Link>
        <h2 className="text-3xl font-bold text-center text-gray-800 mt-10 mb-6">📋 List of Users</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-md  overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="border px-4 py-3 text-left">Company ID</th>
                <th className="border px-4 py-3 text-left">Username</th>
                <th className="border px-4 py-3 text-left">Email</th>
                <th className="border px-4 py-3 text-left">Role</th>
                <th className="border px-4 py-3 text-center">View</th>
                <th className="border px-4 py-3 text-center">Update</th>
              </tr>
            </thead>
            <tbody className="bg-gray-50">
              {users.map((user, index) => (
                <tr key={index} className="border hover:bg-blue-100 transition">
                  <td className="border px-4 py-3">{user.companyId || '-'}</td>
                  <td className="border px-4 py-3">{user.username}</td>
                  <td className="border px-4 py-3">{user.email}</td>
                  <td className="border px-4 py-3">{user.userType}</td>
                  <td className="border px-4 py-3 text-center">
                    <Link to={`/${user.userId}`} className="flex items-center justify-center gap-2 text-blue-600 hover:underline">
                      <MdPageview className="text-2xl" />
                      View
                    </Link>
                  </td>
                  <td className="border px-4 py-3 text-center">
                    <Link to={`/update/${user.userId}`} className="flex items-center justify-center gap-2 text-green-600 hover:underline">
                      <MdBrowserUpdated className="text-2xl" />
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
