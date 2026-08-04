import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // send (or) receive the JWT cookie automatically
});

export default api;
