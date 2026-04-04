// services/auth.js
import { api } from "./axios";
export const registerClient = (payload) => api.post("/clientRegister", payload);
export const registerAssociation = (payload) =>
  api.post("/associationRegister", payload);
export const getMe = () => api.get("/me");
export const logout = () => api.post("/logout");
export const login = (payload) => api.post("/login", payload);

const GOOGLE_AUTH_ENDPOINTS = [
  "/auth/google",
  "/google/login",
  "/login/google",
  "/googleLogin",
];

export const authWithGoogle = async (payload) => {
  let lastError;

  for (const endpoint of GOOGLE_AUTH_ENDPOINTS) {
    try {
      return await api.post(endpoint, payload);
    } catch (error) {
      const status = error?.response?.status;

      // Try next candidate endpoint when route is not implemented.
      if (status === 404 || status === 405) {
        lastError = error;
        continue;
      }

      throw error;
    }
  }

  throw lastError || new Error("Google auth endpoint is not available.");
};
