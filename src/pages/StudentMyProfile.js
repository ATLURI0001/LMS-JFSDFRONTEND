import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import StudentNavbar from '../components/StudentNavbar';

const StudentMyProfile = () => {
    const [studentDetails, setStudentDetails] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editStudent, setEditStudent] = useState(null);
    const email = localStorage.getItem("Useremail");

    const fetchStudentDetails = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/getregisterationdata');
            const student = response.data.find(student => student.email === email);
            if (student) {
                setStudentDetails(student);
                setEditStudent(student);
            }
        } catch (error) {
            console.error("Error fetching student details:", error);
        }
    }, [email]);

    useEffect(() => {
        fetchStudentDetails();
    }, [fetchStudentDetails]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditStudent({
            ...editStudent,
            [name]: value,
        });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8080/updateuser/${editStudent.id}`, editStudent);
            setEditMode(false);
            fetchStudentDetails();
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

    return (
        <div>
            <StudentNavbar />
            <div style={styles.container}>
                {studentDetails ? (
                    <div style={styles.card}>
                        <h2 style={styles.header}>My Profile</h2>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Your ID:</label>
                            <p style={styles.text}>{studentDetails.id}</p> {/* Displaying ID */}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Name:</label>
                            {editMode ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={editStudent.name}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            ) : (
                                <p style={styles.text}>{studentDetails.name}</p>
                            )}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email:</label>
                            <p style={styles.text}>{studentDetails.email}</p>
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Password:</label>
                            {editMode ? (
                                <input
                                    type="password"
                                    name="password"
                                    value={editStudent.password}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            ) : (
                                <p style={styles.text}>********</p>
                            )}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Date of Birth:</label>
                            {editMode ? (
                                <input
                                    type="date"
                                    name="dob"
                                    value={editStudent.dob}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            ) : (
                                <p style={styles.text}>{studentDetails.dob}</p>
                            )}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Phone:</label>
                            {editMode ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={editStudent.phone}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            ) : (
                                <p style={styles.text}>{studentDetails.phone}</p>
                            )}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Address:</label>
                            {editMode ? (
                                <input
                                    type="text"
                                    name="address"
                                    value={editStudent.address}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                />
                            ) : (
                                <p style={styles.text}>{studentDetails.address}</p>
                            )}
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Gender:</label>
                            {editMode ? (
                                <select
                                    name="gender"
                                    value={editStudent.gender}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            ) : (
                                <p style={styles.text}>{studentDetails.gender}</p>
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

export default StudentMyProfile;
