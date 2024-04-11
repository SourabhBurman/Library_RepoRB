import {Routes, Route} from "react-router-dom";

import InvalidRouteError from '../Pages/InvalidRouteError'
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard"
import Profile from "../Pages/Profile"
import PrivateRoute from "./PrivateRoute";


const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}>Login</Route>
            <Route path="/signup" element={<Signup/>}>Signup</Route>
            <Route path="*" element={<InvalidRouteError/>}>Addproduct</Route>

            <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}>Profile</Route>
            <Route path="/" element={ <PrivateRoute><Dashboard/></PrivateRoute>}>Dashboard</Route>
        </Routes>
    );
}

export default AllRoutes;
