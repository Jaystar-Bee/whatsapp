import React from "react";
import ChatBox from "./ChatBox";
import ChatBoxCover from "./ChatBoxCover";
import UserAction from "./UserAction";
import classes from "./UserPage.module.css";

const UserPage = () => {
  return (
    <div className={classes.cover}>
      <div className={classes.user}>
        <UserAction></UserAction>
      </div>
      <div className={classes.chat}>
        <ChatBoxCover />
        {/* <ChatBox></ChatBox> */}
      </div>
    </div>
  );
};

export default UserPage;
