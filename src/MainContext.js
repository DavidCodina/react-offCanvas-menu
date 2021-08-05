import React, { createContext, useContext } from 'react';


/* =========================================================================
                     
========================================================================= */


export const MainContext  = createContext({});
export const MainConsumer = MainContext.Consumer;


export const MainProvider = (props) => {
  return (
    <MainContext.Provider value={{}}>
      { props.children }
    </MainContext.Provider>
  );
};


export function useMainContext(){
  const value = useContext(MainContext);
  return value;
}

