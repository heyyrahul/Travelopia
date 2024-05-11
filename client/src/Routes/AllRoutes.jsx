import { Route,  Routes } from "react-router-dom"
import Login from "../components/Login";
import SignUp from "../components/Signup";
import TripForm from "../components/Trip";
import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";
import UserTrip from "../components/UserTrip";


const AllRoutes = () => {
    return (
        <Routes>
           
            <Route path="/" element={<TripForm />} />
            <Route path="/trip" element={<UserTrip/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/admindashboard" element={<AdminDashboard/>} />
        </Routes>
    )
}

export default AllRoutes;