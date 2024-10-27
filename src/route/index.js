import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import BookingPage from "../pages/Doctor";
import DoctorDetail from "../pages/DoctorDetail";
import CreateDoctor from "../components/doctorComponent/createDoctor";
const publicRoutes = [
        {path: "/", component : Home},
        {path: "/register", component : Register},
        {path: "/login", component : Login},
        {path: "/doctor/:provinceSlug", component : BookingPage},
        {path: "/doctor/:provinceSlug/:districtSlug", component : BookingPage},
        {path: "/doctor/", component : BookingPage},
        {path: "/doctorDetail/*", component : DoctorDetail},
        {path: "/createDoctor", component : CreateDoctor}
]

const privateRoutes = [

]
export {publicRoutes,privateRoutes}