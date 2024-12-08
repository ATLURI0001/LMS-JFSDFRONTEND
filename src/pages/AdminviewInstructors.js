import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';

const AdminviewInstructors = () => {
    const [instructors, setInstructors] = useState([]);
    const [newInstructor, setNewInstructor] = useState({
        id: '',
        name: '',
        email: '',
        phoneNumber: '',
        department: '',
        qualifications: '',
        description: '',
        profilePictureUrl: '',
        password: '',
        isActive: true
    });

    // Fetch all instructors
    const fetchInstructors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/instructors');
            setInstructors(response.data);
        } catch (error) {
            console.error("Error fetching instructors:", error);
        }
    };

    // Validate Email and Phone Number
    const validateFields = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const phoneRegex = /^\d{10}$/;

        if (!emailRegex.test(newInstructor.email)) {
            alert("Please enter a valid Gmail address."); 
            return false;
        }

        if (!phoneRegex.test(newInstructor.phoneNumber)) {
            alert("Phone number should be 10 digits long.");
            return false;
        }

        // Check for unique email and phone number
        const emailExists = instructors.some(
            (instructor) => instructor.email === newInstructor.email && instructor.id !== newInstructor.id
        );
        const phoneExists = instructors.some(
            (instructor) => instructor.phoneNumber === newInstructor.phoneNumber && instructor.id !== newInstructor.id
        );

        if (emailExists) {
            alert("Email is already in use.");
            return false;
        }

        if (phoneExists) {
            alert("Phone number is already in use.");
            return false;
        }

        return true;
    };

    // Handle adding an instructor
    const handleAddInstructor = async () => {
        if (!validateFields()) return;

        try {
            const instructorData = { ...newInstructor };
            delete instructorData.id; // Ensure 'id' is not sent in POST request
    
            const response = await axios.post('http://localhost:8080/instructors', instructorData);
            console.log(response); // Log the response
            setNewInstructor({
                id: '',
                name: '',
                email: '',
                phoneNumber: '',
                department: '',
                qualifications: '',
                description: '',
                profilePictureUrl: '',
                password: '', // Clear password after submission
                isActive: true
            });
            fetchInstructors(); // Reload instructors after adding
            alert('Instructor added successfully');
        } catch (error) {
            console.error("Error adding instructor:", error.response || error);
        }
    };

    // Handle deleting an instructor
    const handleDeleteInstructor = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/instructors/${id}`);
            fetchInstructors(); // Reload instructors after deletion
            alert('Instructor deleted successfully');
        } catch (error) {
            console.error("Error deleting instructor:", error);
        }
    };

    // Handle updating an instructor
    const handleUpdateInstructor = async (id) => {
        if (!validateFields()) return;

        try {
            const updatedInstructor = { ...newInstructor, id };
            await axios.put(`http://localhost:8080/instructors/${id}`, updatedInstructor);
            fetchInstructors(); // Reload instructors after update
            setNewInstructor({
                id: '',
                name: '',
                email: '',
                phoneNumber: '',
                department: '',
                qualifications: '',
                description: '',
                profilePictureUrl: '',
                password: '', // Clear password after update
                isActive: true
            });
            alert('Instructor updated successfully');
        } catch (error) {
            console.error("Error updating instructor:", error);
        }
    };

    // Prefill the fields when an instructor is selected for updating
    const handleEditInstructor = (instructor) => {
        setNewInstructor(instructor);
    };

    // Fetch instructors on component mount
    useEffect(() => {
        fetchInstructors();
    }, []);

    return (
        <div>
            <AdminNavbar />
            <div style={styles.container}>
                <h2 style={styles.header}>Register Instructor</h2>

                {/* Add/Update Instructor Form */}
                <div style={styles.formContainer}>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Name"
                        value={newInstructor.name}
                        onChange={(e) => setNewInstructor({ ...newInstructor, name: e.target.value })}
                    />
                    <input
                        style={styles.input}
                        type="email"
                        placeholder="Email"
                        value={newInstructor.email}
                        onChange={(e) => setNewInstructor({ ...newInstructor, email: e.target.value })}
                    />
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Phone Number"
                        value={newInstructor.phoneNumber}
                        onChange={(e) => setNewInstructor({ ...newInstructor, phoneNumber: e.target.value })}
                    />
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Department"
                        value={newInstructor.department}
                        onChange={(e) => setNewInstructor({ ...newInstructor, department: e.target.value })}
                    />
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Qualifications"
                        value={newInstructor.qualifications}
                        onChange={(e) => setNewInstructor({ ...newInstructor, qualifications: e.target.value })}
                    />
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Description"
                        value={newInstructor.description}
                        onChange={(e) => setNewInstructor({ ...newInstructor, description: e.target.value })}
                    />
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Profile Picture URL"
                        value={newInstructor.profilePictureUrl}
                        onChange={(e) => setNewInstructor({ ...newInstructor, profilePictureUrl: e.target.value })}
                    />
                    <input
                        style={styles.input}
                        type="password"  // Add password input field
                        placeholder="Password"
                        value={newInstructor.password}
                        onChange={(e) => setNewInstructor({ ...newInstructor, password: e.target.value })}
                    />
                    <button style={styles.button} onClick={newInstructor.id ? () => handleUpdateInstructor(newInstructor.id) : handleAddInstructor}>
                        {newInstructor.id ? 'Update Instructor' : 'Add Instructor'}
                    </button>
                </div>

                {/* Display all instructors in a table */}
                <h2 style={styles.header}>Instructors List</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Phone Number</th>
                            <th style={styles.th}>Department</th>
                            <th style={styles.th}>Qualifications</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instructors.map((instructor) => (
                            <tr key={instructor.id} style={styles.row}>
                                <td style={styles.td}>{instructor.name}</td>
                                <td style={styles.td}>{instructor.email}</td>
                                <td style={styles.td}>{instructor.phoneNumber}</td>
                                <td style={styles.td}>{instructor.department}</td>
                                <td style={styles.td}>{instructor.qualifications}</td>
                                <td style={styles.actions}>
                                    <button
                                        style={styles.updateButton}
                                        onClick={() => handleEditInstructor(instructor)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        style={styles.deleteButton}
                                        onClick={() => handleDeleteInstructor(instructor.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    container: { backgroundColor: '#333', color: 'white', padding: '20px', borderRadius: '8px', margin: '20px' },
    header: { textAlign: 'center', color: '#f0f0f0' },
    formContainer: { marginTop: '20px', marginBottom: '20px' },
    input: { margin: '5px', padding: '10px', borderRadius: '4px', border: '1px solid #fff', width: '250px', backgroundColor: '#444', color: '#fff' },
    button: { margin: '5px', padding: '10px 15px', borderRadius: '4px', border: 'none', backgroundColor: '#2980b9', color: 'white', cursor: 'pointer' },
    table: {
        width: '100%',
        borderCollapse: 'collapse',  // Ensures borders are shared between adjacent cells
        marginTop: '20px',
    },
    th: {
        padding: '12px 15px',
        backgroundColor: '#444',
        textAlign: 'left',
        border: '1px solid #ccc',  // Add border for each header cell
    },
    td: {
        padding: '12px 15px',
        textAlign: 'left',
        border: '1px solid #ccc',  // Add border for each table cell
    },
    row: { transition: 'background-color 0.3s' },
    actions: { padding: '5px', border: '1px solid #ccc' },  // Make actions column behave like the other cells
    updateButton: { backgroundColor: '#f39c12', color: 'white', border: '1px solid #ccc', padding: '5px 10px', cursor: 'pointer' },
    deleteButton: { backgroundColor: '#e74c3c', color: 'white', border: '1px solid #ccc', padding: '5px 10px', cursor: 'pointer' },
};

export default AdminviewInstructors;
