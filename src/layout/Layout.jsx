import "./layout.css";
import { Link, Outlet } from "react-router-dom";
function Layout() {
    return (
        <>
            <header id="header">
                <div className="logo">
                    BUDGET TRACKER
                </div>

                <nav>
                    <Link to="/home">
                        Home
                    </Link>

                    <Link to="/dashboard">
                        Dashboard
                    </Link>

                    <Link to="/profile">
                        Profile
                    </Link>

                    <Link to="/login">
                        Logout
                    </Link>
                </nav>

            </header>

            <main className="content">
                <Outlet />
            </main>
        </>
    );
}

export default Layout;