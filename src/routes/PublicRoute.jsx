import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  // If the user is already logged in → redirect
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Otherwise allow access
  return <Outlet />;
};

export default PublicRoute;
