import { createContext, useContext } from "react";

interface AuthContextType{
    // null because maybe the user is not login yet so it will be null
    email : string | null,
    token : string | null,
    login : (username : string , token : string , role:string) => void,
    logout : () => void,
    isAuth : boolean,
    isAdmin : boolean
}

export const AuthContext = createContext <AuthContextType>({
    email : null,
    token : null,
    login : () => {},
    logout : () => {},
    isAuth: false,
    isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);