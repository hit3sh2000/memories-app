import { Link } from "react-router-dom";
import AuthContext from "../components/layouts/auth/AuthContext";
import PostContext from "./layouts/post/PostContext";

import React, { Fragment, useContext, useEffect, useRef } from "react";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const text = useRef("");
  const { user, logout } = authContext;
  const postContext = useContext(PostContext);
  const { filterPost, clearFilter, filtered } = postContext;
  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    console.log(text.current.value);
    if (text.current.value !== "" && text.current.value) {
      filterPost(e.target.value);
    } else {
      clearFilter();
    }
  };

  let flag = null;
  if (localStorage.token) {
    flag = true;
  } else {
    flag = false;
  }
  const Exit = () => {
    logout();
  };
  const authLink = (
    <Fragment>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link class="navbar-brand" to="/">
          Memory App
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <Link class="navbar-brand" to="#">
          {user && user.name}
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link class="nav-link" to="/">
                Home
                <span class="sr-only">(current)</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/service">
                Post Memory
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/about">
                Your Post
              </Link>
            </li>
            <li class="nav-item">
              <Link onClick={Exit} class="nav-link" to="/">
                Logout
              </Link>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              onChange={onChange}
              ref={text}
              class="form-control form-control-lg"
              type="text"
              placeholder="Search by title or name"
              id="inputLarge"
            />
          </form>
        </div>
      </nav>
    </Fragment>
  );
  const unauthLink = (
    <Fragment>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link class="navbar-brand" to="/">
          Memory App
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link class="nav-link" to="/">
                Home
                <span class="sr-only">(current)</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/service">
                Post Memory
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/login">
                Log In
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/register">
                Register
              </Link>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              onChange={onChange}
              ref={text}
              class="form-control form-control-lg"
              type="text"
              placeholder="Search by title or name"
              id="inputLarge"
            />
          </form>
        </div>
      </nav>
    </Fragment>
  );
  return <Fragment>{flag ? authLink : unauthLink}</Fragment>;
};

export default Navbar;
