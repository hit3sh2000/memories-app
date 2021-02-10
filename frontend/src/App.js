import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Service from "./components/pages/PostForm";
import AuthState from "./components/layouts/auth/AuthState";
import AuthToken from "./components/layouts/auth/AuthToken";
import ProtectRoute from "./components/layouts/auth/ProtectRoute";
import PostState from "./components/layouts/post/PostState";

console.log(localStorage);
if (localStorage.token) {
  AuthToken(localStorage.token);
  console.log('tokensakjbcvaskbvcas');
}

function App() {
  return (
    <AuthState>
      <PostState>
        <Router>
          <Fragment>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <ProtectRoute exact path="/about" component={About} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <ProtectRoute exact path="/service" component={Service} />
            </Switch>
          </Fragment>
        </Router>
      </PostState>
    </AuthState>
  );
}

export default App;
