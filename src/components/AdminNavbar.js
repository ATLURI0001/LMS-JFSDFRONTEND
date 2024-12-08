import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast
import '../Navbar.css';

const AdminNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout actions (e.g., clear session data, etc.)
        localStorage.clear(); // Clear session storage
        
        toast.success("Logged out successfully!"); // Show toast message
        
        // Delay navigation to allow toast to appear
        setTimeout(() => {
            navigate("/login"); // Redirect to the login page
        }, 1000); // Delay by 1 second (1000 milliseconds)
    };

    return (
        <nav>
            <Link to="/admin-dashboard">Dashboard</Link>
            <Link to="/admin-view-students">Manage Students</Link>
            <Link to="/admin-view-instructors">Manage Instructors</Link>
            <Link to="/admin-manage-courses">Manage Courses</Link> 
            <Link to="/assign-courses">AssignCourses</Link>
             {/* New Link for course management */}
            {/* Additional Links */}
            <button onClick={handleLogout}>Logout</button>
            <ToastContainer /> {/* Toast container for displaying toasts */}
        </nav>
    );
};

export default AdminNavbar;
