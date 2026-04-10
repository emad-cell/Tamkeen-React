// services/auth.js
import { api } from "./axios";
export const registerClient = (payload) => api.post("/clientRegister", payload);
export const registerAssociation = (payload) =>
  api.post("/associationRegister", payload);
export const getMe = () => api.get("/me");
export const logout = () => api.post("/logout");
export const login = (payload) => api.post("/login", payload);
export const authWithGoogle = (payload) => api.post("/auth/google", payload);
