import { useState } from 'react';
import { loginUser } from '../services/Api';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ username, password });
      saveToken(data.token);
      localStorage.setItem('userData', JSON.stringify(data.data));
      alert('Login berhasil!');
      navigate('/');
    } catch (error) {
      alert('Login gagal!');
    }
  };



  return (
    <div className='flex justify-center items-center min-h-screen px-4'>
    <form onSubmit={handleLogin} className='flex flex-col gap-3 bg-gray-200 p-5 md:p-10 shadow-md rounded-lg w-full max-w-md'>
      <h2 className='text-2xl font-bold mx-auto'>Login</h2>
      
      <label className='font-semibold'>Username</label>
      <input 
        type="text" 
        placeholder="Username" 
        onChange={(e) => setUsername(e.target.value)} 
        className='bg-white p-3 w-full rounded-md focus:outline-none'
      />
      
      <label className='font-semibold'>Password</label>
      <input 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setPassword(e.target.value)} 
        className='bg-white p-3 w-full rounded-md focus:outline-none'
      />
      
      <button 
        type="submit" 
        className='bg-black w-full text-white p-3 rounded-md hover:bg-white hover:text-black transition duration-300 cursor-pointer'
      >
        Login
      </button>
      <span className='text-center'>Belum punya akun? <Link to="/register" className='text-blue-500 hover:underline font-semibold'>Daftar disini</Link></span>
    </form>
  </div>
  
  );
};

export default Login;
