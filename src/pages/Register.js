import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation
import '../Page.css';
import MainNavbar from "../components/MainNavbar";

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/registernew", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            // Log the response or use it as needed
            console.log("Registration Response:", response.data);

            toast.success("Registration successful!");

            // Reset form fields
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            // Redirect to /login page after a short delay to allow the toast message to display
            setTimeout(() => {
                navigate("/login");
            }, 2000); // 2 seconds delay
        } catch (error) {
            setErrorMessage(error.response ? error.response.data : "Registration error");
            toast.error(errorMessage || "Registration error");
        }
    };

    return (
        <div>
            <MainNavbar />
            <div className="form-container">
                <h2>Register</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                    <label>Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <label>Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                    <label>Confirm Password:</label>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        required 
                    />
                    <button type="submit">Register</button>
                </form>  
            </div>
            <ToastContainer /> {/* Toast container for displaying messages */}
        </div>
    );
};

export default Register;
