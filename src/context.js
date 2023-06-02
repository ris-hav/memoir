import React, { useState, useContext,useEffect } from "react";



const AppContext = React.createContext();

const getLocalStorage1 = () => {
    let check = localStorage.getItem("check");
    if (check) {
      return JSON.parse(localStorage.getItem("check"));
    } else {
      return [];
    }
  };

const AppProvider = ({ children }) => {
  const [checkedItems, setCheckedItems] = useState(getLocalStorage1());
  useEffect(() => {
    localStorage.setItem("check", JSON.stringify(checkedItems));
  }, [checkedItems]);
  return (
    <AppContext.Provider
      value={{
        checkedItems,
        setCheckedItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
