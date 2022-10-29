import React, { useContext, useEffect, useState } from "react";
import Header from "../components/chat/Header";
import MessageCover from "../components/chat/MessageCover";
import TextBox from "../components/chat/TextBox";
import { userContext } from "../store/userContext";
import axios from "axios";

//css
import classes from "./ChatBox.module.css";

let messages = [];

function ChatBox() {
  const userCtx = useContext(userContext);
  const [chats, setChats] = useState(messages);

  useEffect(() => {
    const getChats = async () => {
      const chats = await axios.get(
        `https://whatsapp-jaystar-default-rtdb.firebaseio.com/chats/${userCtx.userId}/${userCtx.activeUser}/chats.json`
      );

      let allChats = [];
      for (const key in chats.data) {
        const chat = {
          id: key,
          message: chats.data[key].message,
          time: chats.data[key].time,
          userId: chats.data[key].userId,
          sent: chats.data[key].sent,
        };
        allChats.push(chat);
      }
      setChats(allChats);
    };

    getChats();
  }, [chats, userCtx.userId, userCtx.activeUser]);

  // send chat
  const handleChats = async (text) => {
    const newChat = {
      id: new Date().toISOString(),
      message: text,
      time: new Date().toISOString(),
      userId: "Me",
    };

    setChats((prevChats) => {
      return [...prevChats, newChat];
    });

    const responses = await Promise.all([
      await axios.post(
        `https://whatsapp-jaystar-default-rtdb.firebaseio.com/chats/${userCtx.userId}/${userCtx.activeUser}/chats.json`,
        { ...newChat, sent: true }
      ),
      await axios.post(
        `https://whatsapp-jaystar-default-rtdb.firebaseio.com/chats/${userCtx.activeUser}/${userCtx.userId}/chats.json`,
        { ...newChat, userId: "friend" }
      ),
    ]);
    // console.log(responses);

    const notSent = responses.find((response) => !response.ok);
    if (notSent) {
      // console.log("not sent");
    }

    // catch (error) { console.log(error) }
  };

  return (
    <div className={classes.cover}>
      {userCtx.userStatus && userCtx.activeUser ? (
        <Header userId={userCtx.activeUser}></Header>
      ) : (
        <></>
      )}
      {userCtx.userStatus && userCtx.activeUser ? (
        <MessageCover messages={chats}></MessageCover>
      ) : (
        <></>
      )}
      {userCtx.userStatus && userCtx.activeUser ? (
        <TextBox onSetChats={handleChats}></TextBox>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ChatBox;
