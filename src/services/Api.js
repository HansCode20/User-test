import axios from 'axios';

const API_URL = 'https://api-wms.bisbas.id/api/users';

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/login`, credentials);
};

export const fetchUsers = async (token) => {
  return await axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const fetchUserDetail = async (userId, token) => {
  return await axios.get(`${API_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateUser = async (userData, token) => {
  // Validasi bahwa `userId` tersedia sebelum mengirim request
  if (!userData.userId) {
    throw new Error("User ID harus disertakan dalam request body!");
  }

  const updatedData = {... userData};
  delete updatedData.createdAt;
  delete updatedData.updatedAt;
  delete updatedData.companyCode;
  if (updatedData.companyId === null) {
    delete updatedData.companyId;
  }

  try {
    const response = await axios.patch(API_URL, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error.response?.data || error.message);
    throw error;
  }
};