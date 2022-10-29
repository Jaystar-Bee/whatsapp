import React, { createContext, useState } from "react";
import { auth } from "./../utils/firebase";
import { signInWithPhoneNumber } from "firebase/auth";
import axios from "axios";

export const userContext = createContext({
  codeSent: Boolean,
  isAuthenticated: Boolean,
  activeUser: "",
  userStatus: Boolean,
  getUser: () => {},
  setUser: () => {},
  sendCode: () => {},
  setCodeSent: () => {},
  autoLogin: () => {},
  logOut: () => {},
});

const UserContextProvider = (props) => {
  //data
  const [codeSent, setCodeSent] = useState(true);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [activeUser, setActiveUser] = useState(null);

  const isAuthenticated = !!token;

  //function
  const sendCode = async (number) => {
    try {
      const phoneNumber = `+${number}`;
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      window.confirmationResult = confirmationResult;
      setCodeSent(true);
    } catch (error) {
      console.log(error);
      window.location.reload();
    }
  };

  const logOut = () => {
    localStorage.removeItem("expireTime");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setToken(null);
    setUserId(null);
  };

  const autoLogin = () => {
    const expireTime = localStorage.getItem("expireTime");
    const newUserId = localStorage.getItem("userId");
    const newToken = localStorage.getItem("token");
    const recentTime = new Date().getMilliseconds();
    if (recentTime > expireTime) {
      logOut();
    } else {
      setToken(newToken);
      setUserId(newUserId);
    }
  };

  const confirmCode = async (otp) => {
    try {
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;
      const expireTime = user.stsTokenManager.expirationTime;
      const userId = user.uid;
      const token = user.stsTokenManager.accessToken;
      const name = localStorage.getItem("name");
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("expireTime", expireTime);
      const newUser = {
        uid: user.uid,
        name,
        status: false,
        phoneNumber: user.phoneNumber,
        lastSignInTime: user.metadata.lastSignInTime,
      };
      const userIsAvailable = await axios.get(
        `https://whatsapp-jaystar-default-rtdb.firebaseio.com/users/${user.uid}.json`
      );

      if (!userIsAvailable.data) {
        await axios.post(
          `https://whatsapp-jaystar-default-rtdb.firebaseio.com/users/${user.uid}.json`,
          newUser
        );
      }

      setToken(token);
      setUserId(userId);
      localStorage.removeItem("name");
    } catch (error) {
      console.log(error);
    }
  };

  const [showUser, setShowUser] = useState(false);
  const setUserStatus = (status) => {
    setShowUser(status);
  };
  // const getUser = (userId) => {};

  const userDetails = {
    token,
    isAuthenticated,
    logOut,
    autoLogin,
    userId,
    activeUser,
    setActiveUser,
    setCodeSent,
    codeSent,
    userStatus: showUser,
    setUser: setUserStatus,
    // getUser,
    sendCode,
    confirmCode,
  };

  return (
    <userContext.Provider value={userDetails}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
