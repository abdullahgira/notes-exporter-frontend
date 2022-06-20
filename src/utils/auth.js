import jwt_decode from "jwt-decode";
import api from "../api";
import { axios } from "../config/axios-config";

let accessToken = "";
let refreshToken = localStorage.getItem("token") || "";

class Auth {
  async getDecodedToken() {
    const token = await this.getToken();
    return this._decodeToken(token);
  }

  async getUser() {
    const token = await this.getToken();
    return this._decodeToken(token);
  }

  setToken({ newAccessToken, newRefreshToken }) {
    accessToken = newAccessToken;
    refreshToken = newRefreshToken;
    localStorage.setItem("token", newRefreshToken || "");
  }

  logout() {
    this.setToken({ newAccessToken: "", newRefreshToken: "" });
  }

  async getToken() {
    if (this.hasExpired()) return this.refreshToken();
    else return accessToken;
  }

  async refreshToken() {
    if (!this.hasExpired()) return accessToken;

    try {
      const res = await axios.post(api.auth.refreshToken, { refreshToken });
      const data = res.data;
      this.setToken({
        newAccessToken: data.data.accessToken,
        newRefreshToken: data.data.refreshToken,
      });
      return data.data.accessToken;
    } catch (e) {
      console.error(e);
      return false;
      // window.location.href = routes.auth.login
    }
  }

  hasExpired() {
    if (!accessToken) return true;
    const decodeToken = jwt_decode(accessToken);
    const now = new Date().getTime() / 1000;

    if (!decodeToken || now > decodeToken.exp) {
      return true;
    } else {
      return false;
    }
  }

  _decodeToken(token) {
    try {
      const decoded = jwt_decode(token);
      return decoded;
    } catch (e) {
      return false;
    }
  }
}

export default new Auth();
