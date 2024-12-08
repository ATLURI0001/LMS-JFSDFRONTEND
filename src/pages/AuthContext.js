import React, { createContext, useState, useContext } from "react";

// Create a context to hold authentication data
const AuthContext = createContext();

// Custom hook to access authentication state
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap around the app and provide context
export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // Role is initially null

  const login = (role) => {
    setUserRole(role); // Set the user role after login
  };

  const logout = () => {
    setUserRole(null); // Reset role on logout
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
