import api from "./api";

const API_URL = import.meta.env.VITE_POST_URL;

/**
 * 🔹 ดึง post ทั้งหมด
 */
const getAllPosts = () => {
  return api.get(API_URL);
};

/**
 * 🔹 ดึง post ตาม id
 */
const getById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

/**
 * 🔹 ดึง post ตาม author
 */
const getByAuthorId = (id) => {
  return api.get(`${API_URL}/author/${id}`);
};

/**
 * 🔹 สร้าง post (multipart/form-data)
 * ❗ ห้ามตั้ง Content-Type เอง
 * ❗ token ให้ interceptor จัดการ
 */
const createPost = (formData) => {
  return api.post(API_URL, formData);
};

/**
 * 🔹 แก้ไข post
 */
const updatePost = (id, data) => {
  return api.put(`${API_URL}/${id}`, data);
};

/**
 * 🔹 ลบ post
 */
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
