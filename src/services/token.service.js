import { Cookies } from "react-cookie";

const cookie = new Cookies();
const COOKIE_KEY = "user";

/**
 * 🔹 ดึง user จาก cookie
 */
const getUser = () => {
  const user = cookie.get(COOKIE_KEY);
  if (!user) return null;

  try {
    return typeof user === "string" ? JSON.parse(user) : user;
  } catch (error) {
    console.error("Failed to parse user cookie:", error);
    return null;
  }
};

/**
 * 🔹 ดึง accessToken (ใช้แนบ Authorization)
 */
const getAccessToken = () => {
  const user = getUser();
  return user && user.accessToken ? user.accessToken : null;
};

/**
 * 🔹 เก็บ user + token ลง cookie
 */
const setUser = (user) => {
  if (!user || !user.accessToken) {
    removeUser();
    return;
  }

  const userData = {
    id: user.id,
    username: user.username,
    accessToken: user.accessToken,
  };

  cookie.set(COOKIE_KEY, userData, {
    path: "/",
    maxAge: 60 * 60 * 24, // 1 วัน (วินาที)
    sameSite: "lax",
  });
};

/**
 * 🔹 ลบ user (logout)
 */
const removeUser = () => {
  cookie.remove(COOKIE_KEY, { path: "/" });
};

export default {
  getUser,
  getAccessToken,
  setUser,
  removeUser,
};
