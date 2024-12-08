import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import InstructorNavbar from '../components/InstructorNavbar';

const InstructorMyProfile = () => {
    const [instructorDetails, setInstructorDetails] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editInstructor, setEditInstructor] = useState(null);
    const email = localStorage.getItem("Useremail");

    const fetchInstructorDetails = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/instructors');
            const instructor = response.data.find(instructor => instructor.email === email);
            if (instructor) {
                setInstructorDetails(instructor);
                setEditInstructor(instructor);
            }
        } catch (error) {
            console.error("Error fetching instructor details:", error);
        }
    }, [email]);

    useEffect(() => {
        fetchInstructorDetails();
    }, [fetchInstructorDetails]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditInstructor({
            ...editInstructor,
            [name]: value,
        });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8080/instructors/${editInstructor.id}`, editInstructor);
            setEditMode(false);
            fetchInstructorDetails();
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating instructor:", error);
        }
    };

    return (
        <div>
            <InstructorNavbar />
            <div style={styles.container}>
                {instructorDetails ? (
                    <div style={styles.card}>
                        <h2 style={styles.header}>My Profile</h2>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Your ID:</label>
                            <p style={styles.text}>{instructorDetails.id}</p> {/* Displaying ID */}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Name:</label>
                            {editMode ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={editInstructor.name}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            ) : (
                                <p style={styles.text}>{instructorDetails.name}</p>
                            )}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email:</label>
                            <p style={styles.text}>{instructorDetails.email}</p>
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Password:</label>
                            {editMode ? (
                                <input
                                    type="password"
                                    name="password"
                                    value={editInstructor.password}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            ) : (
                                <p style={styles.text}>********</p>
                            )}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Phone:</label>
                            {editMode ? (
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={editInstructor.phoneNumber}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            ) : (
                                <p style={styles.text}>{instructorDetails.phoneNumber}</p>
                            )}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Department:</label>
                            {editMode ? (
                                <input
                                    type="text"
                                    name="department"
                                    value={editInstructor.department}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            ) : (
                                <p style={styles.text}>{instructorDetails.department}</p>
                            )}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Qualifications:</label>
                            {editMode ? (
                                <input
                                    type="text"
                                    name="qualifications"
                                    value={editInstructor.qualifications}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            ) : (
                                <p style={styles.text}>{instructorDetails.qualifications}</p>
                            )}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Description:</label>
                            {editMode ? (
                                <textarea
                                    name="description"
                                    value={editInstructor.description}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            ) : (
                                <p style={styles.text}>{instructorDetails.description}</p>
                            )}
                        </div>
                        {editMode ? (
                            <button onClick={handleUpdate} style={styles.buttonSave}>
                                Save Changes
                            </button>
                        ) : (
                            <button onClick={() => setEditMode(true)} style={styles.buttonEdit}>
                                Update Profile
                            </button>
                        )}
                    </div>
                ) : (
                    <p style={styles.message}>Loading profile details...</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    },
    card: {
        background: '#fff',
        borderRadius: '15px',
        padding: '30px',
        width: '100%',
        maxWidth: '600px',
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
        transition: '0.3s ease-in-out',
    },
    header: {
        textAlign: 'center',
        fontSize: '1.8rem',
        marginBottom: '20px',
        color: '#333',
        fontWeight: 'bold',
    },
    formGroup: {
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '10px',
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        boxSizing: 'border-box',
        transition: '0.3s ease-in-out',
        outline: 'none',
    },
    text: {
        padding: '10px',
        borderRadius: '8px',
        background: '#f9f9f9',
        border: '1px solid #ddd',
        color: '#555',
    },
    buttonEdit: {
        width: '100%',
        padding: '12px',
        background: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: '0.3s',
    },
    buttonSave: {
        width: '100%',
        padding: '12px',
        background: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: '0.3s',
    },
    message: {
        fontSize: '1.2rem',
        color: '#fff',
        textAlign: 'center',
    },
};

export default InstructorMyProfile;
