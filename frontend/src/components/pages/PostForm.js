import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../layouts/auth/AuthContext";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./poststyle";
import PostContext from "../layouts/post/PostContext";

const Service = (props) => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;
  const postContext = useContext(PostContext);
  const { AddPost, current, clearCurrent, updatePost } = postContext;
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const classes = useStyles();

  if (!localStorage.token) {
    props.history.push("/login");
    loadUser();
  }
  useEffect(() => {
    if (current) {
      setPostData(current);
    } else {
      setPostData({ title: "", message: "", tags: "", selectedFile: "" });
    }
  }, [postContext, current]);

  const clear = () => {
    //setCurrentId(0);
    setPostData({ title: "", message: "", tags: "", selectedFile: "" });
    clearCurrent();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (current === null) {
      AddPost(postData);
    } else {
      updatePost(postData);
    }

    props.history.push("/about");
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {current ? `Edit Post ` : "Creating a Memory"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          {current ? `Update Post ` : "Add Memory"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Service;
