import { useState, useRef } from "react";
import "./signup.css";
import authservice from "../services/authservice";
import { Link } from "react-router";
function Signup({ setPage }) {
    const [name, setName] = useState("")
    const [dob, setDob] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const nameRef = useRef(null);
    const dobRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const handlesubmit = async (event) => {
        event.preventDefault()
        console.log("Signup button clicked");
        console.log("Name:", name);
        console.log("DOB:", dob);
        console.log("Phone:", phone);
        console.log("Email:", email);
        console.log("Username:", username);
        console.log("Password:", password);
        const result = await authservice.signup(name, dob, phone, email, username, password);
        console.log("Signup Result:", result);
        console.log("Message:", result.message);
        console.log("Type:", typeof result.message);
        if (result.success) {
            alert(result.message);
            window.location.href = "/login";
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
                    Sign Up
                </h1>
                <input
                    ref={nameRef}
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            dobRef.current.focus();
                        }
                    }}
                />
                <input
                    ref={dobRef}
                    type="date"
                    onChange={(e) => setDob(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            phoneRef.current.focus();
                        }
                    }}
                />
                <input
                    ref={phoneRef}
                    type="tel"
                    placeholder="Phone Number"
                    onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            emailRef.current.focus();
                        }
                    }}
                />
                <input
                    ref={emailRef}
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            usernameRef.current.focus();
                        }
                    }}
                />
                <input
                    ref={usernameRef}
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            passwordRef.current.focus();
                        }
                    }}
                />
                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handlesubmit(e);
                        }
                    }}
                />
                <button
                    onClick={handlesubmit}>
                    Sign Up
                </button>
                <p
                    className="register-link">
                    Already Have an Account?
                    <Link
                        to='/login'>
                        login
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default Signup;