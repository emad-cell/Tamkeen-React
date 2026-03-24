import { useAuth } from "../context/AuthContext";

export const useAuthUser = () => {
  const { user } = useAuth();
  return user;
};