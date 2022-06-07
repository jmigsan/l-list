import axios from 'axios';

const API_URL = '/api/llist';

const createL = async (LData, idToken) => {

  const config = {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  };

  const response = await axios.post(API_URL, LData, config);
  return response.data;
};

const getLlist = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const deleteL = async (id, idToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const editL = async (LData, idToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  };

  const response = await axios.put(`${API_URL}/${LData.l_id}`, LData, config);
  return response.data;
};

const uploadContentL = async (LData, idToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  const response = await axios.post(`${API_URL}/upload`, LData, config);
  return response.data;
};

const llistService = {
  createL,
  getLlist,
  deleteL,
  editL,
  uploadContentL,
};

export default llistService;