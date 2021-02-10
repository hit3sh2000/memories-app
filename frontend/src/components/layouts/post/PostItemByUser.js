import React, { useContext } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";

import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import useStyles from "./poststyle";
import moment from "moment";
import PostContext from "./PostContext";
import { useHistory } from "react-router-dom";

const PostItemByUser = ({ post }) => {
  const postContext = useContext(PostContext);
  const { deletePost, setCurrent, clearCurrent } = postContext;
  const classes = useStyles();
  const history = useHistory();
  const onDelete = () => {
    deletePost(post._id);
    clearCurrent();
  };
  const onEdit = () => {
    setCurrent(post);
    console.log(post);
    history.push("/service");
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>

      <div className={classes.overlay2}>
        <Button onClick={onEdit} style={{ color: "white" }} size="small">
          <MoreHorizIcon fontSize="default" />
        </Button>
        <Button size="small" color="secondary" onClick={onDelete}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </div>

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}></CardActions>
    </Card>
  );
};

export default PostItemByUser;
