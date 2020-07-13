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

export default function LatestQuizes() {
  let history = useHistory();

  const classes = useStyles();
  const [ expanded, setExpanded ] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  let quizesFromDB = []
  const [ loading, setLoading ] = useState(true)
  const [ quizes, setQuizes ] = useState([])
  useEffect(() => {

    let dbCollection = firebase.firestore().collection('quizes').onSnapshot((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        quizesFromDB.push({
          ...doc.data(),
          key: doc.id
        })
      })
      console.log(quizesFromDB)
      setLoading(false)
      setQuizes(quizesFromDB)
    })

  }, []);






  if (loading) return <h1>Still Loading</h1>


  return (
    <Container component="main" maxWidth="xs" className={classes.MainContainer}>
      <Grid item xs={12} sm={12}>

    {
      quizes.length > 0 ? (
          quizes.map(post => (
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={require("../assets/card.jpg")}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.quiztitle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {post.quizDescription}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>

                <Button size="small" color="primary" onClick={() => {
                  history.push(`/quizquestions/${post.key}`)
                  }}>
                    Go to Qestions
        </Button>
                </CardActions>
              </Card>
          
        ))
      ) : (
          <h1>No posts yet</h1>
        )}
      </Grid>

    </Container>
  );
}
