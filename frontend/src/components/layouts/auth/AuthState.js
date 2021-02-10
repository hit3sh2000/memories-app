import React,{useReducer} from 'react'
import axios from 'axios'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import AuthToken from './AuthToken'


import {
    REGISTER_USER,
    LOAD_USER,
    LOGIN_USER,
    LOGOUT,
    REGISTRATION_FAILED,
    LOGIN_FAILED,
    AUTH_ERROR
} from "./action";

const AuthState = (props) => {
   
    const initialState={
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user:null,
        loading: true,
        error:null
         
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const loadUser=async ()=>{
        if(localStorage.token){
            AuthToken(localStorage.token)
        }
        try {
            const res=await axios.post('/api/auth')
            dispatch({
                type:LOAD_USER,
                payload:res.data
            })
            loadUser();
        } catch (error) {
            console.log(error);
            dispatch({
                type:AUTH_ERROR,
            })
        }
    }

    const registeruser=async formData=>{
        const config={
            headers:{
               'Content-Type':'application/json'
            }
        }
        try {
            const res=await axios.post('/api/users',formData,config);
            console.log(res);
            dispatch({
                type:REGISTER_USER,
                payload:res.data
            })
        } catch (error) {
            dispatch({
                type:REGISTRATION_FAILED,
                payload:error.resposne.data.msg
            })
        }
    }
    const loginuser=async formData=>{
        const config={
            headers:{
               'Content-Type':'application/json'
            }
        }
        try {
            const res=await axios.post('/api/auth',formData,config);
            dispatch({
                type:LOGIN_USER,
                payload:res.data
            })
        } catch (error) {
            dispatch({
                type:LOGIN_FAILED,
                payload:error.resposne.data.msg
            })
        }
    }
    const logout =()=>{
        dispatch({
            type:LOGOUT
        })
    }
    return (
        <AuthContext.Provider value={{
            token:state.token,
            isAuthenticated:state.isAuthenticated,
            loading:state.loading,
            user:state.user,
            error:state.error,
            registeruser,
            loadUser,
            loginuser,
            logout
        }}>
         {props.children}   
        </AuthContext.Provider>
    )
}

export default AuthState
