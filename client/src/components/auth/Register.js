import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

  function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [pwdConfirm, setPwdConfirm] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate();

    const registerUser = (userData, error) => {
        axios
            .post("http://localhost:4000/api/register", userData)
            .catch(err => {
                setError(err.response.data.error)
            });
        if (error === "") {
            navigate("/")
        }
        }

    const userData = {
        username: username,
        email: email,
        pwd: pwd,
        pwdConfirm: pwdConfirm,
        highScore: 0,
        error: error
    }

    const submit = e => {
        e.preventDefault();
        registerUser(userData, error)
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={submit}>
                <label for="username">Username</label>
                <input type="text"
                    id="username"
                    name="username" 
                    placeholder="Enter Username" 
                    onChange={(e) => setUsername(e.target.value)}>
                 </input>
                 <label for="pwd">Password</label>
                 <input type="password"
                    id="pwd"
                    name="pwd" 
                    placeholder="Enter Password" 
                    onChange={(e) => setPwd(e.target.value)}>
                 </input>
                 <label for="pwdConfirm">Confirm Password</label>
                 <input type="password"
                    id="pwdConfirm"
                    name="pwdConfirm" 
                    placeholder="Confirm Password" 
                    onChange={(e) => setPwdConfirm(e.target.value)}>
                 </input>
                 <input
                 type="submit"
                 value="Register">
                 </input>
            </form>
            
            </div>
        )
  }

  export default Register;