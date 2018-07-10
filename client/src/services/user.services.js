import { API_BASE_URL } from "../constants";

const API_URL = `${API_BASE_URL}/user`;

export const profileService = () => {
  return fetch(`${API_URL}/profile`, {
    credentials: "include"
  }).then(async res => {
    const jsonRes = await res.json();
    return res.ok ? jsonRes : Promise.reject(jsonRes);
  });
};
