import api from "./axios";

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const login = (email: string, password: string) =>
  api.post("/login", { email, password });

export const signup = (data: SignupPayload) => api.post("/signup", data);

export const logout = () => api.post("/logout");
