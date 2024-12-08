// Before (React 17 and below):
// ReactDOM.render(<App />, document.getElementById('root'));

// After (React 18):
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
