import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalVar, setGlobalVar] = useState(() => {
    // Retrieve the initial value from localStorage, or set to default
    const storedValue = localStorage.getItem('globalVar');
    console.log('storedValue: ', storedValue);
    const convertVal = JSON.parse(storedValue);
    if (convertVal === 'Signup' || convertVal === 'Dashboard') {
      console.log('storedValue-f: ', storedValue);
      return JSON.parse(storedValue);
    } else {
      const initialValue = 'Signup'; // Set your desired initial value here
      localStorage.setItem('globalVar', JSON.stringify(initialValue));
      return initialValue;
    }
  });

  useEffect(() => {
    // Store globalVar in localStorage whenever it changes
    if (globalVar !== null) {
      localStorage.setItem('globalVar', JSON.stringify(globalVar));
      console.log('useEffect_globalVar: ', globalVar);
    }
  }, [globalVar]);

  return (
    <GlobalContext.Provider value={{ globalVar, setGlobalVar }}>
      {children}
    </GlobalContext.Provider>
  );
};
