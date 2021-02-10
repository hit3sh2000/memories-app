import React, { useState,useContext,useEffect } from "react";
import AuthContext from '../layouts/auth/AuthContext'

const Login = (props) => {
  const authContext=useContext(AuthContext)
  const {loginuser,isAuthenticated} =authContext;

  useEffect(() => {
    if(isAuthenticated){
      props.history.push("/");
    }
  }, [isAuthenticated,props.history])
  const [user, setuser] = useState({
    email: "",
    password:""
  });
  const { email, password } = user;
  const onChange = (e) => {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit=(e)=>{
     e.preventDefault();
     loginuser({
       email,
       password
     })
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm-4 ml-5 mt-5">
          <h3>Login  User</h3>
          <div className="form-group">
            <label>Email :</label>
            <input
              className="form-control"
              type="email"
              name="email"
              required
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>password :</label>
            <input
              className="form-control"
              type="password"
              name="password"
              required
              value={password}
              onChange={onChange}
            />
          </div>
          <input className="btn btn-success" type="submit" value="Log In" />
        </div>
      </div>
    </form>
  );
};

export default Login;

