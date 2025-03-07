import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import './Recruiterdashboard.css';
import { Button, Form, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Recruiterdashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [companyName, setCompanyName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [challenges, setChallenges] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [newChallenge, setNewChallenge] = useState("");

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || storedUser.role !== "Recruiter") {
            navigate("/login");
        } else {
            setUser(storedUser);
            fetchRecruiterProfile(storedUser._id);
            fetchCandidates();
        }
    }, [navigate]);

    // Fetch Recruiter Profile
    const fetchRecruiterProfile = async (id) => {
        try {
            const res = await axios.get(`http://localhost:3001/recruiter/${id}`);
            setCompanyName(res.data.companyName || "");
            setProfilePhoto(res.data.profilePhoto || "");
        } catch (err) {
            console.error("Error fetching recruiter profile:", err);
        }
    };

    // Fetch Registered Candidates
    const fetchCandidates = async () => {
        try {
            const res = await axios.get("http://localhost:3001/candidates");
            setCandidates(res.data);
        } catch (err) {
            console.error("Error fetching candidates:", err);
        }
    };

    // Fetch Launched Challenges
    const fetchChallenges = async () => {
        if (!user || !user._id) return; // Ensure user is set before making the request
        try {
            const res = await axios.get(`http://localhost:3001/recruiter/${user._id}/challenges`);
            setChallenges(res.data);
        } catch (err) {
            console.error("Error fetching challenges:", err);
        }
    };

    // Call fetchChallenges() when user is set
    useEffect(() => {
        if (user && user._id) {
            fetchChallenges();
        }
    }, [user]);

    // Handle Profile Update
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("companyName", companyName);
        if (profilePhoto) formData.append("profilePhoto", profilePhoto);

        try {
            await axios.put(`http://localhost:3001/recruiter/${user._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Profile updated successfully!");
            fetchRecruiterProfile(user._id);
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    // Handle Challenge Launch
    const handleLaunchChallenge = async () => {
        if (!newChallenge) return alert("Enter challenge details!");
        try {
            await axios.post("http://localhost:3001/challenges", {
                recruiterId: user._id,
                challenge: newChallenge,
            });
            alert("Challenge launched successfully!");
            setNewChallenge("");
            fetchChallenges(); // Refresh challenge list after launching
        } catch (err) {
            console.error("Error launching challenge:", err);
        }
    };

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
       
        <div className="profile-container">
           

            <div className="profile-content">
                {user ? (
                    <>
                        <h1>Welcome, {user.name}!</h1>
                        <Card className="profile-card">
                            {profilePhoto && (
                                <img src={`http://localhost:3001/uploads/${profilePhoto}`} alt="Profile" className="profile-photo" />
                            )}
                            <h3>{user.name}</h3>
                            <Form onSubmit={handleProfileUpdate} className="profile-form">
                                <Form.Group controlId="companyName">
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="profilePhoto">
                                    <Form.Label>Upload Profile Photo</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setProfilePhoto(e.target.files[0])}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">Update Profile</Button>
                            </Form>
                        </Card>

                        <h2>Launch a New Challenge</h2>
                        <Form>
                            <Form.Group controlId="newChallenge">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter challenge details"
                                    value={newChallenge}
                                    onChange={(e) => setNewChallenge(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="success" onClick={handleLaunchChallenge}>Launch Challenge</Button>
                        </Form>

                        {/* ✅ Display Launched Challenges */}
                        <h2>Your Launched Challenges</h2>
                        <ul>
                            {challenges.length > 0 ? (
                                challenges.map((challenge) => (
                                    <li key={challenge._id}>{challenge.challenge}</li>
                                ))
                            ) : (
                                <p>No challenges launched yet.</p>
                            )}
                        </ul>

                        <h2>Registered Candidates</h2>
                        <ul>
                            {candidates.map((candidate) => (
                                <li key={candidate._id}>{candidate.name} - {candidate.email}</li>
                            ))}
                        </ul>

                        <Button variant="danger" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
           
        </div>
    );
}

export default Recruiterdashboard;
