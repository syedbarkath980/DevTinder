import api from "./axios";

export const viewProfile = () =>
  api.get("/profile", {
    withCredentials: true,
  });
