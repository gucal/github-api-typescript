export function reducer(state: any, action: any) {
  switch (action.type) {
    case 'PENDING':
      state.userError = false
      state.isLoading = true
      return { ...state }
    case 'SET_USER_INFO':
      state.userInfo = action.payload
      return { ...state }
    case 'SET_USER_REPOSITORIES':
      state.userRepositories = action.payload
      return { ...state }
    case 'SET_USER_ALL_LANGUAGES':
      state.userAllLanguages = action.payload
      return { ...state }
    case 'SET_USER_TOGETHER_LANGUAGES':
      state.userTogetherLanguages = action.payload
      return { ...state }
    case 'USER_NOT_DEFINED':
      state.userError = true
      state.isLoading = false
      return { ...state }
    case 'COMPLETED':
      state.isLoading = false
      return { ...state }
    case 'RESET':
      state.isLoading = false
      state.userInfo = {}
      state.userRepositories = []
      state.userAllLanguages = []
      state.userTogetherLanguages = []
      state.userError = false
      return { ...state }
    default:
      return state
  }
}
