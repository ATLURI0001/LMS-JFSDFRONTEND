import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast
import '../Navbar.css';

const InstructorNavbar = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName"); // Get the logged-in user's name

    const handleLogout = () => {
        localStorage.clear(); // Clear session data
        toast.success("Logged out successfully!"); // Show toast message
        
        // Delay navigation to allow toast to appear
        setTimeout(() => {
            navigate("/login"); // Redirect to the login page
        }, 1000); // Delay by 1 second (1000 milliseconds)
    };
    const myprofilebuton2 = () => {
        
        
        // Delay navigation to allow toast to appear
      
            navigate("/instructor-profile"); // Redirect to the login page
       // Delay by 1 second (1000 milliseconds)
    };




    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/instructor-dashboard">Dashboard</Link>
                <Link to="/instructor-courses">Manage Courses</Link>
                <Link to="/instructor-profile">My Profile</Link>
            </div>
            <div className="profile-section">
                <div className="profile-icon" onClick={() => document.getElementById('profile-dropdown').classList.toggle('show')}>
                    {userName ? userName.charAt(0).toUpperCase() : "U"} {/* First letter of the name */}
                </div>
                <div id="profile-dropdown" className="dropdown-content">
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                    <button onClick={myprofilebuton2} className="logout-button">MY Profile</button>
                </div>
            </div>
            <ToastContainer /> {/* Toast container for displaying toasts */}
        </nav>
    );
};

export default InstructorNavbar;
