export function reducer(state: any, action: any) {
  switch (action.type) {
    case "PENDING":
      state.isLoading = true;
      return { ...state };
    case "SET_USER_INFO":
      state.userInfo = action.payload;
      return { ...state };
    case "SET_USER_REPOSITORIES":
      state.userRepositories = action.payload;
      return { ...state };
    case "SET_USER_ALL_LANGUAGES":
      state.userAllLanguages = action.payload;
      return { ...state };
    case "COMPLETED":
      state.isLoading = false;
      return { ...state };
    default:
      return state;
  }
}
