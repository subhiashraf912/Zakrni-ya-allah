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
const useStyles = makeStyles({
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
});

export default function QuizQuestions() {
  let history = useHistory();

  const classes = useStyles();
  const [ expanded, setExpanded ] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  let quizesFromDB = []
  const [ loading, setLoading ] = useState(true)
  const [ DataFromDB, setDataFromDB ] = useState([])
  const [ currentQuestion, setCurrentQuestion ] = useState(0)

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






  if (loading) return <h1>Still Loading</h1>


  return (
    // current question is a state variable 
    //data from DB is the array that contains the questions
    //
    <Container>
      <h1>Question number {currentQuestion + 1}</h1>
      <h1>Question Title: {DataFromDB[ currentQuestion ].questionTitle}</h1>
      {/* this is a button that changes the current question (in the state)
      and if the user keeps clicking that button it forces the host to 
      display something from the list that is not exist
      like
      datafromDB[10]
      and when the array doesn't have 10 elements it will crash 
      so I check if the current question is less than the Array length => 
      increase the current question
      
      
      */}
      <Button onClick={() => {
        if (currentQuestion < DataFromDB.length - 1){
          setCurrentQuestion(currentQuestion + 1)
        }
      }}>Change number</Button>
        
     
    </Container>
  );
}
