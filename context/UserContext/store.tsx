import { createContext } from "react";

type InitialStateType = {
  isLoading: boolean;
  userInfo: object;
  userRepositories: object[];
  userAllLanguages: object[];
};

export const initialState = {
  isLoading: false,
  userInfo: {},
  userRepositories: [],
  userAllLanguages: [],
};

const UserContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export default UserContext;
