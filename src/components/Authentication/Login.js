import styles from "./Portal.module.css";
import useValidate from "../../hooks/useValidate";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import AuthContext from "../../context/auth-context";

const Login = (props) => {
  const auth_ctx = useContext(AuthContext);
  const history = useHistory();

  const { value: email, isValid: emailIsValid, hasError: emailHasError, valueChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler } = useValidate((value) => value !== "" && value.trim().includes("@") && value.trim().includes("."));
  const { value: password, isValid: passwordIsValid, hasError: passwordHasError, valueChangeHandler: passwordChangeHandler, inputBlurHandler: passwordBlurHandler } = useValidate((value) => value.trim() !== "" && value.trim().length > 5);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailClass = emailHasError ? "invalid" : "";
  const passwordClass = passwordHasError ? "invalid" : "";

  const submitHandler = async (e) => {
    e.preventDefault();
    if (emailIsValid && passwordIsValid) {
      setIsLoading(true);
      try {
        const response = await axios({
          url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDgEY__7LsGJOiMIm9dXbYqAOoOVSOaOlM",
          method: "POST",
          data: JSON.stringify({
            email,
            password,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setIsLoading(false);
        const token = response["data"]["idToken"];
        auth_ctx.login(token);
        history.replace("/admin");
      } catch (error) {
        setIsLoading(false);
        if (error && error.response && error.response.data && error.response.data.error) {
          const message = error.response.data.error.message;
          switch (message) {
            case "EMAIL_NOT_FOUND":
              setError("Email address not found.");
              break;

            case "INVALID_EMAIL":
              setError("Please enter a valid email address.");
              break;

            case "INVALID_PASSWORD":
              setError("Incorrect Password.");
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
    }
  };

  return (
    <>
      <div className={styles["login-card"]}>
        <div>
          <h1>Log In</h1>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              onChange={(e) => {
                emailChangeHandler(e.target.value);
              }}
              value={email}
              placeholder={"email"}
              onBlur={emailBlurHandler}
              className={emailClass}
            />
            <input
              type="password"
              onChange={(e) => {
                passwordChangeHandler(e.target.value);
              }}
              value={password}
              placeholder={"password"}
              onBlur={passwordBlurHandler}
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
                {isLoading ? <i className="fa fa-spinner fa-spin fa-fw"></i> : "LOG IN"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
