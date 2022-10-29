import React from "react";
import sentImg from "./../../assets/read.png";
//css
import classes from "./Message.module.css";

const Message = React.forwardRef((props, ref) => {
  const time = new Date(props.message.time).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  if (props.message.userId === "Me") {
    return (
      <li className={`${classes.cover} ${classes.right}`} ref={ref}>
        <div className={classes.message__me}>
          <p className={classes.text}>{props.message.message}</p>
          <div className={classes.action}>
            <p className={classes.time}>{time}</p>
            <span className={classes.mark}>
              {props.message.sent === true && <img src={sentImg} alt="" />}
            </span>
          </div>
        </div>
        <div className={classes.angle__me}></div>
      </li>
    );
  } else {
    return (
      <li className={classes.cover} ref={ref}>
        <div className={classes.angle__other}></div>
        <div className={classes.message__other}>
          <p className={classes.text}>{props.message.message}</p>
          <p className={classes.time}>{time}</p>
        </div>
      </li>
    );
  }
});

export default Message;
