import axios from 'axios';

const API =axios.create({ baseURL:'http://localhost:5000'});
API.interceptors.request.use((req) =>{
     if(localStorage.getItem('profile'))
     {
         req.headers.authorization =`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
        
     }
     return req;
});
const url = 'http://localhost:5000/posts';
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const signIn =(formData) => API.post('/user/signin',formData );
export const signUp=(formData) => API.post('/user/signup',formData );