import React, { useEffect, useState } from "react";
import InstructorNavbar from "../components/InstructorNavbar";

const InstructorDashboard = () => {
    const [instructorName, setInstructorName] = useState("");

    useEffect(() => {
        const name = localStorage.getItem("userName");
        if (name) {
            setInstructorName(name);
        }
    }, []);

    return (
        <div style={styles.container}>
            <InstructorNavbar />
            <div style={styles.header}>
                <h1 style={styles.welcomeText}>Welcome, {instructorName}!</h1>
                <p style={styles.subText}>This is your Instructor Dashboard</p>
            </div>
            <div style={styles.dashboardContent}>
                <div style={styles.card}>
                    <h2>Manage Courses</h2>
                    <p>View and edit your courses here.</p>
                </div>
                <div style={styles.card}>
                    <h2>Student Interaction</h2>
                    <p>Engage with your students and monitor progress.</p>
                </div>
                <div style={styles.card}>
                    <h2>Performance Analytics</h2>
                    <p>Track your teaching performance and student outcomes.</p>
                </div>
            </div>
        </div>
    );
};

const styles = {

    container: {
        fontFamily: "Arial, sans-serif",
       
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
    },
    header: {
        marginBottom: "40px",
        color: "#4a90e2",
    },
    welcomeText: {
        fontSize: "2.5em",
        fontWeight: "600",
    },
    subText: {
        fontSize: "1.2em",
        color: "#666",
    },
    dashboardContent: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap",
    },
    card: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "250px",
        textAlign: "left",
        transition: "transform 0.3s",
        cursor: "pointer",
    },
    cardHover: {
        transform: "scale(1.05)",
    },
    cardTitle: {
        fontSize: "1.5em",
        color: "#333",
    },
    cardText: {
        fontSize: "1em",
        color: "#777",
    },
};

export default InstructorDashboard;
