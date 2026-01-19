import axios from "axios";
import TokenService from "./token.service";

const baseURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

/**
 * ✅ Request Interceptor
 * - แนบ Bearer Token อัตโนมัติ
 * - ไม่ไปยุ่ง Content-Type (สำคัญกับ multipart)
 */
api.interceptors.request.use(
  (config) => {
    const token = TokenService.getAccessToken();

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
