import React from "react";
import '../pages/HomePage.css'; // Make sure to import the corresponding CSS file

const Footer = () => {
    return (
        <footer className="footer">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/login">Login</a></li>
            </ul>
        </footer>
    );
};

export default Footer;
