import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import BookIcon from "@material-ui/icons/Book";
import * as firebase from "firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  RedTextWarning: {
    alignItems: "center",
    flex: 1,
    color: "red",
    justifyContent: "center",
    textAlign: "center",
  },
}));

export default function AddCard() {
  let history = useHistory();

  const classes = useStyles();
  useEffect(() => {});

  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");
  const [question, setQues] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = () => {
    firebase
      .firestore()
      .collection("posts")
      .add({
        title: title,
        question: question,
        answer: answer,

        Email: firebase.auth().currentUser.email,
        uid: firebase.auth().currentUser.uid,
      })

      .catch((err) => {
        setErrMsg(err.message);
      })

      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        setErrMsg(err.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {!firebase.auth().currentUser
            ? history.push("/login")
            : console.log()}

          <BookIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sell your stuff
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="title"
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Card title"
                autoFocus
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ques"
                multiline
                label="Add your question"
                name="question"
                autoComplete="question"
                onChange={(e) => {
                  setQues(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="answer"
                label="answer"
                name="answer"
                autoComplete="answer"
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}></Grid>
          </Grid>
          <Typography className={classes.RedTextWarning}>{errMsg}</Typography>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Post
          </Button>
          <Grid container justify="flex-end"></Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
