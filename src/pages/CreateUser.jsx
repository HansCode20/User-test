import { useState } from 'react';
import { registerUser } from '../services/Api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    userType: '',
    companyId: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('Create User berhasil!');
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.errors || error.message || "Terjadi kesalahan!";
      alert(`Registrasi gagal!\n${errorMessage}`);
    }
  };
  

  return (
    <div className="flex  justify-center items-center bg-[#f7f7f7] min-h-screen p-6">

      <form 
        onSubmit={handleCreateUser} 
        className="bg-gray-200 shadow-lg rounded-lg p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Create User</h2>

        <label className="font-semibold">Username</label>
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          value={formData.username}  
          onChange={handleChange} 
          className="bg-white p-2 w-full rounded-md focus:outline-none"
        />

        <label className="font-semibold">Email</label>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email}  
          onChange={handleChange} 
          className="bg-white p-2 w-full rounded-md focus:outline-none"
        />

        <label className="font-semibold">Password</label>
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password}  
          onChange={handleChange} 
          className="bg-white p-2 w-full rounded-md focus:outline-none"
        />

        <label className="font-semibold">Full Name</label>
        <input 
          type="text" 
          name="fullName" 
          placeholder="Full Name" 
          value={formData.fullName}  
          onChange={handleChange} 
          className="bg-white p-2 w-full rounded-md focus:outline-none"
        />

        <label className="font-semibold">User Type</label>
        <select 
          name="userType" 
          value={formData.userType}  
          onChange={handleChange} 
          required 
          className="bg-white p-2 w-full rounded-md focus:outline-none"
        >
          <option value="">Pilih User Type</option>
          <option value="Owner">Owner</option>
          <option value="Admin">Admin</option>
          <option value="Officer">Officer</option>
          <option value="Finance">Finance</option>
          <option value="Customer_Admin">Customer Admin</option>
          <option value="Customer_Service">Customer Service</option>
        </select>

        <label className="font-semibold">Company ID</label>
        <input 
          type="text" 
          name="companyId" 
          placeholder="Company ID" 
          value={formData.companyId}  
          onChange={handleChange} 
          className="bg-white p-2 w-full rounded-md focus:outline-none"
        />

        <button 
          type="submit" 
          className="w-full bg-black text-white hover:bg-white hover:text-black p-3 rounded-lg transition-all duration-300 ease-in-out font-semibold cursor-pointer"
        >
          Create User
        </button>
        <Link to="/" className="w-full flex justify-center bg-red-500 p-3 mt-4 text-white rounded-lg transition-all duration-300 ease-in-out font-semibold cursor-pointer">Back</Link>
      </form>
    </div>
  );
};

export default CreateUser;
