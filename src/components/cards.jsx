import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { pink } from "@material-ui/core/colors";
import { orange } from "@material-ui/core/colors";
import { blue } from "@material-ui/core/colors";
import { yellow } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import * as firebase from "firebase";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  MainContainer: {
    margin: "20px",
    display: "flex",
    flexDirection: "row",
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
});

export default function RadioButtons() {
  const classes = useStyles();

  let cardsFromDB = [];

  const [cards, setcards] = useState([]);
  useEffect(() => {
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
          cardsFromDB.push(data);
          console.log(doc.id, " => ", doc.data());
          console.log(cardsFromDB);
        });
        setcards(cardsFromDB);
      })
      .catch((error) => console.log(error));
  }, []);
  const getCardStyle = (bgColor) => {
    return {
      minWidth: 275,
      height: 110,
      width: 100,
      backgroundColor: bgColor,
      margin: "20px",
    };
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.MainContainer}>
      <Grid item xs={12} sm={12}>
        {" "}
        {cards.length > 0 ? (
          cards.map((card) => (
            <Card style={getCardStyle(card.bgColor)}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {card.content}
                </Typography>
              </CardContent>
            </Card>
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
