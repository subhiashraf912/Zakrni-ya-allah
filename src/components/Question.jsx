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
import { useHistory, useLocation } from "react-router-dom";



function useQuery() {
  return new URLSearchParams(useLocation().search);
}


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

export default function Question() {

  let link = window.location.href
  let linkParts = link.split('questions/')
  let QuizParam = linkParts[1]  

  const history = useHistory();
  const classes = useStyles();
    const [question, setQuestion] = useState("");
    const [firstOption, setFirstOption] = useState("");
    const [secondOption, setSecondOption] = useState("");
    const [thirdOption, setThirdOption] = useState("");
    const [forthOption, setForthOption] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [numqestion, setNumquestion] = useState("");
  const [ questionTitle, setQuestionTitle] = useState("");
    const [qs, setQs] = useState("");
  const [errMsg, setErrMsg] = useState("");


  const addQuiz = () => {
    setErrMsg('')
   if (
     question === "" ||
     firstOption === "" ||
     secondOption === "" ||
     thirdOption === "" ||
     forthOption === "" ||
     correctAnswer === "" ||
     questionTitle === ""
   ) return setErrMsg(`Please fill in the fields!!!`)
        const db = firebase.firestore();
    let quizCollection = db.collection("quizes").doc(QuizParam)
    quizCollection.get().then((query) => {
      let data = query.data()
      if (!data.questions) { data.questions = [] }

        let QuestionObject = {
          question,
          firstOption,
          secondOption,
          thirdOption,
          forthOption,
          correctAnswer,
          questionTitle
        }
      data.questions.push(QuestionObject)
      
        quizCollection
          .update({
            questions: data.questions
          })
          .then((doc) => {

            setCorrectAnswer("")
            setFirstOption("")
            setSecondOption("")
            setThirdOption("")
            setForthOption("")
            setQuestion("")
            setQuestionTitle("")


          });

        


      
      
    })


       



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
            label="Question Title"
            name="QuizTitle"
            autoComplete="QuizTitle"
            autoFocus
            value={questionTitle}
            onChange={(event) => {
              setQuestionTitle(event.target.value);
            }}
          />
          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Question"
            label="Question"
            name="Question"
            autoComplete="Question"
            autoFocus
            value={question}
            onChange={(event) => {
              setQuestion(event.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Option1"
            label="Option 1"
            name="Option1"
            autoComplete="Option 1"
            autoFocus
            onChange={(event) => {
              setFirstOption(event.target.value);
            }}
            value={firstOption}
            
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Option2"
            label="Option 2"
            name="Option2"
            autoComplete="Option 2"
            autoFocus
            onChange={(event) => {
              setSecondOption(event.target.value);
            }}
            value={secondOption}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Option3"
            label="Option 3"
            name="Option3"
            autoComplete="Option 3"
            autoFocus
            onChange={(event) => {
              setThirdOption(event.target.value);
            }}

            value={thirdOption}
          
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Option4"
            label="Option 4"
            name="Option4"
            autoComplete="Option 4"
            autoFocus
            onChange={(event) => {
              setForthOption(event.target.value);
            }}
            value={forthOption}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="CorrectAnswer"
            label="Correct Answer"
            name="CorrectAnswer"
            autoComplete="CorrectAnswer"
            autoFocus
            onChange={(event) => {
              setCorrectAnswer(event.target.value);
            }}
            value={correctAnswer}
          />
          <Typography className={classes.RedTextWarning}>{errMsg}</Typography>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={addQuiz}

          >
            Add the qeuestion
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              history.push('/')
            }}

          >
            Back to home
          </Button>
          
        </form>
      </div>
    </Container>
  );
}
