import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import BookingPage from "../pages/Doctor";
import DoctorDetail from "../pages/DoctorDetail";
import Prescription from "../pages/Prescription";

const publicRoutes = [
        {path: "/", component : Home},
        {path: "/register", component : Register},
        {path: "/login", component : Login},
        {path: "/doctor/:provinceSlug", component : BookingPage},
        {path: "/doctor/:provinceSlug/:districtSlug", component : BookingPage},
        {path: "/doctor/", component : BookingPage},
        {path: "/doctorDetail/*", component : DoctorDetail},
        {path: "/prescription", component : Prescription}
]

const privateRoutes = [

]
export {publicRoutes,privateRoutes}