import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import Index from "@/pages/Index";
import Register from "@/pages/auth/Register";
const AppRoutes = () => {
  return (
    <Routes>
      //------------------- Public routes
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      //------------------- Protected routes
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Index />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
