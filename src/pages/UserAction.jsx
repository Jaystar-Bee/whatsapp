// components
import Header from "../components/user/Header";
// import Search from "./../components/user/Search";
import UsersList from "./../components/user/UsersList";

//css
import classes from "./UserAction.module.css";

const UserAction = () => {
  return (
    <div className={classes.user}>
      <div className={classes.cover}>
        <Header />
        {/* <Search /> */}
        <UsersList />
      </div>
    </div>
  );
};

export default UserAction;
