import React, { useState, useEffect } from "react";
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
import BookIcon from "@material-ui/icons/Book";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import * as firebase from "firebase";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { pink } from "@material-ui/core/colors";
import { orange } from "@material-ui/core/colors";
import { blue } from "@material-ui/core/colors";
import { yellow } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio {...props} />);

const PinkRadio = withStyles({
  root: {
    color: pink[400],
    "&$checked": {
      color: pink[600],
    },
  },
  checked: {},
})((props) => <Radio {...props} />);

const YellowRadio = withStyles({
  root: {
    color: yellow[600],
    "&$checked": {
      color: yellow[800],
    },
  },
  checked: {},
})((props) => <Radio {...props} />);

const BlueRadio = withStyles({
  root: {
    color: blue[400],
    "&$checked": {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Radio {...props} />);

const OrangeRadio = withStyles({
  root: {
    color: orange[700],
    "&$checked": {
      color: orange[800],
    },
  },
  checked: {},
})((props) => <Radio {...props} />);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  RedTextWarning: {
    alignItems: "center",
    flex: 1,
    color: "red",
    justifyContent: "center",
    textAlign: "center",
  },
}));

export default function AddCard() {
  let history = useHistory();

  const classes = useStyles();
  useEffect(() => {});
  const [selectedValue, setSelectedValue] = React.useState();

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = () => {
    var user = firebase.auth().currentUser;
    var uid;

    if (user != null) {
      uid = user.uid;
    }
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("MyCards")
      .add({
        title: title,
        content: content,
        bgColor: selectedValue,
      })

      .catch((err) => {
        setErrMsg(err.message);
      })

      .then(() => {
        history.push("/cards");
      })
      .catch((err) => {
        setErrMsg(err.message);
      });
  };
  React.useEffect(() => {
    // selectedValue has definitely been changed
    console.log("selectedValue:", selectedValue);
  }, [selectedValue]);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {!firebase.auth().currentUser
            ? history.push("/login")
            : console.log()}
          <AddCircleOutlineIcon />{" "}
        </Avatar>
        <Typography component="h1" variant="h5">
          Add your cards!
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="title"
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Card title"
                autoFocus
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="content"
                multiline
                label="content"
                name="content"
                autoComplete="content"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}></Grid>
          </Grid>
          <Typography className={classes.RedTextWarning}>{errMsg}</Typography>
          <PinkRadio
            checked={selectedValue === "pink"}
            onChange={handleChange}
            value="#ff669a

"
            name="radio-button-demo"
            inputProps={{ "aria-label": "A" }}
          />
          Pink
          <YellowRadio
            checked={selectedValue === "yellow"}
            onChange={handleChange}
            value="#ffee33"
            name="radio-button-demo"
            inputProps={{ "aria-label": "B" }}
          />
          Yellow
          <GreenRadio
            checked={selectedValue === "green"}
            onChange={handleChange}
            value="#76ff03"
            name="radio-button-demo"
            inputProps={{ "aria-label": "C" }}
          />
          Green
          <BlueRadio
            checked={selectedValue === "blue"}
            onChange={handleChange}
            value="#33eaff"
            name="radio-button-demo"
            inputProps={{ "aria-label": "D" }}
          />
          Blue
          <OrangeRadio
            checked={selectedValue === "orange"}
            onChange={handleChange}
            value="#ffab40"
            name="radio-button-demo"
            inputProps={{ "aria-label": "E" }}
          />
          Orange
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Add
          </Button>
          <Grid container justify="flex-end"></Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
