import Login from "./Login";
import styles from "./Portal.module.css";
import Signup from './Signup';

const Portal = (props) => {
  return (
    <>
      <div className={styles["container"]}>
        {props.method === "login" && <Login />}
        {props.method === "signup" && <Signup />}
      </div>
    </>
  );
};

export default Portal;
