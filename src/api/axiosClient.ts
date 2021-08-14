import axios from 'axios';

export const backendUrl: string = 'https://luong-chat-app.herokuapp.com';
// export const backendUrl: string = 'http://localhost:5000';

const axiosClient = () =>
  axios.create({
    baseURL: `${backendUrl}/api`,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    },
  });

export default axiosClient;
