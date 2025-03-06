import React, { useState, useEffect } from 'react'
import { fetchUserDetail, updateUser } from '../services/Api';
import { getToken } from '../utils/auth';
import { useNavigate, useParams } from 'react-router-dom';

const UsersUpdate = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        userType: '',
        companyId: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await fetchUserDetail(userId, getToken());
                setUserData({
                    ...data,
                    companyCode: data.companyCode || '', // Pastikan companyCode ada
                });
            } catch (error) {
                alert('Gagal memuat data users!');
                console.info('error', error);
            }
        }
        fetchUserData();
    }, [userId]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateUser(userData, getToken());
            alert('Update berhasil!');
            navigate('/');
        } catch (error) {
          const errorMessage = error.response?.data?.errors || error.message || "Terjadi kesalahan!";
          alert(`Update gagal!\n${errorMessage}`);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center bg-[#f7f7f7] min-h-screen p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Update User</h2>

            <form 
                onSubmit={handleUpdate} 
                className="bg-gray-200 shadow-lg rounded-lg p-8 w-full max-w-md space-y-4"
            >
                <div className="flex flex-col gap-2">
                    <label className="font-semibold">Company ID</label>
                    <input 
                        type="number" min={1} max={3} name="companyId" 
                        placeholder="Company ID" value={userData.companyId} 
                        onChange={handleChange} 
                        className="bg-white p-3 w-full rounded-md focus:outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-semibold">Username</label>
                    <input 
                        type="text" name="username" placeholder="Username" 
                        value={userData.username} onChange={handleChange} 
                        className="bg-white p-3 w-full rounded-md focus:outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-semibold">Email</label>
                    <input 
                        type="email" name="email" placeholder="Email" 
                        value={userData.email} onChange={handleChange} 
                        className="bg-white p-3 w-full rounded-md focus:outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-semibold">Password</label>
                    <input 
                        type="password" name="password" placeholder="Password" 
                        value={userData.password} onChange={handleChange} 
                        className="bg-white p-3 w-full rounded-md focus:outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-semibold">Full Name</label>
                    <input 
                        type="text" name="fullName" placeholder="Full Name" 
                        value={userData.fullName} onChange={handleChange} 
                        className="bg-white p-3 w-full rounded-md focus:outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-semibold">User Type</label>
                    <select 
                        name="userType" value={userData.userType} 
                        onChange={handleChange} required 
                        className="bg-white p-3 w-full rounded-md focus:outline-none"
                    >
                        <option value="">Pilih User Type</option>
                        <option value="Owner">Owner</option>
                        <option value="Admin">Admin</option>
                        <option value="Officer">Officer</option>
                        <option value="Finance">Finance</option>
                        <option value="Customer_Admin">Customer Admin</option>
                        <option value="Customer_Service">Customer Service</option>
                    </select>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-black text-white hover:bg-white hover:text-black p-3 rounded-lg transition-all duration-300 ease-in-out font-semibold cursor-pointer"
                >
                    Update
                </button>
            </form>

            <button 
              className='mt-5  bg-red-500 text-white hover:bg-white hover:text-black p-3 rounded-md transition-all duration-300 ease-in-out cursor-pointer'
              onClick={() => navigate('/')}
            >
              Back
            </button>
        </div>
    );
}

export default UsersUpdate;
