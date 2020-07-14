import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as firebase from 'firebase';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {useHistory} from 'react-router-dom'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


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
});

export default function QuizQuestions() {
  let history = useHistory();

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
const [answers,setAnswers] = useState([])
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
    }
      )
   

  }, []);


  useEffect(() => {
  console.log(answers)
},[answers])

  const handlePressTheButton = () => {
    setErrorMsg('')
    setRadioValue('')
    if (radioValue === "") return setErrorMsg("Please sellect an answer!!!")
    if (currentQuestion - 1 < DataFromDB.length) {
      console.log(radioValue)
      let AnswerObject = {}
      AnswerObject[ currentQuestion ] = radioValue
      if (!(currentQuestion) == DataFromDB.length) {
        console.log(`in the sh!t`)
        setCurrentQuestion(currentQuestion + 1)

        setAnswers(answers.concat(AnswerObject))
        return
      }



    }
    else {
console.log(answers)}
}

  if (loading) return <h1>Still Loading</h1>


  return (
    // current question is a state variable 
    //data from DB is the array that contains the questions
    //
    <Container>
      <h1>Question number {currentQuestion + 1}</h1>
      <h1>Question Title: {DataFromDB[ currentQuestion ].questionTitle}</h1>
      <h3>Question Description:</h3><p>{DataFromDB[ currentQuestion ].question}</p>
      {/* this is a button that changes the current question (in the state)
      and if the user keeps clicking that button it forces the host to 
      display something from the list that is not exist
      like
      datafromDB[10]
      and when the array doesn't have 10 elements it will crash 
      so I check if the current question is less than the Array length => 
      increase the current question
      
      
      */}
    
      <br />
      <h2>Choose the correct answer</h2>

      

      <RadioGroup aria-label="Correct Answer" name="CorrectAns" value={radioValue} onChange={handleChangeRadio}>
        <FormControlLabel value='1' control={<Radio />} label={DataFromDB[currentQuestion].firstOption} />
        <FormControlLabel value='2' control={<Radio />} label={DataFromDB[ currentQuestion ].secondOption}  />
        <FormControlLabel value='3' control={<Radio />} label={DataFromDB[ currentQuestion ].thirdOption}  />
        <FormControlLabel value='4' control={<Radio />} label={DataFromDB[ currentQuestion ].forthOption}  />
      </RadioGroup> 

      


      
      <h3 className={classes.RedTextWarning}>{errorMsg}</h3>
      <Button className="MainButtons" color='primary' variant="contained" onClick={handlePressTheButton}>Next question</Button>
      
      {/* 
      <Button className={classes.MainButtons}variant="contained" color = 'primary'>{DataFromDB[ currentQuestion ].firstOption}</Button>
      <Button className={classes.MainButtons} variant="contained" color='primary'>{DataFromDB[ currentQuestion ].secondOption}</Button>
      <Button className={classes.MainButtons} variant="contained" color='primary'>{DataFromDB[ currentQuestion ].thirdOption}</Button>
      <Button className={classes.MainButtons} variant="contained" color='primary'>{DataFromDB[ currentQuestion ].forthOption}</Button> */}

     
    </Container>
  );
}
