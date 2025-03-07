import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

import Footer from "./Footer";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [role, setRole] = useState("");
    const navigate = useNavigate()


    const handleLogin = async (e) => {
        e.preventDefault();

        if (!role) {
            alert("Please select a role (Recruiter or Candidate).");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/login", {
                email: email.trim(),
                password: password.trim(),
                role: role
            }, { headers: { "Content-Type": "application/json" } });


            console.log("Login response:", response.data);
            localStorage.setItem("user", JSON.stringify(response.data.user));


            if (role === "Recruiter") {
                navigate("/Recruiterdashboard");
            } else if (role === "Candidate") {
                navigate("/Candidatedashboard");
            }
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error.message);
            alert(error.response?.data?.error || "Login failed!");
        }
    };

    return (
        <main1>
         <header>
                <div className="logo"><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} >CHALLENGIFY</Link>  </div>
            </header>
            <div class="login-container">            
                <h21>Login</h21>
                <form id="loginForm" onSubmit={handleLogin} >

                    <div className="form-group2">
                        <p3>*Role</p3>
                        <div className="role-selection">
                            <label>
                                <input type="radio" value="Recruiter" checked={role === "Recruiter"}
                                    onChange={() => setRole("Recruiter")} />
                                Recruiter
                            </label>
                            <label>
                                <input type="radio" value="Candidate" checked={role === "Candidate"}
                                    onChange={() => setRole("Candidate")} />
                                Candidate
                            </label>
                        </div>
                    </div>

                    <div class="form-group1">
                        <label for="email">Email:</label>
                        <input type="email" placeholder="Email Id" required
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div class="form-group1">
                        <label for="password">Password:</label>
                        <input type="password" placeholder=" Enetr Your Password" required
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button class="login-btn">Login</button>
                    {/* 
                   <div class="or-divider">
                     <span>OR</span>
                   </div>

                   
                    <a href="https://accounts.google.com/signin" class="google-box-link">
                      Continue with Google
                     </a>

                     */}

                    <p class="login-link">New to Challengify? <a href="/Signup">Signup</a></p>

                </form>
                <p id="message"></p>
               
            </div>
            <Footer />
        </main1>
    );
}
export default Login;