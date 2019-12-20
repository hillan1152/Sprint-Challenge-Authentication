import axios from 'axios';

export const axiosWithAuth = () => {
    let token = localStorage.getItem('token');

    return axios.create({
        baseURL: 'http://localhost:3300',
        headers: {
            authorization: token
        }
    });
};