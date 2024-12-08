import React from "react";
import StudentNavbar from "../components/StudentNavbar";

const StudentDashboard = () => {
    const userName = localStorage.getItem("userName");

    return (
        <div style={styles.dashboardContainer}>
            <StudentNavbar />
            <div style={styles.contentContainer}>
                <h1 style={styles.welcomeText}>Welcome, {userName}!</h1>
               
                <p style={styles.aboutLMS}>
                    Our Learning Management System (LMS) is designed to empower students by providing
                    a platform to explore, enroll, and manage courses. With easy navigation, students
                    can access course content, track progress, and interact with instructors. Your
                    learning journey starts here!
                </p>

                <p style={styles.features}>
                    <strong>What you can do:</strong>
                    <ul style={styles.featureList}>
                        <li>Enroll in a wide range of courses.</li>
                        <li>Track your learning progress.</li>
                        <li>Interact with instructors and peers.</li>
                        <li>Access resources and assignments seamlessly.</li>
                    </ul>
                </p>

                <div style={styles.instructorSection}>
                    <h2 style={styles.sectionHeader}>Meet Our Instructors</h2>
                    <p style={styles.instructorText}>
                        Our experienced instructors are here to guide you through every step of your learning journey.
                        With expert knowledge in their fields, they provide high-quality teaching and are always available to
                        support you.
                    </p>
                    <div style={styles.instructorCards}>
                        <div style={styles.instructorCard}>
                            <h3 style={styles.instructorName}>------</h3>
                            <p style={styles.instructorRole}>Course Instructor - Web Development</p>
                            <p style={styles.instructorBio}>
                                ----------
                            </p>
                        </div>
                    </div>
                </div>

                <div style={styles.videoSection}>
                    <h2 style={styles.sectionHeader}>Sample Videos</h2>
                    <p style={styles.videoText}>
                        Get a glimpse of our interactive courses through sample videos. Our video content is designed to help
                        you understand complex concepts in an engaging and easy-to-follow way.
                    </p>
                    <div style={styles.videoCards}>
                        <div style={styles.videoCard}>
                            <h3 style={styles.videoTitle}>Introduction to Data Science</h3>
                            <iframe
                                style={styles.videoIframe}
                                width="100%"
                                height="315"
                                src="https://www.youtube.com/embed/ua-CiDNNj30?si=VFxNLgnYASg9w4ax"
                                title="YouTube video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div style={styles.videoCard}>
                            <h3 style={styles.videoTitle}>Getting Started with React</h3>
                            <iframe
                                style={styles.videoIframe}
                                width="100%"
                                height="315"
                                src="https://www.youtube.com/embed/SqcY0GlETPk?si=LejMrc0L4DueMB8E"
                                title="YouTube video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    dashboardContainer: {
        fontFamily: "'Arial', sans-serif",
        minHeight: "100vh",
        backgroundColor: "#1a1a2e", // Darker background for a sleek look
        color: "#fff",
        padding: "20px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
    },
    contentContainer: {
        margin: "0 auto",
        maxWidth: "900px",
        paddingTop: "40px", // Add space from top
    },
    welcomeText: {
        fontSize: "2.5em",
        color: "#FFFB00",
        fontWeight: "600",
        marginBottom: "20px",
    },
    aboutLMS: {
        fontSize: "1.2em",
        marginTop: "20px",
        color: "#e0e0e0",
        lineHeight: "1.6",
    },
    features: {
        fontSize: "1.1em",
        marginTop: "20px",
        color: "#e0e0e0",
        lineHeight: "1.6",
    },
    featureList: {
        textAlign: "left",
        paddingLeft: "20px",
        marginTop: "10px",
    },
    instructorSection: {
        marginTop: "40px",
    },
    sectionHeader: {
        fontSize: "2.2em",
        color: "#FFFB00",
        fontWeight: "600",
    },
    instructorText: {
        fontSize: "1.2em",
        color: "#e0e0e0",
        lineHeight: "1.6",
    },
    instructorCards: {
        paddingLeft:"40px",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
     
        marginTop: "20px",
    },
    instructorCard: {
        backgroundColor: "#2B4D99",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    instructorCardHover: {
        transform: "translateY(-10px)",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    },
    instructorName: {
        fontSize: "1.5em",
        color: "#FFFB00",
        fontWeight: "bold",
    },
    instructorRole: {
        fontSize: "1.1em",
        color: "#FFD700",
    },
    instructorBio: {
        fontSize: "1em",
        color: "#e0e0e0",
    },
    videoSection: {
        marginTop: "40px",
    },
    videoText: {
        fontSize: "1.2em",
        color: "#e0e0e0",
        lineHeight: "1.6",
    },
    videoCards: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
        gap: "20px",
        marginTop: "20px",
    },
    videoCard: {
        backgroundColor: "#2B4D99",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    videoTitle: {
        fontSize: "1.5em",
        color: "#FFFB00",
        marginBottom: "10px",
    },
    videoIframe: {
        borderRadius: "10px",
        maxWidth: "100%",
    },
};

export default StudentDashboard;
