import { API_BASE_URL } from "../constants";

const API_URL = `${API_BASE_URL}/auth`;

export const signupService = ({ email, username, password, passwordConf }) => {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ email, username, password, passwordConf })
  })
    .then(res => {
      const p = new Promise((resolve, reject) => {
        if (res.ok) {
          return resolve(res);
        }
        return reject(res);
      });
      return p;
    })
    .catch(error => Promise.reject(error));
};

export const loginService = ({ email, password }) => {
  console.log("login process started");
  return fetch(`${API_URL}/login`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => {
      const p = new Promise((resolve, reject) => {
        if (res.ok) {
          return resolve(res);
        }
        return reject(res);
      });
      return p;
    })
    .catch(error => Promise.reject(error));
};

export const logoutService = () => {
  return fetch(`${API_URL}/logout`, {
    credentials: "include"
  })
    .then(res => {
      const p = new Promise((resolve, reject) => {
        if (res.ok) {
          return resolve(res);
        }
        return reject(res);
      });
      return p;
    })
    .catch(error => Promise.reject(error));
};
