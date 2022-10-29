//images
import profileImg from "./../../assets/dp.jpg";
import messageImg from "./../../assets/message.png";
import menuImg from "./../../assets/menu.png";

//css
import classes from "./Header.module.css";

import React, { Suspense } from "react";
import ExtraFunction from "./ExtraFunction";
import useToggle from "../../hooks/useToggle";

const Settings = React.lazy(() => import("./Settings"));
// import Settings from "./Settings";

const Header = () => {
  const [extraIsVisible, setExtraIsVisible] = useToggle(false);
  const [settingsIsVisible, setSettingsIsVisible] = useToggle(false);

  return (
    <header>
      <div className={classes.picture}>
        <img src={profileImg} alt="profile pic" />
      </div>

      <div className={classes.extra}>
        <img
          src={messageImg}
          alt="message"
          title="New Chat"
          onClick={() => setSettingsIsVisible()}
        />
        <img
          src={menuImg}
          alt="menu"
          title="Extra"
          onClick={() => setExtraIsVisible()}
        />
      </div>
      {extraIsVisible && (
        <ExtraFunction
          setSettingsIsVisible={setSettingsIsVisible}
          setExtraIsVisible={setExtraIsVisible}
        ></ExtraFunction>
      )}
      {settingsIsVisible && (
        <Suspense fallback={<div>Loading...</div>}>
          <Settings
            settingsIsVisible={settingsIsVisible}
            setSettingsIsVisible={setSettingsIsVisible}
          ></Settings>
        </Suspense>
      )}
    </header>
  );
};

export default Header;
