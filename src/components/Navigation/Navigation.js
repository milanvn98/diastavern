import { useContext } from "react";
import AuthContext from "../../context/auth-context";
import styles from "./Navigation.module.css";

const Navigation = (props) => {
  const auth_ctx = useContext(AuthContext);
  return (
    <>
      <nav>
        <div className={styles["logo-container"]}>
          <img src="white-logo.png" className={styles.logo} alt={"Dias Tavern Logo"} />
        </div>
        <div className={styles.title}>
          <h1>Live Menu</h1>
        </div>
        <div className={styles["exits"]}>
          <i className="fas fa-globe"></i>
          <i
            className="fas fa-sign-out-alt"
            onClick={() => {
              auth_ctx.logout();
            }}
          ></i>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
