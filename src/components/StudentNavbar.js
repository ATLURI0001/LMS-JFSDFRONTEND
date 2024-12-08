import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Navbar.css';

const StudentNavbar = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName"); // Get the logged-in user's name
    const [selectedFiles, setSelectedFiles] = useState(null); // Track selected files

    const handleLogout = () => {
        localStorage.clear(); // Clear session data
        toast.success("Logged out successfully!"); // Show toast message
        
        // Delay navigation to allow toast to appear
        setTimeout(() => {
            navigate("/login"); // Redirect to the login page
        }, 1000); // Delay by 1 second (1000 milliseconds)
    };

    const myprofilebut = () => {
        navigate("/myprofile"); // Redirect to the profile page
    };

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const handleFileUpload = async () => {
        if (!selectedFiles || selectedFiles.length === 0) {
            toast.warning("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("files[]", selectedFiles[i]); // Append files
        }

        try {
            const response = await fetch("https://example.com/upload", { // Replace with your upload endpoint
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                toast.success("File uploaded successfully!");
                setSelectedFiles(null); // Reset file input
            } else {
                toast.error("Failed to upload file.");
            }
        } catch (error) {
            toast.error("An error occurred while uploading.");
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/student-dashboard">Dashboard</Link>
                <Link to="/student-register-course">Explore Courses</Link>
                <Link to="/student-courses">Your Courses</Link>
                <Link to="/Course-Material">Course Material</Link>
                <Link to="/myprofile">My Profile</Link>
            </div>
            <div className="profile-section">
                <div className="profile-icon" onClick={() => document.getElementById('profile-dropdown').classList.toggle('show')}>
                    {userName ? userName.charAt(0).toUpperCase() : "U"} {/* First letter of the name */}
                </div>
                <div id="profile-dropdown" className="dropdown-content">
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                    <button onClick={myprofilebut} className="logout-button">My Profile</button>
                </div>
            </div>
            <div className="file-upload-section">
                <input 
                    type="file" 
                    id="fileInput" 
                    multiple 
                    onChange={handleFileChange} 
                    style={{ display: "none" }}
                />
                <label htmlFor="fileInput" className="upload-label">Select Files</label>
                <button onClick={handleFileUpload} className="upload-button">Upload</button>
            </div>
            <ToastContainer /> {/* Toast container for displaying toasts */}
        </nav>
    );
};

export default StudentNavbar;
