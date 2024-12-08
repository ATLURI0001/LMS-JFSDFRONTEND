import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';

const ManageCourses = () => {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({ name: '', description: '' });
    const [editMode, setEditMode] = useState(false);
    const [currentCourseId, setCurrentCourseId] = useState(null);

    // Fetch courses when component mounts
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/courses');
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const handleCreateCourse = async () => {
        if (!newCourse.name || !newCourse.description) return alert("Please fill in all fields");

        try {
            const response = await axios.post('http://localhost:8080/api/courses', newCourse);
            setCourses(prevCourses => [...prevCourses, response.data]);
            setNewCourse({ name: '', description: '' });
        } catch (error) {
            console.error("Error creating course:", error);
        }
    };

    const handleUpdateCourse = async () => {
        if (!newCourse.name || !newCourse.description) return alert("Please fill in all fields");

        try {
            const response = await axios.put(`http://localhost:8080/api/courses/${currentCourseId}`, newCourse);
            setCourses(prevCourses =>
                prevCourses.map(course => (course.id === currentCourseId ? response.data : course))
            );
            setNewCourse({ name: '', description: '' });
            setEditMode(false);
            setCurrentCourseId(null);
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    const handleEditClick = (course) => {
        setEditMode(true);
        setNewCourse({ name: course.name, description: course.description });
        setCurrentCourseId(course.id);
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            await axios.delete(`http://localhost:8080/api/courses/${courseId}`);
            setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    return (
        <div>
            <AdminNavbar />
            <div style={styles.container}>
                <h2 style={styles.header}>Manage Courses</h2>

                <div style={styles.formContainer}>
                    <h3>{editMode ? "Edit Course" : "Create Course"}</h3>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Course Name"
                        value={newCourse.name}
                        onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    />
                    <textarea
                        style={styles.textarea} // Apply the textarea style
                        placeholder="Course Description"
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    />
                    <button style={styles.button} onClick={editMode ? handleUpdateCourse : handleCreateCourse}>
                        {editMode ? "Update Course" : "Create Course"}
                    </button>
                    {editMode && (
                        <button style={{ ...styles.button, backgroundColor: '#555' }} onClick={() => {
                            setEditMode(false);
                            setNewCourse({ name: '', description: '' });
                        }}>Cancel</button>
                    )}
                </div>

                <div style={styles.formContainer}>
                    <h3>Existing Courses</h3>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.tableHeader}>Course Name</th>
                                <th style={styles.tableHeader}>Course Description</th>
                                <th style={styles.tableHeader}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.length === 0 ? (
                                <tr><td colSpan="3">No courses available</td></tr>
                            ) : (
                                courses.map(course => (
                                    <tr key={course.id}>
                                        <td style={styles.tableCell}>{course.name}</td>
                                        <td style={styles.tableCell}>{course.description}</td> {/* Ensure text wrapping */}
                                        <td style={styles.tableCell}>
                                            <button style={styles.editButton} onClick={() => handleEditClick(course)}>Edit</button>
                                            <button style={styles.deleteButton} onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#333',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        margin: '20px',
    },
    header: {
        textAlign: 'center',
        color: '#f0f0f0',
        fontSize: '24px',
    },
    formContainer: {
        marginTop: '20px',
        marginBottom: '20px',
    },
    input: {
        margin: '5px',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #fff',
        width: '250px',
        backgroundColor: '#444',
        color: '#fff',
    },
    textarea: {
        margin: '5px',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #fff',
        width: '250px',
        height: '100px', // Ensure sufficient height for description
        backgroundColor: '#444',
        color: '#fff',
        resize: 'none', // Disable resizing to maintain consistent appearance
    },
    button: {
        margin: '5px',
        padding: '10px 15px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#2980b9',
        color: 'white',
        cursor: 'pointer',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    tableHeader: {
        padding: '12px 15px',
        borderBottom: '2px solid #ddd',
        backgroundColor: '#444',
        color: '#fff',
        textAlign: 'left',
        fontWeight: 'bold',
    },
    tableCell: {
        padding: '12px 15px',
        borderBottom: '1px solid #ddd',
        color: '#fff',
        textAlign: 'left',
        wordWrap: 'break-word', // Allow text to wrap in table cells
    },
    tableRow: {
        transition: 'background-color 0.3s ease',
    },
    tableRowHover: {
        backgroundColor: '#555',
    },
    editButton: {
        marginRight: '5px',
        padding: '6px 12px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#3498db',
        color: 'white',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
    },
    deleteButton: {
        padding: '6px 12px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#e74c3c',
        color: 'white',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
    },
};

export default ManageCourses;
