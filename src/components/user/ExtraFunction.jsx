import React, { useContext } from "react";
import { userContext } from "../../store/userContext";
//css
import classes from "./ExtraFunction.module.css";
const ExtraFunction = (props) => {
  const userCtx = useContext(userContext);
  const handleSettings = () => {
    props.setExtraIsVisible();
    props.setSettingsIsVisible();
  };

  return (
    <div className={classes.cover}>
      <ul className={classes.list}>
        <li>
          <p>Starred Messages</p>
        </li>
        <li onClick={handleSettings}>
          <p>Settings</p>
        </li>
        <li onClick={userCtx.logOut}>
          <p>Log out</p>
        </li>
      </ul>
    </div>
  );
};

export default ExtraFunction;
