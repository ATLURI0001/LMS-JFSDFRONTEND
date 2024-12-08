import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "../components/StudentNavbar";

const StudentRegisterForCourse = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/courses");
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    return (
        <div style={styles.registerContainer}>
            <StudentNavbar />
            <h1 style={styles.headerText}>Explore Courses</h1>
            <div style={styles.coursesContainer}>
                {courses.map((course, index) => (
                    <div style={styles.courseCard} key={index}>
                       
                        <h3 style={styles.courseTitle}>course Name:{course.name}</h3>
                        <p style={styles.courseDescription}>course description:{course.description}</p>
                       
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    registerContainer: {
        fontFamily: "'Arial', sans-serif",
        minHeight: "100vh",
        padding: "20px",
       
        textAlign: "center",
    },
    headerText: {
        fontSize: "2.5em",
        color: "#4a90e2",
        marginBottom: "30px",
    },
    coursesContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "30px",
        padding: "20px",
    },
    courseCard: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "pointer",
    },
    courseCode: {
        fontSize: "1em",
        color: "#7a7a7a",
        marginBottom: "5px",
    },
    courseTitle: {
        fontSize: "1.8em",
        color: "#333",
        margin: "10px 0",
    },
    courseDescription: {
        fontSize: "1.1em",
        color: "#555",
        marginBottom: "20px",
    },
    enrollButton: {
        padding: "12px 25px",
        borderRadius: "6px",
        backgroundColor: "#4a90e2",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "1em",
        transition: "background-color 0.3s",
    },
};

export default StudentRegisterForCourse;
