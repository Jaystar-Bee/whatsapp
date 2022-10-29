import useToggle from "../../hooks/useToggle";
import backImg from "./../../assets/arrow__back.png";
import profileImg from "./../../assets/dp.jpg";

//css
import classes from "./Settings.module.css";

const allSettings = [
  {
    id: 1,
    name: "Notifications",
    picture: "notificationImg",
  },
  {
    id: 2,
    name: "Privacy",
    picture: "privacyImg",
  },
  {
    id: 3,
    name: "Security",
    picture: "securityImg",
  },
  {
    id: 4,
    name: "Theme",
    picture: "themeImg",
  },
  {
    id: 5,
    name: "Chat Wallpaper",
    picture: "wallpaperImg",
  },
  {
    id: 6,
    name: "Request Account Info",
    picture: "requestImg",
  },
  {
    id: 7,
    name: "Keyboard Shortcut",
    picture: "shortcutImg",
  },
  {
    id: 8,
    name: "Help",
    picture: "helpImg",
  },
];

const Settings = (props) => {
  const [slide, setSlide] = useToggle(false);
  const closeModal = () => {
    setSlide(true);

    setTimeout(() => {
      props.setSettingsIsVisible();
    }, 300);
  };
  return (
    <div
      className={`${classes.cover} ${
        props.settingsIsVisible && !slide ? classes.slide__in : ""
      } ${slide && classes.slide__out}`}
    >
      <div className={classes.header}>
        <img src={backImg} alt="" onClick={closeModal} />
        <h2>Settings</h2>
      </div>
      <div className={classes.user}>
        <div className={classes.picture}>
          <img src={profileImg} alt="" />
        </div>
        <div className={classes.text}>
          <h2>Name</h2>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
      {allSettings.map((setting) => (
        <div key={setting.id} setting={setting} className={classes.setting}>
          {setting.name}
        </div>
      ))}
    </div>
  );
};

export default Settings;
