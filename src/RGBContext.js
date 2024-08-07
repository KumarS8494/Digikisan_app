import React, { createContext, useState, useContext } from 'react';

const RGBContext = createContext();

export const RGBProvider = ({ children }) => {
  const [rgbValues, setRgbValues] = useState({ R: 0, G: 0, B: 0 });

  return (
    <RGBContext.Provider value={{ rgbValues, setRgbValues }}>
      {children}
    </RGBContext.Provider>
  );
};

export const useRGB = () => {
  return useContext(RGBContext);
};
