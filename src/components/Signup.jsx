import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Footer from "./Footer";
import './signup.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(""); // No default selection
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!role) {
            alert("Please select a role (HR or Student).");
            return;
        }

        alert("Registration successful! Verify it on your mail.");

        try {
            await axios.post("http://localhost:3001/signup", { name, email, password, role });
            navigate("/login");  
        } catch (error) {
            console.error("Signup error:", error.response ? error.response.data : error.message);  // Log the error response
            alert("Signup failed! Please try again.");
        }
        
    };

    return (
        <main2>
            <header>
                <div className="logo"><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} >CHALLENGIFY</Link>  </div>
            </header>
            <div className="signup-container">
                <h22>Register to Challengify</h22>
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-group2">
                        <p2>*Role</p2>
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


                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" placeholder="Name" required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" placeholder=" Email Id" required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" placeholder="Password" required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>



                    <button className="register-btn">Register</button>
                    {/*   
                    <div className="or-divider">
                        <span>OR</span>
                    </div>
                    <a href="https://accounts.google.com/signin" className="google-box-link">
                        Continue with Google
                    </a>   */}
                </form>
                <p className="info-text">Join now and start your coding journey!</p>
                <p className="login-link">Have an Account? <a href="/Login">Login</a></p>
                
            </div>
            <Footer />
        </main2>
    );
}

export default Signup;
