import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
//import './App.css'
import { useState } from "react";
import Login from "./auth/login";
import Signup from "./auth/signup";

function App() {

    const [page, setPage] = useState("login");

    return (
        <>
            {page === "login" ? <Login setPage={setPage} />: <Signup setPage={setPage} />
            }
        </>
    );
}

export default App;
