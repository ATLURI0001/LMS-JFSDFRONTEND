import React from 'react';
import error1 from '../images/error1.jpg';

function NewErr() {
  return (
    <div style={styles.container}>
      <div style={styles.messageContainer}>
        <h1 style={styles.heading}>Oops! Page Not Found</h1>
        <p style={styles.text}>The page you are looking for might have been moved, deleted, or does not exist. But don't worry, let's get you back on track!</p>
        <img style={styles.image} alt="error404 go back" src={error1} />
        <a href="/" style={styles.button}>Go Back Home</a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f9f9f9',
    padding: '20px',
    textAlign: 'center',
  },
  messageContainer: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  text: {
    fontSize: '1.1rem',
    color: '#555',
    marginBottom: '20px',
  },
  image: {
    maxWidth: '100%',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: '0.3s ease-in-out',
    display: 'inline-block',
  },
};

export default NewErr;
