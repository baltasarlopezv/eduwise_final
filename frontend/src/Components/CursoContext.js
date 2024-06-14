import React, { createContext, useState } from 'react';

export const CursoContext = createContext();

export const CursoProvider = ({ children }) => {
  const [curso, setCurso] = useState(null);

  return (
    <CursoContext.Provider value={{ curso, setCurso }}>
      {children}
    </CursoContext.Provider>
  );
};

