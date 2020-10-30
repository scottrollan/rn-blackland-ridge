import React, { createContext } from 'react';

const UserContext = createContext();

const thisUser = { name: 'Barry Rollan' };

export const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider value={thisUser}>{children}</UserContext.Provider>
  );
};

export default UserContext;
