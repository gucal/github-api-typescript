import { createContext } from "react";

type InitialStateType = {
  isLogin: boolean;
};

export const initialState = {
  isLogin: false,
};

const AuthContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export default AuthContext;
