import { jwtDecode } from "jwt-decode";

const getCookieValue = (name) => {
  const match = document.cookie.split("; ").find((row) => row.startsWith(name + "="));
  return match ? match.split("=").slice(1).join("=") : null;
};

export const verifyLogin = () => {
  try {
    const token = getCookieValue("codesnip") || localStorage.getItem("resource");
    if (token) {
      const decodedToken = jwtDecode(token);
      const now = new Date().getTime() / 1000;
      return decodedToken.exp > now;
    }
    return false;
  } catch (e) {
    console.error("error while decoding token", e);
    return false;
  }
};
