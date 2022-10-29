//css
import classes from "./MessageCover.module.css";
import { useEffect, useRef } from "react";
//js
import Message from "./Message";

const MessageCover = (props) => {
  const messageRef = useRef(null);

  const scrollDown = () => {
    messageRef.current?.scrollIntoView();
  };
  useEffect(() => {
    scrollDown();
    // messageRef.current?.scrollIntoView();
  }, [messageRef.current]);

  return (
    <ul className={classes.cover}>
      {props.messages.map((message) => (
        <Message message={message} key={message.id}></Message>
      ))}

      {props.messages.length > 0 && <span ref={messageRef}></span>}
    </ul>
  );
};

export default MessageCover;
