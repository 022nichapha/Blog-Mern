import { Cookies } from "react-cookie";

const cookie = new Cookies();
const COOKIE_KEY = "user";

// 🔹 ดึง user (parse JSON ให้เรียบร้อย)
const getUser = () => {
  const user = cookie.get(COOKIE_KEY);
  if (!user) return null;

  try {
    return typeof user === "string" ? JSON.parse(user) : user;
  } catch (error) {
    console.error("Failed to parse user cookie", error);
    return null;
  }
};

// 🔹 ดึง accessToken (ใช้กับ API)
const getAccessToken = () => {
  const user = getUser();
  return user?.accessToken || null;
};

// 🔹 ตั้งค่า user + token
const setUser = (user) => {
  if (!user) {
    removeUser();
    return;
  }

  const userData = {
    id: user.id,
    username: user.username,
    accessToken: user.accessToken,
  };

  cookie.set(COOKIE_KEY, JSON.stringify(userData), {
    path: "/",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 วัน
  });
};

// 🔹 ลบ user (logout)
const removeUser = () => {
  cookie.remove(COOKIE_KEY, { path: "/" });
};

const TokenService = {
  getUser,
  getAccessToken,
  setUser,
  removeUser,
};

export default TokenService;
