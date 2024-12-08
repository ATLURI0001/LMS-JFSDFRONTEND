import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import StudentNavbar from "../components/StudentNavbar";
import "../cssfiles/StudentCourses.css";

const StudentCourses = () => {
  const [studentDetails, setStudentDetails] = useState(null);
  const [assignedCourses, setAssignedCourses] = useState([]);

  // Fetch student details using localStorage email
  const fetchStudentDetails = useCallback(async () => {
    try {
      const email = localStorage.getItem("Useremail");
      const response = await axios.get("http://localhost:8080/getregisterationdata");
      const student = response.data.find((student) => student.email === email);
      if (student) {
        setStudentDetails(student);
        fetchAssignedCourses(student.id); // Fetch assigned courses using the student ID
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  }, []); // Empty dependency array ensures it's memoized

  // Fetch assigned courses for the student
  const fetchAssignedCourses = async (studentId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/assigned-courses/${studentId}`);
      setAssignedCourses(response.data);
    } catch (error) {
      console.error("Error fetching assigned courses:", error);
    }
  };

  useEffect(() => {
    fetchStudentDetails();
  }, [fetchStudentDetails]); // Add fetchStudentDetails to the dependency array

  return (
    <div>
      <StudentNavbar />
      <div className="student-courses-container">
        <h2 className="title">Assigned Courses</h2>
        {studentDetails && (
          <p className="student-info">
            Welcome, {studentDetails.name}! Here are your assigned courses:
          </p>
        )}
        {assignedCourses.length === 0 ? (
          <p>No courses assigned.</p>
        ) : (
          <div className="courses-card-container">
            {assignedCourses.map((course) => (
              <div className="course-card" key={course.id}>
                <h3 className="course-name">Course Name: {course.courseName}</h3>
                <p className="course-code">Course Code: {course.courseCode}</p>
                <p className="instructor-name">
                  Your Instructor: {course.instructorName}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCourses;
