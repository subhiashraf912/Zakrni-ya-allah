import React from "react";
import Button from "@material-ui/core/Button";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  banner: {
    width: "100%",
    height: "80%",
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
  },
  bannerSecondaryText: {
    position: "absolute",
    top: "40%",
    left: "20%",
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
      <Button variant="outlined" className={classes.bannerButton}>
        Get Started!<ArrowRightAltIcon></ArrowRightAltIcon>
      </Button>
      <img
        className={classes.banner}
        alt="clothes"
        src={require("../assets/books.png")}
      ></img>
    </div>
  );
};

export default Banner;
