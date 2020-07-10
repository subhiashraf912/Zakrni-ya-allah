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
import * as firebase from "firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

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

export default function Sell() {
  let history = useHistory();
  let user = firebase.auth().currentUser;

  const classes = useStyles();
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((snap) => {
        setFName(snap.data().FirstName);
        setSName(snap.data().LastName);
        setPhoneNumber(snap.data().PhoneNumber);
        setAddress(snap.data().Address);
      });
  }, []);

  const [Password, setPassword] = useState("");
  const [FName, setFName] = useState("");
  const [SName, setSName] = useState("");
  const [Address, setAddress] = useState("");
  const [Email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = () => {
    setErrMsg("");
    if (
      Password == "" ||
      FName == "" ||
      SName == "" ||
      Address == "" ||
      phoneNumber == ""
    )
      return setErrMsg("Fill the empty fields!!");

    if (Password.length < 6)
      return setErrMsg(`Password length must be more than 6 characters`);
    firebase
      .firestore()
      .collection(`users`)
      .doc(user.uid)
      .update({
        FirstName: FName,
        LastName: SName,
        Address: Address,
        PhoneNumber: phoneNumber,
        Email: Email,
      })
      .then(
        user
          .updateEmail(Email)
          .then(() => {
            user
              .updatePassword(Password)
              .catch((err) => setErrMsg(err.message))
              .then(() => history.push("/"));
          })
          .catch((err) => {
            setErrMsg(err.message);
          })
      )
      .catch((err) => setErrMsg(err.message));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {!firebase.auth().currentUser
            ? history.push("/login")
            : console.log()}

          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          User's account
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="First Name"
                autoFocus
                value={FName}
                onChange={(e) => {
                  setFName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Second name"
                value={SName}
                onChange={(e) => {
                  setSName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={phoneNumber}
                label="Phone Number"
                type="number"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={Address}
                fullWidth
                label="Address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Typography className={classes.RedTextWarning}>{errMsg}</Typography>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Change
          </Button>
          <Grid container justify="flex-end"></Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
