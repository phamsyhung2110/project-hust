import React, { createContext, useContext, useState } from 'react';

const ActiveButtonContext = createContext();

const ActiveButtonProvider = ({ children }) => {
  const [activeButton, setActiveButton] = useState(2);

  return (
    <ActiveButtonContext.Provider 
        value={{ activeButton, setActiveButton }}>
        {children}
    </ActiveButtonContext.Provider>
  );

};

export const ButtonState = () => {
    useContext(ActiveButtonContext);
}
// export default ActiveButtonContext;
