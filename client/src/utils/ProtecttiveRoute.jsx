import { Navigate } from "react-router-dom"
import Chat from "../components/Chat"
import Login from "../components/Login"
// import { Children } from "react"
function ProtecttiveRoute({children}){
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
    return loggedUser ? children :<Navigate to="/"/> 
}

export default ProtecttiveRoute