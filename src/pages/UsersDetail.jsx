import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserDetail } from '../services/Api';
import { getToken } from '../utils/auth';
import { BsPencilSquare } from "react-icons/bs";

const UsersDetail = () => {
    const {userId} = useParams();
    const navigate = useNavigate();
    const [userDetail, setUserDetail] = useState(null);


    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const { data } = await fetchUserDetail(userId, getToken());
                setUserDetail(data);
            } catch (error) {
                alert('Gagal memuat data users!');
                console.info('error', error);
            }
        }
        fetchDetails();
    }, [userId]);

    if (!userDetail) {
        return <div className='flex justify-center items-center min-h-screen'>Loading...</div>
    }

    const downloadJson = () => {
        const json = JSON.stringify(userDetail, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `user_${userDetail.username}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const { username, email, fullName, userType, companyId, createdAt, updatedAt } = userDetail;
    const DetailItem = ({ label, value }) => (
      <div className="flex flex-col">
        <span className="font-semibold">{label}</span>
        <span className="bg-white p-3 rounded-md">{value || '-'}</span>
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center bg-[#f7f7f7] min-h-screen p-6">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">User Detail</h2>
    
      <div className="relative bg-gray-200 shadow-lg rounded-lg p-8 w-full max-w-lg">
        <div className="grid gap-4">
          <DetailItem label="Username" value={username} />
          <DetailItem label="Full Name" value={fullName} />
          <DetailItem label="Email" value={email} />
          <DetailItem label="Role" value={userType} />
          <DetailItem label="Company ID" value={companyId} />
          <DetailItem label="Created At" value={createdAt.slice(0, 10)} />
          <DetailItem label="Updated At" value={updatedAt.slice(0, 10)} />
          <div className='flex flex-col mt-5'>
            <button 
              className='bg-black text-white hover:bg-white hover:text-black p-3 rounded-md transition-all duration-300 ease-in-out cursor-pointer'
              onClick={downloadJson}
            >
              Download Data JSON
            </button>
            <button 
              className='mt-5 bg-red-500 text-white hover:bg-white hover:text-black p-3 rounded-md transition-all duration-300 ease-in-out cursor-pointer'
              onClick={() => navigate('/')}
            >
              Back
            </button>
          </div>
        </div>

          <div className='absolute top-2 right-2'>
            <div className='relative group'>
              <button 
              className='bg-black text-white hover:bg-white hover:text-black p-2 rounded-full transition-all duration-300 ease-in-out cursor-pointer'
              onClick={() => navigate('/update/' + userId)}
              >
                <BsPencilSquare className='text-lg md:text-2xl'/>
              </button>
              <span className='absolute whitespace-nowrap -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>Update User</span>
            </div>
          </div>
      </div>
  </div>
  )
}

export default UsersDetail