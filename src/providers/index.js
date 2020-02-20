import React, { useState } from 'react';
import { AppContext } from '../contexts';

const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const value = {
    userData,
    setUserData
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
