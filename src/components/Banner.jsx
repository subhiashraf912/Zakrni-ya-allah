import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  banner: {
    width: "100%",
    height: "100%",
  },
  bannerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerText: {
    position: "absolute",
    top: "20%",
    left: "20%",
    variant: "overline",
  },
  bannerSecondaryText: {
    position: "absolute",
    top: "40%",
    left: "20%",
    backgroundColor: "white",
    alignSelf: "flex-start",
  },
  bannerButton: {
    position: "absolute",
    top: "60%",
    left: "20%",
    width: "20%",
  },
}));

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.bannerContainer}>
      <h1 className={classes.bannerSecondaryText}>
        It always seems impossible until it’s done
      </h1>

      <img
        className={classes.banner}
        alt="clothes"
        src={require("../assets/work.jpg")}
      ></img>
    </div>
  );
};

export default Banner;
