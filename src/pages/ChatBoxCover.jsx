import { useContext } from "react";
import { userContext } from "../store/userContext";
import ChatBox from "./ChatBox";
import classes from "./ChatBoxCover.module.css";

const ChatBoxCover = (props) => {
  const userCtx = useContext(userContext);

  return (
    <div className={classes.cover}>{userCtx.activeUser && <ChatBox />}</div>
  );
};

export default ChatBoxCover;
