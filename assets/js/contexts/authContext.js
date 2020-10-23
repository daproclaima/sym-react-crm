import React from 'react';
// here we define like a shape or interface our context
export default React.createContext({
    isAuthenticated: false,
    setIsAuthenticated: (value) => {}
})