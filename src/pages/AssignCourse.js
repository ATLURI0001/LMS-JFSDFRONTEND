import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';

const AssignCourse = () => {
    const [courses, setCourses] = useState([]);  // Holds courses data
    const [students, setStudents] = useState([]);  // Holds students data
    const [instructors, setInstructors] = useState([]);  // Holds instructors data
    const [assignedCourses, setAssignedCourses] = useState({
        studentId: '',
        studentName: '',
        instructorId: '',
        instructorName: '',
        courseId: '',  // Course will be selected from dropdown
        courseCode: '',  // Course code will be entered manually
        courseName: '',  // Store the selected course name
    });
    const [assignedCourseList, setAssignedCourseList] = useState([]); // Holds assigned course data
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch data from the backend
    useEffect(() => {
        fetchData();
        fetchAssignedCourses();  // Fetch already assigned courses when component loads
    }, []);

    const fetchData = async () => {
        try {
            const [courseRes, studentRes, instructorRes] = await Promise.all([
                axios.get('http://localhost:8080/api/courses'),
                axios.get('http://localhost:8080/getregisterationdata'),
                axios.get('http://localhost:8080/instructors'),
            ]);
            setCourses(courseRes.data);
            setStudents(studentRes.data);
            setInstructors(instructorRes.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    const fetchAssignedCourses = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/assigned-courses');
            setAssignedCourseList(res.data);  // Set the state with the list of assigned courses from the backend
        } catch (err) {
            console.error('Error fetching assigned courses:', err);
        }
    };

    const handleAssignCourses = async () => {
        console.log('Assigned Course:', assignedCourses);  // Log the assigned course details for debugging

        if (
            !assignedCourses.studentId ||
            !assignedCourses.instructorId ||
            !assignedCourses.courseId ||
            !assignedCourses.courseCode
        ) {
            setError('Please fill in all required fields.');
            setSuccessMessage('');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/assign-course', assignedCourses);

            if (response.status === 201 || response.status === 200) {
                setSuccessMessage('Course assigned successfully!');
                setAssignedCourses({
                    studentId: '',
                    studentName: '',
                    instructorId: '',
                    instructorName: '',
                    courseId: '',  // Clear the dropdown selection
                    courseCode: '',  // Clear the input field for course code
                    courseName: '',  // Clear course name field
                });
                setError('');
                fetchAssignedCourses();  // Refresh the list of assigned courses after successful assignment
            } else {
                setError('Failed to assign the course.');
                setSuccessMessage('');
            }
        } catch (err) {
            console.error('Error assigning course:', err);
            setError('Failed to assign the course.');
            setSuccessMessage('');
        }
    };

    const handleStudentChange = (e) => {
        const selectedStudentId = e.target.value;
        const selectedStudent = students.find((student) => String(student.id) === selectedStudentId);
        setAssignedCourses({
            ...assignedCourses,
            studentId: selectedStudentId,
            studentName: selectedStudent ? selectedStudent.name : '',
        });
    };

    const handleInstructorChange = (e) => {
        const selectedInstructorId = e.target.value;
        const selectedInstructor = instructors.find((instructor) => String(instructor.id) === selectedInstructorId);
        setAssignedCourses({
            ...assignedCourses,
            instructorId: selectedInstructorId,
            instructorName: selectedInstructor ? selectedInstructor.name : '',
        });
    };

    const handleCourseChange = (e) => {
        const selectedCourseId = e.target.value;
        const selectedCourse = courses.find((course) => String(course.id) === selectedCourseId);
        setAssignedCourses({
            ...assignedCourses,
            courseId: selectedCourseId,
            courseCode: selectedCourse ? selectedCourse.courseCode : '',  // Auto-fill the course code if course selected
            courseName: selectedCourse ? selectedCourse.name : '', // Ensure course name is set
        });
    };

    const handleCourseCodeChange = (e) => {
        const selectedCourseCode = e.target.value;
        setAssignedCourses({
            ...assignedCourses,
            courseCode: selectedCourseCode,  // Update courseCode with input value
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/assigned-courses/${id}`);
            setSuccessMessage('Assigned course deleted successfully!');
            fetchAssignedCourses(); // Refresh the list after deletion
        } catch (err) {
            console.error('Error deleting course:', err);
            setError('Failed to delete the assigned course.');
        }
    };

    return (
        <div style={{ minHeight: '100vh' }}>
            <AdminNavbar />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2 style={{ color: 'white' }}>Assign Courses</h2>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

                <div style={{ margin: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
                    <label>Student:</label>
                    <select
                        value={assignedCourses.studentId}
                        onChange={handleStudentChange}
                        style={{ margin: '10px', padding: '8px', borderRadius: '4px' }}
                    >
                        <option value="">Select Student</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.name}
                            </option>
                        ))}
                    </select>

                    <label>Instructor:</label>
                    <select
                        value={assignedCourses.instructorId}
                        onChange={handleInstructorChange}
                        style={{ margin: '10px', padding: '8px', borderRadius: '4px' }}
                    >
                        <option value="">Select Instructor</option>
                        {instructors.map((instructor) => (
                            <option key={instructor.id} value={instructor.id}>
                                {instructor.name}
                            </option>
                        ))}
                    </select>

                    <label>Course:</label>
                    <select
                        value={assignedCourses.courseId}
                        onChange={handleCourseChange}
                        style={{ margin: '10px', padding: '8px', borderRadius: '4px' }}
                    >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.name}
                            </option>
                        ))}
                    </select>

                    <label>Course Code:</label>
                    <input
                        type="text"
                        value={assignedCourses.courseCode}
                        onChange={handleCourseCodeChange}
                        placeholder="Enter Course Code"
                        style={{ margin: '10px', padding: '8px', borderRadius: '4px' }}
                    />

                    <button
                        onClick={handleAssignCourses}
                        style={{
                            padding: '10px 20px',
                            marginTop: '15px',
                            backgroundColor: 'green',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Assign Course
                    </button>
                </div>

                {/* Display assigned courses in table */}
                <div style={{ marginTop: '40px' }}>
                    <h3 style={{ color: 'white' }}>Assigned Courses</h3>
                    <table
                        style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            marginTop: '20px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
                                <th style={{color:'white', padding: '10px', border: '1px solid #ddd' }}>Student ID</th>
                                <th style={{color:'white', padding: '10px', border: '1px solid #ddd' }}>Student Name</th>
                                <th style={{color:'white', padding: '10px', border: '1px solid #ddd' }}>Instructor ID</th>
                                <th style={{ color:'white',padding: '10px', border: '1px solid #ddd' }}>Instructor Name</th>
                                <th style={{color:'white', padding: '10px', border: '1px solid #ddd' }}>Course Name</th>
                                <th style={{color:'white', padding: '10px', border: '1px solid #ddd' }}>Course Code</th>
                                <th style={{ color:'white',padding: '10px', border: '1px solid #ddd' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignedCourseList.map((assignedCourse) => (
                                <tr key={assignedCourse.id}>
                                    <td style={{color:'white', padding: '10px', border: '1px solid #ddd' }}>
                                        {assignedCourse.studentId}
                                    </td>
                                    <td style={{color:'white', padding: '10px', border: '1px solid #ddd' }}>
                                        {assignedCourse.studentName}
                                    </td>
                                    <td style={{color:'white', padding: '10px', border: '1px solid #ddd' }}>
                                        {assignedCourse.instructorId}
                                    </td>
                                    <td style={{color:'white', padding: '10px', border: '1px solid #ddd' }}>
                                        {assignedCourse.instructorName}
                                    </td>
                                    <td style={{color:'white', padding: '10px', border: '1px solid #ddd' }}>
                                        {assignedCourse.courseName}
                                    </td>
                                    <td style={{color:'white', padding: '10px', border: '1px solid #ddd' }}>
                                        {assignedCourse.courseCode}
                                    </td>
                                    <td style={{color:'white', padding: '10px', border: '1px solid #ddd' }}>
                                        <button
                                            onClick={() => handleDelete(assignedCourse.id)}
                                            style={{
                                                backgroundColor: 'red',
                                                color: 'white',
                                                border: 'none',
                                                padding: '6px 12px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                            }}
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
        </div>
    );
};

export default AssignCourse;
