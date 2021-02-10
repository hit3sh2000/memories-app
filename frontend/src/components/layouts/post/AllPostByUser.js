import React, { useContext, useEffect } from "react";
import PostContext from "./PostContext";
import { Grid, CircularProgress } from "@material-ui/core";

import useStyles from "./allpoststyle";
import AuthToken from '../auth/AuthToken'
import PostItemByUser from "./PostItemByUser";

const AllPostByUser = (props) => {
  const postContext = useContext(PostContext);
  const { posts, GetPostByUser } = postContext;

  const classes = useStyles();
  if (!localStorage.token) {
    props.history.push("/login");
    //    loadUser();
  }else{
    AuthToken(localStorage.token);
    console.log('tokensakjbcvaskbvcas');
  }
  useEffect(() => {
    GetPostByUser(localStorage.id);
  },[]);
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <PostItemByUser post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AllPostByUser;
