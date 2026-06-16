import { createBrowserRouter } from "react-router";
import Login from "../auth/login";
import Signup from "../auth/signup";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Layout from "../layout/Layout";
import Profile from "../pages/profile/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "home",
                element: <Home />
            },
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "profile",
                element: <Profile />
            }
        ]
    }
]);

export default router;