import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";
import "../cssfiles/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "STUDENT",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [userDetails, setUserDetails] = useState(null); // To store user details after successful login
  const [isTransitioning, setIsTransitioning] = useState(false); // To trigger transition animation
  const [timer, setTimer] = useState(60); // Timer state to track countdown
  const navigate = useNavigate();

  // Handle form data changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Email validation
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  // Send OTP to email
  const sendOtp = async (email) => {
    try {
      const response = await axios.post("http://localhost:8080/api/email/send-otp", { email });
      if (response.status === 200) {
        toast.success("OTP sent successfully to your email.");
        setOtpSent(true);
        setTimer(60); // Reset timer when OTP is sent
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = formData;

    if (!email || !validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!password) {
      toast.error("Password is required.");
      return;
    }
    if (!role) {
      toast.error("Please select a role.");
      return;
    }

    try {
      if (role === "ADMIN" && email === "admin@example.com" && password === "admin123") {
        localStorage.setItem("role", role);
        localStorage.setItem("token", "admin-token"); // Store a token for authentication
        toast.success("Successful Login!");
        navigate("/admin-dashboard");
      } else {
        const endpoint =
          role === "STUDENT"
            ? "http://localhost:8080/getregisterationdata"
            : "http://localhost:8080/instructors";
        const response = await axios.get(endpoint);
        const users = response.data;
        const user = users.find(
          (u) => u.email === email && u.password === password && u.role === role
        );

        if (user) {
          setUserDetails(user); // Store user details for later navigation
          toast.success("Login successful! Please verify OTP.");
          sendOtp(email); // Send OTP

          // Store the username in localStorage
          localStorage.setItem("userName", user.name);
          localStorage.setItem("Useremail", user.email); // Save email correctly
          // Store the username
          localStorage.setItem("token", "user-token"); // Store a token for authentication
        } else {
          toast.error("Invalid credentials or role mismatch.");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  // Handle OTP verification
  const handleOtpVerification = async () => {
    if (!userDetails) {
      toast.error("User details are not available. Please log in again.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/email/validate-otp", {
        email: formData.email,
        otp: parseInt(otp), // Ensure OTP is sent as an integer
      });

      if (response.data.success) {
        toast.success("OTP verified successfully!");

        // Trigger animation before navigation
        setIsTransitioning(true);

        // Delay navigation to dashboard after animation
        setTimeout(() => {
          // Navigate based on role
          if (userDetails.role === "STUDENT") {
            navigate("/student-dashboard");
          } else if (userDetails.role === "INSTRUCTOR") {
            navigate("/instructor-dashboard");
          } else if (userDetails.role === "ADMIN") {
            navigate("/admin-dashboard");
          } else {
            toast.error("Unknown role. Cannot navigate.");
          }
        }, 1000); // Wait for the fade-out animation to complete
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  // Timer countdown and page refresh logic
  useEffect(() => {
    let timerInterval = null;

    if (otpSent && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      toast.error("OTP timeout. Refreshing the page.");
      setTimeout(() => {
        window.location.reload(); // Refresh the page when the timer expires
      }, 3000); // Delay to show timeout message
    }

    return () => clearInterval(timerInterval);
  }, [otpSent, timer]);

  return (
    <div>
      <MainNavbar />
      <div className="login-container">
        <div className="image-section">
          <img src="path_to_your_image" alt="Login illustration" />
        </div>
        <div className="form-section">
          <h2>Login</h2>
          <center>
            <h3>Explore the Content</h3>
          </center>
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
            <label>Role:</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="STUDENT">Student</option>
              <option value="INSTRUCTOR">Instructor</option>
              <option value="ADMIN">Admin</option>
            </select>
            <button type="submit" disabled={otpSent}>
              Login
            </button>
          </form>
          {otpSent && (
            <div className={`otp-verification ${isTransitioning ? "fade-out" : ""}`}>
              <label>Enter OTP:</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
              />
              <button onClick={handleOtpVerification}>Verify OTP</button>
              <div>
                <span>Timer: {timer}s</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
