import { useState } from "react";
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

        console.log(result);

        if (result.success) {
            alert(result.message);

            //go to login page
            window.location.href = "/login";
        }
        else {
            alert(result.message);
        }
    }
    return (
        <div className="container">
            <div className="login-box">
                <h1>
                    Sign Up
                </h1>
                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)} />

                <input
                    type="date"
                    placeholder="DOB(dd-mm-yyyy)"
                    onChange={(e) => setDob(e.target.value)} />

                <input
                    type="tel"
                    placeholder="Phone Number"
                    onChange={(e) => setPhone(e.target.value)} />

                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)} />

                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)} />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} />

                <button onClick={handlesubmit}>
                    Sign Up
                </button>

                <p className="register-link">
                    Already Have an Account?

                    <Link to='/login'>
                        login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;