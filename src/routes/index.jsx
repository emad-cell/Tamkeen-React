import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import Index from "@/pages/Index";
import Register from "@/pages/auth/Register";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/login/user" element={<Login />} />
        <Route path="/login/association" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/user" element={<Register />} />
        <Route path="/register/association" element={<Register />} />
        <Route path="/" element={<Index />} />
      </Route>
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}></Route>
    </Routes>
  );
};

export default AppRoutes;
