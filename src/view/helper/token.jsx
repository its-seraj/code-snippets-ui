import { jwtDecode } from "jwt-decode";

export const verifyLogin = () => {
  try {
    const token = localStorage.getItem("resource");
    if (token) {
      const decodedToken = jwtDecode(token);
      const now = new Date().getTime() / 1000;
      console.log(decodedToken, now, decodedToken.exp > now);
      return decodedToken.exp > now;
    }
    localStorage.removeItem("resource");
    return false;
  } catch (e) {
    console.error("error while decoding token", e);
    localStorage.removeItem("resource");
    return false;
  }
};
