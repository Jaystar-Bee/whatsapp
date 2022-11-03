import React from "react";
import classes from "./CoverPage.module.css";
const CoverPage = (props) => {
  return <div className={classes.cover}>{props.children}</div>;
};

export default CoverPage;
