//api>index.js
import axios from 'axios';
const API = axios.create({baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
});
export const fetchBlogs = () => API.get('/jobs');
export const fetchBlog = (id) => API.get(`/jobs/${id}`);
export const createBlog = (newJob) => API.post('/jobs', newJob);
export const fetchBlogsBySearch = (searchQuery) => API.get('/jobs/search', { params: { searchQuery } });

export const deleteJob = (id) => API.delete(`/jobs/${id}`);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);