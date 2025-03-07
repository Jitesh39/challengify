import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

import Signup from './components/Signup';
import Footer from './components/Footer';
import Login from './components/Login';
import Candidatedashboard from './components/Candidatedashboard';
import Recruiterdashboard from './components/Recruiterdashboard';



function Home() {
    const navigate = useNavigate();

    return (
        <div className="App">
            <header>
                <div className="logo"><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} >CHALLENGIFY</Link>  </div>
                <nav>
                    <ul>
                        <li><a href="/Login">Login</a></li>
                        <li><a href="/Signup">Sign Up</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                <div className="content">
                    <h1>Welcome to Challengify</h1>
                    <p>Challengify is an interactive coding assessment platform designed for students to test their programming skills across multiple languages.
                        It provides a structured environment where users can take coding challenges, compete in tests, and showcase their performance through their profile.
                        The platform bridges the gap between students and recruiters by offering real-time insights into coding proficiency.</p>
                    
                </div>
                <button1 class="getstarted-btn" onClick={() => navigate('/Signup')}>Get Started</button1>
            </main>
            

            <Footer />
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Candidatedashboard" element={<Candidatedashboard />} />
                <Route path="/Recruiterdashboard" element={<Recruiterdashboard />} />
                
            </Routes>
        </Router>
    );
}

export default App;
