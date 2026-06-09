import { useState } from "react";
import "./login.css";
import authService from "../services/authService";

function Login({setPage}) {
const[name,setName]= useState('');


const handleName=(event)=>{
  setName(event.target.value);
};
const [password, setPassword] = useState("");

const handlePassword = (event) => {
  setPassword(event.target.value);
};
const handleSubmit = (event) => {
  event.preventDefault()
  console.log(name);
console.log(password);

authService.login(name,password)
}



  return (
    <div className="container">
      <div className="login-box">
        <h1>Login</h1>

        <input type="text" onChange={handleName} placeholder="Username" />

        <input type="password" onChange={handlePassword}placeholder="Password" />

        <button onClick={handleSubmit}>Login</button>

        <p>
          Create new account? <a
           href="#" className="register-link"
           onClick={(e) =>{
            e.preventDefault();
            setPage("signup");
           }

           }>Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;