import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import * as firebase from "firebase";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

import DeleteIcon from "@material-ui/icons/Delete";
import { shadows } from "@material-ui/system";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles((theme) => ({
  MainContainer: {
    margin: "20px",
    display: "flex",
    flexGrow: 1,
    maxWidth: 1300,
    marginTop: "10px",
  },
  root: {
    maxWidth: 345,
    margin: "20px",
  },
  media: {
    height: 140,
  },
  cards: {
    minWidth: 275,
    height: 110,
    width: 100,
    backgroundColor: "yellow",
    margin: "20px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  paper: {
    // padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 250,
    maxwidth: 150,
  },
}));

export default function RadioButtons() {
  const deleteData = (id) => {
    console.log(id);
    if (id !== null && id !== undefined) {
      const db = firebase.firestore();
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("MyCards")
        .doc(id)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    }
  };
  const classes = useStyles();

  let cardsFromDB = [];
  const [loading, setLoading] = useState(true);
  const [cards, setcards] = useState([]);
  useEffect((id) => {
    var user = firebase.auth().currentUser;
    var uid;

    if (user != null) {
      uid = user.uid;
    }
    console.log("the user id is: ", uid);

    const db = firebase.firestore();
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("MyCards")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          cardsFromDB.push(data);
          console.log(doc.id, " => ", doc.data());
          console.log(cardsFromDB);
          setLoading(false);
        });
        setcards(cardsFromDB);
      })
      .catch((error) => console.log(error));
  }, []);
  const getCardStyle = (bgColor) => {
    return {
      // minWidth: 275,
      height: 250,
      maxwidth: 150,
      backgroundColor: bgColor,
      margin: "20px",
      // display: "flex",
      // flex: 1,
    };
  };
  // if (loading) return <h1>Still Loading</h1>;

  return (
    <Container component="main" maxWidth="xs" className={classes.MainContainer}>
      <Grid container spacing={3}>
        {" "}
        {cards.length > 0 ? (
          cards.map((card) => (
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <Card style={getCardStyle(card.bgColor)}>
                  <CardContent>
                    {/* <CardActions>
                      <Button key={card.id} onClick={() => deleteData(card.id)}>
                        <DeleteIcon></DeleteIcon>
                      </Button>
                    </CardActions> */}
                    <Typography gutterBottom variant="h4" component="h5">
                      {card.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      component="h3"
                      align="center"
                      display="block"
                    >
                      {card.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          ))
        ) : (
          <h1>No cards yet</h1>
        )}
        <br></br>
        <br></br>
      </Grid>
    </Container>
  );
}
