import api from "./api";

const API_URL = import.meta.env.VITE_POST_URL;


const getAllPosts = () => {
  return api.get(API_URL);
};


const getById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

const getByAuthorId = (id) => {
  return api.get(`${API_URL}/author/${id}`);
};


const createPost = (formData) => {
  return api.post(API_URL, formData);
};

const updatePost = (id, data) => {
  return api.put(`${API_URL}/${id}`, data);
};

const deletePost = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

export default {
  getAllPosts,
  getById,
  getByAuthorId,
  createPost,
  updatePost,
  deletePost,
};
