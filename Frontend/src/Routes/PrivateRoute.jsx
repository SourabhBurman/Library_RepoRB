import { useContext } from "react"
import { AuthContext } from "../Context/ContextProvider"
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children})=>{
    const auth = useContext(AuthContext);
    const {authStatus} = auth;
    
    if(authStatus === false){
        return <Navigate to={"/login"}></Navigate>
    }
    return children
}

export default PrivateRoute;