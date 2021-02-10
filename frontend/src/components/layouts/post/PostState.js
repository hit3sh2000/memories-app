import React, { useReducer } from "react";
import PostContext from "./PostContext";
import PostReducer from "./PostReducer";
import axios from "axios";
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
  LIKE,
} from "../auth/action";

const PostState = (props) => {
  const initialState = {
    posts: [],
    current: null,
    filtered:null
  };
  const [state, dispatch] = useReducer(PostReducer, initialState);

  const AddPost = async (post) => {
    const config = {
      headers: {
        "Conten-Type": "application/json",
      },
    };
    try {
      await axios.post("/api/posts", post, config);
      dispatch({
        type: ADD_POST,
        payload: post,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const GetPost = async () => {
    const config = {
      headers: {
        "Conten-Type": "application/json",
      },
    };
    try {
      const res = await axios.get("/api/posts", config);
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const GetPostByUser = async (id) => {
    console.log(id);
    try {
      const res = await axios.get(`/api/posts/${id}`);
      console.log(res.data);
      dispatch({
        type: GET_POSTBYUSER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deletePost = async (_id) => {
    try {
      console.log(_id, "ahscjgasvcgav");
      await axios.delete(`/api/posts/${_id}`);
      dispatch({ type: DELETE_POST, payload: _id });
    } catch (error) {
      console.log(error);
    }
  };
  const setCurrent = (post) => {
    dispatch({ type: SET_CURRENT_POST, payload: post });
  };
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT_POST });
  };
  const updatePost = async (post) => {
    const config = {
      headers: {
        "Conten-Type": "application/json",
      },
    };
    try {
      console.log(post._id, "ahscjgasvcgav");
      const res = await axios.patch(`/api/posts/${post._id}`, post, config);
      dispatch({ type: UPDATE_POST, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
  const likePost = async (_id) => {
    const config = {
      headers: {
        "Conten-Type": "application/json",
      },
    };
    try {
      const res = await axios.patch(`/api/posts/${_id}/likePost`, config);
      dispatch({ type: LIKE, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
  const filterPost=(text)=>{
    dispatch({ type: FILTER_POST, payload: text });
  }
  const clearFilter=(text)=>{
    dispatch({ type: CLEAR_FILTER_POST, payload: text });
  }
  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        current: state.current,
        filtered:state.filtered,
        AddPost,
        GetPost,
        GetPostByUser,
        deletePost,
        setCurrent,
        clearCurrent,
        updatePost,
        likePost,
        filterPost,
        clearFilter
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
