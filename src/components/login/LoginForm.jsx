//css
import classes from "./LoginForm.module.css";

//
import Otpform from "./Otpform";
import { userContext } from "../../store/userContext";
import { useContext, useState, useRef } from "react";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "./../../utils/firebase";
import FetchLoading from "../UI/FetchLoading";

const LoginForm = () => {
  const userCtx = useContext(userContext);
  const [userNumber, setUserNumber] = useState("");
  const [numberError, setNumberError] = useState(null);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const submitButton = useRef();

  const initializeCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  };

  const handleCode = async (e) => {
    e.preventDefault();
    if (userNumber.length < 9) {
      setNumberError("Number must be greater than 7 character");
      return;
    }
    setIsLoading(true);
    initializeCaptcha();
    console.log(userNumber);
    await userCtx.sendCode(userNumber);
    if (userName.length > 0) {
      localStorage.setItem("name", userName);
    }
    setUserName("");
    setUserNumber("");
    setIsLoading(false);
  };

  if (!userCtx.codeSent) {
    return (
      <>
        <form className={classes.form} onSubmit={handleCode}>
          <h2 className={classes.heading}>Login</h2>
          <div className={classes.form__group}>
            <label className={classes.form__label} htmlFor="name">
              Name
              <small className={classes.small}>
                (optional but recommended)
              </small>
            </label>
            <input
              className={classes.form__input}
              type="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className={classes.form__group}>
            <label className={classes.form__label} htmlFor="number">
              Your Number
              <small className={classes.small}>
                input with country code (e.g +234 90 ****)
              </small>
            </label>
            <input
              className={classes.form__input}
              type="number"
              value={userNumber}
              onChange={(e) => setUserNumber(e.target.value)}
              placeholder="Enter your number"
            />
            {numberError && <p className={classes.error}>{numberError}</p>}
          </div>
          <div className={classes.button__cover}>
            <input
              type="submit"
              value="Send OTP"
              className={classes.button}
              id="recaptcha-container"
              onClick={handleCode}
              ref={submitButton}
            />
          </div>
        </form>
        {isLoading && <FetchLoading />}
      </>
    );
  }
  return <>{userCtx.codeSent && <Otpform />}</>;
};

export default LoginForm;
