import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import * as firebase from 'firebase';
import Container from "@material-ui/core/Container";
import {useHistory} from 'react-router-dom'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Paper } from '@material-ui/core';


const useStyles = makeStyles({
  MainButtons: {
    margin:'20px'
  },
  MainContainer: {
    margin: '20px',
    display: 'flex',
    flexDirection:'row'
  },
  root: {
    maxWidth: 345,
    margin: '20px'
  },
  media: {
    height: 140,
  },
  RedTextWarning: {
    alignItems: "center",
    flex: 1,
    color: "red",
    justifyContent: "center",
    textAlign: "center",
  },
  Paper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    padding: '10px',
    marginTop: "100px"
  },
  RadioStyles: {
    alignItems: 'center',
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    padding: '10px',
    display:'inline'
  },
  nextButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    padding: '10px',
    display: 'inline'
  }
});

export default function QuizQuestions() {
  
  let history = useHistory();
  const db = firebase.firestore();

  const classes = useStyles();
  const [ expanded, setExpanded ] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const [ loading, setLoading ] = useState(true)
  const [ DataFromDB, setDataFromDB ] = useState([])
  const [ currentQuestion, setCurrentQuestion ] = useState(0)
  const [ errorMsg , setErrorMsg ] = useState('')
  const [ radioValue, setRadioValue ] = useState('')
  const [ answers, setAnswers ] = useState([])
  const [ correctAnswers, setCorrectAnswers ] = useState([])
  const [ falseAnswers, setFalseAnswers ] = useState([])

  const handleChangeRadio = (elemt) => {
    setRadioValue(elemt.target.value)
 }


  useEffect(() => {

    let Link = window.location.href
    let LinkSplitted = Link.split('quizquestions/')
    let DocId = LinkSplitted[ 1 ]
    if (!DocId) return history.push('/')
    

    let dbCollection = firebase.firestore().collection('quizes').doc(DocId).get().then(query => {
      setDataFromDB(query.data().questions)
      setLoading(false)
    },
     [] )
   

  }, []);
  useEffect(() => {
    if (correctAnswers.length !== 0) {
      
      let Link = window.location.href
      let LinkSplitted = Link.split('quizquestions/')

      let DocId = LinkSplitted[ 1 ]

      db.collection('answers')
        .add({
          correctAnswers: correctAnswers,
          falseAnswers:falseAnswers,
          uid: firebase.auth().currentUser.uid,
          quiz: DocId
        })
        .then((doc) => {

          history.push(`/answers/${doc.id}`)

        })


    }
    
  }, [ correctAnswers,falseAnswers ])


  const handlePressTheButton = () => {
    setErrorMsg('')
    setRadioValue('')
    if (radioValue === "") return setErrorMsg("Please sellect an answer!!!")
    if (currentQuestion <= DataFromDB.length) {
      console.log(`in the if statement`)
      let AnswerObject = {}
      AnswerObject.userAnswer = radioValue
      AnswerObject.correctAnswer = DataFromDB[ currentQuestion ].correctAnswer
      AnswerObject.questionNumber = currentQuestion
      console.log(AnswerObject)
      let ansArray = answers
      ansArray.push(AnswerObject)
        setAnswers(ansArray)
console.log(answers)
      if (currentQuestion +1 !== DataFromDB.length) {
        setCurrentQuestion(currentQuestion + 1)

      } 
      if (answers.length === DataFromDB.length) {

        let CAns = []
        let FAns = []
        answers.forEach(answer => {
          if (answer.userAnswer === answer.correctAnswer) {
            CAns.push(answer)
          } else {
            FAns.push(answer)
          }

        })
        setCorrectAnswers(CAns)
        setFalseAnswers(FAns)

 

      }

    }

    }
    

  if (loading) return <h1>Still Loading</h1>
  // if (currentQuestion +1 == DataFromDB.length){ return history.push('/')}

  return (
    // current question is a state variable 
    //data from DB is the array that contains the questions
    //
    <Container className={classes.Paper} >

      <h1>Question number {currentQuestion + 1}</h1>
      <Paper className={classes.Paper}>
        
        <h1>Question Title: {DataFromDB[ currentQuestion ].questionTitle}</h1>
        <h3>Question Description:</h3><p>{DataFromDB[ currentQuestion ].question}</p>
      
        
        <br />
          <RadioGroup className={classes.RadioStyles} aria-label="Correct Answer" name="CorrectAns" value={radioValue} onChange={handleChangeRadio}>
          <FormControlLabel value='1' control={<Radio />} label={DataFromDB[ currentQuestion ].firstOption} />
          <FormControlLabel value='2' control={<Radio />} label={DataFromDB[ currentQuestion ].secondOption} />
          <FormControlLabel value='3' control={<Radio />} label={DataFromDB[ currentQuestion ].thirdOption} />
          <FormControlLabel value='4' control={<Radio />} label={DataFromDB[ currentQuestion ].forthOption} />
        </RadioGroup> 
      
        


      </Paper>
      
      {/* this is a button that changes the current question (in the state)
      and if the user keeps clicking that button it forces the host to 
      display something from the list that is not exist
      like
      datafromDB[10]
      and when the array doesn't have 10 elements it will crash 
      so I check if the current question is less than the Array length => 
      increase the current question
      
      
      */}
    
      
      
      <h3 className={classes.RedTextWarning}>{errorMsg}</h3>
      <Button className={classes.nextButton} color='primary' variant="contained" onClick={handlePressTheButton}>Next question</Button>


      
 
      {/* 
      <Button className={classes.MainButtons}variant="contained" color = 'primary'>{DataFromDB[ currentQuestion ].firstOption}</Button>
      <Button className={classes.MainButtons} variant="contained" color='primary'>{DataFromDB[ currentQuestion ].secondOption}</Button>
      <Button className={classes.MainButtons} variant="contained" color='primary'>{DataFromDB[ currentQuestion ].thirdOption}</Button>
      <Button className={classes.MainButtons} variant="contained" color='primary'>{DataFromDB[ currentQuestion ].forthOption}</Button> */}

     
    </Container>
  );
}
