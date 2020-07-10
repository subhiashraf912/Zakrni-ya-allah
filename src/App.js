import React from "react";
import "./App.css";
import { Grid } from "@material-ui/core";
import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import AddCard from "./components/AddCard.jsx";
import Account from "./components/MyAccount.jsx";
import "./firebase";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Verify from "./components/VerifyLogin";

function App() {
  return (
    <Router>
      <Grid item>
        <Header />
      </Grid>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/verfiy">
          <Verify />
        </Route>
        {/* <Route path="/DailyDeals">
          <DailyDeals />
        </Route>
  */}
        <Route path="/AddCard">
          <AddCard />
        </Route>

        {/* <Route path="/help">
          <Help /> 
        </Route>
        */}
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
