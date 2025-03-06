import { useState } from 'react';
import { registerUser } from '../services/Api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('Registrasi berhasil!');
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.errors || error.message || "Terjadi kesalahan!";
      alert(`Registrasi gagal!\n${errorMessage}`);
    }
  };
  

  return (
    <div className="flex  justify-center items-center bg-[#f7f7f7] min-h-screen p-6">

      <form 
        onSubmit={handleRegister} 
        className="bg-gray-200 shadow-lg rounded-lg p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register User</h2>

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
          Register
        </button>
        <span className='flex justify-center items-center gap-2'>Sudah punya akun? <Link to="/login" className='text-blue-500 hover:underline font-semibold'>Login</Link></span>
      </form>
    </div>
  );
};

export default Register;
