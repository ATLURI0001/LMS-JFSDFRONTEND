import React from "react";
import MainNavbar from "../components/MainNavbar";
import d1 from "../images/d1.jpg";
import d2 from "../images/d2.jpg";
import d3 from "../images/d3.jpg";
const developers = [
    {
        id: "2200090020",
        name: "KESAVA CHITTINENI",
        role: "Team Lead",
        accomplishments: "Led the team and ensured project milestones were met. Oversaw project architecture and guided developers in React, Spring Boot, and database design.",
        image: d1,
    },
    {
        id: "2200031828",
        name: "RAMPRASAD ATLURI",
        role: "Full Stack Developer",
        accomplishments: "Developed core features using React for the frontend and Spring Boot for the backend. Contributed to LMS architecture and integrated various functionalities.",
        image:d2,
    },
    {
        id: "2200030301",
        name: "POTHULA HEMANTH",
        role: "Backend Developer",
        accomplishments: "Worked extensively on Spring Boot, API development, and integrating MySQL database for the LMS backend. Developed the admin and instructor features.",
        image: d3,
    },
];

const DeveloperProfilesPage = () => {
    return (
        <div>
            <MainNavbar />
            <div style={styles.pageContainer}>
                <h2 style={styles.header}>Meet the LMS Development Team</h2>
                <div style={styles.profileContainer}>
                    {developers.map(dev => (
                        <div style={styles.profileCard} key={dev.id}>
                            <img src={dev.image} alt={dev.name} style={styles.profileImage} />
                            <div style={styles.profileInfo}>
                                <h3 style={styles.name}>{dev.name}</h3>
                                <p style={styles.role}>{dev.role}</p>
                                <p style={styles.accomplishments}>{dev.accomplishments}</p>
                                <p style={styles.profileId}>ID: {dev.id}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif',
       
        minHeight: '100vh',
    },
    header: {
        fontSize: '36px',
        color: '#fff',
        marginBottom: '40px',
        textAlign: 'center',
        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    },
    profileContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '30px',
        width: '100%',
        maxWidth: '1200px',
        padding: '0 20px',
    },
    profileCard: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '20px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
    },
    profileCardHover: {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
    profileImage: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '20px',
        border: '5px solid #2980b9',
        transition: 'all 0.3s ease',
    },
    profileImageHover: {
        transform: 'scale(1.1)',
    },
    profileInfo: {
        color: '#333',
        fontSize: '16px',
    },
    name: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#2980b9',
        marginBottom: '10px',
    },
    role: {
        fontSize: '18px',
        color: '#2ecc71',
        marginBottom: '10px',
    },
    accomplishments: {
        fontSize: '16px',
        color: '#7f8c8d',
        marginBottom: '15px',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    profileId: {
        fontSize: '14px',
        color: '#bdc3c7',
    },
    profileCardWrapper: {
        display: 'flex',
        justifyContent: 'center',
    }
};

export default DeveloperProfilesPage;
