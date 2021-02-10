import React, { useContext } from 'react'
import {Redirect,Route} from 'react-router-dom'
import AuthContext from './AuthContext'
const ProtectRoute = ({component: Component, ...rest}) => {
    const authContext=useContext(AuthContext)
    const {isAuthenticated, loading}=authContext
    console.log(loading);
    return (
        <Route
            {...rest}
             render={props=>{
                 if(!isAuthenticated && !loading ){
                   return <Redirect to={{pathname:'/login', state:{from: props.history}}} />
                 }else{
                   return <Component {...props} />
                 }
             }} />
    )
}

export default ProtectRoute
