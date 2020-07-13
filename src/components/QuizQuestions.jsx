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
    <Container>
      {DataFromDB.map((element) => {
        console.log(element)
        return (
          <div>


            <h1>Question title: {element.questionTitle}</h1>
            <h4>Question Answer: {element.correctAnswer}</h4>
            <h4>First Option: {element.firstOption}</h4>
            <h4>Second Option: {element.secondOption}</h4>
            <h4>Third Option: {element.thirdOption}</h4>
            <h4>Forth Option: {element.forthOption}</h4>



          </div>
          
        )
      }
        
      )}
    </Container>
  );
}
