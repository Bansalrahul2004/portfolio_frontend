import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://portfolio-backend-8skl.onrender.com/api/v1',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default instance; 