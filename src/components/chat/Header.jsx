//images
import profileImg from "./../../assets/dp.jpg";
import searchImg from "./../../assets/search.png";
import menuImg from "./../../assets/menu.png";

//js
import { userContext } from "../../store/userContext";
import axios from "axios";
//css
import classes from "./Header.module.css";
import { useContext, useEffect, useState } from "react";

const Header = (props) => {
  const userCtx = useContext(userContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        `https://whatsapp-jaystar-default-rtdb.firebaseio.com/users/${userCtx.activeUser}.json`
      );
      for (const key in res.data) {
        const user = {
          id: key,
          name: res.data[key].name,
          status: res.data[key].status,
          phone: res.data[key].phoneNumber,
          lastLogin: res.data[key].lastSignInTime,
        };
        setUser(user);
      }
    };
    getUser();
  }, [userCtx.activeUser]);
  return (
    <header>
      <div className={classes.user}>
        <div className={classes.picture}>
          <img src={profileImg} alt="profile pic" />
        </div>
        <div className="user__text">
          {user && <h2 className={classes.user__name}>{user.name}</h2>}
          {user && (
            <p className={classes.user__status}>
              {user.status ? "online" : user.lastLogin}
            </p>
          )}
        </div>
      </div>
      <div className={classes.extra}>
        <img src={searchImg} alt="message" title="New Chat" />
        <img src={menuImg} alt="menu" title="Extra" />
      </div>
    </header>
  );
};

export default Header;
