import { useState, useRef } from "react";
import "./login.css";
import authService from "../services/authService";
import { Link, useNavigate } from "react-router";
function Login({ setPage }) {
    const navigate = useNavigate();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const loginButtonRef = useRef(null);
    const [username, setUsername] = useState('');
    const handleUsername = (event) => {
        setUsername(event.target.value);
    }
    const [password, setPassword] = useState("");
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await authService.login(username, password);
        console.log(result);
        if (result.success) {
            localStorage.setItem("user", JSON.stringify(result.data));
            alert("Login Successful");
            navigate("/dashboard");
        }
        else {
            alert(result.message);
        }
    }
    return (
        <div
            className="container">
            <div
                className="login-box">
                <h1>
                    Login
                </h1>
                <input
                    ref={usernameRef}
                    type="text"
                    onChange={handleUsername}
                    placeholder="Username"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            passwordRef.current.focus();
                        }
                    }}
                />
                <input
                    ref={passwordRef}
                    type="password"
                    onChange={handlePassword}
                    placeholder="Password"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSubmit(e);
                        }
                    }}
                />
                <button
                    ref={loginButtonRef}
                    onClick={handleSubmit}
                >
                    Login
                </button>
                <p>
                    Create new account?
                    <Link to='/signup'>
                        signup
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default Login;