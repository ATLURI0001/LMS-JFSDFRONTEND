import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';  // Import buildStyles
import 'react-circular-progressbar/dist/styles.css';

const AdminDashboard = () => {
    const [counts, setCounts] = useState({
        students: 0,
        instructors: 0,
        courses: 0
    });

    // Fetch total counts of students, instructors, and courses
    const fetchCounts = async () => {
        try {
            const studentsResponse = await axios.get('http://localhost:8080/students/count');
            const instructorsResponse = await axios.get('http://localhost:8080/instructors/count');
            const coursesResponse = await axios.get('http://localhost:8080/courses/count');
    
            setCounts({
                students: studentsResponse.data,
                instructors: instructorsResponse.data,
                courses: coursesResponse.data
            });
        } catch (error) {
            console.error("Error fetching counts:", error);
        }
    };
    
    useEffect(() => {
        fetchCounts();
    }, []);

    const getProgressValue = (count, max) => {
        // Calculate percentage
        return Math.min((count / max) * 100, 100); // Ensure value doesn't exceed 100%
    };

    return (
        <div style={styles.container}>
            <AdminNavbar />
            <h1 style={styles.heading}>Welcome to the Admin Dashboard</h1>
            
            <div style={styles.statsContainer}>
                <div style={styles.card}>
                    <CircularProgressbar 
                        value={getProgressValue(counts.students, 1000)} // Dynamic scaling
                        text={`${counts.students}`} 
                        styles={buildStyles({ pathColor: '#FFB74D', textColor: '#fff', trailColor: '#3e3e3e' })}
                    />
                    <p style={styles.circleLabel}>Students</p>
                </div>
                <div style={styles.card}>
                    <CircularProgressbar 
                        value={getProgressValue(counts.instructors, 100)} // Dynamic scaling
                        text={`${counts.instructors}`} 
                        styles={buildStyles({ pathColor: '#4CAF50', textColor: '#fff', trailColor: '#3e3e3e' })}
                    />
                    <p style={styles.circleLabel}>Instructors</p>
                </div>
                <div style={styles.card}>
                    <CircularProgressbar 
                        value={getProgressValue(counts.courses, 50)} // Dynamic scaling
                        text={`${counts.courses}`} 
                        styles={buildStyles({ pathColor: '#2196F3', textColor: '#fff', trailColor: '#3e3e3e' })}
                    />
                    <p style={styles.circleLabel}>Courses</p>
                </div>
            </div>
            <h1 style={styles.heading}>Admin operations</h1>
            <div style={styles.linksContainer}>
                <Link to="/admin-manage-courses" style={styles.link}>Manage Courses</Link>
                <Link to="/admin-view-students" style={styles.link}>add & manage Students</Link>
                <Link to="/admin-view-instructors" style={styles.link}>add & manage Instructors</Link>
                <Link to="/assign-courses" style={styles.link}>assign courses</Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        
        color: '#fff',
        padding: '20px',
        minHeight: '100vh',
        fontFamily: 'Poppins, sans-serif',
    },
    heading: {
        textAlign: 'center',
        fontSize: '36px',
        color: '#fff',
        marginTop: '20px',
        fontWeight: '600',
    },
    statsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '30px',
    },
    card: {
        backgroundColor: '#333',
        borderRadius: '16px',
        width: '180px',
        height: '180px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        margin: '0 20px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease',
    },
    circleLabel: {
        fontSize: '16px',
        marginTop: '10px',
        fontWeight: '500',
    },
    linksContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '40px',
    },
    link: {
        padding: '14px 28px',
        backgroundColor: '#2196F3',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        margin: '10px 0',
        fontSize: '18px',
        textAlign: 'center',
        width: '220px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
    },
};

export default AdminDashboard;
