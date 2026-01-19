import api from "./api";
import TokenService from "./token.service";

const API_URL = import.meta.env.VITE_AUTH_URL;

// สมัครสมาชิก
const register = async (username, password) => {
  return await api.post(`${API_URL}/register`, {
    username,
    password,
  });
};

// เข้าสู่ระบบ
const login = async (username, password) => {
  const response = await api.post(`${API_URL}/login`, {
    username,
    password,
  });

  if (response.status === 200 && response.data?.accessToken) {
    TokenService.setUser({
      id: response.data.id,
      username: response.data.username,
      accessToken: response.data.accessToken,
    });
  }

  return response;
};

// ออกจากระบบ
const logout = () => {
  TokenService.removeUser();
};

export default {
  register,
  login,
  logout,
};
