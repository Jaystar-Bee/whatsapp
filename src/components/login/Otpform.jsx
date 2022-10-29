import React, { useState, useContext, useEffect, useRef } from "react";
import { userContext } from "../../store/userContext";
import backImg from "../../assets/arrow__back.png";
import FetchLoading from "./../UI/FetchLoading";

//css
import classes from "./Otpform.module.css";

const Otpform = () => {
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const otpCover = useRef();

  const inputOtp = useEffect(() => {
    const inputs = Array.from(otpCover.current.children);
    inputs.forEach((input, index, inputs) => {
      input.addEventListener("keyup", (e) => {
        if (e.key !== "Backspace") {
          input.nextElementSibling.focus();
        } else {
          input.previousElementSibling.focus();
        }
      });
      input.addEventListener("paste", (e) => {
        const otp = e.clipboardData.getData("text");
        const value = otp.split("");
        if (value.length == inputs.length) {
          input.value = value[index];
        }
      });
    });
  }, [otpCover.current]);
  const userCtx = useContext(userContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      otp1.length === 0 &&
      otp2.length === 0 &&
      otp3.length === 0 &&
      otp4.length === 0 &&
      otp5.length === 0 &&
      otp6.length === 0
    ) {
      return;
    }
    setIsLoading(true);
    const otp = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`;
    await userCtx.confirmCode(otp);
    setIsLoading(false);
  };

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.header}>
          <img
            src={backImg}
            alt=""
            onClick={() => userCtx.setCodeSent(false)}
          />
          <h2 className={`${classes.form__label} ${classes.otp__text}`}>
            Your OTP
          </h2>
        </div>
        <div className={classes.otp} ref={otpCover}>
          <input
            type="text"
            maxLength="1"
            value={otp1}
            onChange={(e) => setOtp1(e.target.value)}
          />
          <input
            type="text"
            maxLength="1"
            value={otp2}
            onChange={(e) => setOtp2(e.target.value)}
          />
          <input
            type="text"
            maxLength="1"
            value={otp3}
            onChange={(e) => setOtp3(e.target.value)}
          />
          <input
            type="text"
            maxLength="1"
            value={otp4}
            onChange={(e) => setOtp4(e.target.value)}
          />
          <input
            type="text"
            maxLength="1"
            value={otp5}
            onChange={(e) => setOtp5(e.target.value)}
          />
          <input
            type="text"
            maxLength="1"
            value={otp6}
            onChange={(e) => setOtp6(e.target.value)}
          />
        </div>
        <div className={classes.button__cover}>
          <button type="submit" className={classes.button}>
            Login
          </button>
        </div>
      </form>
      {isLoading && <FetchLoading />}
    </>
  );
};

export default Otpform;
