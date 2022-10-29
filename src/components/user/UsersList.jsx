import UserDetail from "./UserDetail";
import { useEffect, useState, useContext } from "react";
import { userContext } from "./../../store/userContext";
import Search from "./Search";
import axios from "axios";
//css
import classes from "./UsersList.module.css";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [filterUsers, setFilterUsers] = useState([]);
  const userCtx = useContext(userContext);

  const handleSearch = (name) => {
    let newUsers = users;
    newUsers = newUsers.filter((user) =>
      user.name.toLowerCase().includes(name)
    );
    console.log(newUsers);
    setFilterUsers(newUsers);
  };
  let activeUsers = users;
  if (filterUsers.length > 0) {
    activeUsers = filterUsers;
  }

  // const changeConnection = () => {
  //   if (navigator.onLine) {
  //     setIsOnline(true);
  //   } else {
  //     setIsOnline(false);
  //   }
  // };
  console.log(isOnline);
  useEffect(() => {
    const userIsOnline = () => {
      setIsOnline(true);
    };
    const userIsOffline = () => {
      setIsOnline(false);
    };
    window.addEventListener("offline", userIsOffline);
    window.addEventListener("online", userIsOnline);
    return () => {
      window.removeEventListener("offline", userIsOffline);
      window.removeEventListener("online", userIsOnline);
    };
  }, []);

  useEffect(() => {
    const getUser = async () => {
      //users
      const res = await axios.get(
        `https://whatsapp-jaystar-default-rtdb.firebaseio.com/users.json`
      );
      let allUsers = [];
      for (const key in res.data) {
        let allChats = [];
        if (key !== userCtx.userId) {
          //get last message
          const chats = await axios.get(
            `https://whatsapp-jaystar-default-rtdb.firebaseio.com/chats/${userCtx.userId}/${key}/chats.json`
          );
          for (const key in chats.data) {
            const chat = {
              id: key,
              message: chats.data[key].message,
              time: chats.data[key].time,
              userId: chats.data[key].userId,
            };
            allChats.push(chat);
          }
          //getting last message finish
        }
        const lastMessage = allChats[allChats.length - 1];
        for (const id in res.data[key]) {
          const user = {
            id,
            name: res.data[key][id].name,
            phone: res.data[key][id].phoneNumber,
            status: res.data[key][id].status,
            userId: res.data[key][id].uid,
            lastMessage: lastMessage?.message,
            messageFromWho: lastMessage?.userId,
          };
          allUsers.push(user);
        }
      }
      allUsers = allUsers.filter((user) => user.userId !== userCtx.userId);

      setUsers(allUsers);
    };
    getUser();
  }, [userCtx.userId]);
  return (
    <>
      {!isOnline && (
        <div className={classes.connection}>
          <h4>Computer not connected</h4>
          <p>Make sure your computer has an internet connection</p>
        </div>
      )}
      <Search onSearch={handleSearch}></Search>
      <ul className={classes.list}>
        {activeUsers.map((user) => (
          <UserDetail
            name={user.name}
            phone={user.phone}
            status={user.status}
            userId={user.userId}
            lastMessage={user.lastMessage}
            messageFromWho={user.messageFromWho}
            key={user.id}
          ></UserDetail>
        ))}
      </ul>
    </>
  );
};

export default UsersList;
