import React, { useReducer, PropsWithChildren } from "react";
import Context, { initialState } from "./store";
import { reducer } from "./reducer";

const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default UserProvider;
