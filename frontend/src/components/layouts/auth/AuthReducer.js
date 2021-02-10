import {
  REGISTER_USER,
  LOAD_USER,
  LOGIN_USER,
  LOGOUT,
  REGISTRATION_FAILED,
  LOGIN_FAILED,
} from "./action";

export default (state, action)=>  {
  switch (action.type) {
    case REGISTER_USER:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("id", action.payload.data._id);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        user: action.payload.data,
      };
    case LOGIN_USER:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("id", action.payload.user._id);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
      };
    case REGISTRATION_FAILED:
    case LOGIN_FAILED:
    case LOGOUT:
      localStorage.clear();
      console.log(localStorage);
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: true,
        user: null,
        error: action.payload,
      };
    case LOAD_USER: {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      }
    }
    default:
      return {
        ...state,
      };
  }
};
