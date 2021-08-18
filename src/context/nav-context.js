import React from "react";
import { useState } from "react";

const NavContext = React.createContext({});

export const NavContextProvider = (props) => {
  const [page, setPage] = useState("food");
  const contextValue = {
    page,
    setPage,
  };
  return <NavContext.Provider value={contextValue}>{props.children}</NavContext.Provider>;
};

export default NavContext;
