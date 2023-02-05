import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Login() {
    const [pwd, setPwd]= useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const loginUser = (userData, error) => {
        axios
            .post("http://localhost:4000/api/login", userData)
            .then(res => {
                const { token } = res.data;
                const decoded = jwt_decode(token);
                const cookies = new Cookies();
                cookies.set("TOKEN", decoded, {
                path: "/"
                })
                navigate("/dashboard");
            })
            .catch(err => {
                setError(err.response.data.error)
            });
        }
        
        const userData = {
            username: username,
            pwd: pwd,
            error: error
        }

        const submit = e => {
            e.preventDefault();
            loginUser(userData, error)
        }

    return (
        <div>
            <h1>Welcome To The Ultimate Test Of Your Intelligence!</h1>
              <div>
              <form onSubmit={submit}>
                <label for="username">Username:</label>
                <input type="text"
                    id="username"
                    name="username" 
                    placeholder="Enter Username" 
                    onChange={(e) => setUsername(e.target.value)}>
                 </input>
                    <div>
                        <label for="pwd">Password:</label>
                            <input type="password"
                                id="pwd"
                                name="pwd" 
                                placeholder="Enter Password" 
                                onChange={(e) => setPwd(e.target.value)}>
                            </input>
                            <div>
                                <input
                                type="submit"
                                value="Login">
                                </input>
                            </div>
                 </div>
            </form>
            </div>
            <a className="link" href="/register">
                Not Registered? Click Here!
            </a>
        </div>
    );
  }
  
  export default Login;