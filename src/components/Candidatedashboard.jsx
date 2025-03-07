import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "./Candidatedashboard.css";

function Candidatedashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [score, setScore] = useState({});
    const [tasks] = useState(["Java", "Python", "HTML", "CSS", "React"]);
    
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || storedUser.role !== "Candidate") {
            navigate("/login");
        } else {
            setUser(storedUser);
            fetchScores(storedUser._id);
        }
    }, [navigate]);

    const fetchScores = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:3001/candidate/${userId}/scores`);
            setScore(res.data);
        } catch (err) {
            console.error("Error fetching scores:", err);
        }
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    const handleSubmitTask = (task, obtainedScore) => {
        const updatedScore = { ...score, [task]: obtainedScore };
        setScore(updatedScore);
        setSelectedTask(null);

        axios.post(`http://localhost:3001/candidate/${user._id}/submit-task`, {
            task,
            score: obtainedScore,
        })
        .then(() => alert(`Task ${task} completed! Score: ${obtainedScore}`))
        .catch(err => console.error("Error submitting task:", err));
    };

    return (
        <div>
            {/* <Header /> */}
            
            <div className="dashboard-container">
                {/* Profile Section */}
                <div className="profile-section">
                    <h2>{user?.name}'s Profile</h2>
                    <p>Email: {user?.email}</p>
                    <h3>Completed Tasks & Scores</h3>
                    <ul>
                        {Object.entries(score).map(([task, marks]) => (
                            <li key={task}>{task}: {marks} marks</li>
                        ))}
                    </ul>
                </div>

                {/* Task Section */}
                <div className="tasks-section">
                    <h2>Available Tasks</h2>
                    <ul>
                        {tasks.map(task => (
                            <li key={task}>
                                <button onClick={() => handleTaskClick(task)}>{task}</button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Task Detail Section */}
                {selectedTask && (
                    <div className="task-detail">
                        <h2>{selectedTask} Task</h2>
                        <p>Answer the following MCQs:</p>
                        <TaskDetail task={selectedTask} onSubmit={handleSubmitTask} />
                    </div>
                )}
            </div>
            {/*  <Footer />  */}
           
        </div>
    );
}

function TaskDetail({ task, onSubmit }) {
    const [answers, setAnswers] = useState({});
    const questions = {
        Java: [
            { q: "What is JVM?", options: ["Java Virtual Machine", "JavaScript Virtual Machine", "Both"], correct: "Java Virtual Machine" },
            { q: "Which keyword is used to define a class?", options: ["class", "Class", "struct"], correct: "class" },
        ],
        Python: [
            { q: "Which keyword is used for function definition in Python?", options: ["def", "function", "func"], correct: "def" },
            { q: "What is the correct file extension for Python files?", options: [".py", ".python", ".pt"], correct: ".py" },
        ],
    };

    const handleChange = (q, answer) => {
        setAnswers({ ...answers, [q]: answer });
    };

    const handleSubmit = () => {
        let obtainedScore = 0;
        questions[task].forEach(({ q, correct }) => {
            if (answers[q] === correct) obtainedScore += 5;
        });
        onSubmit(task, obtainedScore);
    };

    return (
        <div>
            {questions[task]?.map(({ q, options }) => (
                <div key={q}>
                    <p>{q}</p>
                    {options.map(opt => (
                        <label key={opt}>
                            <input type="radio" name={q} value={opt} onChange={() => handleChange(q, opt)} />
                            {opt}
                        </label>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default Candidatedashboard;
