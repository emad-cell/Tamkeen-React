import {FC, PropsWithChildren, useEffect, useState} from 'react'
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";


const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

  const [email, setEmail] = useState<string | null>(localStorage.getItem("email"));
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
  // const [isAdmin, setAdmin] = useState<boolean>(false);
  // useEffect(() => {
  //   setAdmin(role === "admin");
  // }, [role]);
  const isAdmin = role === "admin";
  const navigate = useNavigate();


  const login = (email: string, token: string, role: string) => {
    // setEmail(email)
    // setToken(token)
    // setRole(role)

      localStorage.setItem("email", email)
        localStorage.setItem("token" , token)
    localStorage.setItem("role", role)
    console.log(email)
    }

    const logout = () =>{
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setEmail(null);
      setToken(null);
      setRole(null);
      navigate("/");
  };

    const isAuth = !!token;

  return (
    <AuthContext.Provider value={{ email ,isAdmin, token , login , logout , isAuth}}>
        {children}
q    </AuthContext.Provider>
  )
}

export default AuthProvider