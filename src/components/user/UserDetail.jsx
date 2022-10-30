//Image
import profileImg from "./../../assets/dp.jpg";
import readImg from "./../../assets/read.png";
import dpImg from "./../../assets/user.png";
import { userContext, useEffect } from "../../store/userContext";

//css
import classes from "./UserDetail.module.css";
import { useContext } from "react";

const UserDetail = (props) => {
  const userCtx = useContext(userContext);
  const lastMessage =
    props.lastMessage.length > 30
      ? props.lastMessage.slice(0, 30) + "..."
      : props.lastMessage;

  const handleNewUser = () => {
    userCtx.setUser(true);
    userCtx.setActiveUser(props.userId);
  };

  return (
    <li className={classes.user} onClick={handleNewUser}>
      <div
        className={`${classes.user__picture} ${props.status && classes.online}`}
      >
        <img src={props.status ? profileImg : dpImg} alt="profile" />
      </div>
      <div className={classes.user__detail}>
        <div className={classes["user__detail-text"]}>
          <h2>{props.name ? props.name : props.phone}</h2>
          <div className={classes.message}>
            {props.messageFromWho === "Me" && <img src={readImg} alt="" />}
            <p> {lastMessage}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default UserDetail;
