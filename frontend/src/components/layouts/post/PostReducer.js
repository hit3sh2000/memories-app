import {
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  SET_CURRENT_POST,
  CLEAR_CURRENT_POST,
  GET_POST,
  FILTER_POST,
  CLEAR_FILTER_POST,
  GET_POSTBYUSER,
  LIKE
} from "../auth/action";
export default (state, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false,
      };
      case GET_POST:
          {
          return{
              ...state,
              posts:action.payload,
              loading:false
          }
      }
      case GET_POSTBYUSER:
          {
          return{
              ...state,
              posts:action.payload,
              loading:false
          }
      }
      case DELETE_POST:
          return{
              ...state,
              posts:state.posts.filter(post => post._id !== action.payload),
              loading:false
          }
      case SET_CURRENT_POST:
          return{
              ...state,
              current:action.payload
          }   
      case CLEAR_CURRENT_POST:
          return{
              ...state,
              current:null
          }   
       case UPDATE_POST:
        return {
            ...state,
            posts:state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
        }
        case LIKE:
      return{
          ...state,
        posts:state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
      }
      case FILTER_POST:
        return{
          ...state,
          filtered:state.posts.filter(post => {
            const regex=new RegExp(`${action.payload}`, `gi`);
            return post.name.match(regex) || post.title.match(regex)
          })
        }
        case CLEAR_FILTER_POST:
          return{
            ...state,
            filtered:null
          }
    default:
      return state;
  }
};
