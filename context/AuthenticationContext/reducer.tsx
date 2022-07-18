export function reducer(state: any, action: any) {
    switch (action.type) {
      case "LOGIN":
        state.isLogin = true;
        return { ...state };
      case "LOGOUT":
        state.isLogin = false;
        return { ...state };
      default:
        return state;
    }
  }
  