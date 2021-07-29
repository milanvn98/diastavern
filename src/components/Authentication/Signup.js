import styles from "./Portal.module.css";
import useValidate from "../../hooks/useValidate";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import AuthContext from "../../context/auth-context";

const Signup = (props) => {
  const auth_ctx = useContext(AuthContext);
  const history = useHistory();

  const { value: email, isValid: emailIsValid, hasError: emailHasError, valueChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler } = useValidate((value) => value !== "" && value.trim().includes("@") && value.trim().includes("."));
  const { value: password, isValid: passwordIsValid, hasError: passwordHasError, valueChangeHandler: passwordChangeHandler, inputBlurHandler: passwordBlurHandler } = useValidate((value) => value.trim() !== "" && value.trim().length > 5);
  const { value: firstName, isValid: firstNameIsValid, hasError: firstNameHasError, valueChangeHandler: firstNameChangeHandler, inputBlurHandler: firstNameBlurHandler } = useValidate((value) => value.trim() !== "");
  const { value: lastName, isValid: lastNameIsValid, hasError: lastNameHasError, valueChangeHandler: lastNameChangeHandler, inputBlurHandler: lastNameBlurHandler } = useValidate((value) => value.trim() !== "");

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailClass = emailHasError ? "invalid" : "";
  const passwordClass = passwordHasError ? "invalid" : "";
  const firstNameClass = firstNameHasError ? "invalid" : "";
  const lastNameClass = lastNameHasError ? "invalid" : "";

  const submitHandler = async (e) => {
    e.preventDefault();
    if (firstNameIsValid && lastNameIsValid && emailIsValid && passwordIsValid) {
      setIsLoading(true);
      try {
        const response = await axios({
          url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDgEY__7LsGJOiMIm9dXbYqAOoOVSOaOlM",
          method: "POST",
          data: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        setIsLoading(false);
        const token = response["data"]["idToken"];
        auth_ctx.login(token);
        history.replace('/admin')
      } catch (error) {
        setIsLoading(false);
        if (error && error.response && error.response.data && error.response.data.error) {
          const message = error.response.data.error.message;
          switch (message) {
            case "INVALID_EMAIL":
              setError("Please enter a valid email address.");
              break;

            case "EMAIL_EXISTS":
              setError("A user with this email address is already registered. Have you tried logging in?");
              break;

            case "WEAK_PASSWORD : Password should be at least 6 characters":
              setError("Please enter a password with more than 6 characters.");
              break;

            case "TOO_MANY_ATTEMPTS_TRY_LATER":
              setError("You have attempted to log in too many times. Please try again later.");
              break;
            default:
              setError(message);
              break;
          }
        }
      }
    } else {
      if(!passwordIsValid){
        setError("Please enter a valid email address")
      }
      if(!emailIsValid){
        setError("Please enter a valid email address")
      }
    }
  };

  return (
    <>
      <div className={styles["signup-card"]}>
        <div>
          <h1>Sign Up</h1>
          <form onSubmit={submitHandler}>
            <div className={styles["input-holder"]}>
              <input
                type="text"
                onChange={(e) => {
                  firstNameChangeHandler(e.target.value);
                }}
                onBlur={firstNameBlurHandler}
                value={firstName}
                placeholder="first name"
                className={firstNameClass}
              />
              <input
                type="text"
                onChange={(e) => {
                  lastNameChangeHandler(e.target.value);
                }}
                onBlur={lastNameBlurHandler}
                value={lastName}
                placeholder="last name"
                className={lastNameClass}
              />
            </div>
            <input
              type="text"
              onChange={(e) => {
                emailChangeHandler(e.target.value);
              }}
              onBlur={emailBlurHandler}
              value={email}
              placeholder={"email"}
              className={emailClass}
            />
            <input
              type="password"
              onChange={(e) => {
                passwordChangeHandler(e.target.value);
              }}
              onBlur={passwordBlurHandler}
              value={password}
              placeholder={"password"}
              className={passwordClass}
            />
            {error && (
              <div className={styles["error-container"]}>
                {" "}
                <p className={styles.error}>{error}</p>
              </div>
            )}
            <div className={styles["button-container"]}>
              <button className={styles.submit} onClick={submitHandler}>
                {isLoading ? <i className="fa fa-spinner fa-spin fa-fw"></i> : "SIGN UP"}
              </button>
              <Link to="../login">Already have an account?</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
