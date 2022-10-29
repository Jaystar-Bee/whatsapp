import React from "react";
import ReactDOM from "react-dom";

//css
import classes from "./FetchLoading.module.css";

const FetchLoading = () => {
  const overlayCover = document.getElementById("overlays");
  return (
    <>
      {ReactDOM.createPortal(
        <div className={classes.backdrop}></div>,
        overlayCover
      )}
      {ReactDOM.createPortal(
        <div className={classes.load}></div>,
        overlayCover
      )}
      {ReactDOM.createPortal(
        <div className={classes.slide}></div>,
        overlayCover
      )}
    </>
  );
};

export default FetchLoading;
