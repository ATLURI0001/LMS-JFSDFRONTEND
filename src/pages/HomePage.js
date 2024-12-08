import React from "react";
import MainNavbar from "../components/MainNavbar";
import './HomePage.css';
import image from '../images/image.png';

const HomePage = () => {
    const staticCourses = [
        {
            id: 1,
            title: 'React Basics',
            description: 'Learn the fundamentals of React and build your first web app.',
            url: 'https://www.youtube.com/embed/w7ejDZ8SWv8'
        },
        {
            id: 2,
            title: 'Spring Boot Essentials',
            description: 'Master the essentials of Spring Boot and create powerful backend services.',
            url: 'https://www.youtube.com/embed/35EQXmHKZYs'
        },
        {
            id: 3,
            title: 'MySQL Database Management',
            description: 'Understand database fundamentals and manage data effectively with MySQL.',
            url: 'https://www.youtube.com/embed/7S_tz1z_5bA'
        },
        {
            id: 4,
            title: 'JavaScript ES6 Features',
            description: 'Dive deep into modern JavaScript and learn the latest features from ES6 and beyond.',
            url: 'https://www.youtube.com/embed/NCwa_xi0Uuc'
        },
        {
            id: 5,
            title: 'Docker Basics',
            description: 'Learn how to containerize applications using Docker, an essential DevOps tool.',
            url: 'https://www.youtube.com/embed/fqMOX6JJhGo'
        },
    ];

    return (
        <div>
            <MainNavbar />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-text">
                    <h1>Welcome to the Learning Management System</h1>
                    <p>Your gateway to an advanced learning experience. Manage courses, track progress, and more!</p>
                    <a href="/login" className="cta-button">Get Started</a>
                </div>
                <div className="hero-image">
                    <img src={image} alt="LMS Hero" />
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2>Why Choose Our LMS?</h2>
                <div className="features">
                    <div className="feature-card">
                        <h3>Interactive Learning</h3>
                        <p>Engage with interactive course content and quizzes that improve retention.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Real-time Analytics</h3>
                        <p>Track your learning progress and get insights into areas of improvement.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Role-based Access</h3>
                        <p>Admin, Instructor, Student, and Content Creator roles offer tailored dashboards and functionalities.</p>
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section className="course-cards-section">
                <h2>Explore Our Courses</h2>
                <div className="course-cards">
                    {staticCourses.map(course => (
                        <div className="course-card" key={course.id}>
                            <h3>{course.title}</h3>
                            <iframe
                                width="560"
                                height="315"
                                src={course.url}
                                title={course.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <p>{course.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <h2>What Our Users Say</h2>
                <div className="testimonials">
                    <div className="testimonial">
                        <p>"The LMS has helped me track my progress and manage my learning much better!"</p>
                        <h4>- Anirudh, Student</h4>
                    </div>
                    <div className="testimonial">
                        <p>"Creating courses and interacting with students has never been easier!"</p>
                        <h4>- S.S Thaman, Instructor</h4>
                    </div>
                </div>
            </section>

            {/* Login Reminder Section */}
            <section className="login-reminder">
                <center>
                    <h3>
                        <a href="/login" style={{ color: 'grey' }}>Please login to access the content.</a>
                    </h3>
                </center>
            </section>
        </div>
    );
};

export default HomePage;
