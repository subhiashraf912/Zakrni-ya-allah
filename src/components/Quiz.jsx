import React, { useState } from "react";
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
import * as firebase from "firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  RedTextWarning: {
    alignItems: "center",
    flex: 1,
    color: "red",
    justifyContent: "center",
    textAlign: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Quiz() {
  const history = useHistory();
  const classes = useStyles();
  const [ quizDescription, setQuizDescription] = useState("");
    const [quizTitle, setQuizTitle] = useState("");
    const [qs, setQs] = useState("");
  const [errMsg, setErrMsg] = useState("");


  const addQuiz = () => {
    setErrMsg('')
   if (
     quizTitle === "" ||
     quizDescription ===''
   ) return setErrMsg(`Please fill in the fields!!!`)
        const db = firebase.firestore();
    db.collection("quizes")
      .add({
        quiztitle: quizTitle,
        quizDescription:quizDescription,  
        uid: firebase.auth().currentUser.uid
      })
      .then((doc) => {
        let docID = doc.id
        let userCollectrion = db.collection("users").doc(firebase.auth().currentUser.uid);
        userCollectrion.get().then((query) => {
          let data = query.data()
          if (!data.quizes) {
            let quizes = []
            quizes.push(docID)
            userCollectrion.update({quizes:quizes}).then(()=> history.push(`/questions/${docID}`))

          } else {
            let quizes = data.quizes;
            quizes.push(docID);
            userCollectrion.update({ quizes: quizes }).then(() => history.push(`/questions/${docID}`))
          }
        });
      });

       



}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {!firebase.auth().currentUser
          ? history.push("/login")
          : console.log(`logged`)}

        <Typography component="h1" variant="h5">
          Create Quiz!
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="QuizTitle"
            label="Quiz Title"
            name="QuizTitle"
            autoComplete="QuizTitle"
            autoFocus
            onChange={(event) => {
              setQuizTitle(event.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Description"
            label="Quiz description"
            multiline
            id="Description"
            onChange={(event) => {
              setQuizDescription(event.target.value);
            }}
          />
          <Typography className={classes.RedTextWarning}>{errMsg}</Typography>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={addQuiz}
          >
            Go to questions page
          </Button>
        </form>
      </div>
    </Container>
  );
}
