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
import { Paper } from '@material-ui/core';
import './search.css';
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme)=>({
  MainContainer: {
    flexGrow: 1,
    // width: '2900px',
    maxWidth: 1200,
    marginTop:'100px'

  },
  root: {
    maxWidth: 345,
    margin: '20px'
  },
  media: {
    height: 140,
  },
  paper: {
    // padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  MainGrid: {
    // margin:'5px'
  }
}))

export default function LatestQuizes() {
  let history = useHistory();

  const classes = useStyles();
  const [ expanded, setExpanded ] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let booksImages = [ require("../assets/card.jpg"), require("../assets/book1.jpg"), require("../assets/book2.jpg"), require("../assets/book3.jpg"), require("../assets/book4.jpg"), require("../assets/book5.jpg"), require("../assets/book6.jpg"), require("../assets/book7.jpg"), require("../assets/book8.jpg")]
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


      <Grid container spacing={5} >
        <div class="buscar-caja">
          <input type="text" name="" class="buscar-txt" placeholder="Search..." />
          <a class="buscar-btn">
            <SearchIcon>
            </SearchIcon>              </a>
        </div>
    {
      quizes.length > 0 ? (
            quizes.map(post => (
              <Grid className={classes.MainGrid} item xs={4}>
                <Paper className={classes.paper}>


                  <Card>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={booksImages[ Math.floor(Math.random() * booksImages.length) ]}
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


                </Paper>
             
          </Grid>
        ))
      ) : (
          <h1>No posts yet</h1>
        )}
      </Grid>

    </Container>
  );
}
