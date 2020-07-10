import React from "react";
import "../App.css";
import Banner from "./Banner.jsx";

import { Grid } from "@material-ui/core";

const Home = () => {
  return (
    <Grid item container>
      <Grid item xs={1} sm={2}></Grid>
      <Grid item xs={10} sm={8}></Grid>
      <Banner></Banner>
      <Grid item xs={1} sm={2} />
    </Grid>
  );
};

export default Home;
